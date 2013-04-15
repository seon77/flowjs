define("flowjs/CommonFocus/1.0.0/CommonFocus-debug", [ "./baseclasses/getData-debug", "./baseclasses/getTemplate-debug", "./baseclasses/render-debug", "./baseclasses/start-debug", "./baseclasses/play-debug", "./baseclasses/getDoms-debug", "./baseclasses/highlight-debug", "./baseclasses/delay-debug", "./baseclasses/bindEvent-debug" ], function(require, exports, module) {
    var Class = Flowjs.Class;
    var Flow = Flowjs.Flow;
    var GetData = require("./baseclasses/getData-debug");
    var GetTemplate = require("./baseclasses/getTemplate-debug");
    var Render = require("./baseclasses/render-debug");
    var Start = require("./baseclasses/start-debug");
    var Play = require("./baseclasses/play-debug");
    var GetDoms = require("./baseclasses/getDoms-debug");
    var Highlight = require("./baseclasses/highlight-debug");
    var Delay = require("./baseclasses/delay-debug");
    var BindEvent = require("./baseclasses/bindEvent-debug");
    var CommonFocusFlow = Class({
        extend: Flow,
        construct: function(options) {
            this.callsuper(options);
        },
        methods: {
            //初始化流程
            start: function() {
                var _this = this;
                var step1 = new GetData({
                    description: "get data"
                });
                var step2 = new GetTemplate({
                    description: "get template"
                });
                var step3 = new Render({
                    description: "generate"
                });
                var step4 = new GetDoms({
                    description: "get doms"
                });
                var step5 = new Start({
                    description: "start"
                });
                var step6 = new Play({
                    description: "play"
                });
                var step7 = new Highlight({
                    description: "highlight"
                });
                var step8 = new Delay({
                    description: "delay"
                });
                var step9 = new BindEvent({
                    description: "bind event",
                    inputs: {
                        click: function(data) {
                            _this.go(step5, data);
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

define("flowjs/CommonFocus/1.0.0/baseclasses/getData-debug", [], function(require, exports, module) {
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var FocusData = Class({
        extend: Step,
        construct: function(options) {
            this.callsuper(options);
        },
        methods: {
            _process: function(data, callback) {
                callback();
            }
        }
    });
    module.exports = FocusData;
});

define("flowjs/CommonFocus/1.0.0/baseclasses/getTemplate-debug", [], function(require, exports, module) {
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var FocusTemplate = Class({
        extend: Step,
        construct: function(options) {
            this.callsuper(options);
        },
        methods: {
            _process: function(data, callback) {
                callback();
            },
            _describeData: function() {
                return {
                    data: {
                        type: "object",
                        empty: true
                    }
                };
            }
        }
    });
    module.exports = FocusTemplate;
});

define("flowjs/CommonFocus/1.0.0/baseclasses/render-debug", [], function(require, exports, module) {
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var FocusGenerator = Class({
        extend: Step,
        construct: function(options) {
            this.callsuper(options);
        },
        methods: {
            _process: function(data, callback) {
                callback();
            },
            _describeData: function() {
                return {
                    template: {
                        type: "string",
                        empty: true
                    },
                    data: {
                        type: "object",
                        empty: true
                    }
                };
            }
        }
    });
    module.exports = FocusGenerator;
});

define("flowjs/CommonFocus/1.0.0/baseclasses/start-debug", [], function(require, exports, module) {
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var curr = 0;
    var StartFocus = Class({
        extend: Step,
        construct: function(options) {
            this.callsuper(options);
        },
        methods: {
            _process: function(data, callback) {
                var frames = data.frames;
                var total = frames.length;
                if (data.hasOwnProperty("curr")) {
                    curr = data.curr;
                }
                callback(null, {
                    curr: curr
                });
                curr++;
                if (curr == total) {
                    curr = 0;
                }
            },
            _describeData: function() {
                return {
                    frames: {
                        type: "object"
                    }
                };
            }
        }
    });
    module.exports = StartFocus;
});

define("flowjs/CommonFocus/1.0.0/baseclasses/play-debug", [], function(require, exports, module) {
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var StartFocus = Class({
        extend: Step,
        construct: function(options) {
            this.callsuper(options);
        },
        methods: {
            _process: function(data, callback) {
                var curr = data.curr;
                var frames = data.frames;
                frames.css("zIndex", "");
                frames.css("opacity", 0);
                frames.hide();
                Q.$(frames[curr]).show();
                Q.$(frames[curr]).css("zIndex", 1);
                Q.$(frames[curr]).css("opacity", 1);
                callback();
            },
            _describeData: function() {
                return {
                    curr: {
                        type: "number"
                    },
                    frames: {
                        type: "object"
                    }
                };
            }
        }
    });
    module.exports = StartFocus;
});

define("flowjs/CommonFocus/1.0.0/baseclasses/getDoms-debug", [], function(require, exports, module) {
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var FocusData = Class({
        extend: Step,
        construct: function(options) {
            this.callsuper(options);
        },
        methods: {
            _process: function(data, callback) {
                var frames = Q.$("#j-focusBody").down("li");
                var smalls = Q.$("#j-focusBtn2").down("li");
                callback(null, {
                    frames: frames,
                    smalls: smalls
                });
            }
        }
    });
    module.exports = FocusData;
});

define("flowjs/CommonFocus/1.0.0/baseclasses/highlight-debug", [], function(require, exports, module) {
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var interval = 2e3, timer, curr = 0;
    var StartFocus = Class({
        extend: Step,
        construct: function(options) {
            this.callsuper(options);
        },
        methods: {
            _process: function(data, callback) {
                var smalls = data.smalls;
                smalls.removeClass("selected");
                Q.$(smalls[data.curr]).addClass("selected");
                callback(null, {
                    delay: 2e3
                });
            },
            _describeData: function() {
                return {
                    smalls: {
                        type: "object"
                    },
                    curr: {
                        type: "number"
                    }
                };
            }
        }
    });
    module.exports = StartFocus;
});

define("flowjs/CommonFocus/1.0.0/baseclasses/delay-debug", [], function(require, exports, module) {
    var Class = Flowjs.Class;
    var Step = Flowjs.Step;
    var timer;
    var StartFocus = Class({
        extend: Step,
        construct: function(options) {
            this.callsuper(options);
        },
        methods: {
            _process: function(data, callback) {
                var delay = data.delay;
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function() {
                    callback();
                }, delay);
            },
            _describeData: function() {
                return {
                    delay: {
                        type: "number"
                    }
                };
            }
        }
    });
    module.exports = StartFocus;
});

define("flowjs/CommonFocus/1.0.0/baseclasses/bindEvent-debug", [], function(require, exports, module) {
    var Class = Flowjs.Class;
    var Step = Flowjs.InputStep;
    var ConditionStep = Class({
        extend: Step,
        construct: function(options) {
            this.callsuper(options);
        },
        methods: {
            _process: function(data, callback) {
                var smalls = data.smalls;
                var _this = this;
                this._wait(function() {
                    smalls.on("mouseover", function(e) {
                        var target = Q.$(Q.event.get(e).target);
                        _this._inputs["click"].call(_this, {
                            curr: target.attr("_index") - 1,
                            frames: data.frames,
                            smalls: smalls
                        });
                    });
                });
                callback();
            },
            _describeData: function() {
                return {
                    frames: {
                        type: "object"
                    },
                    smalls: {
                        type: "object"
                    }
                };
            }
        }
    });
    module.exports = ConditionStep;
});
