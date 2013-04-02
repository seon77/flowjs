define(function(require,exports,module){
    var Class = require('../util/class');
    var InputStep = require('../input');
    var Step = Class({
        extend:InputStep,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            entry:function(data,options){
                var btn = Q.$('input');
                var _this = this;
                btn.on('click',function(){
                    _this.fire({type:'input',data:{input:'click'}});
                });
                this.fire({type:'exit'});
            },
            getNext:function(input){
                return this._nexts[input];
            }
        }
    });
    
    module.exports = Step;
});
