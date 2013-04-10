define(function(require,exports,module){
    var Class = require('../util/class');
    var Step = require('../step');
    var interval = 2000,timer,curr = 0;
    var StartFocus = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                var smalls = data.smalls;
                smalls.removeClass('selected');
                Q.$(smalls[data.curr]).addClass('selected');
                callback(null,{frames:data.frames,smalls:smalls,delay:2000});
            }
        }
    });
    
    module.exports = StartFocus;
});
