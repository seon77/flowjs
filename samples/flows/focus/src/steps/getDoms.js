define(function(require,exports,module){
    module.exports = {
        methods:{
            _process:function(data,callback){
                var frames = Q.$('#j-focusBody').down('li');
                var smalls = Q.$('#j-focusBtn2').down('li');
                var cnt = Q.$('#j-focusCnt');
                callback(null,{frames:frames,smalls:smalls,cnt:cnt});
            }
        }
    };
});
