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
            enter:function(data,callback){
                var frames = Q.$('li');
                var total = frames.length;
                callback(null,{curr:curr,frames:frames});
                curr++;
                if(curr == total){
                    curr = 0;
                }
            }
        }
    });
    
    module.exports = StartFocus;
});
