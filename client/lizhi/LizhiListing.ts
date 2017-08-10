import LoadParser from "../LoadParser";
import * as cheerio from 'cheerio';
import *　as fs from 'fs';
const fetch = require("node-fetch");

const LIZHI_HOST = "https://www.lizhi.fm";

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
            story.title = a.attr('title');
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
        book.cover = $('.audioCover img').attr('src');

        book.duration = $('.js-play-data').attr('data-duration');
        book.short = $('.desText').html();
        return book;
    }
}


let AlbumPath = '小柚子故事屋'


async function call(){
    let nkl = new LizhiListing();
    await nkl.delay(1000);
    let posted = false;


    let list = await nkl.loadData('http://www.lizhi.fm/982236/p/1.html');
    let pagei = 0;

    while(list.length) {
        console.log(list);
        for(let story of list) {
            story.album = AlbumPath;
            if (!fs.existsSync('./' + story.album)) {
                fs.mkdirSync('./' + story.album);
            }
            //mp3 download
            await nkl.downloadFile(story.mp3, './' + story.album, story.title + '.mp3');

            let $ = await nkl.load(`${LIZHI_HOST}${story.href}`);
            story.cover = $('.audioCover img').attr('src');
            story.short = nkl.decode($('.desText').html());
            await nkl.downloadFile(story.cover, './' + story.album, story.title + '.png');
            await nkl.postStory(story,  `./${story.album}/${story.title}.png`);
        }
        pagei ++;

        list = await nkl.loadData(`http://www.lizhi.fm/982236/p/${pagei}.html`);
    }


}

call();

