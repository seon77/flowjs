define(function(require,exports,module){
    var Class = require('../util/class');
    var Flow = require('../index').Flow;
    var ConsoleStep = require('../steps/console');
    var ConditionStep = require('../steps/condition');
    var InputStep = require('../steps/input');
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
                var step6 = new ConsoleStep({description:'step6'});
                var step7 = new InputStep({description:'step7',cases:{
                    'click':step1
                },defaultCase:step6});
                var step5 = new ConditionStep({description:'step5',cases:{
                    '1':step1,
                    '2':step6
                },defaultCase:step7});
                this.go(step1);
                this.go(step2);
                this.go(step3);
                this.go(step4);
                this.go(step5);
            }
        }
    });
    
    module.exports = ConsoleFlow;
});
