define(function(require,exports,module){
    var Class = require('./util/class');
    var EventPlugin = require('./util/eventPlugin');
    var Step = Class({
        plugins:[new EventPlugin()],
        construct:function(options){
            options = options || {};
            this._description = options.description;
            this._next = null;
            if(!this._description){
                throw new Error('Need a description.');
            }
        },
        methods:{
            enter:Class.abstractMethod,
            next:function(step){
                if(step){
                    this._next = step;
                }
                else{
                    return this._next;
                }
            }
        }
    });
    
    module.exports = Step;
});
