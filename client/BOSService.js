"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bce_sdk_js_1 = require("bce-sdk-js");
const uuidv5 = require('uuid/v5');
const config = {
    //endpoint: 'http://bj.bcebos.com',         //传入Bucket所在区域域名 默认就是bj
    credentials: {
        ak: "i29vPdGTUyjE6HD0xaKsfq6Y",
        sk: "bHAU6NrGLVOD710kHinHMUjeeC4UVoiN" //您的SecretAccessKey
    }
};
class BOSService {
    constructor() {
        this.client = new bce_sdk_js_1.BosClient(config);
    }
    fileExist(bucket, path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.client.listObjects(bucket, {
                    prefix: path
                });
                return response.body.contents.length > 0;
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        });
    }
    uploadFile(bucket, destPath, localPath, length) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = uuidv5('http://www.yuanbaogushi.com', uuidv5.URL);
            try {
                let put = yield this.client.putObjectFromFile(bucket, destPath, localPath, {
                    'x-bce-meta-length': length
                });
                return id;
            }
            catch (err) {
                console.log(err);
                return 'error';
            }
            finally {
            }
        });
    }
}
exports.default = BOSService;
