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
const LoadParser_1 = require("../LoadParser");
const ShieldParser_1 = require("./ShieldParser");
class NexoKnightsListing extends LoadParser_1.default {
    loadData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let $ = yield this.load(url);
            let heros = [];
            for (let elem of Array.from($('.table-responsive').first().find('tr'))) {
                let shields = [];
                for (let [i, a] of Array.from($(elem).find('a')).entries()) {
                    if (i > 2)
                        break;
                    let shield = {};
                    shield.href = 'http://www.spyrius.org' + $(a).attr('href');
                    shield.src = $(a).find('img').attr('src');
                    shield.title = $(a).find('img').attr('title');
                    let checkLoaded = yield this.checkLoad(shield.href, 'lego-shield');
                    Object.assign(shield, checkLoaded);
                    shields.push(shield);
                }
                heros.push(shields);
            }
            return heros;
        });
    }
}
function call() {
    return __awaiter(this, void 0, void 0, function* () {
        LoadParser_1.default.addParser(new ShieldParser_1.default(), 'lego-shield');
        let nkl = new NexoKnightsListing();
        let data = yield nkl.loadData('http://www.spyrius.org/nexo/');
        console.log(data);
    });
}
call();
