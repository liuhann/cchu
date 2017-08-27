"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const HOST = "http://jinjing.duapp.com";
const LIZHI_HOST = "https://www.lizhi.fm";
const LoadParser_1 = require("../LoadParser");
class ExecTask extends LoadParser_1.default {
    //1 pop task
    popTask() {
        return __awaiter(this, void 0, void 0, function* () {
            const fetching = yield node_fetch_1.default(`${HOST}/task/pop`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const task = yield fetching.json();
            return task;
        });
    }
    popRun() {
        //1 pop task
        //2 fetch detail
        //3 check local exists and download mp3 and cover
        //4 check remote and upload
        //4.1 check story
        //4.2 upload image if not exist
        //4.3 upload story if not exist
        //4.4 update story
        //5 mark task as finished
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield et.popTask();
            console.log(r);
        });
    }
}
const et = new ExecTask();
et.exec();
