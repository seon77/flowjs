define(function(require,exports,module){
    var Class = require('../util/class');
    var Step = require('../condition');
    var ConditionStep = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            enter:function(data,callback){
                var result = Math.ceil(3 * Math.random());
                this._select(result);
                callback();
            }
        }
    });
    
    module.exports = ConditionStep;
});
