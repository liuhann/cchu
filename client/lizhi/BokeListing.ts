import LoadParser from "../LoadParser";
import fetch from "node-fetch";
import LizhiListing from "./LizhiListing";

//http://jinjing.duapp.com/task/create?album=小柚子&story=小山羊&taskId=https://www.lizhi.fm/297124/15928136997309190
//http://jinjing.duapp.com/task/pop
//http://jinjing.duapp.com/task/finish?taskId=https://www.lizhi.fm/297124/15928136997309190
//http://jinjing.duapp.com/task/exist?taskId=https://www.lizhi.fm/297124/15928136997309190

//http://jinjing.duapp.com/lizhi/album/add?id=25681&name=凯叔讲故事&cover=zzz
//http://jinjing.duapp.com/lizhi/album/update?id=1975543

const HOST = "https://jinjing.duapp.com";
const LIZHI_HOST = "https://www.lizhi.fm";
const FILE_ROOT = 'E:/lizhi';


class BokeListing extends LoadParser {

    nkl: LizhiListing;

    lastPage: number;

    async loadData(url:string): Promise<any> {
        let $ = await this.load(url);
        const lists = $('ul.allRadioList li.radio_list');
        const result = [];
        for(let album of Array.from(lists)) {
            const info:any = {};
            info.id = $(album).find('a.radioCover').attr('href').replace(/[/]/g, '');
            info.name = this.replaceName(this.decode($(album).find('.radioName a').html().replace(/[ \n\r]/g, '')));
            info.cover = $(album).find('img').first().attr('data-echo').replace(/_[0-9]{3}x[0-9]{3}/g, '');
            result.push(info);
        }
        return result;
    }

    /**
     * Sync lizhi albums by label to yb
     * this would overwrite existing album info such as update time
     * @returns {Promise<void>}
     */
    async execFetchAlbum() {
        let i = 1;
        let albums = await this.loadData(`http://www.lizhi.fm/label/24229975059604400/${i}.html`);
        while(albums.length) {
            for(let album of albums) {
                await this.delay(1000);
                await this.postAlbum(album);
            }
            i++;
            albums = await this.loadData(`http://www.lizhi.fm/label/24229975059604400/${i}.html`);
        }
    }

    async addTask(story):Promise<any> {
        //http://jinjing.duapp.com/task/create?album=小柚子&story=小山羊&taskId=https://www.lizhi.fm/297124/15928136997309190//
        try {
            let result = await fetch(HOST + `/task/create?album=${encodeURIComponent(story.album)}&story=${encodeURIComponent(story.title)}&taskId=${LIZHI_HOST+story.href}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            return await result.json();
        } catch (err) {
            return await this.addTask(story);
        }
    }

    async markAlbumToday(id) {
        let result = await fetch(HOST + `/lizhi/album/update?id=${id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        await result.json();
    }

    /**
     * Iter each album and add story to task queue
     * when album itered, mark update time as today
     * @returns {Promise<void>}
     */

    // http://jinjing.duapp.com/lizhi/album/pop
    async execAddAlbumTask() {
        //1 pop a album
        let result = await fetch(HOST + "/lizhi/album/pop", this.getOptions);
        const albums = await result.json();
        const album = albums.result;

        if (album == null) {
            return false;
        }
        console.log('album:' + album.name);
        this.nkl = new LizhiListing();
        //need check?
        if (album.u) {
            if (new Date().getTime() - new Date(album.u).getTime()<24*60*60*1000) {
                return true;
            }
        }

        let page = album.last || this.lastPage || 1; //start from page 1
        await this.delay(1000);
        let list = await this.nkl.loadData(`http://www.lizhi.fm/${album.id}/p/${page}.html`);

        let storyInc = 0;
        while(list.length) {
            for(let story of list) {
                story.album = album.name;
                await this.delay(200);
                const inserted = await this.addTask(story);
                console.log('+task ' + story.title);
                storyInc ++;
                if (inserted.result === 'existed' && album.u) {
                    await this.markAlbumToday(album.id);
                    console.log('+existed & task completed total: ' + storyInc);
                    return true;
                }
            }
            page ++;
            this.lastPage = page;
            this.delay(1000);
            list = await this.nkl.loadData(`http://www.lizhi.fm/${album.id}/p/${page}.html`);
        }
        //at last  mark album today
        await this.markAlbumToday(album.id);
        console.log('task completed. total : ' + storyInc);
        this.lastPage = 1;
        return true;
    }

    async removeUnusedAlbum() {
        let ft = await fetch(HOST + "/lizhi/album/list", this.getOptions);
        const result = await ft.json();
        const albumList = result.result;

        for(let album of albumList) {
            let fetching = await fetch(HOST + "/task/list/" + encodeURIComponent(album.name), this.getOptions);
            const result = await fetching.json();
            if (result.result.length===0) {
                await fetch(HOST + '/lizhi/album/remove?name=' + encodeURIComponent(album.name), this.getOptions);
                console.log(`album: ${album.name} ------------XXX removed`);
            } else {
                console.log(`album: ${album.name} not empty`);
            }
        }
    }

    async run() {
        //await this.execFetchAlbum();
        while (true) {
            try {
                this.lastPage = 1;
                await this.delay(1000);
                let exe =  await this.execAddAlbumTask();
                if (!exe) break;
            } catch (e) {
                console.log(e);
            }
        }
    }
}

const bl = new BokeListing();
bl.removeUnusedAlbum();