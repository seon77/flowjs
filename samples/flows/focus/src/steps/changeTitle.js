define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var ChangeTitle = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                data.cnt.html(data.data.list[data.curr].title);
                callback();
            },
            _describeData:function(){
                return {
                    cnt:{
                        type:'object'
                    },
                    data:{
                        type:'object'
                    },
                    curr:{
                        type:'number'
                    }
                };
            }
        }
    });
    
    module.exports = ChangeTitle;
});
