define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var ChangeTitle = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _describeData:function(){
                return {
                    input:{
                        wrapper:{
                            type:'object'
                        }
                    },
                    output:{
                        wrapper:{
                            type:'object'
                        }
                    }
                };
            }
        }
    });
    
    module.exports = ChangeTitle;
});
