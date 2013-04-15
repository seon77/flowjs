define(function(require,exports,module){

    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var interval = 2000,timer,curr = 0;
    var StartFocus = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                var smalls = data.smalls;
                smalls.removeClass('selected');
                Q.$(smalls[data.curr]).addClass('selected');
                callback(null,{delay:2000});
            },
            _describeData:function(){
                return {
                    smalls:{
                        type:'object'
                    },
                    curr:{
                        type:'number'
                    }
                };
            }
        }
    });
    
    module.exports = StartFocus;
});
