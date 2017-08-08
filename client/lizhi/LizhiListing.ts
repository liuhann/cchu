import LoadParser from "../LoadParser";
import * as cheerio from 'cheerio';
import *　as fs from 'fs';
const fetch = require("node-fetch");

const HOST = "https://www.lizhi.fm/";

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
            //await this.postBook(book);
        }
        return stories;
    }

    async extractStory(li):Promise<any> {
        let book:any = {};
        let a = li.find('a.audio-list-item');
        book.title = a.attr('title');
        book.album = a.attr('data-radio-name');
        book.author = a.attr('data-user-name');
        return book;
    }

    async loadMusic(story:any): Promise<any> {
        let $ = await this.load(HOST + story.url);
        return story;
    }

    async postBook(book) {
        let result = await fetch(HOST + "/story/create", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                v: '1.2',
                title: book.title,
                author: book.author,
                short:book.short,
                thumb: book.thumb
            })
        });
    }
}

async function call(){
    let nkl = new LizhiListing();
    await nkl.delay(1000);
    let list = await nkl.loadData('http://www.lizhi.fm/982236/p/1.html');
    console.log(list);
}

call();

