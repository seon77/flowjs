define(function(require,exports,module){
    var Class = require('../util/class');
    var Step = require('../step');
    var FocusTemplate = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            enter:function(data,callback){
                callback();
            }
        }
    });
    
    module.exports = FocusTemplate;
});