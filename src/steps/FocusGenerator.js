define(function(require,exports,module){
    var Class = require('../util/class');
    var Step = require('../step');
    var FocusGenerator = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                callback();
            }
        }
    });
    
    module.exports = FocusGenerator;
});
