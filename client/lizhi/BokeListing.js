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
const node_fetch_1 = require("node-fetch");
const LizhiListing_1 = require("./LizhiListing");
//http://jinjing.duapp.com/task/create?album=小柚子&story=小山羊&taskId=https://www.lizhi.fm/297124/15928136997309190
//http://jinjing.duapp.com/task/pop
//http://jinjing.duapp.com/task/finish?taskId=https://www.lizhi.fm/297124/15928136997309190
//http://jinjing.duapp.com/task/exist?taskId=https://www.lizhi.fm/297124/15928136997309190
//http://jinjing.duapp.com/lizhi/album/add?id=25681&name=凯叔讲故事&cover=zzz
//http://jinjing.duapp.com/lizhi/album/update?id=1975543
const HOST = "http://jinjing.duapp.com";
const LIZHI_HOST = "https://www.lizhi.fm";
const FILE_ROOT = 'E:/lizhi';
class BokeListing extends LoadParser_1.default {
    loadData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let $ = yield this.load(url);
            const lists = $('ul.allRadioList li.radio_list');
            const result = [];
            for (let album of Array.from(lists)) {
                const info = {};
                info.id = $(album).find('a.radioCover').attr('href').replace(/[/]/g, '');
                info.name = this.replaceName(this.decode($(album).find('.radioName a').html().replace(/[ \n\r]/g, '')));
                info.cover = $(album).find('img').first().attr('data-echo').replace(/_[0-9]{3}x[0-9]{3}/g, '');
                result.push(info);
            }
            return result;
        });
    }
    /**
     * Sync lizhi albums by label to yb
     * this would overwrite existing album info such as update time
     * @returns {Promise<void>}
     */
    execFetchAlbum() {
        return __awaiter(this, void 0, void 0, function* () {
            let i = 1;
            let albums = yield this.loadData(`http://www.lizhi.fm/label/24229975059604400/${i}.html`);
            while (albums.length) {
                for (let album of albums) {
                    yield this.delay(1000);
                    yield this.postAlbum(album);
                }
                i++;
                albums = yield this.loadData(`http://www.lizhi.fm/label/24229975059604400/${i}.html`);
            }
        });
    }
    addTask(story) {
        return __awaiter(this, void 0, void 0, function* () {
            //http://jinjing.duapp.com/task/create?album=小柚子&story=小山羊&taskId=https://www.lizhi.fm/297124/15928136997309190//
            let result = yield node_fetch_1.default(HOST + `/task/create?album=${encodeURIComponent(story.album)}&story=${encodeURIComponent(story.title)}&taskId=${LIZHI_HOST + story.href}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            yield result.json();
        });
    }
    markAlbumToday(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield node_fetch_1.default(HOST + `/lizhi/album/update?id=${id}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            yield result.json();
        });
    }
    /**
     * Iter each album and add story to task queue
     * when album itered, mark update time as today
     * @returns {Promise<void>}
     */
    // http://jinjing.duapp.com/lizhi/album/pop
    execAddAlbumTask() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield node_fetch_1.default(HOST + "/lizhi/album/pop", this.getOptions);
            let albums = yield result.json();
            albums = albums.result;
            this.nkl = new LizhiListing_1.default();
            //iter each album
            for (let album of albums) {
                if (album.u) {
                    if (new Date().getTime() - new Date(album.u).getTime() < 24 * 60 * 60 * 1000) {
                        continue;
                    }
                }
                let page = 1; //start from page 1
                this.delay(1000);
                let list = yield this.nkl.loadData(`http://www.lizhi.fm/${album.id}/p/${page}.html`);
                while (list.length) {
                    for (let story of list) {
                        story.album = album.name;
                        yield this.addTask(story);
                    }
                    page++;
                    this.delay(1000);
                    list = yield this.nkl.loadData(`http://www.lizhi.fm/${album.id}/p/${page}.html`);
                }
                yield this.markAlbumToday(album.id);
            }
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.execFetchAlbum();
            //await this.execAddAlbumTask();
        });
    }
}
const bl = new BokeListing();
bl.run();
