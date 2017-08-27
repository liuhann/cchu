import fetch from "node-fetch";


const HOST = "http://jinjing.duapp.com";
const LIZHI_HOST = "https://www.lizhi.fm";


import LoadParser from "../LoadParser";

class ExecTask extends LoadParser {

    //1 pop task
    async popTask() {
        const fetching = await fetch(`${HOST}/task/pop`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const task = await fetching.json();
        return task;
    }

    popRun() {
        //1 pop task

        //2 fetch detail

        //3 check local exists and download mp3 and cover


        //4 check remote and upload

        //4.1 check story


        //4.2 upload image if not exist

        //4.3 upload story if not exist

        //4.4 update story

        //5 mark task as finished

    }

    async exec() {
        let r = await et.popTask();
        console.log(r);
    }
}



const et = new ExecTask();

et.exec();