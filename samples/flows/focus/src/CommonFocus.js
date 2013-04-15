define(function(require, exports, module) {

    var Class = Flowjs.Class;
    var Flow = Flowjs.Flow;
    var GetData = require('./baseclasses/getData');
    var GetTemplate = require('./baseclasses/getTemplate');
    var Render = require('./baseclasses/render');
    var Start = require('./baseclasses/start');
    var Play = require('./baseclasses/play');
    var GetDoms = require('./baseclasses/getDoms');
    var Highlight = require('./baseclasses/highlight');
    var Delay = require('./baseclasses/delay');
    var BindEvent = require('./baseclasses/bindEvent');
    var CommonFocusFlow = Class({
        extend:Flow,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            //初始化流程
            start:function(){
                var _this = this;
                var step1 = new GetData({description:'get data'});
                var step2 = new GetTemplate({description:'get template'});
                var step3 = new Render({description:'generate'});
                var step4 = new GetDoms({description:'get doms'});
                var step5 = new Start({description:'start'});
                var step6 = new Play({description:'play'});
                var step7 = new Highlight({description:'highlight'});
                var step8 = new Delay({description:'delay'});
                var step9 = new BindEvent({
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

