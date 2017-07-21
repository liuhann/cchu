/**
 * Created by Administrator on 2017/6/1.
 */

import * as mongodb from "mongodb";
import {MongodbService} from "./MongodbService";

const assert = require("assert");

export class LocalMongodbService implements MongodbService {

    db:mongodb.Db;
    logdb: mongodb.Db;
    contentdb: mongodb.Db;

    init() {
        mongodb.MongoClient.connect('mongodb://localhost:27017/story', (err:Error, db:mongodb.Db) => {
            assert.equal(null, err);
            this.db = db;
            this.contentdb = db;
            this.logdb = db;
            console.log('mongodb connected');
        });
    }
}