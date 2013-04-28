define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var ConsoleStep = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                var _this = this;
                // setTimeout(function(){
                //     console.log(_this.data().description);
                //     callback();
                // },1000);
                console.log(this.data().description);
                callback();
            }
        }
    });
    
    module.exports = ConsoleStep;
});
