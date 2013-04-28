define(function(require,exports,module){
    var Class = Flowjs.Class;
    var Flow = Flowjs.Flow;
    var ConsoleFlow = Class({
        extend:Flow,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            //初始化流程
            start:function(){
                var _this = this;
                var steps = this.steps();
                var step1 = new steps.ConsoleStep({description:'step1'});
                var step2 = new steps.ConsoleStep({description:'step2'});
                var step3 = new steps.ConsoleStep({description:'step3'});
                var step4 = new steps.ConsoleStep({description:'step4'});
                var step5 = new steps.ConditionStep({description:'step5',cases:{
                    '1':function(){
                        _this.go(step1);
                    },
                    '2':function(){
                        _this.go(step6);
                    }
                },defaultCase:function(){
                    _this.go(step4);
                }});
                var step6 = new steps.ConsoleStep({description:'step6'});
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
