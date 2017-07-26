import DangListing from "./DangListing";
import ExtractDangBook from "./ExtractDangBook";
/**
 * Created by han on 2017/7/26.
 */

export default class DangSearch extends DangListing {

    constructor() {
        super();
    }
    async search(book:string) : Promise<any> {
       let books = await this.loadData('http://search.dangdang.com/?key=' + encodeURIComponent(book) + '&act=input');
       if (books.length) {
           return new ExtractDangBook().loadData(books[0].link);
       } else {
           return {}
       }
    }

}

async function go() {
    let ds = new DangSearch();
    let book = await ds.search('小壁虎借尾巴');
    console.log(book);
}

go();

