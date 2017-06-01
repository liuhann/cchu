"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const KoaRouter = require("koa-router");
class StoryService {
    constructor(mongodb) {
        this.mongodb = mongodb;
        this.router = new KoaRouter();
        this.initRouting();
    }
    initRouting() {
        this.router.post('/create', this.addStory.bind(this));
    }
    addStory(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.mongodb.db.collection("stories").insertOne(ctx.request.body);
            console.log(result);
        });
    }
}
exports.StoryService = StoryService;
