define(function(require,exports,module){
    var Class = require('../util/class');
    var Step = require('../step');
    var FocusData = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                var frames = Q.$('#j-focusBody').down('li');
                var smalls = Q.$('#j-focusBtn2').down('li');
                callback(null,{frames:frames,smalls:smalls});
            }
        }
    });
    
    module.exports = FocusData;
});
