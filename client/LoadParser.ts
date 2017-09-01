import fetch from "node-fetch";
import *　as fs from 'fs';

import * as cheerio from 'cheerio';
import * as FormData from 'form-data';
import formData = require("form-data");

const download = require('download');


declare function unescape(encodedURIComponent: string): string;

const HOST = "http://jinjing.duapp.com";

abstract class LoadParser {

    static parsers = new Map<string,LoadParser>();

    constructor() {

    }


    getOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

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

    replaceName(name:string): string {
        return name.replace(/[\/:*?"<>|]/g, '');
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

    async updateStory(story: any):Promise<any> {
        let fetching = await fetch(`${HOST}/story/properties/update?story=${story._id}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(story)
        });
        if (fetching.status === 200) {
            return await fetching.json();
        } else {
            throw new Error('update failed');
        }
    }

    async createStory(story:any):Promise<any> {
        try {
            let result = await fetch(HOST + "/story/create",{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: story.title,
                    album: story.album,
                    short: story.short,
                    path: story.album + '/' + story.title + '.mp3',
                    duration: story.duration,
                    cover: story.cover
                })
            });
            return await result.json();
        } catch (e) {
            throw new Error('create failed');
        }
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

    async postAlbum(album) {
        try {
            console.log('+album', album.id, album.name);
            let result = await fetch(HOST + `/lizhi/album/add?id=${album.id}&name=${encodeURIComponent(album.name)}&cover=${album.cover}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const json = await result.json();
            return json;
        } catch (e) {
            return this.postAlbum(album);
        }
    }

    async downloadFile(remoteUrl: string, localFolder: string, fileName?:string): Promise<any> {
        if (!remoteUrl) return null;

        await download(remoteUrl, localFolder, {
            filename: fileName
        });

/*
        let pr = new Promise(function(resolve, reject) {
            console.log(`downloading ${remoteUrl}`);
            fetch(remoteUrl).then(function(res:any) {
                try {
                    let dest = fs.createWriteStream(localFolder + '/' + fileName);
                    res.body.on('end', ()=> {
                        resolve('downloaded');
                    });
                    res.body.on('error', (err)=> {
                       reject(err);
                    });
                    res.body.pipe(dest);
                } catch (err) {
                    reject(err);
                }
            });
        });
*/
        return ;
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

    async loadData(url:string): Promise<any> {

    }
}

export default LoadParser;