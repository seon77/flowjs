define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var curr = 0;
    var StartFocus = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                var frames = data.frames;
                var total = frames.length;
                if(data.hasOwnProperty('curr')){
                    curr = data.curr;
                }
                callback(null,{curr:curr});
                curr++;
                if(curr == total){
                    curr = 0;
                }
            },
            _describeData:function(){
                return {
                    frames:{
                        type:'object'
                    }
                };
            }
        }
    });
    
    module.exports = StartFocus;
});
