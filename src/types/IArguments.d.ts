import minimist from "minimist";

export interface IArguments extends minimist.ParsedArgs {
   h?: string;
   filterType?: string;
   p?: number;
   v?: boolean;
   version?: boolean;
   help?: boolean;
}
