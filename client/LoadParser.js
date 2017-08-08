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
const fs = require("fs");
const cheerio = require("cheerio");
const FormData = require("form-data");
const HOST = "http://jinjing.duapp.com";
class LoadParser {
    constructor() {
    }
    static addParser(parser, type) {
        LoadParser.parsers.set(type, parser);
    }
    checkLoad(url, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const parser = LoadParser.parsers.get(type);
            if (parser) {
                let result = yield parser.loadData(url);
                return result;
            }
            else {
                return {};
            }
        });
    }
    decode(src) {
        if (src) {
            return unescape(src.replace(/&#x/g, '%u').replace(/;/g, '').replace(/&quot/g, '"').replace(/%uB7/g, '·'));
        }
        else {
            return '';
        }
    }
    postCover(localFile) {
        return __awaiter(this, void 0, void 0, function* () {
            let formData = new FormData();
            formData.append('file', fs.createReadStream(localFile));
            let fetching = yield node_fetch_1.default(HOST + "/file/upload", {
                method: "POST",
                body: formData
            });
            let result = yield fetching.json();
            return result.id;
        });
    }
    // create story
    postStory(book) {
        return __awaiter(this, void 0, void 0, function* () {
            let fetching = yield node_fetch_1.default(HOST + "/story/create", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    v: '1.1',
                    cover: book.cover,
                    title: book.title,
                    st: book.subtitle,
                    author: book.author,
                    short: book.detail,
                    link: book.link,
                    thumb: book.thumb
                })
            });
            return yield fetching.json();
        });
    }
    downloadFile(remoteUrl, localFolder, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            let pr = new Promise(function (resolve, reject) {
                console.log(`downloading ${remoteUrl}`);
                node_fetch_1.default(remoteUrl).then(function (res) {
                    let dest = fs.createWriteStream(localFolder + '/' + fileName);
                    res.body.on('end', () => {
                        console.log('downloaded');
                        resolve();
                    });
                    res.body.pipe(dest);
                });
            });
            return pr;
        });
    }
    delay(sec) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                setTimeout(() => {
                    resolve();
                }, sec);
            });
        });
    }
    load(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield node_fetch_1.default(url);
            let text = yield result.text();
            let $ = cheerio.load(text);
            console.log(url + '  loaded');
            return $;
        });
    }
}
LoadParser.parsers = new Map();
exports.default = LoadParser;
