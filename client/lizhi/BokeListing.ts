import LoadParser from "../LoadParser";
import fetch from "node-fetch";
import LizhiListing from "./LizhiListing";


//http://jinjing.duapp.com/task/create?album=小柚子&story=小山羊&taskId=https://www.lizhi.fm/297124/15928136997309190
//http://jinjing.duapp.com/task/pop
//http://jinjing.duapp.com/task/finish?taskId=https://www.lizhi.fm/297124/15928136997309190
//http://jinjing.duapp.com/task/exist?taskId=https://www.lizhi.fm/297124/15928136997309190


//http://jinjing.duapp.com/lizhi/album/add?id=25681&name=凯叔讲故事&cover=zzz
//http://jinjing.duapp.com/lizhi/album/update?id=1975543

const HOST = "http://jinjing.duapp.com";
const LIZHI_HOST = "https://www.lizhi.fm";

class BokeListing extends  LoadParser {

    nkl: LizhiListing;
    async loadData(url:string): Promise<any> {
        let $ = await this.load(url);
        const lists = $('ul.allRadioList li.radio_list');
        const result = [];
        for(let album of Array.from(lists)) {
            const info:any = {};
            info.id = $(album).find('a.radioCover').attr('href').replace(/[/]/g, '');
            info.name = this.decode($(album).find('.radioName a').html().replace(/[ \n\r]/g, ''));
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
        let albums = await this.loadData(`http://www.lizhi.fm/label/24229978817701040/${i}.html`);
        while(albums.length) {
            for(let album of albums) {
                await this.postAlbum(album);
            }
           i++;
            albums = await this.loadData(`http://www.lizhi.fm/label/24229978817701040/${i}.html`);
        }
    }


    async addTask(story) {
        //http://jinjing.duapp.com/task/create?album=小柚子&story=小山羊&taskId=https://www.lizhi.fm/297124/15928136997309190//

        let result = await fetch(HOST + `/task/create?album=${encodeURIComponent(story.album)}&story=${encodeURIComponent(story.title)}&taskId=${LIZHI_HOST+story.href}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        await result.json();
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
    async execAddAlbumTask() {
        let result = await fetch(HOST + "/lizhi/album/list", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let albums = await result.json();

        albums = albums.result;

        this.nkl = new LizhiListing();

        //iter each album
        for(let album of albums) {
            if (album.u) {
                if (new Date().getTime() - new Date(album.u).getTime()<24*60*60*1000) {
                    continue;
                }
            }
            let page = 1; //start from page 1
            this.delay(1000);
            let list = await this.nkl.loadData(`http://www.lizhi.fm/${album.id}/p/${page}.html`);

            while(list.length) {
                for(let story of list) {
                    story.album = album.name
                    await this.addTask(story);
                }
                page ++;
                this.delay(1000);
                list = await this.nkl.loadData(`http://www.lizhi.fm/${album.id}/p/${page}.html`);
            }
            await this.markAlbumToday(album.id);
        }
    }

    async run() {
        await this.execAddAlbumTask();
    }
}


const bl = new BokeListing();
bl.run();