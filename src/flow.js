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
                this._curr.next(step);
                this._queue.enqueue({step:step,data:data});
                if(!this._going){
                    var item = this._queue.dequeue();
                    if(item){
                        _this._entry(item.step,item.data || this._curr.__result);
                    }
                }
            },
            _entry:function(step,data){
                var _this = this;
                this._going = true;
                if(step instanceof Step){
                    this._curr = step;
                    step.entry(data,function(err,result){
                        _this._going = false;
                        step.__result = result;
                        item = _this._queue.dequeue();
                        if(item){
                            result = item.data || result
                            _this._entry(step,result);
                        }
                    });
                }
            }
        }
    });
    
    module.exports = Flow;
});
