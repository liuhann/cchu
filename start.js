"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/6/1.
 */
const Koa = require("koa");
const KoaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const MongodbService_1 = require("./src/db/MongodbService");
const StoryService_1 = require("./src/StoryService");
class Server {
    start() {
        this.initBeans();
        this.initRouting();
    }
    /**
     * 初始化所有使用的服务(一次全部加载)  这部分属于IOC的范畴
     */
    initBeans() {
        this.mongodbService = new MongodbService_1.MongodbService();
        this.mongodbService.init();
        this.storyService = new StoryService_1.StoryService(this.mongodbService);
    }
    /**
     * 提供http服务及router
     */
    initRouting() {
        this.app = new Koa();
        this.router = new KoaRouter();
        this.app.use(bodyParser());
        this.router.get("/hello", (ctx, next) => {
            ctx.body = 'hello';
        });
        this.router.use('/story', this.storyService.router.routes(), this.storyService.router.allowedMethods());
        //注册koa插件
        this.app.use(this.router.routes()).use(this.router.allowedMethods());
        this.app.listen(80);
        console.log('server started at port ' + 80);
    }
}
const server = new Server();
server.start();
