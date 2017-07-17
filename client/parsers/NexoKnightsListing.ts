import LoadParser from "../LoadParser";
import ShieldParser from "./ShieldParser";
import *　as fs from 'fs';

class NexoKnightsListing extends LoadParser {

    async loadData(url:string): Promise<any> {

        let $ = await this.load(url);
        let heros = [];

        for (let elem of Array.from($('.table-responsive').first().find('tr'))) {
            let shields = [];

            for (let [i, a] of Array.from($(elem).find('a')).entries()) {
                let shield:any = {};
                shield.href = 'http://www.spyrius.org' + $(a).attr('href');
                shield.src = 'http://www.spyrius.org' + $(a).find('img').attr('src');
                shield.title = $(a).find('img').attr('title');
                let checkLoaded = await this.checkLoad(shield.href, 'lego-shield');
                Object.assign(shield, checkLoaded);
                shields.push(shield);
            }
            heros.push(shields);
        }
        return heros;
    }
}

async function call(){
    LoadParser.addParser(new ShieldParser(), 'lego-shield');
    let nkl = new NexoKnightsListing();
    let data = await nkl.loadData('http://www.spyrius.org/nexo/');

    fs.writeFile('nexo-shields.json', JSON.stringify(data), 'utf8', function() {
        console.log('ok');
    });
}

call();





