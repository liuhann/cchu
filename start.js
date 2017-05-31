"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/6/1.
 */
var Koa = require("koa");
var KoaRouter = require("koa-router");
var Server = (function () {
    function Server() {
    }
    Server.prototype.start = function () {
        this.app = new Koa();
        this.router = new KoaRouter();
        this.initRouting();
        this.app.use(this.router.routes()).use(this.router.allowedMethods());
        this.app.listen(80);
        console.log('server started at port ' + 80);
    };
    Server.prototype.initRouting = function () {
        this.router.get("/", function (ctx, next) {
            ctx.body = 'hello';
        });
    };
    return Server;
}());
var server = new Server();
server.start();
