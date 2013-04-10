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
                var delay = data.delay;
                setTimeout(function(){
                    callback(null,{frames:data.frames,smalls:data.smalls});
                },delay);
            }
        }
    });
    
    module.exports = StartFocus;
});
