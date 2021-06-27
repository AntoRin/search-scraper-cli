import minimist from "minimist";

export interface IArguments extends minimist.ParsedArgs {
   q?: string;
   hostName?: string;
   hostNameFilterType?: string;
   totalPages?: number;
   videos?: boolean;
   version?: boolean;
   help?: boolean;
}
