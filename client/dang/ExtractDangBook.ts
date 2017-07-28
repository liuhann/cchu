import LoadParser from "../LoadParser";
import fetch from "node-fetch";

import * as cheerio from 'cheerio';

export default class ExtractDangBook extends LoadParser {

    constructor() {
        super();
    }

    async loadData(url:string): Promise<any> {
        let $ = await this.load(url);
        let book:any = {};
        book.code = url.replace(/.*\//g, '').replace('.html','');
        book.bigPic = $('.big_pic').find('img').attr('src');
        book.slide = [];
        for(let alink of  Array.from($('#main-img-slider').find('li a'))) {
            book.slide.push($(alink).attr('data-imghref').replace('_w_', '_u_'));
        }
        book.categoryId = $('#breadcrumb').find('>a').last().attr('href').replace(/.*\/cp/g, '').replace('.html','');
        let result = await fetch('http://product.dangdang.com/index.php?r=callback%2Fdetail&productId=' + book.code
            + '&templateType=publish&describeMap=&shopId=0&categoryPath=' + book.categoryId);
        let jsonp = await result.json();
        let $a = cheerio.load(jsonp.data.html);

        if ($a('#abstract').length) {
            book.abstract = $a('#abstract').text();
        }
        if ($a('#authorIntroduction').length) {
            book.authorIntro = $a('#authorIntroduction').text();
        }

        if ($a('#catalog').length) {
            book.catlog = $a('#catalog').text();
        }

        if ($a('#content').length) {
            book.content = $a('#content').text();
        }

        if ($a('#attachImage-show').length) {
            book.attachImage = $a('#attachImage-show').find('.pic img').attr('data-original');
        }

        if ($a('#attachImage-textarea').length) {
            let extra = cheerio.load($a('#attachImage-textarea').val());
            book.previewList = [];

            for(let preivew of Array.from(extra('img'))) {
                book.previewList.push(extra(preivew).attr('data-original'));
            }
        }

        let comment = await fetch('http://product.dangdang.com/index.php?r=callback%2Fcomment-list&productId=' + book.code
            + '&categoryPath=' + book.categoryId
            + '&mainProductId=' + book.code + '&mediumId=0&pageIndex=1&sortType=1&filterType=1&isSystem=1&tagId=0&tagFilterCount=0');

        let commenthtml = await comment.json();

        let $c = cheerio.load(commenthtml.data.html);

        book.comments = [];
        $c('.comment_items').each(function(i, elem) {
            let comment: any = {};
            comment.detail = $(elem).find('.describe_detail').text();
            comment.time = $(elem).find('.starline').text();
            book.comments.push(comment);
        });

        return book;
    }
}

async function call(){
    let nkl = new ExtractDangBook();

    let book = await nkl.loadData('http://product.dangdang.com/23708651.html');
    console.log(book,  'book');

}
call();
