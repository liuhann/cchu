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
const fetch = require("node-fetch");
const HOST = "http://jinjing.duapp.com";
class DangListing extends LoadParser_1.default {
    constructor() {
        super();
        //this.mongodb = new LocalMongodbService();
        //this.mongodb.init();
    }
    loadData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let $ = yield this.load(url);
            let books = [];
            for (let li of Array.from($('.bigimg').find('li'))) {
                let book = yield this.extraBook($(li));
                books.push(book);
                //await this.postBook(book);
            }
            return books;
        });
    }
    extraBook(li) {
        return __awaiter(this, void 0, void 0, function* () {
            let book = {};
            book.title = li.find('a.pic').attr('title');
            book.thumb = li.find('a.pic img').attr('data-original') || li.find('a.pic img').attr('src');
            book.subtitle = this.decode(li.find('p.name a').html());
            book.link = li.find('p.name a').attr('href');
            book.detail = this.decode(li.find('p.detail').html());
            book.author = this.decode(li.find('.search_book_author').find('a').html());
            /*await this.mongodb.db.collection('dangbooks').updateOne({
                 link: book.link
             }, book, {
                 upsert: true
             });*/
            return book;
        });
    }
    postBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield fetch(HOST + "/story/create", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    v: '1.1',
                    title: book.title,
                    st: book.subtitle,
                    author: book.author,
                    short: book.detail,
                    link: book.link,
                    thumb: book.thumb
                })
            });
        });
    }
    postBooks(books) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = [];
            for (var i = 0; i < books.length; i++) {
                let book = books[i];
                list.push({
                    v: '1.1',
                    title: book.title,
                    st: book.subtitle,
                    author: book.author,
                    short: book.detail,
                    link: book.link,
                    thumb: book.thumb
                });
            }
            let result = yield fetch(HOST + "/story/batch/add", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'stories': list
                })
            });
            return result;
        });
    }
}
exports.default = DangListing;
function call() {
    return __awaiter(this, void 0, void 0, function* () {
        let nkl = new DangListing();
        /*
           let result = nkl.postBook({
                "title" : " 海豚绘本花园：海盗兔子小亨利 ",
                "thumb" : "images/model/guan/url_none.png",
            "subtitle" : " 海豚绘本花园：海盗兔子小亨利  翻译大师任溶溶老先生倾情翻译，用幽默逗趣的故事传达热爱阅读和独立自信的积极理念。（海豚传媒出品） ",
                "link" : "http://product.dangdang.com/20660001xxx.html",
                "detail" : " \t\"★翻译大家任溶溶老先生精彩呈现，朗朗上口的语言，幽默逗趣的故事，用轻松的方式让孩子爱上阅读。\t★这是一个关于热爱读书和自信独立的故事\t★大胆的想象力、充满冒险情怀的故事，激发孩子心底的萌动和热情\"\t ",
                "author" : "卡罗琳·克里米"
        });
        console.log(JSON.stringify(result));*/
        yield nkl.delay(3000);
        for (var i = 1; i <= 42; i++) {
            let books = yield nkl.loadData('http://search.dangdang.com/?key=%BF%AD%B5%CF%BF%CB&act=input&page_index=' + i);
            let batchResults = yield nkl.postBooks(books);
            console.log('batch uploaded');
            yield nkl.delay(2000 + Math.random() * 1000);
        }
    });
}
//call();
