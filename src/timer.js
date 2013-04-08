define(function(require,exports,module){
    var Class = require('./util/class');
    var Step = require('./step');
    var Condition = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
            this._interval = options.interval;
            this._callback = options.callback;
        },
        methods:{
            enter:function(data,callback){
                var _this = this;
                setTimeout(function(){
                    _this._callback();
                    callback(null,data);
                },this._interval);
            }
        }
    });
    
    module.exports = Condition;
});
