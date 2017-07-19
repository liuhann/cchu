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
const path = require("path");
const fs = require("fs");
const node_fetch_1 = require("node-fetch");
class ImageDownloader {
    downloadAndReplace(imageurls, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            fs.mkdirSync(path.resolve('./' + folder));
            if (fs.existsSync('download.tmp')) {
                console.log('resume last...');
                try {
                    imageurls = JSON.parse(fs.readFileSync('download.tmp', 'utf-8'));
                }
                catch (err) {
                }
            }
            while (imageurls.length) {
                let url = imageurls.pop();
                console.log('download ' + url);
                let res = yield node_fetch_1.default(url);
                var dest = fs.createWriteStream(path.resolve('./' + folder + '/' + url.replace(/.*\//g, '')));
                yield res.body.pipe(dest);
                fs.writeFileSync('download.tmp', JSON.stringify(imageurls), 'utf-8');
            }
        });
    }
}
exports.default = ImageDownloader;
