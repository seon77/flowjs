define(function(require,exports,module){

    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var timer;
    var StartFocus = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                var delay = data.delay;
                if(timer){
                    clearTimeout(timer);
                }
                timer = setTimeout(function(){
                    callback();
                },delay);
            },
            _describeData:function(){
                return {
                    delay:{
                        type:'number'
                    }
                };
            }
        }
    });
    
    module.exports = StartFocus;
});
