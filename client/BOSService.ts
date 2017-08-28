
import {BosClient} from 'bce-sdk-js';
const uuidv5 = require('uuid/v5');

const config = {
    //endpoint: 'http://bj.bcebos.com',         //传入Bucket所在区域域名 默认就是bj
    credentials: {
        ak: "i29vPdGTUyjE6HD0xaKsfq6Y",         //您的AccessKey
        sk: "bHAU6NrGLVOD710kHinHMUjeeC4UVoiN"       //您的SecretAccessKey
    }
};

class BOSService {
    client: BosClient;
    constructor() {
        this.client = new BosClient(config);
    }

    async fileExist(bucket: string, path:string):Promise<boolean> {
        try {
            let response = await this.client.listObjects(bucket, {
                prefix: path
            });
            return response.body.contents.length > 0;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async uploadFile(bucket: string, destPath: string, localPath: string, length: number): Promise<any> {
        const id = uuidv5('http://www.yuanbaogushi.com', uuidv5.URL);
        try {
            let put = await this.client.putObjectFromFile(bucket, destPath, localPath, {
                'x-bce-meta-length': length
            });
            return id;
        } catch (err) {
            console.log(err);
            return 'error';
        } finally {

        }
    }

}
export default BOSService;