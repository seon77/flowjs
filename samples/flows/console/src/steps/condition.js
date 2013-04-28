define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Condition = Flowjs.Condition;
    var ConditionStep = Class({
        extend:Condition,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                var result = Math.ceil(3 * Math.random());
                this._select(result);
                callback();
            }
        }
    });
    
    module.exports = ConditionStep;
});
