define(function(require,exports,module){
    var Class = require('./util/class');
    var Step = require('./step');
    var Condition = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
            this._cases = options.cases || {};
            this._default = options.defaultCase;
        },
        methods:{
            select:function(condition){
                var fn = this._cases[condition] || this._default;
                fn();
            },
            cases:function(){
                return {
                    default:this._default,
                    cases:this._cases
                }
            }
        }
    });
    
    module.exports = Condition;
});
