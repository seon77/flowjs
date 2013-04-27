(function(global){var _qc={};global.Qiyi=global.Qiyi||{};(function (module) {
    var _Object = function() {};
    var proto = new Object;
    proto.superclass = Object;
    proto.callsuper = function(methodName) {
        var _this = this;
        if (!this._realsuper) {
            this._realsuper = this.superclass;
        } else {
            this._realsuper = this._realsuper.prototype.superclass;
        }
        if (typeof methodName == "string") {
            var args = Array.prototype.slice.call(arguments, 1);
            _this._realsuper.prototype[methodName].apply(_this, args);
        } else {
            var args = Array.prototype.slice.call(arguments, 0);
            _this._realsuper.apply(_this, args);
        }
        this._realsuper = null;
    };
    _Object.prototype = proto;
    module["__2"]=_Object;
})(_qc);(function (module) {
    var _Object = module["__2"];
    var Class = function(data) {
        var superclass = data.extend || _Object;
        var superproto = function() {};
        var plugins = data.plugins || [];
        superproto.prototype = superclass.prototype;
        var constructor = data.construct || function() {};
        var properties = data.properties || {};
        var methods = data.methods || {};
        var statics = data.statics || {};
        var proto = new superproto;
        for (var key in proto) {
            if (proto.hasOwnProperty(key)) {
                delete proto[key];
            }
        }
        for (var key in properties) {
            proto[key] = properties[key];
        }
        for (var key in methods) {
            proto[key] = methods[key];
        }
        for (var i = 0; i < plugins.length; i++) {
            var plugin = plugins[i];
            for (var key in plugin) {
                proto[key] = plugin[key];
            }
        }
        proto.constructor = constructor;
        proto.superclass = superclass;
        constructor.prototype = proto;
        for (var key in statics) {
            constructor[key] = statics[key];
        }
        return constructor;
    };
    Class.abstractMethod = function() {
        throw new Error("Not implement.");
    };
    module["__1"]=Class;
})(_qc);(function (module) {
    var Class = module["__1"];
    var EventPlugin = Class({
        methods: {
            on: function(type, listener) {
                this._ep_createList();
                var realListener = function(ev) {
                    listener(ev);
                };
                type = type.toLowerCase();
                this._ep_lists[type] = this._ep_lists[type] || [];
                this._ep_lists[type].push({
                    type: type,
                    listener: listener,
                    realListener: realListener
                });
                return this;
            },
            un: function(type, listener) {
                this._ep_createList();
                if (type) {
                    type = type.toLowerCase();
                    var listeners = this._ep_lists[type];
                    if (listeners) {
                        var len = listeners.length, isRemoveAll = !listener;
                        if (listeners && listeners.length > 0) {
                            if (isRemoveAll == true) {
                                this._ep_lists[type] = [];
                            } else {
                                listeners.forEach(function(obj, index) {
                                    if (obj.listener === listener) {
                                        listeners.splice(index, 1);
                                    }
                                });
                            }
                        }
                    }
                } else {
                    this._ep_clearList();
                }
                return this;
            },
            fire: function(ev) {
                this._ep_createList();
                var type = ev.type.toLowerCase();
                var data = ev.data;
                var listeners = this._ep_lists[type];
                if (listeners && listeners.length > 0) {
                    listeners.forEach(function(obj, index) {
                        obj.listener({
                            type: type,
                            data: data
                        });
                    });
                }
                return this;
            },
            _ep_clearList: function() {
                this._ep_lists = null;
            },
            _ep_createList: function() {
                if (!this._ep_lists) {
                    this._ep_lists = {};
                }
            }
        }
    });
    module["__4"]=EventPlugin;
})(_qc);(function (module) {
    var extend = function(target, source) {
        for (var p in source) {
            if (source.hasOwnProperty(p)) {
                target[p] = source[p];
            }
        }
        return target;
    };
    module["__5"]=extend;
})(_qc);(function (module) {
    module["__9"]={
        isArray: Array.isArray || function(arg) {
            return Object.prototype.toString.call(arg) == "[object Array]";
        }
    };
})(_qc);(function (module) {
    var tool = module["__9"];
    module["__8"]={
        check: function(struct, data) {
            var self = this;
            if (!struct) {
                return true;
            }
            var result = true;
            for (var key in struct) {
                var item = struct[key];
                if (struct[key].empty !== true && self.isEmpty(struct[key], data[key])) {
                    throw new Error("字段[" + key + "]值为空");
                } else if (struct[key].empty === true && self.isEmpty(struct[key], data[key])) {
                    continue;
                } else if (struct[key].type == "number" && typeof data[key] != "number") {
                    throw new Error("字段[" + key + "]不是数字");
                } else if (struct[key].type == "string" && typeof data[key] != "string") {
                    throw new Error("字段[" + key + "]不是字符串");
                } else if (struct[key].type == "array") {
                    if (!self.checkArray(struct[key], data[key])) {
                        throw new Error("字段[" + key + "]值与定义不符");
                    }
                } else if (struct[key].type == "object") {
                    if (!self.checkObject(struct[key].struct, data[key])) {
                        throw new Error("字段[" + key + "]值与定义不符");
                    }
                }
            }
            return result;
        },
        checkArray: function(rule, data) {
            var self = this;
            if (tool.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    if (!self.checkData(rule.item, item)) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        },
        checkObject: function(rule, data) {
            return this.check(rule, data);
        },
        isEmpty: function(rule, data) {
            if (data === undefined) {
                return true;
            }
            if (rule.type == "object") {
                return data === null;
            } else if (rule.type == "array") {
                return data.length == 0;
            } else {
                return data === "" || data === undefined || data === null;
            }
        },
        checkData: function(rule, data) {
            if (rule.type == "number" && typeof data == "number") {
                return true;
            } else if (rule.type == "string" && typeof data == "string") {
                return true;
            } else if (rule.type == "boolean" && typeof data == "boolean") {
                return true;
            } else if (rule.type == "array") {
                return this.checkArray(rule.item, data);
            } else if (rule.type == "object") {
                return this.checkObject(rule.struct, data);
            }
            return false;
        }
    };
})(_qc);(function (module) {
    var Class = module["__1"];
    var EventPlugin = module["__4"];
    var checkData = module["__8"];
    var Step = Class({
        plugins: [ new EventPlugin ],
        construct: function(options) {
            options = options || {};
            if (!options.description) {
                throw new Error("Need a description.");
            }
            this._data = {};
            this._data.description = options.description;
            this._struct = this._describeData();
            this._next = null;
            this._end = false;
        },
        methods: {
            enter: function(data, callback) {
                if (!this.__checkInput(data)) {
                    throw new Error("Data error.");
                }
                var _this = this;
                this._process(data, function(err, result) {
                    if (!_this.__checkOutput(result)) {
                        throw new Error("Result error.");
                    }
                    callback(err, result);
                });
            },
            _process: Class.abstractMethod,
            _describeData: function() {
                return {};
            },
            next: function(step) {
                if (step) {
                    if (!this.isEnd()) {
                        this._next = step;
                    }
                } else {
                    return this._next;
                }
            },
            end: function() {
                this._end = true;
            },
            isEnd: function() {
                return this._end;
            },
            data: function() {
                return this._data;
            },
            getStruct: function() {
                return this._struct;
            },
            __checkInput: function(data) {
                return checkData.check(this._struct.input, data);
            },
            __checkOutput: function(data) {
                return checkData.check(this._struct.output, data);
            }
        }
    });
    module["__7"]=Step;
})(_qc);(function (module) {
    var Class = module["__1"];
    var Step = module["__7"];
    var Begin = Class({
        extend: Step,
        construct: function(options) {
            this.callsuper(options);
        }
    });
    module["__6"]=Begin;
})(_qc);(function (module) {
    var Class = module["__1"];
    module["__10"]=Class({
        construct: function() {
            this._queue = [];
            this._event = {};
        },
        methods: {
            enqueue: function(obj) {
                this._queue.push(obj);
            },
            dequeue: function() {
                var _this = this;
                if (this._queue.length == 0) {
                    this.end();
                    return null;
                } else {
                    return this._queue.splice(0, 1)[0];
                }
            },
            isEmpty: function() {
                return this._queue.length == 0;
            },
            end: function(data) {
                this.fire("end", data);
            },
            on: function(type, callback) {
                if (!this._event[type]) {
                    this._event[type] = [];
                }
                this._event[type].push(callback);
            },
            fire: function(type, data) {
                if (this._event[type]) {
                    for (var i = 0; i < this._event[type].length; i++) {
                        this._event[type][i](data);
                    }
                }
            },
            clear: function() {
                this._queue = [];
            }
        }
    });
})(_qc);(function (module) {
    var Class = module["__1"];
    var tool = module["__9"];
    var FlowData = Class({
        construct: function(options) {
            this._data = {};
        },
        methods: {
            getData: function(dataNames) {
                var result = {};
                var now = (new Date).getTime();
                if (tool.isArray(dataNames)) {
                    var length = dataNames.length;
                    for (var i = 0; i < length; i++) {
                        var name = dataNames[i];
                        if (this._data.hasOwnProperty(name)) {
                            result[name] = this._data[name];
                        }
                    }
                } else {
                    result[dataNames.toString()] = this_data[dataNames.toString()];
                }
                return result;
            },
            setData: function(dataName, data) {
                this._data[dataName] = data;
                return false;
            }
        }
    });
    module["__11"]=FlowData;
})(_qc);(function (module) {
    var Class = module["__1"];
    var EventPlugin = module["__4"];
    var extend = module["__5"];
    var Begin = module["__6"];
    var Step = module["__7"];
    var Queue = module["__10"];
    var Data = module["__11"];
    var Flow = Class({
        plugins: [ new EventPlugin ],
        construct: function(options) {
            this._begin = new Begin({
                description: "Begin",
                struct: {}
            });
            this._steps = options.steps;
            this._curr = this._begin;
            this._queue = new Queue;
            this._started = false;
            this._timer = null;
            this._prev = this._begin;
            this._data = new Data;
        },
        methods: {
            start: Class.abstractMethod,
            go: function(step, data) {
                var _this = this;
                this._queue.enqueue({
                    step: step,
                    data: data
                });
                if (this._prev) {
                    this._prev.next(step);
                }
                this._prev = step;
                if (this._timer) {
                    clearTimeout(this._timer);
                }
                this._timer = setTimeout(function() {
                    step.end();
                    _this._start();
                }, 0);
            },
            _start: function() {
                var item = this._queue.dequeue();
                if (item) {
                    this._process(item.step, item.data || this._getStepData(item.step));
                }
            },
            _process: function(step, data) {
                this._enter(step, data, function(result) {
                    if (result) {
                        this._saveData(result);
                    }
                    var next = this._getNext(step);
                    if (next) {
                        var nextData = this._getStepData(next);
                        this._process(next, nextData);
                    }
                });
            },
            _saveData: function(result) {
                for (var key in result) {
                    if (result.hasOwnProperty(key)) {
                        this._data.setData(key, result[key]);
                    }
                }
            },
            _getNext: function(step) {
                var result = step.__result, next = null;
                var item = this._queue.dequeue();
                var next = null;
                if (item) {
                    next = item.step;
                } else {
                    next = step.next();
                }
                return next;
            },
            _getStepData: function(step) {
                var struct = step.getStruct();
                var dataNames = [];
                if (struct && struct.input) {
                    for (var key in struct.input) {
                        if (struct.input.hasOwnProperty(key)) {
                            dataNames.push(key);
                        }
                    }
                }
                return this._data.getData(dataNames);
            },
            _enter: function(step, data, callback) {
                var _this = this;
                this._curr = step;
                step.enter(data, function(err, result) {
                    step.__result = result;
                    callback.call(_this, result);
                });
            }
        }
    });
    module["__3"]=Flow;
})(_qc);(function (module) {
    var Class = module["__1"];
    var Step = module["__7"];
    var Condition = Class({
        extend: Step,
        construct: function(options) {
            this.callsuper(options);
            this._cases = options.cases || {};
            this._default = options.defaultCase;
        },
        methods: {
            _select: function(condition) {
                var fn = this._cases[condition] || this._default;
                fn();
            },
            cases: function() {
                return {
                    defaultCase: this._default,
                    cases: this._cases
                };
            }
        }
    });
    module["__12"]=Condition;
})(_qc);(function (module) {
    var Class = module["__1"];
    var Step = module["__7"];
    var Condition = Class({
        extend: Step,
        construct: function(options) {
            this.callsuper(options);
            this._inputs = options.inputs || {};
            this._waiting = false;
        },
        methods: {
            _wait: function(callback) {
                if (!this._waiting) {
                    this._waiting = true;
                    callback();
                }
            },
            inputs: function() {
                return this._inputs;
            }
        }
    });
    module["__13"]=Condition;
})(_qc);(function (module) {
    window.Flowjs = {
        Class: module["__1"],
        Flow: module["__3"],
        Step: module["__7"],
        Condition: module["__12"],
        Input: module["__13"]
    };
})(_qc);})(this);