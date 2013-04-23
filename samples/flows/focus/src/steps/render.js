define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var FocusGenerator = Class({
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
                    template:{
                        type:'string',
                        empty:true
                    },
                    data:{
                        type:'object',
                        empty:true
                    }
                };
            }
        }
    });
    
    module.exports = FocusGenerator;
});
