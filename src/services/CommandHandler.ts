import child_process, { ChildProcess } from "child_process";
import { rm, readFile } from "fs";
import { writeFile } from "fs/promises";
import { promisify } from "util";
import { IArguments } from "IArguments";
import { ISearchResult } from "ISearchResult";
import { SearchClient } from "./SearchClient";

const { spawn } = child_process;
const rmAsync: Function = promisify(rm);
const readFileAsync: Function = promisify(readFile);

export class CommandHandler {
   private _commandLineArgs: IArguments;

   constructor(args: IArguments) {
      this._commandLineArgs = args;
   }

   public async handleCommands(): Promise<void> {
      try {
         const parsedArguments: IArguments = this.parseArguments(
            this._commandLineArgs
         );
         if (parsedArguments.help) return this.showHelp();
         else if (parsedArguments.version) return this.showVersion();
         else return this.showScrapedContent(parsedArguments);
      } catch (error) {
         throw error;
      }
   }

   public parseArguments(args: IArguments): IArguments {
      const commands: IArguments = {
         _: args._,
         q: args._.join(" "),
         hostName: args.h ? args.h : "",
         hostNameFilterType: args.filterType ? args.filterType : "none",
         totalPages: args.p ? args.p : 1,
         videos: args.v ? args.v : false,
         version: args.version ? args.version : false,
         help: args.help ? args.help : false,
      };

      return commands;
   }

   public async showVersion(): Promise<void> {
      const packageData = JSON.parse(
         await readFileAsync("./package.json", { encoding: "utf-8" })
      );
      console.log(packageData.version);
      process.exit(0);
   }

   public showHelp(): void {
      console.log("Prefix your search queries with the command 'search'");
      process.exit(0);
   }

   public async showScrapedContent(parsedArguments: IArguments): Promise<void> {
      console.log(parsedArguments);

      try {
         const searchResult: ISearchResult =
            await SearchClient.getSearchResults(parsedArguments);

         if (searchResult.status === "error") throw new Error("Bad request");

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
         throw error;
      }
   }
}
