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
const fs = require("fs");
const fetch = require("node-fetch");
const formData = require("form-data");
const MusicMeta = require("musicmetadata");
// const ROOT = "F:/KwDownload/song/";
const ROOT = "G:/讲故事";
const HOST = "http://jinjing.duapp.com";
const isUPload = false;
// const HOST = "http://127.0.0.1:18080";
function go(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = fs.readdirSync(dir);
        for (let file of result) {
            let fileFullPath = dir + "/" + file;
            let fd = fs.openSync(fileFullPath, "r+");
            let fileStat = fs.fstatSync(fd);
            if (fileStat.isFile()) {
                if (file.endsWith(".mp3")) {
                    try {
                        let musicMeta = yield readFileMeta(fileFullPath);
                        let form = new formData();
                        form.append('file', fs.createReadStream(fileFullPath));
                        form.append('path', fileFullPath.substr(ROOT.length));
                        let resultJSON;
                        if (isUPload) {
                            let uploadResult = yield fetch(HOST + "/story/upload", {
                                method: "POST",
                                body: form
                            });
                            resultJSON = yield uploadResult.json();
                            console.log(resultJSON);
                        }
                        // await fetch(HOST+ "/story/create");
                        let result = yield fetch(HOST + "/story/create", {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                title: musicMeta.title,
                                album: musicMeta.album,
                                artist: musicMeta.artist,
                                path: fileFullPath.substr(ROOT.length),
                                duration: musicMeta.duration,
                                fileId: isUPload ? resultJSON.id : null
                            })
                        });
                        console.log('import file ', fileFullPath, ', result ' + result);
                        yield new Promise(function (resolve, reject) {
                            setTimeout(() => {
                                resolve();
                            }, 200);
                        });
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            }
            else if (fileStat.isDirectory()) {
                go(fileFullPath);
            }
        }
    });
}
function readFileMeta(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let readStream = fs.createReadStream(filePath);
            MusicMeta(readStream, {
                duration: true
            }, function (err, metadata) {
                readStream.close();
                if (err) {
                    console.log(filePath, ' error');
                    reject();
                }
                resolve(metadata);
            });
        });
    });
}
go(ROOT + "/飞飞姐姐说故事-童话故事集");
// go(ROOT);
