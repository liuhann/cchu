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
const node_fetch_1 = require("node-fetch");
const fs = require("fs");
const uuidv4 = require('uuid/v4');
const HOST = "http://jinjing.duapp.com";
const LIZHI_HOST = "https://www.lizhi.fm";
const LoadParser_1 = require("../LoadParser");
const BOSService_1 = require("../BOSService");
const FILE_ROOT = 'F:/lizhi';
const getOptions = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};
class ExecTask extends LoadParser_1.default {
    constructor() {
        super();
        this.bos = new BOSService_1.default();
    }
    //1 pop task
    popTask() {
        return __awaiter(this, void 0, void 0, function* () {
            const fetching = yield node_fetch_1.default(`${HOST}/task/pop`, getOptions);
            const task = yield fetching.json();
            return task.result;
        });
    }
    //http://jinjing.duapp.com/story/one?album=xxx&title=xxxxx
    fetchStoryInfo(album, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetching = yield node_fetch_1.default(`${HOST}/story/one?album=${encodeURIComponent(album)}&title=${encodeURIComponent(title)}`, getOptions);
            if (fetching.status != 200) {
                return null;
            }
            const task = yield fetching.json();
            return task;
        });
    }
    //http://jinjing.duapp.com/task/finish?taskId=https://www.lizhi.fm/297124/15928136997309190
    finishTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetching = yield node_fetch_1.default(`${HOST}/task/finish?taskId=${taskId}`, getOptions);
            const task = yield fetching.json();
            return task;
        });
    }
    removeTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetching = yield node_fetch_1.default(`${HOST}/task/remove?taskId=${taskId}`, getOptions);
            yield fetching.json();
        });
    }
    getDetailByTaskId(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            let $ = yield this.load(`${taskId}`);
            const detail = {};
            const divPlayData = $('.js-play-data');
            if (divPlayData.length === 0) {
                detail.notfound = true;
                return detail;
            }
            detail.cover = $('.audioCover img').attr('src').replace(/_320x320/g, '');
            detail.short = this.decode($('.desText').html());
            detail.albumCover = divPlayData.attr('data-cover');
            detail.duration = divPlayData.attr('data-duration');
            detail.title = divPlayData.attr('data-title');
            detail.author = divPlayData.attr('data-user-name');
            detail.mp3 = divPlayData.attr('data-url');
            //story.cover = a.attr('data-cover');
            return detail;
        });
    }
    runTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            task.story = this.replaceName(task.story);
            //1 pop task
            console.log('task', task.album, task.story);
            //2 fetch detail from lizhi
            const storyDetail = yield this.getDetailByTaskId(task.taskId);
            if (storyDetail.cover === storyDetail.albumCover) {
                console.log(' no cover  ignored');
                this.removeTask(task.taskId);
                return false;
            }
            //3 check local exists and download mp3 and cover
            //3.1 make local album dir
            if (!fs.existsSync(FILE_ROOT + '/' + task.album)) {
                fs.mkdirSync(FILE_ROOT + '/' + task.album);
            }
            //3.2 check or download mp3
            if (!fs.existsSync(`${FILE_ROOT}/${task.album}/${task.story}.mp3`)) {
                let musicFile = yield this.downloadFile(storyDetail.mp3, `${FILE_ROOT}/${task.album}`, task.story + '.mp3');
            }
            //3.3 check or download image
            if (!fs.existsSync(`${FILE_ROOT}/${task.album}/${task.story}.png`)) {
                let musicFile = yield this.downloadFile(storyDetail.cover, `${FILE_ROOT}/${task.album}`, task.story + '.png');
            }
            //4 fetch yb story info
            const storyInfo = yield this.fetchStoryInfo(task.album, task.story);
            //4.1 check or upload mp3
            const bosMp3Path = `${task.album}/${task.story}.mp3`;
            const mp3exist = yield this.bos.fileExist('chuchu', bosMp3Path);
            if (!mp3exist) {
                yield this.bos.uploadFile('chuchu', bosMp3Path, `${FILE_ROOT}/${task.album}/${task.story}.mp3`, storyDetail.duration);
            }
            console.log('bosMp3Path: ', bosMp3Path);
            //4.2 check or upload image
            let bosCoverPath = (storyInfo && storyInfo.cover) || null;
            if (!bosCoverPath) {
                bosCoverPath = uuidv4();
                yield this.bos.uploadFile('imagek', bosCoverPath + '.png', `${FILE_ROOT}/${task.album}/${task.story}.png`, 0);
            }
            console.log('bosCoverPath: ', bosCoverPath);
            //5 upload/update story
            if (storyInfo) {
                //5.1 update
                storyInfo.path = bosMp3Path;
                storyInfo.cover = bosCoverPath;
                yield this.updateStory(storyInfo);
                console.log('story updated');
            }
            else {
                yield this.createStory({
                    title: task.story,
                    album: task.album,
                    short: storyDetail.short,
                    path: bosMp3Path,
                    duration: storyDetail.duration,
                    cover: bosCoverPath
                });
                console.log('story created');
            }
            //6 mark task as finished
            return yield this.finishTask(task.taskId);
        });
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                let r;
                try {
                    let task = yield this.popTask();
                    r = yield et.runTask(task);
                    console.log('upload complete', r);
                    task = yield this.popTask();
                }
                catch (e) {
                    console.log(e);
                }
                if (r !== false) {
                    yield this.delay(1000 + Math.random() * 1000);
                }
            }
        });
    }
}
const et = new ExecTask();
et.exec();
