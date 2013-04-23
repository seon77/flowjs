define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var interval = 2000,curr = 0;
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
                callback(null,{delay:interval});
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
                    },
                    output:{
                        delay:{
                            type:'number'
                        }
                    }
                };
            }
        }
    });
    
    module.exports = StartFocus;
});
