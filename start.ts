/**
 * Created by Administrator on 2017/6/1.
 */
import * as Koa from "koa";

import * as KoaRouter from "koa-router";



class Server {

    app: Koa;
    router: KoaRouter;

    start() {
        this.app = new Koa();
        this.router = new KoaRouter();
        this.initRouting();
        this.app.use(this.router.routes()).use(this.router.allowedMethods());
        this.app.listen(80);
        console.log('server started at port ' + 80);
    }

    initRouting() {
        this.router.get("/", (ctx: KoaRouter.IRouterContext, next: any) => {
            ctx.body = 'hello';
        });
    }
}



const server = new Server();
server.start();

