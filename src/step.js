define(function(require,exports,module){
    var Class = require('./util/class');
    var EventPlugin = require('./util/eventPlugin');
    var checkData = require('./util/checkData');
    var Step = Class({
        plugins:[new EventPlugin()],
        construct:function(options){
            options = options || {};
            if(!options.description){
                throw new Error('Need a description.');
            }
            this._data = {};
            this._data.description = options.description;
            this._struct = this._describeData();
            this._next = null;
            this._end = false;
        },
        methods:{
            enter:function(data,callback){
                if(!this.__checkInput(data)){
                    throw new Error('Data error.');
                }
                var _this = this;
                this._process(data,function(err,result){
                    if(!_this.__checkOutput(result)){
                        throw new Error('Result error.');
                    }
                    callback(err,result);
                });
            },
            _process:Class.abstractMethod,
            _describeData:function(){
                return {};
            },
            next:function(step){
                if(step){
                    if(!this.isEnd()){
                        this._next = step;
                        //流程不允许改变，因此设置好下一步后，就锁定该流程
                        this.end();
                    }
                }
                else{
                    return this._next;
                }
            },
            end:function(){
                this._end = true;
            },
            isEnd:function(){
                return this._end;
            },
            data:function(){
                return this._data;
            },
            getStruct:function(){
                return this._struct;
            },
            __checkInput:function(data){
                return checkData.check(this._struct.input,data);
            },
            __checkOutput:function(data){
                return checkData.check(this._struct.output,data);
            }
        }
    });
    
    module.exports = Step;
});
