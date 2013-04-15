define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var curr = -1;
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
                curr++;
                if(curr == total){
                    curr = 0;
                }
                callback(null,{curr:curr});
            },
            _describeData:function(){
                return {
                    frames:{
                        type:'object'
                    },
                    curr:{
                        type:'number',
                        empty:true
                    }
                };
            }
        }
    });
    
    module.exports = StartFocus;
});
