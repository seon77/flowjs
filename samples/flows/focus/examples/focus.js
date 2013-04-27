define(function(require, exports, module) {

    var Flow = require('../src/CommonFocus');

    module.exports = new Flow({
        steps:{
            GetData:require('../src/steps/getData'),
            GetTemplate:require('../src/steps/getTemplate'),
            Render:require('../src/steps/render'),
            Start:require('../src/steps/start'),
            Play:require('../src/steps/play'),
            GetDoms:require('../src/steps/getDoms'),
            Highlight:require('../src/steps/highlight'),
            Delay:require('../src/steps/delay'),
            BindEvent:require('../src/steps/bindEvent'),
            Next:require('../src/steps/next'),
            ChangeTitle:require('../src/steps/changeTitle'),
            Goto:require('../src/steps/goto')
        }
    });
});

