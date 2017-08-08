import LoadParser from "../LoadParser";
import * as cheerio from 'cheerio';
import *　as fs from 'fs';
const fetch = require("node-fetch");

export default class WXStoryContent extends LoadParser {
    constructor() {
        super();
    }
    async loadData(url:string): Promise<any> {
        let $ = await this.load(url);

        let st:any = {}

        st.title = $('h2.rich_media_title').html();
        st.account = $('.rich_media_meta_nickname').html();
        let mp3Id = $('mpvoice').attr('voice_encode_fileid');
        let mp3Title = $('mpvoice').attr('name');

        fetch('https://res.wx.qq.com/voice/getvoice?mediaid=' + mp3Id).then(function(res) {
            var dest = fs.createWriteStream('./' + mp3Title + '.mp3');
            res.body.pipe(dest);
        });

        return st;
    }
}

async function call(){
    let wxs = new WXStoryContent();
    let x = await wxs.loadData('https://mp.weixin.qq.com/s?__biz=MzA5NTU0MTMzOQ==&mid=2652372170&idx=6&sn=cce35ad1a0353ff3a12aba460ab0778e&chksm=8b5e9dfebc2914e81a015d9cf8118c8f4dbcee4a2112f212f1bf74536587f57b08af7cd09ce1&scene=21#wechat_redirect');
    console.log(x);
}

call();

