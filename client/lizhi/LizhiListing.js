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
const FILE_ROOT = 'E:/lizhi';
const album_list = {
    '982236': {
        album: '小柚子故事屋',
        dup_break: true // 相同的是否break
    },
    '25681': {
        album: '凯叔讲故事',
        dup_break: true // 相同的是否break
    },
    '1682240': {
        album: '彩色斑马讲科学',
        dup_break: true // 相同的是否break
    },
    '1455354': {
        album: '园长妈妈的睡前故事',
        dup_break: true // 相同的是否break
    },
    '1908715': {
        album: '火火兔儿童FM',
        dup_break: true // 相同的是否break
    },
    '1967306': {
        album: '小猪佩奇',
        dup_break: true // 相同的是否break
    },
    '3804713': {
        album: '米小圈广播剧',
        dup_break: false // 相同的是否break
    },
    '428496': {
        album: '彩色斑马讲故事',
        dup_break: false // 相同的是否break
    },
    '380030': {
        album: '微小宝睡前童话故事',
        dup_break: false // 相同的是否break
    },
    '358962': {
        album: '班迪故事口袋',
        dup_break: false // 相同的是否break
    },
};
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
                story.title = this.replaceName(a.attr('title'));
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
            book.cover = $('.audioCover img').attr('src').replace(/_320x320/g, '');
            book.duration = $('.js-play-data').attr('data-duration');
            book.short = $('.desText').html();
            return book;
        });
    }
}
exports.default = LizhiListing;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let nkl = new LizhiListing();
        for (let albumId in album_list) {
            const albumInfo = album_list[albumId];
            if (!fs.existsSync(FILE_ROOT + '/' + albumInfo.album)) {
                fs.mkdirSync(FILE_ROOT + '/' + albumInfo.album);
            }
            let itor = albumInfo.start || 1;
            let list = yield nkl.loadData(`${LIZHI_HOST}/${albumId}/p/${itor}.html`);
            while (list.length) {
                let dup_breaked = false;
                for (let story of list) {
                    try {
                        story.album = albumInfo.album;
                        if (fs.existsSync(`${FILE_ROOT}/${story.album}/${story.title}.mp3`)) {
                            if (albumInfo.dup_break) {
                                dup_breaked = true;
                                break;
                            }
                            else {
                                continue;
                            }
                        }
                        yield nkl.delay(2000 + Math.random() * 1000);
                        //mp3 download
                        let musicFile = yield nkl.downloadFile(story.mp3, FILE_ROOT + '/' + albumInfo.album, story.title + '.mp3');
                        if (!musicFile)
                            continue;
                        let $ = yield nkl.load(`${LIZHI_HOST}${story.href}`);
                        story.cover = $('.audioCover img').attr('src').replace(/_320x320/g, '');
                        story.duration = $('.js-play-data').attr('data-duration');
                        story.short = nkl.decode($('.desText').html());
                        let imageFile = yield nkl.downloadFile(story.cover, FILE_ROOT + '/' + albumInfo.album, story.title + '.png');
                        if (!imageFile)
                            continue;
                        yield nkl.postStory(story, `${FILE_ROOT}/${story.album}/${story.title}.png`);
                    }
                    catch (e) {
                        console.log(`story failed`);
                    }
                }
                if (dup_breaked)
                    break;
                itor++;
                list = yield nkl.loadData(`${LIZHI_HOST}/${albumId}/p/${itor}.html`);
            }
        }
    });
}
run();
