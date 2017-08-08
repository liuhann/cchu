import fetch from "node-fetch";
import *　as fs from 'fs';

import * as cheerio from 'cheerio';
import * as FormData from 'form-data';

declare function unescape(encodedURIComponent: string): string;

const HOST = "http://jinjing.duapp.com";

abstract class LoadParser {

    static parsers = new Map<string,LoadParser>();

    constructor() {
    }

    static addParser(parser: LoadParser, type:string) {
        LoadParser.parsers.set(type, parser);
    }

    async checkLoad(url:string, type:string) {
        const parser = LoadParser.parsers.get(type);
        if (parser) {
            let result = await parser.loadData(url);
            return result;
        } else {
            return {};
        }
    }

    decode(src: string) : string {
        if (src) {
            return unescape(src.replace(/&#x/g,'%u').replace(/;/g,'').replace(/&quot/g,'"').replace(/%uB7/g,'·'));
        } else {
            return '';
        }
    }

    async postCover(localFile:string):Promise<string> {
        let formData = new FormData();
        formData.append('file', fs.createReadStream(localFile));
        let fetching = await fetch(HOST + "/file/upload", {
            method: "POST",
            body: formData
        });
        let result = await fetching.json();
        return result.id;
    }

    // create story
    async postStory(book:any) {
        let fetching = await fetch(HOST + "/story/create", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                v: '1.1',
                cover: book.cover,
                title: book.title,
                st: book.subtitle,
                author: book.author,
                short:book.detail,
                link: book.link,
                thumb: book.thumb
            })
        });
        return await fetching.json();
    }

    async downloadFile(remoteUrl: string, localFolder: string, fileName?:string): Promise<any> {
        let pr = new Promise(function(resolve, reject) {
            console.log(`downloading ${remoteUrl}`);
            fetch(remoteUrl).then(function(res:any) {
                let dest = fs.createWriteStream(localFolder + '/' + fileName);
                res.body.on('end', ()=> {
                    console.log('downloaded');
                    resolve();
                });
                res.body.pipe(dest);
            });
        });
        return pr;
    }

    async delay(sec:number):Promise<any> {
        return new Promise(function(resolve, reject) {
            setTimeout(()=> {
                resolve();
            }, sec);
        });
    }

    async load(url: string):Promise<CheerioSelector> {
        let result = await fetch(url);
        let text = await result.text();
        let $ = cheerio.load(text);

        console.log(url + '  loaded');
        return $;
    }

    abstract async loadData(url:string): Promise<any>;
}

export default LoadParser;