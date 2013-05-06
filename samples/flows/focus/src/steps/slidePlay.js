define(function(require,exports,module){
    module.exports = {
        methods:{
            _process:function(data,callback){
                var curr = data.curr;
                var prev = data.prev;
                if(curr != prev){
                    var frames = data.frames;
                    frames.css('position','absolute');
                    curr = Q.$(frames[curr]);
                    prev = Q.$(frames[prev]);
                    prev.css('zIndex','1');
                    curr.show();
                    curr.css('opacity','1');
                    var width = prev.width();
                    prev.css('WebkitTransition','all 1s ease-out');
                    prev.css('opacity','0');
                    setTimeout(function(){
                        prev.css('zIndex','');
                        prev.hide();
                        prev.css('WebkitTransition','');
                        curr.css('WebkitTransition','');
                    },1000);
                }
                callback();
            }
        }
    };
});