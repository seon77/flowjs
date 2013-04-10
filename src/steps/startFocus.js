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
                var frames = data.frames;
                var smalls = data.smalls;
                var total = frames.length;
                callback(null,{curr:curr,frames:frames,smalls:smalls});
                curr++;
                if(curr == total){
                    curr = 0;
                }
            }
        }
    });
    
    module.exports = StartFocus;
});
