/**
 * Created by Administrator on 2017/6/1.
 */

import * as mongodb from "mongodb";
const assert = require("assert");


var db_name = 'jlFXhWgDafRpUOifnWLj'; //数据库名称
var db_host = 'mongo.duapp.com'; //数据库地址
var db_port = 8908; // 数据库端口
var username = 'i29vPdGTUyjE6HD0xaKsfq6Y'; //用户AK
var password = 'bHAU6NrGLVOD710kHinHMUjeeC4UVoiN'; //用户SK


export class MongodbService {

    db:mongodb.Db;

    init() {
        this.db = new mongodb.Db(db_name, new mongodb.Server(db_host,db_port,{}), {
            w: 1
        });

        this.db.open((err:any, db:mongodb.Db)=> {
            db.authenticate(username, password, (err, result)=> {
                if (err) {
                    db.close();
                }
                console.log('db opened');
            });
        });

       /* mongodb.MongoClient.connect('mongodb://localhost:27017/story', (err:Error, db:mongodb.Db) => {
            assert.equal(null, err);
            this.db = db;
            console.log('mongodb connected');
        });*/
    }

}