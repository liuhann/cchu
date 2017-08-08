import LoadParser from "../LoadParser";
import * as cheerio from 'cheerio';
import *　as fs from 'fs';
const fetch = require("node-fetch");

const LIZHI_HOST = "https://www.lizhi.fm";

export default class LizhiListing extends LoadParser {

    private basePath:string;
    constructor(basePath: string) {
        super();
        this.basePath = basePath;
    }

    async loadData(url:string): Promise<any> {
        let $ = await this.load(url);
        let stories = [];
        for(let li of Array.from($('.js-audio-list').find('li'))) {
            let story = await this.extractStory($(li));
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
        book.mp3 = $('.js-play-data').attr('data-url');
        book.short = $('.desText').html();
        return book;
    }
}

async function call(){
    let nkl = new LizhiListing('d:/');
    await nkl.delay(1000);

    let list = await nkl.loadData('http://www.lizhi.fm/982236/p/1.html');
    console.log(list);

}

call();

