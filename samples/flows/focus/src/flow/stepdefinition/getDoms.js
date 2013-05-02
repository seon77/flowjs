define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var FocusData = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                var frames = Q.$('#j-focusBody').down('li');
                var smalls = Q.$('#j-focusBtn2').down('li');
                var cnt = Q.$('#j-focusCnt');
                callback(null,{frames:frames,smalls:smalls,cnt:cnt});
            }
        }
    });
    
    module.exports = FocusData;
});
