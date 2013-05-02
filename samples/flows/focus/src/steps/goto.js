define(function(require,exports,module){
    module.exports = {
        methods:{
            _process:function(data,callback){
                var curr = data.curr;
                callback(null,{curr:curr});
            }
        }
    };
});