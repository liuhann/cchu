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
const HOST = "https://jinjing.duapp.com";
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
            try {
                let result = yield node_fetch_1.default(HOST + `/task/create?album=${encodeURIComponent(story.album)}&story=${encodeURIComponent(story.title)}&taskId=${LIZHI_HOST + story.href}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                return yield result.json();
            }
            catch (err) {
                return yield this.addTask(story);
            }
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
            //1 pop a album
            let result = yield node_fetch_1.default(HOST + "/lizhi/album/pop", this.getOptions);
            const albums = yield result.json();
            const album = albums.result;
            if (album == null) {
                return false;
            }
            console.log('album:' + album.name);
            this.nkl = new LizhiListing_1.default();
            //need check?
            if (album.u) {
                if (new Date().getTime() - new Date(album.u).getTime() < 24 * 60 * 60 * 1000) {
                    return true;
                }
            }
            let page = album.last || this.lastPage || 1; //start from page 1
            yield this.delay(1000);
            let list = yield this.nkl.loadData(`http://www.lizhi.fm/${album.id}/p/${page}.html`);
            let storyInc = 0;
            while (list.length) {
                for (let story of list) {
                    story.album = album.name;
                    yield this.delay(200);
                    const inserted = yield this.addTask(story);
                    console.log('+task ' + story.title);
                    storyInc++;
                    if (inserted.result === 'existed' && album.u) {
                        yield this.markAlbumToday(album.id);
                        console.log('+existed & task completed total: ' + storyInc);
                        return true;
                    }
                }
                page++;
                this.lastPage = page;
                this.delay(1000);
                list = yield this.nkl.loadData(`http://www.lizhi.fm/${album.id}/p/${page}.html`);
            }
            //at last  mark album today
            yield this.markAlbumToday(album.id);
            console.log('task completed. total : ' + storyInc);
            this.lastPage = 1;
            return true;
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            //await this.execFetchAlbum();
            while (true) {
                try {
                    this.lastPage = 37;
                    yield this.delay(1000);
                    let exe = yield this.execAddAlbumTask();
                    if (!exe)
                        break;
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }
}
const bl = new BokeListing();
bl.run();
