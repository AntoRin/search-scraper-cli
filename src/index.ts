import { promisify } from "util";
import child_process, { ChildProcess } from "child_process";
import { writeFile } from "fs/promises";
import minimist from "minimist";
import { SearchService } from "./services/SearchService";
import { IArguments } from "IArguments";
import { ISearchResult } from "ISearchResult";
import { rm } from "fs";

const { spawn } = child_process;
const rmAsync = promisify(rm);

export async function main() {
   const args: minimist.ParsedArgs = minimist<string>(process.argv.slice(2));

   const searchClient: SearchService = new SearchService();
   const commands: IArguments = searchClient.parseArguments(args);

   console.log(commands);

   const searchResult: ISearchResult = await searchClient.getSearchResults(
      commands
   );

   if (searchResult.status === "ok") {
      try {
         await writeFile(
            "./result.json",
            JSON.stringify(searchResult.data, null, 4)
         );

         let shellProcess: ChildProcess = spawn("less", ["./result.json"], {
            detached: false,
            stdio: ["ignore", process.stdout, process.stdout],
         });

         shellProcess.on("exit", async code => {
            await rmAsync("./result.json");
            console.log("Exited with code", code);
            process.exit(0);
         });
      } catch (error) {
         console.log(error);
         process.exit(1);
      }
   } else {
      console.log(searchResult.data);
      process.exit(1);
   }
}
