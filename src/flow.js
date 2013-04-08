define(function(require,exports,module){
    var Class = require('./util/class');
    var EventPlugin = require('./util/eventPlugin');
    var Begin = require('./begin');
    var Step = require('./step');
    var Queue = require('./util/queue');
    var Flow = Class({
        plugins:[new EventPlugin()],
        construct:function(options){
            this._begin = new Begin({description:'Begin'});
            this._curr = this._begin;
            this._queue = new Queue();
            this._started = false;
            this._timer = null;
            this._prev = this._begin;
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
                    step.end();
                    _this._start();
                },0);
            },
            _start:function(){
                var item = this._queue.dequeue();
                if(item){
                    this._process(item.step,item.data);
                }
            },
            _process:function(step,data){
                this._enter(step,data,function(result){
                    var next = this._getNext(step);
                    if(next){
                        this._process(next,result);
                    }
                });
            },
            _getNext:function(step){
                var result = step.__result,next = null;
                var item = this._queue.dequeue();
                var next = null;
                if(item){
                    next = item.step;
                }
                else{
                    next = step.next();
                }
                return next;
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
