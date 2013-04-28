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
                var getData = new steps.GetData({description:'get data'});
                var getTemplate = new steps.GetTemplate({description:'get template'});
                var render = new steps.Render({description:'generate'});
                var getDoms = new steps.GetDoms({description:'get doms'});
                var start = new steps.Start({description:'start'});
                var play = new steps.Play({description:'play'});
                var highlight = new steps.Highlight({description:'highlight'});
                var delay = new steps.Delay({description:'delay'});
                var goto = new steps.Goto({description:'goto'});
                var bindEvent = new steps.BindEvent({
                    description:'bind event',
                    inputs:{
                        'click':function(data){
                            _this.go(goto,data);
                            _this.go(play);
                        }
                    }
                });
                var next = new steps.Next({description:'next'});
                var changeTitle = new steps.ChangeTitle({description:'change title.'});
                this.go(getData);
                this.go(getTemplate);
                this.go(render);
                this.go(getDoms);
                this.go(bindEvent);
                this.go(start);
                this.go(play);
                this.go(highlight);
                this.go(changeTitle);
                this.go(delay);
                this.go(next);
                this.go(play);
                this._addInterface('goto',function(n){
                    this.go(goto,{curr:n});
                    _this.go(play);
                });
            }
        }
    });

    module.exports = CommonFocusFlow;
});

