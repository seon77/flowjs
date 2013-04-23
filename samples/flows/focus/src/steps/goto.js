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
                var curr = data.curr;
                callback(null,{curr:curr});
            },
            _describeData:function(){
                return {
                    input:{
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
