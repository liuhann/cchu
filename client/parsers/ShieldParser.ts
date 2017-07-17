
import LoadParser from "../LoadParser";

export default class ShieldParser extends LoadParser {

    async loadData(url:string): Promise<any> {
        let $ = await this.load(url);
        let result:any = {};
        result.fullImg = 'http://www.spyrius.org' + $('center').first().find('img').attr('src');
        result.power = [];

        for(let img of Array.from($('.row').last().find('.row-content').eq(1).find('img'))) {
            result.power.push($(img).attr('src'));
        }
        return result;
    }

}
