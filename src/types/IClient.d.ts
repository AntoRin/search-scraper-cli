import { IArguments } from "IArguments";
import minimist from "minimist";
import { ISearchResult } from "./ISearchResult";

interface IClient {
    parseArguments (args: minimist.ParsedArgs): IArguments;  
    async getSearchResults(args: IArguments): Promise<ISearchResult>;
}

export { IClient };