define(function(require, exports, module) {

    var Flow = require('../src/console');

    module.exports = new Flow({
        steps:{
            ConsoleStep:require('../src/steps/console'),
            ConditionStep:require('../src/steps/condition')
        }
    });

    window.focus = module.exports;
});

