define(function(require,exports,module){
    module.exports = {
        methods:{
            _process:function(data,callback){
                var curr = data.curr;
                var frames = data.frames;
                frames.css('zIndex','');
                frames.css('opacity',0);
                frames.hide();
                Q.$(frames[curr]).show();    
                Q.$(frames[curr]).css('zIndex',1);
                Q.$(frames[curr]).css('opacity',1);
                callback();
            }
        }
    };
});