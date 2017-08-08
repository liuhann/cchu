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
const DangListing_1 = require("./DangListing");
const ExtractDangBook_1 = require("./ExtractDangBook");
/**
 * Created by han on 2017/7/26.
 */
class DangSearch extends DangListing_1.default {
    constructor() {
        super();
    }
    search(book) {
        return __awaiter(this, void 0, void 0, function* () {
            let books = yield this.loadData('http://search.dangdang.com/?key=' + encodeURIComponent(book) + '&act=input');
            if (books.length) {
                return new ExtractDangBook_1.default().loadData(books[0].link);
            }
            else {
                return {};
            }
        });
    }
}
exports.default = DangSearch;
function go() {
    return __awaiter(this, void 0, void 0, function* () {
        let ds = new DangSearch();
        let book = yield ds.search('什么都知道的小麻雀');
        console.log(book);
    });
}
go();
