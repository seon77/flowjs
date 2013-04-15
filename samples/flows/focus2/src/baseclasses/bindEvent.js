define(function(require,exports,module){

    var Class = Flowjs.Class;
    var Step = Flowjs.InputStep;
    var ConditionStep = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                var smalls = data.smalls;
                var _this = this;
                this._wait(function(){
                    smalls.on("mouseover",function(e){
                        var target = Q.$(Q.event.get(e).target);
                        _this._inputs['click'].call(_this,{
                            curr:target.attr('_index') - 1,
                            frames:data.frames,
                            smalls:smalls
                        });
                    });
                });
                callback();
            },
            _describeData:function(){
                return {
                    frames:{
                        type:'object'
                    },
                    smalls:{
                        type:'object'
                    }
                };
            }
        }
    });
    
    module.exports = ConditionStep;
});
