import minimist from "minimist";
import { ISearchService } from "ISearchService";
import { IArguments } from "IArguments";
import { ISearchResult } from "ISearchResult";
import fetch, { Response } from "node-fetch";
import { config } from "../config";

export class SearchService implements ISearchService {
   parseArguments(args: minimist.ParsedArgs): IArguments {
      const commands: IArguments = {
         q: args._.join(" "),
         hostName: args.h ? args.h : "",
         hostNameFilterType: args.filterType ? args.filterType : "none",
         totalPages: args.p ? args.p : 1,
         videos: args.v ? args.v : false,
      };

      return commands;
   }

   async getSearchResults(args: IArguments): Promise<ISearchResult> {
      const apiUrl = args.videos ? config.apiYt : config.apiDefault;

      const responseStream: Response = await fetch(apiUrl, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(args),
      });
      const response: ISearchResult = await responseStream.json();

      return response;
   }
}
