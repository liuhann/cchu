import LoadParser from "../LoadParser";
import * as cheerio from 'cheerio';
import *　as fs from 'fs';
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
    /*
    '1606128': {
        album: '酷爸辣妈睡前故事',
        dup_break: false // 相同的是否break
    },
    '1941087': {
        album: '金色童年睡前故事',
        dup_break: false // 相同的是否break
    },
    '1428502': {
        album: 'Lisa姐姐讲故事',
        dup_break: false // 相同的是否break
    },
    '60670': {
        album: '毛毛阿姨的故事屋',
        dup_break: false // 相同的是否break
    },
    '297124': {
        album: '小雪老师讲故事',
        dup_break: false // 相同的是否break
    },
    '1701698': {
        album: '小鱼姐姐讲故事',
        dup_break: false // 相同的是否break
    },
    '952009': {
        album: '绘本故事台',
        dup_break: false // 相同的是否break
    },
    '2500609': {
        album: '小喇叭绘本故事',
        dup_break: false // 相同的是否break
    },
    '1769784': {
        album: '芒果妈妈睡前故事',
        dup_break: false // 相同的是否break
    },
    '30562': {
        album: '儿童睡前精选故事',
        dup_break: false // 相同的是否break
    },
    '1851723': {
        album: '康乾妈妈讲故事',
        dup_break: false // 相同的是否break
    },
    '1331076': {
        album: 'Aaron声动屋',
        dup_break: false // 相同的是否break
    },
    '26750': {
        album: '小迪阿姨讲故事',
        dup_break: false // 相同的是否break
    },
    '1214491': {
        album: '熊猫太后摆故事',
        dup_break: false // 相同的是否break
    },
    '94571': {
        album: 'lovestory宝宝爱故事',
        dup_break: false // 相同的是否break
    },
    '1037047': {
        album: '麻糖小课',
        dup_break: false // 相同的是否break
    },
    '144869': {
        album: '中国的神话传说故事',
        dup_break: false // 相同的是否break
    },
    '237706': {
        album: '安东尼故事宝盒',
        dup_break: false // 相同的是否break
    },
    '1753557': {
        album: '甜甜老师的声音故事',
        dup_break: false // 相同的是否break
    },
    '351125': {
        album: '飞鸟鱼儿童英语电台',
        dup_break: false // 相同的是否break
    },
    '1887348': {
        album: '小马宝莉友谊故事',
        dup_break: false // 相同的是否break
    },
    '1250108': {
        album: '乔之声—樱桃乐活英语',
        dup_break: false // 相同的是否break
    },
    '291834': {
        album: '添添妈妈讲故事',
        dup_break: false // 相同的是否break
    },
    '120315': {
        album: '小彤讲故事',
        dup_break: false // 相同的是否break
    },
    '1436075': {
        album: '达达叔叔的童话小镇',
        dup_break: false // 相同的是否break
    },
    '728680': {
        album: '恐龙叔叔讲故事',
        dup_break: false // 相同的是否break
    },*/
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
                try {
                    story.album = albumInfo.album;
                    if (fs.existsSync(`${FILE_ROOT}/${story.album}/${story.title}.mp3`)) {
                        if(albumInfo.dup_break) {
                            dup_breaked = true;
                            break;
                        } else {
                            continue;
                        }
                    }
                    await nkl.delay(2000 + Math.random()*1000);
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
                } catch (e) {
                    console.log(`story failed`);
                }
            }
            if (dup_breaked) break;
            itor ++;
            list = await nkl.loadData(`${LIZHI_HOST}/${albumId}/p/${itor}.html`);
        }
    }
}

run();

