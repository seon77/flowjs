define(function(require,exports,module){
    module.exports = {
        methods:{
            _process:function(data,callback){
                var smalls = data.smalls;
                var _this = this;
                this._once(function(){
                    smalls.on("mouseover",function(e){
                        var target = Q.$(Q.event.get(e).target);
                        if(target.attr('_index')){
                            var curr = parseInt(target.attr('_index') - 1);
                            _this._select('click',{goto:curr});
                        }
                    });
                    data.frames.on('mouseover',function(){
                        _this._select('mouseonfocus');
                    });
                    data.frames.on('mouseout',function(){
                        _this._select('mouseoutfocus');
                    });
                });
                callback();
            }
        }
    };
});