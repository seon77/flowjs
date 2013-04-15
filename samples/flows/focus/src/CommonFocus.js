define(function(require, exports, module) {

    var Class = Flowjs.Class;
    var Flow = Flowjs.Flow;
    var CommonFocusFlow = Class({
        extend:Flow,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            //初始化流程
            start:function(){
                var _this = this;
                var steps = this._steps;
                var step1 = new steps.GetData({description:'get data'});
                var step2 = new steps.GetTemplate({description:'get template'});
                var step3 = new steps.Render({description:'generate'});
                var step4 = new steps.GetDoms({description:'get doms'});
                var step5 = new steps.Start({description:'start'});
                var step6 = new steps.Play({description:'play'});
                var step7 = new steps.Highlight({description:'highlight'});
                var step8 = new steps.Delay({description:'delay'});
                var step9 = new steps.BindEvent({
                    description:'bind event',
                    inputs:{
                        'click':function(data){
                            _this.go(step5,data);
                        }
                    }
                });
                this.go(step1);
                this.go(step2);
                this.go(step3);
                this.go(step4);
                this.go(step9);
                this.go(step5);
                this.go(step6);
                this.go(step7);
                this.go(step8);
                this.go(step5);
            }
        }
    });

    module.exports = CommonFocusFlow;
});

