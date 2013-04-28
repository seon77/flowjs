define(function(require,exports,module){
    var Class = require('./util/class');
    var EventPlugin = require('./util/eventPlugin');
    var extend = require('./util/extend');
    var Begin = require('./begin');
    var Step = require('./step');
    var Input = require('./input');
    var Queue = require('./util/queue');
    var Data = require('./util/flowData');
    var reserve = [];
    var Flow = Class({
        plugins:[new EventPlugin()],
        construct:function(options){
            this._begin = new Begin({description:'Begin',struct:{}});
            this._steps = options.steps;
            this._curr = this._begin;
            this._queue = new Queue();
            this._started = false;
            this._timer = null;
            this._prev = this._begin;
            this._data = new Data();
            this._interfaces = {};
            for(var key in this){
                reserve.push(key);
            }
        },
        methods:{
            //初始化流程
            start:Class.abstractMethod,
            go:function(step,data){
                var _this = this;
                this._queue.enqueue({step:step,data:data});
                if(this._prev){
                    this._prev.next(step);
                }
                this._prev = step;
                if(this._timer){
                    clearTimeout(this._timer);
                }
                this._timer = setTimeout(function(){
                    //执行到此，说明一个流程链已经完成，当前步骤为该流程链的末端，不允许再有下一步了
                    step.end();
                    _this._start();
                },0);
            },
            _addInterface:function(name,fn){
                if(reserve.indexOf(name) != -1){
                    throw new Error('Reserve property : ' + name);
                }
                this[name] = fn;
                this._interfaces[name] = fn;
            },
            _start:function(){
                var item = this._queue.dequeue();
                if(item){
                    var data = this._getStepData(item.step);
                    extend(data,item.data);
                    this._process(item.step,data);
                }
            },
            _process:function(step,data){
                this._enter(step,data,function(result){
                    if(result){
                        this._saveData(result);
                    }
                    var next = this._getNext(step);
                    if(next){
                        this._process(next.step,next.data);
                    }
                });
            },
            _saveData:function(result){
                for(var key in result){
                    if(result.hasOwnProperty(key)){
                        this._data.setData(key,result[key]);
                    }
                }
            },
            _getNext:function(step){
                var result = step.__result,next = null;
                var item = this._queue.dequeue();
                var next = null;
                if(item){
                    var data = this._getStepData(item.step);
                    extend(data,item.data);
                    next = {
                        step:item.step,
                        data:data
                    };
                }
                else{
                    var ns = step.next();
                    if(ns){
                        next = {
                            step:ns,
                            data:this._getStepData(ns)
                        };
                    }
                }
                return next;
            },
            _getStepData:function(step){
                var struct = step.getStruct();
                var dataNames = [];
                if(struct && struct.input){
                    for(var key in struct.input){
                        if(struct.input.hasOwnProperty(key)){
                            dataNames.push(key);
                        }
                    }
                }
                return this._data.getData(dataNames);
            },
            _enter:function(step,data,callback){
                var _this = this;
                this._curr = step;
                step.enter(data,function(err,result){
                    step.__result = result;
                    callback.call(_this,result);
                });
            }
        }
    });
    
    module.exports = Flow;
});
