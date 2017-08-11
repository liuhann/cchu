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
const LIZHI_HOST = "https://www.lizhi.fm";
class LizhiListing extends LoadParser_1.default {
    constructor() {
        super();
    }
    loadData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let $ = yield this.load(url);
            let stories = [];
            for (let li of Array.from($('.js-audio-list').find('li'))) {
                let story = {};
                let a = $(li).find('a.audio-list-item');
                story.title = a.attr('title');
                story.album = a.attr('data-radio-name');
                story.href = a.attr('href');
                story.author = a.attr('data-user-name');
                //story.cover = a.attr('data-cover');
                story.duration = a.attr('data-duration');
                story.mp3 = a.attr('data-url');
                //let story = await this.extractStory($(li));
                stories.push(story);
            }
            return stories;
        });
    }
    extractStory(li) {
        return __awaiter(this, void 0, void 0, function* () {
            let book = {};
            let a = li.find('a.audio-list-item');
            book.title = a.attr('title');
            book.album = a.attr('data-radio-name');
            book.author = a.attr('data-user-name');
            let $ = yield this.load(LIZHI_HOST + a.attr('href'));
            book.cover = $('.audioCover img').attr('src');
            book.duration = $('.js-play-data').attr('data-duration');
            book.short = $('.desText').html();
            return book;
        });
    }
}
exports.default = LizhiListing;
let AlbumPath = '小柚子故事屋';
const Album_Map = new Map();
function call() {
    return __awaiter(this, void 0, void 0, function* () {
        let nkl = new LizhiListing();
        yield nkl.delay(1000);
        let posted = false;
        let list = yield nkl.loadData('http://www.lizhi.fm/982236/p/1.html');
        let pagei = 0;
        while (list.length) {
            console.log(list);
            for (let story of list) {
                story.album = AlbumPath;
                if (!fs.existsSync('./' + story.album)) {
                    fs.mkdirSync('./' + story.album);
                }
                //mp3 download
                yield nkl.downloadFile(story.mp3, './' + story.album, story.title + '.mp3');
                let $ = yield nkl.load(`${LIZHI_HOST}${story.href}`);
                story.cover = $('.audioCover img').attr('src');
                story.short = nkl.decode($('.desText').html());
                yield nkl.downloadFile(story.cover, './' + story.album, story.title + '.png');
                yield nkl.postStory(story, `./${story.album}/${story.title}.png`);
            }
            pagei++;
            list = yield nkl.loadData(`http://www.lizhi.fm/982236/p/${pagei}.html`);
        }
    });
}
call();
