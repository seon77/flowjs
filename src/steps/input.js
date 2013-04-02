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
                Q.$('input').on("click",function(){
                    callback(null,{condition:'click'});
                });
            }
        }
    });
    
    module.exports = ConditionStep;
});
