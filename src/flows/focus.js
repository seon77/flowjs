define(function(require,exports,module){
    var Class = require('../util/class');
    var Flow = require('../index').Flow;
    var FocusData = require('../steps/focusData');
    var FocusTemplate = require('../steps/focusTemplate');
    var FocusGenerator = require('../steps/focusGenerator');
    var StartFocus = require('../steps/startFocus');
    var SwitchFocus = require('../steps/switchFocus');
    var GetDoms = require('../steps/getDoms');
    var HighlightSmall = require('../steps/highlightSmall');
    var Delay = require('../steps/delay');
    var BindEvent = require('../steps/bindEvent');
    var GotoFocus = require('../steps/gotoFocus');
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
                var step2 = new FocusTemplate({description:'get template',struct:{
                    data:{
                        type:'object',
                        empty:true
                    }
                }});
                var step3 = new FocusGenerator({description:'generate',struct:{
                    template:{
                        type:'string',
                        empty:true
                    },
                    data:{
                        type:'object',
                        empty:true
                    }
                }});
                var step4 = new GetDoms({description:'get doms'});
                var step5 = new StartFocus({description:'start',struct:{
                    frames:{
                        type:'object'
                    },
                    smalls:{
                        type:'object'
                    }
                }});
                var step6 = new SwitchFocus({description:'switch',struct:{
                    curr:{
                        type:'number'
                    },
                    frames:{
                        type:'object'
                    },
                    smalls:{
                        type:'object'
                    }
                }});
                var step7 = new HighlightSmall({description:'highlight',struct:{
                    curr:{
                        type:'number'
                    },
                    frames:{
                        type:'object'
                    },
                    smalls:{
                        type:'object'
                    }
                }});
                var step8 = new Delay({description:'delay',struct:{
                    delay:{
                        type:'number'
                    },
                    frames:{
                        type:'object'
                    },
                    smalls:{
                        type:'object'
                    }
                }});
                var step9 = new BindEvent({
                    description:'bind event',
                    struct:{
                        frames:{
                            type:'object'
                        },
                        smalls:{
                            type:'object'
                        }
                    },
                    inputs:{
                        'click':function(data){
                            _this.go(step5,data);
                        }
                    }
                });
                var step10 = new GotoFocus({description:'goto',struct:{
                    curr:{
                        type:'number'
                    },
                    frames:{
                        type:'object'
                    },
                    smalls:{
                        type:'object'
                    }
                }});
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
    
    module.exports = ConsoleFlow;
});
