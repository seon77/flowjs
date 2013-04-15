define(function(require,exports,module){

    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var FocusTemplate = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                callback();
            },
            _describeData:function(){
                return {
                    data:{
                        type:'object',
                        empty:true
                    }
                };
            }
        }
    });
    
    module.exports = FocusTemplate;
});
