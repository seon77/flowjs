define(function(require,exports,module){
    var Class = require('./util/class');
    var EventPlugin = require('./util/eventPlugin');
    var Begin = require('./begin');
    var Step = require('./step');
    var ConditionStep = require('./condition');
    var Queue = require('./util/queue');
    var Flow = Class({
        plugins:[new EventPlugin()],
        construct:function(options){
            this._begin = new Begin({description:'Begin'});
            this._curr = this._begin;
            this._queue = new Queue();
            this._going = false;
        },
        methods:{
            //初始化流程
            start:Class.abstractMethod,
            go:function(step,data){
                var _this = this;
                this._queue.enqueue({step:step,data:data});
                if(!this._going){
                    var item = this._queue.dequeue();
                    if(item){
                        _this._process(item.step,this._curr.__result);
                    }
                }
            },
            _process:function(step,data){
                var _this = this;
                this._going = true;
                this._curr.next(step);
                this._curr = step;
                if(step instanceof ConditionStep){
                    step.enter(data,function(err,result){
                        _this._going = false;
                        result = result || {};
                        step.__result = result.data;
                        var condition = result.condition;
                        var next = step.select(condition);
                        if(next){
                            _this._process(next,step.__result);
                        }
                    });
                }
                else if(step instanceof Step){
                    step.enter(data,function(err,result){
                        _this._going = false;
                        step.__result = result;
                        var next = step.next();
                        if(next){
                            _this._process(next,result);
                        }
                        else{
                            item = _this._queue.dequeue();
                            if(item){
                                _this._process(item.step,result);
                            }   
                        }
                    });
                }
            }
        }
    });
    
    module.exports = Flow;
});
