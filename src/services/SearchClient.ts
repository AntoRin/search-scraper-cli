import { IArguments } from "IArguments";
import { ISearchResult } from "ISearchResult";
import fetch, { Response } from "node-fetch";
import { config } from "../config";

export class SearchClient {
   public static async getSearchResults(
      args: IArguments
   ): Promise<ISearchResult> {
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
