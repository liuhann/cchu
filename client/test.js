"use strict";
/**
 * Created by Administrator on 2017/6/2.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ID3 = require("id3-parser");
const fs = require("fs");
ID3.parse(fs.readFileSync('f:/a.mp3')).then((tag) => {
    console.log(tag);
});
