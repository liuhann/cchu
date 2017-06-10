import * as fs from "fs";
const fetch = require("node-fetch");
import formData = require("form-data");

const MusicMeta = require("musicmetadata");

// const ROOT = "F:/KwDownload/song/";
const ROOT = "G:/讲故事";
const HOST = "http://jinjing.duapp.com";
const isUPload = false;
// const HOST = "http://127.0.0.1:18080";

async function go(dir:string) {
    let result = fs.readdirSync(dir);

    for(let file of result) {
        let fileFullPath = dir + "/" + file;
        let fd = fs.openSync(fileFullPath, "r+");
        let fileStat = fs.fstatSync(fd);

        if (fileStat.isFile()) {
            if (file.endsWith(".mp3")) {
                try {
                    let musicMeta = await readFileMeta(fileFullPath);
                    let form = new formData();
                    form.append('file', fs.createReadStream(fileFullPath));
                    form.append('path', fileFullPath.substr(ROOT.length));

                    let resultJSON : any;
                    if (isUPload) {
                        let uploadResult = await fetch(HOST + "/story/upload", {
                            method: "POST",
                            body: form
                        });
                        resultJSON = await uploadResult.json();
                        console.log(resultJSON);
                    }
                    // await fetch(HOST+ "/story/create");
                    let result = await fetch(HOST + "/story/create", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: musicMeta.title,
                            album: musicMeta.album,
                            artist: musicMeta.artist,
                            path: fileFullPath.substr(ROOT.length),
                            duration: musicMeta.duration,
                            fileId: isUPload ? resultJSON.id : null
                        })
                    });
                    console.log('import file ', fileFullPath, ', result ' + result);

                    await new Promise(function(resolve, reject) {
                        setTimeout(()=>{
                            resolve();
                        }, 200)
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        } else if (fileStat.isDirectory()) {
            go(fileFullPath);
        }
    }
}

async function readFileMeta(filePath:string):Promise<MM.Metadata> {
    return new Promise<MM.Metadata>((resolve, reject) => {
        let readStream = fs.createReadStream(filePath);
        MusicMeta(readStream, {
            duration: true
        }, function (err:Error, metadata:MM.Metadata) {
            readStream.close();
            if (err) {
                console.log(filePath,  ' error');
                reject();
            }
            resolve(metadata);
        });
    });
}

go(ROOT + "/飞飞姐姐说故事-童话故事集") ;
// go(ROOT);
