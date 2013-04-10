define(function(require,exports,module){
    var Class = require('../util/class');
    var Step = require('../step');
    var StartFocus = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                callback(null,{curr:data.curr,frames:data.frames,smalls:data.smalls});
            }
        }
    });
    
    module.exports = StartFocus;
});
