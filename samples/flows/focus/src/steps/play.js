define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var StartFocus = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                var curr = data.curr;
                var frames = data.frames;
                frames.css('zIndex','');
                frames.css('opacity',0);
                frames.hide();
                Q.$(frames[curr]).show();    
                Q.$(frames[curr]).css('zIndex',1);
                Q.$(frames[curr]).css('opacity',1);
                callback();
            },
            _describeData:function(){
                return {
                    input:{
                        curr:{
                            type:'number'
                        },
                        frames:{
                            type:'object'
                        }
                    }
                };
            }
        }
    });
    
    module.exports = StartFocus;
});
