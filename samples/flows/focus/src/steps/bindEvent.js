define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Step = Flowjs.Input;
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
                        if(target.attr('_index')){
                            var curr = parseInt(target.attr('_index') - 1);
                            _this._inputs['click'].call(_this,{
                                curr:curr
                            });
                        }
                    });
                    data.frames.on('mouseover',function(){
                        _this._inputs['mouseonfocus'].call(_this);
                    });
                    data.frames.on('mouseout',function(){
                        _this._inputs['mouseoutfocus'].call(_this);
                    });
                });
                callback();
            },
            _describeData:function(){
                return {
                    input:{
                        frames:{
                            type:'object'
                        },
                        smalls:{
                            type:'object'
                        }
                    }
                };
            }
        }
    });
    
    module.exports = ConditionStep;
});
