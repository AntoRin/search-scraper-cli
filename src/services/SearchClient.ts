import { IArguments } from "IArguments";
import { ISearchResult } from "ISearchResult";
import fetch, { Response } from "node-fetch";
import { config } from "../config";

export class SearchClient {
   public static async getSearchResults(
      args: IArguments
   ): Promise<ISearchResult> {
      const apiUrl = args.v ? config.apiYt : config.apiDefault;

      const postBody = {
         q: args._.join(" "),
         hostName: args.h ? args.h : "",
         hostNameFilterType: args.filterType ? args.filterType : "page",
         totalPages: args.p ? args.p : 1,
         videos: args.v ? args.v : false,
         version: args.version ? args.version : false,
         help: args.help ? args.help : false,
      };

      console.log(postBody);

      const responseStream: Response = await fetch(apiUrl, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(postBody),
      });
      const response: ISearchResult = await responseStream.json();

      return response;
   }
}
