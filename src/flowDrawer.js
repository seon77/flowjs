define(function(require,exports,module){
    var Class = require('./util/class');
    var ConditionStep = require('./condition');
    var TimerStep = require('./timer');
    var Drawer = Class({
        construct:function(options){
            this._flow = options.flow;
            this._flow._enter = function(step,data,callback){
                console.log(step.data().description);
                if(step instanceof ConditionStep){
                    var cases = step.cases();
                    cases.default();
                    for(var key in cases.cases){
                        cases.cases[key]();
                    }
                }
                else if(step instanceof TimerStep){
                    step.callback()();
                }
                callback.call(this);
            }
        },
        methods:{
            //初始化流程
            start:function(){
                this._flow.start();
            }
        }
    });
    
    module.exports = Drawer;
});
