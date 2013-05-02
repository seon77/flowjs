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
                if(curr == total){
                    curr = 0;
                }
                callback(null,{curr:curr});
            },
            _describeData:function(){
                return {
                    input:{
                        frames:{
                            type:'object'
                        },
                        curr:{
                            type:'number'
                        }
                    },
                    output:{
                        curr:{
                            type:'number'
                        }
                    }
                };
            }
        }
    });
    
    module.exports = Next;
});
