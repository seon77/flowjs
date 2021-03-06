define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var Next = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _describeData:function(){
                return {
                    input:{
                        frames:{type:'object'},
                        curr:{type:'number'}
                    },
                    output:{
                        curr:{type:'number'},
                        prev:{type:'number'},
                        dir:{type:'string'}
                    }
                };
            }
        }
    });
    
    module.exports = Next;
});
