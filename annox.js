'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

/**
 * Created by han on 2017/7/28.
 */
require("babel-polyfill");
function readonly(target, name, descriptor) {
    console.log('call me  readonly');
    descriptor.writable = false;
    return descriptor;
}

var Person = (_class = function () {
    function Person() {
        _classCallCheck(this, Person);
    }

    _createClass(Person, [{
        key: 'name',
        value: function name() {
            return 'liuhan';
        }
    }, {
        key: 'tim',
        value: function tim() {
            this.kik = Array.from([]);
        }
    }]);

    return Person;
}(), (_applyDecoratedDescriptor(_class.prototype, 'name', [readonly], Object.getOwnPropertyDescriptor(_class.prototype, 'name'), _class.prototype)), _class);


try {
    var liuhan = new Person();
    liuhan.name = function () {
        return "god";
    };
    console.log(liuhan.name());
} catch (err) {
    console.log(err);
}
