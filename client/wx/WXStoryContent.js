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
const fs = require("fs");
const fetch = require("node-fetch");
class WXStoryContent extends LoadParser_1.default {
    constructor() {
        super();
    }
    loadData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let $ = yield this.load(url);
            let st = {};
            st.title = $('h2.rich_media_title').html();
            st.account = $('.rich_media_meta_nickname').html();
            let mp3Id = $('mpvoice').attr('voice_encode_fileid');
            let mp3Title = $('mpvoice').attr('name');
            fetch('https://res.wx.qq.com/voice/getvoice?mediaid=' + mp3Id).then(function (res) {
                var dest = fs.createWriteStream('./' + mp3Title + '.mp3');
                res.body.pipe(dest);
            });
            return st;
        });
    }
}
exports.default = WXStoryContent;
function call() {
    return __awaiter(this, void 0, void 0, function* () {
        let wxs = new WXStoryContent();
        let x = yield wxs.loadData('https://mp.weixin.qq.com/s?__biz=MzA5NTU0MTMzOQ==&mid=2652372170&idx=6&sn=cce35ad1a0353ff3a12aba460ab0778e&chksm=8b5e9dfebc2914e81a015d9cf8118c8f4dbcee4a2112f212f1bf74536587f57b08af7cd09ce1&scene=21#wechat_redirect');
        console.log(x);
    });
}
call();
