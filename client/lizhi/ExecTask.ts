import fetch from "node-fetch";
import *　as fs from 'fs';
const uuidv4 = require('uuid/v4');

const HOST = "http://jinjing.duapp.com";
const LIZHI_HOST = "https://www.lizhi.fm";

import LoadParser from "../LoadParser";
import BOSService from "../BOSService";
const FILE_ROOT = 'F:/lizhi';

const getOptions = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

class ExecTask extends LoadParser {

    bos: BOSService;

    constructor() {
        super();
        this.bos = new BOSService();
    }

    //1 pop task
    async popTask() {
        const fetching = await fetch(`${HOST}/task/pop`, getOptions);
        const task = await fetching.json();
        return task.result;
    }

    //http://jinjing.duapp.com/story/one?album=xxx&title=xxxxx
    async fetchStoryInfo(album:string, title:string) {
        const fetching = await fetch(`${HOST}/story/one?album=${encodeURIComponent(album)}&title=${encodeURIComponent(title)}`, getOptions);
        if (fetching.status!=200) {
            return null;
        }
        const task = await fetching.json();
        return task;
    }

    //http://jinjing.duapp.com/task/finish?taskId=https://www.lizhi.fm/297124/15928136997309190
    async finishTask(taskId:string): Promise<any> {
        const fetching = await fetch(`${HOST}/task/finish?taskId=${taskId}`, getOptions);
        const task = await fetching.json();
        return task;
    }

    async removeTask(taskId: string ) {
        const fetching = await fetch(`${HOST}/task/remove?taskId=${taskId}`, getOptions);
        await fetching.json();
    }

    async getDetailByTaskId(taskId: string) : Promise<any> {
        let $ = await this.load(`${taskId}`);
        const detail:any = {};
        const divPlayData = $('.js-play-data');
        detail.cover = $('.audioCover img').attr('src').replace(/_320x320/g, '');
        detail.short = this.decode($('.desText').html());
        detail.albumCover = divPlayData.attr('data-cover');
        detail.duration = divPlayData.attr('data-duration');
        detail.title = divPlayData.attr('data-title');
        detail.author = divPlayData.attr('data-user-name');
        detail.mp3 = divPlayData.attr('data-url');
        //story.cover = a.attr('data-cover');
        return detail;
    }
    async runTask(task) {

        task.story = this.replaceName(task.story);
        //1 pop task
        console.log('task', task.album, task.story);

        //2 fetch detail from lizhi
        const storyDetail = await this.getDetailByTaskId(task.taskId);

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
            let musicFile = await this.downloadFile(storyDetail.mp3, `${FILE_ROOT}/${task.album}`, task.story + '.mp3');
        }

        //3.3 check or download image
        if (!fs.existsSync(`${FILE_ROOT}/${task.album}/${task.story}.png`)) {
            let musicFile = await this.downloadFile(storyDetail.cover, `${FILE_ROOT}/${task.album}`, task.story + '.png');
        }

        console.log()
        //4 fetch yb story info
        const storyInfo = await this.fetchStoryInfo(task.album, task.story);

        //4.1 check or upload mp3
        const bosMp3Path = `${task.album}/${task.story}.mp3`;
        const mp3exist = await this.bos.fileExist('chuchu', bosMp3Path);
        if (!mp3exist) {
            await this.bos.uploadFile('chuchu', bosMp3Path, `${FILE_ROOT}/${task.album}/${task.story}.mp3`, storyDetail.duration);
        }
        console.log('bosMp3Path: ', bosMp3Path);

        //4.2 check or upload image
        let bosCoverPath = (storyInfo && storyInfo.cover) || null;
        if (!bosCoverPath) {
            bosCoverPath = uuidv4();
            await this.bos.uploadFile('imagek', bosCoverPath + '.png', `${FILE_ROOT}/${task.album}/${task.story}.png`, 0);
        }
        console.log('bosCoverPath: ', bosCoverPath);

        //5 upload/update story
        if (storyInfo) {
            //5.1 update
            storyInfo.path = bosMp3Path;
            storyInfo.cover = bosCoverPath;
            await this.updateStory(storyInfo);
            console.log('story updated');
        } else {
            await this.createStory({
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
        return await this.finishTask(task.taskId);
    }

    async exec() {
        while(true) {
            let task = await this.popTask();
            try {
                let r = await et.runTask(task);
                console.log('upload complete', r);
                task = await this.popTask();
            } catch (e) {
                console.log(e);
            }
            await this.delay(4000 + Math.random()*4000);
        }
    }
}

const et = new ExecTask();

et.exec();