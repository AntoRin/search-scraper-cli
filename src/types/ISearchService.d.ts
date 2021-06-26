import { IArguments } from "IArguments";
import minimist from "minimist";
import { ISearchResult } from "./ISearchResult";

interface ISearchService {
   parseArguments(args: minimist.ParsedArgs): IArguments;
   getSearchResults(args: IArguments): Promise<ISearchResult>;
}

export { ISearchService };
