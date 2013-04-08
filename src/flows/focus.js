define(function(require,exports,module){
    var Class = require('../util/class');
    var Flow = require('../index').Flow;
    var FocusData = require('../steps/focusData');
    var FocusTemplate = require('../steps/focusTemplate');
    var FocusGenerator = require('../steps/focusGenerator');
    var StartFocus = require('../steps/startFocus');
    var SwitchFocus = require('../steps/switchFocus');
    var ConsoleFlow = Class({
        extend:Flow,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            //初始化流程
            start:function(){
                var _this = this;
                var step1 = new FocusData({description:'get data'});
                var step2 = new FocusTemplate({description:'get tpl'});
                var step3 = new FocusGenerator({description:'generate'});
                var step4 = new StartFocus({description:'start'});
                var step5 = new SwitchFocus({description:'switch'});
                this.go(step1);
                this.go(step2);
                this.go(step3);
                this.go(step4);
                this.go(step5);
                this.go(step4);
            }
        }
    });
    
    module.exports = ConsoleFlow;
});