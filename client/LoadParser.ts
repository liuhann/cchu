import fetch from "node-fetch";
import *　as fs from 'fs';

import * as cheerio from 'cheerio';
import * as FormData from 'form-data';
import formData = require("form-data");

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
    async postStory(book:any, coverPath: string) {
        let resultJSON : any = {};
        if (coverPath && fs.existsSync(coverPath)) {
            try {
                let form = new formData();
                form.append('file', fs.createReadStream(coverPath));
                let uploadResult = await fetch(HOST + "/file/upload", {
                    method: "POST",
                    body: form
                });
                resultJSON = await uploadResult.json();
            } catch (e) {

            }
        }
        // await fetch(HOST+ "/story/create");

        try {
            let result = await fetch(HOST + "/story/create", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: book.title,
                    album: book.album,
                    short: book.short,
                    path: book.album + '/' + book.title + '.mp3',
                    duration: book.duration,
                    cover: resultJSON.id || null
                })
            });
            await result.json();
        } catch (e) {

        }

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