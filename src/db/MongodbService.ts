/**
 * Created by Administrator on 2017/6/1.
 */

import * as mongodb from "mongodb";
const assert = require("assert");

export class MongodbService {

    db:mongodb.Db;

    init() {
        mongodb.MongoClient.connect('mongodb://localhost:27017/story', (err:Error, db:mongodb.Db) => {
            assert.equal(null, err);
            this.db = db;
            console.log('mongodb connected');
        });
    }

}