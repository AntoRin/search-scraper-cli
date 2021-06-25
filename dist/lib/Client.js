"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = require("../config");
class Client {
    parseArguments(args) {
        const commands = {
            q: args._.join(" "),
            hostName: args.h ? args.h : "",
            hostNameFilterType: args.filterType ? args.filterType : "none",
            totalPages: args.p ? args.p : 1,
            videos: args.v ? args.v : false
        };
        return commands;
    }
    getSearchResults(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = args.videos ? config_1.config.apiYt : config_1.config.apiDefault;
            const responseStream = yield node_fetch_1.default(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(args)
            });
            const response = yield responseStream.json();
            return response;
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map