/**
 * Created by Administrator on 2017/6/1.
 */
import {MongodbService} from "./db/MongodbService";
import * as KoaRouter from "koa-router";
import * as Koa from "koa";

import * as mongodb from "mongodb";
import * as fs from "fs";

interface Story {

}

export class StoryService {

    router: KoaRouter;
    mongodb: MongodbService;

    constructor(mongodb:MongodbService) {
        this.mongodb = mongodb;
        this.router = new KoaRouter();
        this.initRouting();
    }

    initRouting() {
        this.router.post('/create', this.addStory.bind(this));
        this.router.post('/upload', this.uploadMp3.bind(this));
        this.router.get('/list', this.list.bind(this));
    }

    async uploadMp3(ctx:Koa.Context, next: any) {
         let gridfs = new mongodb.GridFSBucket(this.mongodb.db);

         let bb = gridfs.openUploadStream("test");
         ctx.req.pipe(bb);
         ctx.body = {
             'piped': 'ok'
         }
    }


    async addStory(ctx:Koa.Context, next: any) {
        let result = await this.mongodb.db.collection("stories").insertOne(ctx.request.body);
        ctx.body = {
            "insertedId": result.insertedId
        }
    }

    async list(ctx:Koa.Context, next:any) {
        let cursor = await this.mongodb.db.collection('stories').find({});

        ctx.body = await cursor.toArray();

    }

}