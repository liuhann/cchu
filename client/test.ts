/**
 * Created by Administrator on 2017/6/2.
 */

const ID3 = require("id3-parser");

const mm = require("musicmetadata");

import * as fs from "fs";
import * as URL from "url";


// create a new parser from a node ReadStream
var parser = mm(fs.createReadStream('f:/b.mp3'), {
    duration: true
}, function (err:Error, metadata:any) {
    if (err) throw err;
    console.log(metadata);
});




