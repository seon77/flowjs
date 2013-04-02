define(function(require,exports,module){
    var Class = require('../util/class');
    var Flow = require('../index').Flow;
    var ConsoleStep = require('../steps/console');
    var ConsoleFlow = Class({
        extend:Flow,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            //初始化流程
            start:function(){
                var step1 = new ConsoleStep({description:'step1'});
                var step2 = new ConsoleStep({description:'step2'});
                var step3 = new ConsoleStep({description:'step3'});
                var step4 = new ConsoleStep({description:'step4'});
                this.go(step1,1);
                this.go(step2,3);
                this.go(step3);
                this.go(step4);
            }
        }
    });
    
    module.exports = ConsoleFlow;
});
