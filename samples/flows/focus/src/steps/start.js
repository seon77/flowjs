define(function(require,exports,module){
    module.exports = {
        methods:{
            _process:function(data,callback){
                var frames = data.frames;
                var total = frames.length;
                callback(null,{curr:0});
            }
        }
    };
});