define(function(require,exports,module){
    var Class = require('../util/class');
    var Step = require('../timer');
    var StartFocus = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        }
    });
    
    module.exports = StartFocus;
});
