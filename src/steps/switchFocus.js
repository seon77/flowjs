define(function(require,exports,module){
    var Class = require('../util/class');
    var Step = require('../step');
    var interval = 2000,timer;
    var StartFocus = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            enter:function(data,callback){
                var curr = data.curr;
                var frames = data.frames;
                frames.css('zIndex','');
                Q.$(frames[curr]).css('zIndex',1);
                setTimeout(function(){
                    callback();
                },2000);
            }
        }
    });
    
    module.exports = StartFocus;
});
