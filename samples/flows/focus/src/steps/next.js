define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var Next = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                var total = data.frames.length;
                var curr = data.curr + 1;
                if(curr == total - 1){
                    curr = 0;
                }
                console.log(curr);
                callback(null,{curr:curr});
            },
            _describeData:function(){
                return {
                    frames:{
                        type:'object'
                    },
                    curr:{
                        type:'number'
                    }
                };
            }
        }
    });
    
    module.exports = Next;
});
