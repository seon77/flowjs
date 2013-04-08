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
                var _this = this;
                var step1 = new ConsoleStep({description:'step1'});
                var step2 = new ConsoleStep({description:'step2'});
                var step3 = new ConsoleStep({description:'step3'});
                var step4 = new ConsoleStep({description:'step4'});
                var step5 = new ConditionStep({description:'step5',cases:{
                    '1':function(){
                        _this.go(step1);
                    },
                    '2':function(){
                        _this.go(step6);
                    }
                },defaultCase:function(){
                    _this.go(step7);
                }});
                var step6 = new ConsoleStep({description:'step6'});
                var step7 = new InputStep({description:'step7',cases:{
                    'click':function(){
                        _this.go(step1);
                    }
                },defaultCase:function(){
                    _this.go(step6);
                }});
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
