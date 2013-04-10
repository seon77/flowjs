define(function(require,exports,module){
    var Class = require('../util/class');
    var Step = require('../input');
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
                    smalls.on("click",function(e){
                        var target = Q.$(Q.event.get(e).target);
                        _this._inputs['click'].call(_this,{
                            curr:target.attr('_index') - 1,
                            frames:data.frames,
                            smalls:smalls
                        });
                    });
                });
                callback(null,{smalls:smalls,frames:data.frames})
            }
        }
    });
    
    module.exports = ConditionStep;
});
