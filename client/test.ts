/**
 * Created by Administrator on 2017/6/2.
 */

const ID3 = require("id3-parser");

import * as fs from "fs";
import * as URL from "url";

ID3.parse(fs.readFileSync('f:/a.mp3')).then((tag:any) => {
    console.log(tag);
})