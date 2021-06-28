import child_process, { ChildProcess } from "child_process";
import { IArguments } from "IArguments";
import { ISearchResult } from "ISearchResult";
import { SearchClient } from "./SearchClient";

const { version } = require("../../package.json");

const { spawn } = child_process;

export class CommandHandler {
   private _commandLineArgs: IArguments;
   private readonly _platform: string = process.platform;

   constructor(args: IArguments) {
      this._commandLineArgs = args;
   }

   public async handleCommands(): Promise<void> {
      try {
         if (this._commandLineArgs.help) return this.showHelp();
         else if (this._commandLineArgs.version) return this.showVersion();
         else return this.showScrapedContent(this._commandLineArgs);
      } catch (error) {
         throw error;
      }
   }

   public showVersion(): void {
      console.log(version);
      process.exit(0);
   }

   public showHelp(): void {
      console.log("Prefix your search queries with the command 'search'");
      process.exit(0);
   }

   public async showScrapedContent(parsedArguments: IArguments): Promise<void> {
      try {
         const searchResult: ISearchResult =
            await SearchClient.getSearchResults(parsedArguments);

         if (searchResult.status === "error") throw new Error("Bad request");

         let printCommand: string;

         if (this._platform === "win32") {
            printCommand = "";
         } else {
            printCommand = "echo";
         }

         const process_less: ChildProcess = spawn("less", [], {
            detached: false,
            stdio: ["pipe", process.stdout, process.stderr],
         });

         const process_echo: ChildProcess = spawn(
            `${printCommand}`,
            [JSON.stringify(searchResult.data, null, 4)],
            {
               detached: false,
               stdio: ["ignore", process_less.stdin, process.stderr],
            }
         );

         process_echo.on("exit", () => process_less.stdin?.end());

         process_less.on("exit", code => {
            console.log("Exited with code", code);
            process.exit(0);
         });
      } catch (error) {
         throw error;
      }
   }
}
