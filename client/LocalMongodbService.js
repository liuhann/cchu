"use strict";
/**
 * Created by Administrator on 2017/6/1.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const assert = require("assert");
class LocalMongodbService {
    init() {
        mongodb.MongoClient.connect('mongodb://localhost:27017/story', (err, db) => {
            assert.equal(null, err);
            this.db = db;
            this.contentdb = db;
            this.logdb = db;
            console.log('mongodb connected');
        });
    }
}
exports.LocalMongodbService = LocalMongodbService;
