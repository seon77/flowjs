define(function(require,exports,module){
    var Class = require('./util/class');
    var EventPlugin = require('./util/eventPlugin');
    var Step = Class({
        plugins:[new EventPlugin()],
        construct:function(options){
            options = options || {};
            if(!options.description){
                throw new Error('Need a description.');
            }
            this._data = {};
            this._data.description = options.description;
            this._next = null;
            this._end = false;
        },
        methods:{
            enter:Class.abstractMethod,
            next:function(step){
                if(step){
                    if(!this.isEnd()){
                        this._next = step;
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
            }
        }
    });
    
    module.exports = Step;
});
