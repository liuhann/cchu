import LoadParser from "../LoadParser";
import * as cheerio from 'cheerio';
import *　as fs from 'fs';
const fetch = require("node-fetch");

const LIZHI_HOST = "https://www.lizhi.fm";
const FILE_ROOT = 'E:/lizhi';

const album_list = {
    '982236': {
        album: '小柚子故事屋',
        dup_break: false // 相同的是否break
    },
    '25681': {
        album: '凯叔讲故事',
        start: 66,
        dup_break: false // 相同的是否break
    },
    '1682240': {
        album: '彩色斑马讲科学',
        dup_break: false // 相同的是否break
    },
};

export default class LizhiListing extends LoadParser {

    private basePath:string;
    constructor() {
        super();
    }

    async loadData(url:string): Promise<any> {
        let $ = await this.load(url);
        let stories = [];
        for(let li of Array.from($('.js-audio-list').find('li'))) {
            let story: any = {};
            let a = $(li).find('a.audio-list-item');
            story.title = this.replaceName(a.attr('title'));
            story.album = a.attr('data-radio-name');
            story.href = a.attr('href')
            story.author = a.attr('data-user-name');
            //story.cover = a.attr('data-cover');
            story.duration = a.attr('data-duration');
            story.mp3 = a.attr('data-url');
            //let story = await this.extractStory($(li));
            stories.push(story);
        }
        return stories;
    }

    async extractStory(li):Promise<any> {
        let book:any = {};
        let a = li.find('a.audio-list-item');
        book.title = a.attr('title');
        book.album = a.attr('data-radio-name');
        book.author = a.attr('data-user-name');

        let $ = await this.load(LIZHI_HOST + a.attr('href'));
        book.cover = $('.audioCover img').attr('src').replace(/_320x320/g, '');
        book.duration = $('.js-play-data').attr('data-duration');
        book.short = $('.desText').html();
        return book;
    }
}


async function run(){
    let nkl = new LizhiListing();

    for(let albumId in album_list) {

        const albumInfo = album_list[albumId];
        if (!fs.existsSync(FILE_ROOT + '/' + albumInfo.album)) {
            fs.mkdirSync(FILE_ROOT + '/' + albumInfo.album);
        }
        let itor = albumInfo.start || 1;
        let list = await nkl.loadData(`${LIZHI_HOST}/${albumId}/p/${itor}.html`);
        while(list.length) {

            let dup_breaked = false;

            for(let story of list) {
                story.album = albumInfo.album;
                if (fs.existsSync(`${FILE_ROOT}/${story.album}/${story.title}.mp3`)) {
                    if(albumInfo.dup_break) {
                        dup_breaked = true;
                        break;
                    } else {
                        continue;
                    }
                }
                await nkl.delay(5000 + Math.random()*1000);
                //mp3 download
                let musicFile = await nkl.downloadFile(story.mp3, FILE_ROOT + '/' + albumInfo.album, story.title + '.mp3');
                if (!musicFile) continue;
                let $ = await nkl.load(`${LIZHI_HOST}${story.href}`);
                story.cover = $('.audioCover img').attr('src').replace(/_320x320/g, '');
                story.duration = $('.js-play-data').attr('data-duration');
                story.short = nkl.decode($('.desText').html());
                let imageFile = await nkl.downloadFile(story.cover, FILE_ROOT + '/' + albumInfo.album, story.title + '.png');
                if (!imageFile) continue;
                await nkl.postStory(story,  `${FILE_ROOT}/${story.album}/${story.title}.png`);
            }
            itor ++;
            list = await nkl.loadData(`${LIZHI_HOST}/${albumId}/p/${itor}.html`);
            if (dup_breaked) break;
        }
    }
}

run();

