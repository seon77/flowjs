define(function(require,exports,module){
    var Class = require('../util/class');
    var Step = require('../step');
    var FocusTemplate = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                callback(null,{data:data,template:'test'});
            }
        }
    });
    
    module.exports = FocusTemplate;
});
