/**
 * Created by han on 2017/7/28.
 */
require("babel-polyfill");
function readonly(target, name, descriptor){
    console.log('call me  readonly');
    descriptor.writable = false;
    return descriptor;
}

class Person {
    @readonly
    name() {
        return 'liuhan';
    }
    tim() {
        this.kik = Array.from([]);
    }
}

try {
    let liuhan  = new Person();
    liuhan.name = function() {
        return "god";
    }
    console.log(liuhan.name());
} catch (err) {
    console.log(err);
}

