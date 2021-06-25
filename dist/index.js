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
exports.main = void 0;
const util_1 = require("util");
const child_process_1 = __importDefault(require("child_process"));
const minimist_1 = __importDefault(require("minimist"));
const Client_1 = require("./lib/Client");
const execAsync = util_1.promisify(child_process_1.default.exec);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = minimist_1.default(process.argv.slice(2));
        const client = new Client_1.Client();
        const commands = client.parseArguments(args);
        console.log(commands);
        const searchResult = yield client.getSearchResults(commands);
        if (searchResult.status === "ok") {
            try {
                const { stdout, stderr } = yield execAsync(`echo '${JSON.stringify(searchResult.data, null, 4)}'`);
                console.log(stdout);
                console.error(stderr);
            }
            catch (error) {
                console.log(error);
                process.exit(1);
            }
        }
        else {
            console.log(searchResult.data);
            process.exit(1);
        }
    });
}
exports.main = main;
//# sourceMappingURL=index.js.map