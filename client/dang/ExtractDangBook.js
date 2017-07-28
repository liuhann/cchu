"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoadParser_1 = require("../LoadParser");
const node_fetch_1 = require("node-fetch");
const cheerio = require("cheerio");
class ExtractDangBook extends LoadParser_1.default {
    constructor() {
        super();
    }
    loadData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let $ = yield this.load(url);
            let book = {};
            book.code = url.replace(/.*\//g, '').replace('.html', '');
            book.bigPic = $('.big_pic').find('img').attr('src');
            book.slide = [];
            for (let alink of Array.from($('#main-img-slider').find('li a'))) {
                book.slide.push($(alink).attr('data-imghref').replace('_w_', '_u_'));
            }
            book.categoryId = $('#breadcrumb').find('>a').last().attr('href').replace(/.*\/cp/g, '').replace('.html', '');
            let result = yield node_fetch_1.default('http://product.dangdang.com/index.php?r=callback%2Fdetail&productId=' + book.code
                + '&templateType=publish&describeMap=&shopId=0&categoryPath=' + book.categoryId);
            let jsonp = yield result.json();
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
                for (let preivew of Array.from(extra('img'))) {
                    book.previewList.push(extra(preivew).attr('data-original'));
                }
            }
            let comment = yield node_fetch_1.default('http://product.dangdang.com/index.php?r=callback%2Fcomment-list&productId=' + book.code
                + '&categoryPath=' + book.categoryId
                + '&mainProductId=' + book.code + '&mediumId=0&pageIndex=1&sortType=1&filterType=1&isSystem=1&tagId=0&tagFilterCount=0');
            let commenthtml = yield comment.json();
            let $c = cheerio.load(commenthtml.data.html);
            book.comments = [];
            $c('.comment_items').each(function (i, elem) {
                let comment = {};
                comment.detail = $(elem).find('.describe_detail').text();
                comment.time = $(elem).find('.starline').text();
                book.comments.push(comment);
            });
            return book;
        });
    }
}
exports.default = ExtractDangBook;
function call() {
    return __awaiter(this, void 0, void 0, function* () {
        let nkl = new ExtractDangBook();
        let book = yield nkl.loadData('http://product.dangdang.com/23708651.html');
        console.log(book, 'book');
    });
}
call();
