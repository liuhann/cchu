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
const formData = require("form-data");
const download = require('download');
const HOST = "http://jinjing.duapp.com";
class LoadParser {
    constructor() {
        this.getOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
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
    replaceName(name) {
        return name.replace(/[\/:*?"<>|]/g, '');
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
    updateStory(story) {
        return __awaiter(this, void 0, void 0, function* () {
            let fetching = yield node_fetch_1.default(`${HOST}/story/properties/update?story=${story._id}`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(story)
            });
            if (fetching.status === 200) {
                return yield fetching.json();
            }
            else {
                throw new Error('update failed');
            }
        });
    }
    createStory(story) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield node_fetch_1.default(HOST + "/story/create", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: story.title,
                        album: story.album,
                        short: story.short,
                        path: story.album + '/' + story.title + '.mp3',
                        duration: story.duration,
                        cover: story.cover
                    })
                });
                return yield result.json();
            }
            catch (e) {
                throw new Error('create failed');
            }
        });
    }
    // create story
    postStory(book, coverPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let resultJSON = {};
            if (coverPath && fs.existsSync(coverPath)) {
                try {
                    let form = new formData();
                    form.append('file', fs.createReadStream(coverPath));
                    let uploadResult = yield node_fetch_1.default(HOST + "/file/upload", {
                        method: "POST",
                        body: form
                    });
                    resultJSON = yield uploadResult.json();
                }
                catch (e) {
                }
            }
            // await fetch(HOST+ "/story/create");
            try {
                let result = yield node_fetch_1.default(HOST + "/story/create", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: book.title,
                        album: book.album,
                        short: book.short,
                        path: book.album + '/' + book.title + '.mp3',
                        duration: book.duration,
                        cover: resultJSON.id || null
                    })
                });
                yield result.json();
            }
            catch (e) {
            }
        });
    }
    postAlbum(album) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('+album', album.id, album.name);
                let result = yield node_fetch_1.default(HOST + `/lizhi/album/add?id=${album.id}&name=${encodeURIComponent(album.name)}&cover=${album.cover}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                const json = yield result.json();
                return json;
            }
            catch (e) {
                return this.postAlbum(album);
            }
        });
    }
    downloadFile(remoteUrl, localFolder, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!remoteUrl)
                return null;
            yield download(remoteUrl, localFolder, {
                filename: fileName
            });
            /*
                    let pr = new Promise(function(resolve, reject) {
                        console.log(`downloading ${remoteUrl}`);
                        fetch(remoteUrl).then(function(res:any) {
                            try {
                                let dest = fs.createWriteStream(localFolder + '/' + fileName);
                                res.body.on('end', ()=> {
                                    resolve('downloaded');
                                });
                                res.body.on('error', (err)=> {
                                   reject(err);
                                });
                                res.body.pipe(dest);
                            } catch (err) {
                                reject(err);
                            }
                        });
                    });
            */
            return;
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
    loadData(url) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
LoadParser.parsers = new Map();
exports.default = LoadParser;
