import LoadParser from "../LoadParser";

class BokeListing extends  LoadParser {

    async loadData(url:string): Promise<any> {
        let $ = await this.load(url);
        const lists = $('ul.allRadioList li.radio_list');

        const result = [];
        for(let album in lists) {
            const info:any = {};
            info.id = $(album).find('.radioCover').attr('href').replace(/[/]/g, '');
            info.name = $(album).find('.radioName a').html().replace(/[ \n\r]/g, '');
        }

        return result;
    }

}