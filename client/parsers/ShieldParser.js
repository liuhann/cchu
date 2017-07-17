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
class ShieldParser extends LoadParser_1.default {
    loadData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let $ = yield this.load(url);
            let result = {};
            result.fullImg = 'http://www.spyrius.org' + $('center').first().find('img').attr('src');
            result.power = [];
            for (let img of Array.from($('.row').last().find('.row-content').eq(1).find('img'))) {
                result.power.push($(img).attr('src'));
            }
            return result;
        });
    }
}
exports.default = ShieldParser;
