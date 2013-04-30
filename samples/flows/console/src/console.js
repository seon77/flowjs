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
                var steps = this._steps();
                this._addStep('step1',new steps.ConsoleStep());
                this._addStep('step2',new steps.ConsoleStep());
                this._addStep('step3',new steps.ConsoleStep());
                this._addStep('step4',new steps.ConsoleStep());
                this._addStep('step5',new steps.ConditionStep({
                    cases:{
                        '1':function(){
                            _this.go('step1');
                        },
                        '2':function(){
                            _this.go('step6');
                        }
                    },defaultCase:function(){
                        _this.go('step4');
                    }
                }));
                this._addStep('step6',new steps.ConsoleStep());
                this.go('step1');
                this.go('step2');
                this.go('step3');
                this.go('step4');
                this.go('step5');
            }
        }
    });
    
    module.exports = ConsoleFlow;
});
