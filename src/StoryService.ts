/**
 * Created by Administrator on 2017/6/1.
 */
import {MongodbService} from "./db/MongodbService";
import * as KoaRouter from "koa-router";
import * as Koa from "koa";

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
    }

    async addStory(ctx:Koa.Context, next: any) {
        let result = await this.mongodb.db.collection("stories").insertOne(ctx.request.body);
        console.log(result);
    }

}