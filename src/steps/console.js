define(function(require,exports,module){
    var Class = require('../util/class');
    var Step = require('../step');
    var ConsoleStep = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            entry:function(data,callback){
                setTimeout(function(){
                    console.log(data);
                    callback(null,++data);
                },1000);
                // console.log(data);
                // callback(null,++data);
            }
        }
    });
    
    module.exports = ConsoleStep;
});
