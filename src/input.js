define(function(require,exports,module){
    var Class = require('./util/class');
    var Step = require('./step');
    var extend = require('./util/extend');
    var Condition = Class({
        extend:Step,
        construct:function(options){
            options = options || {};
            this.callsuper(options);
            this._inputs = options.inputs || {};
            this._waiting = false;
        },
        methods:{
            _wait:function(callback){
                if(!this._waiting){
                    this._waiting = true;
                    callback();
                }
            },
            inputs:function(data){
                if(data){
                    if(data.inputs){
                        extend(this._inputs,data.inputs);
                    }
                }
                else{
                    return this._inputs;
                }
            }
        }
    });
    
    module.exports = Condition;
});
;