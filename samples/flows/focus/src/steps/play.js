define(function(require,exports,module){
    module.exports = {
        methods:{
            _process:function(data,callback){
                var curr = data.curr;
                var prev = data.prev;
                if(curr != prev){
                    var frames = data.frames;
                    curr = Q.$(frames[curr]);
                    prev = Q.$(frames[prev]);
                    prev.css('zIndex','');
                    prev.css('opacity',0);
                    prev.hide();
                    curr.show();    
                    curr.css('zIndex',1);
                    curr.css('opacity',1);
                }
                callback();
            }
        }
    };
});