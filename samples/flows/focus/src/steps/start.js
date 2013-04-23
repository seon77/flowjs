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
                var frames = data.frames;
                var total = frames.length;
                callback(null,{curr:0});
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
