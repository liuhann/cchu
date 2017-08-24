import LoadParser from "../LoadParser";


//http://jinjing.duapp.com/task/create?album=小柚子&story=小山羊&taskId=https://www.lizhi.fm/297124/15928136997309190
//http://jinjing.duapp.com/task/pop
//http://jinjing.duapp.com/task/finish?taskId=https://www.lizhi.fm/297124/15928136997309190
//http://jinjing.duapp.com/task/exist?taskId=https://www.lizhi.fm/297124/15928136997309190


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