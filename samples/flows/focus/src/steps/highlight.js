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
                var smalls = data.smalls;
                smalls.removeClass('selected');
                Q.$(smalls[data.curr]).addClass('selected');
                callback();
            },
            _describeData:function(){
                return {
                    input:{
                        smalls:{
                            type:'object'
                        },
                        curr:{
                            type:'number'
                        }
                    }
                };
            }
        }
    });
    
    module.exports = StartFocus;
});
