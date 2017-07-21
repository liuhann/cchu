import * as mongodb from "mongodb";


export interface MongodbService {
    db: mongodb.Db;
    logdb: mongodb.Db;
    contentdb: mongodb.Db;
    init():void;
}