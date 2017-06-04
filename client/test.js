"use strict";
/**
 * Created by Administrator on 2017/6/2.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ID3 = require("id3-parser");
const mm = require("musicmetadata");
const fs = require("fs");
// create a new parser from a node ReadStream
var parser = mm(fs.createReadStream('f:/b.mp3'), {
    duration: true
}, function (err, metadata) {
    if (err)
        throw err;
    console.log(metadata);
});
