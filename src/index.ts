import minimist from "minimist";
import { IArguments } from "IArguments";

import { CommandHandler } from "./services/CommandHandler";

export async function main() {
   const args = minimist<IArguments>(process.argv.slice(2));
   try {
      const handler: CommandHandler = new CommandHandler(args);
      await handler.handleCommands();
   } catch (error: any) {
      console.log("Error:", error.message);
      process.exit(1);
   }
}
