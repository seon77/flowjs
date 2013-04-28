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
            this.__begin = new Begin({description:'Begin',struct:{}});
            this.__steps = options.steps;
            this.__queue = new Queue();
            this.__timer = null;
            this.__prev = this.__begin;
            this.__data = new Data();
            this.__interfaces = {};
            this.__pausing = {};
            this.__working = {};
            for(var key in this){
                reserve.push(key);
            }
        },
        methods:{
            //初始化流程
            start:Class.abstractMethod,
            go:function(step,data){
                var _this = this;
                this.__queue.enqueue({step:step,data:data});
                if(this.__prev){
                    this.__prev.next(step);
                }
                this.__prev = step;
                if(this.__timer){
                    clearTimeout(this.__timer);
                }
                this.__timer = setTimeout(function(){
                    //执行到此，说明一个流程链已经完成，当前步骤为该流程链的末端，不允许再有下一步了
                    step.end();
                    _this.__start();
                },0);
            },
            pause:function(){
                for(var key in this.__working){
                    if(this.__working.hasOwnProperty(key)){
                        this.__working[key].pause();
                        this.__pausing[key] = this.__working[key];
                        delete this.__working[key];
                    }
                }
                //查看是否有泄露
                // console.log(Object.keys(this.__working));
                // console.log(Object.keys(this.__pausing));
            },
            resume:function(){
                for(var key in this.__pausing){
                    if(this.__pausing.hasOwnProperty(key)){
                        this.__pausing[key].resume();
                        this.__working[key] = this.__pausing[key];
                        delete this.__pausing[key];
                    }
                }
                //查看是否有泄露
                // console.log(Object.keys(this.__working));
                // console.log(Object.keys(this.__pausing));
            },
            steps:function(){
                return this.__steps;
            },
            _addInterface:function(name,fn){
                if(reserve.indexOf(name) != -1){
                    throw new Error('Reserve property : ' + name);
                }
                this[name] = fn;
                this.__interfaces[name] = fn;
            },
            __start:function(){
                var item = this.__queue.dequeue();
                if(item){
                    var data = this.__getStepData(item.step);
                    extend(data,item.data);
                    this.__process(item.step,data);
                }
            },
            __process:function(step,data){
                this.__working[step.data().__id] = step;
                this.__enter(step,data,function(result){
                    delete this.__working[step.data().__id];
                    if(result){
                        this.__saveData(result);
                    }
                    var next = this.__getNext(step);
                    if(next){
                        this.__process(next.step,next.data);
                    }
                });
            },
            __saveData:function(result){
                for(var key in result){
                    if(result.hasOwnProperty(key)){
                        this.__data.setData(key,result[key]);
                    }
                }
            },
            __getNext:function(step){
                var result = step.__result,next = null;
                var item = this.__queue.dequeue();
                var next = null;
                if(item){
                    var data = this.__getStepData(item.step);
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
                            data:this.__getStepData(ns)
                        };
                    }
                }
                return next;
            },
            __getStepData:function(step){
                var struct = step.getStruct();
                var dataNames = [];
                if(struct && struct.input){
                    for(var key in struct.input){
                        if(struct.input.hasOwnProperty(key)){
                            dataNames.push(key);
                        }
                    }
                }
                return this.__data.getData(dataNames);
            },
            __enter:function(step,data,callback){
                var _this = this;
                step.enter(data,function(err,result){
                    step.__result = result;
                    callback.call(_this,result);
                });
            }
        }
    });
    
    module.exports = Flow;
});
