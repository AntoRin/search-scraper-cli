import { promisify } from "util";
import child_process from "child_process";
import minimist from "minimist";
import { Client } from "./lib/Client";
import { IArguments } from "IArguments";
import { ISearchResult } from "ISearchResult";

const execAsync = promisify(child_process.exec);

export async function main() {            
    const args: minimist.ParsedArgs = minimist<string>(process.argv.slice(2)); 

    const client: Client = new Client();
    const commands: IArguments = client.parseArguments(args);

    console.log(commands);

    const searchResult: ISearchResult = await client.getSearchResults(commands);
    
    if (searchResult.status === "ok") {
        try {            
            const { stdout, stderr } = await execAsync(`echo '${JSON.stringify(searchResult.data, null, 4)}'`);

            console.log(stdout);

            console.error(stderr);
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    } else {
        console.log(searchResult.data);
        process.exit(1);
    }
}