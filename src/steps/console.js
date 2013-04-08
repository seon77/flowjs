define(function(require,exports,module){
    var Class = require('../util/class');
    var Step = require('../step');
    var ConsoleStep = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            enter:function(data,callback){
                var _this = this;
                setTimeout(function(){
                    console.log(_this._description);
                    callback();
                },1000);
                // console.log(this._description);
                // callback();
            }
        }
    });
    
    module.exports = ConsoleStep;
});
