import * as path from 'path';
import * as fs from 'fs';
import fetch from "node-fetch";


export default class ImageDownloader {

    async downloadAndReplace(imageurls, folder) {
        fs.mkdirSync(path.resolve('./' + folder));

        if (fs.existsSync('download.tmp')) {
            console.log('resume last...');
            try {
                imageurls = JSON.parse(fs.readFileSync('download.tmp', 'utf-8'));
            } catch (err) {
            }
        }

        while(imageurls.length) {
            let url = imageurls.pop();
            console.log('download ' + url);
            let res = await fetch(url);
            var dest = fs.createWriteStream(path.resolve('./' + folder + '/' + url.replace(/.*\//g, '')));
            await res.body.pipe(dest);
            fs.writeFileSync('download.tmp', JSON.stringify(imageurls), 'utf-8');
        }
    }
}
