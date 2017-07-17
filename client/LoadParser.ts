import fetch from "node-fetch";

import * as cheerio from 'cheerio';


abstract class LoadParser {

    static parsers = new Map<string,LoadParser>();

    constructor() {
    }

    static addParser(parser: LoadParser, type:string) {
        LoadParser.parsers.set(type, parser);
    }

    async checkLoad(url:string, type:string) {
        const parser = LoadParser.parsers.get(type);
        if (parser) {
            let result = await parser.loadData(url);
            return result;
        } else {
            return {};
        }
    }

    async load(url: string):Promise<CheerioSelector> {
        let result = await fetch(url);
        let text = await result.text();
        let $ = cheerio.load(text);

        console.log(url + '  loaded');
        return $;
    }

    abstract async loadData(url:string): Promise<any>;
}

export default LoadParser;