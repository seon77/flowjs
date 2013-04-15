define(function(require,exports,module){

    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var FocusData = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                callback(null,{data:{}});
            }
        }
    });
    
    module.exports = FocusData;
});
