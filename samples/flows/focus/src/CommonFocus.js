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
                var steps = this._steps();
                this._addStep('获取焦点图数据',new steps.GetData());
                this._addStep('获取焦点图模板',new steps.GetTemplate());
                this._addStep('渲染焦点图',new steps.Render());
                this._addStep('获取相关Dom元素',new steps.GetDoms());
                this._addStep('启动焦点图轮播',new steps.Start());
                this._addStep('切换焦点图',new steps.Play());
                this._addStep('高亮缩略图',new steps.Highlight());
                this._addStep('延迟',new steps.Delay());
                this._addStep('播放到指定的帧数',new steps.Goto());
                this._addStep('准备显示下一帧',new steps.Next());
                this._addStep('切换焦点图标题',new steps.ChangeTitle());
                this._addStep('绑定用户切换事件',new steps.BindEvent({
                    inputs:{
                        'click':function(data){
                            _this.go('播放到指定的帧数',data);
                            _this.go('切换焦点图');
                        },
                        'mouseonfocus':function(){
                            _this.pause();
                        },
                        'mouseoutfocus':function(){
                            _this.resume();
                        }
                    }
                }));
                this.go('获取焦点图数据');
                this.go('获取焦点图模板');
                this.go('渲染焦点图');
                this.go('获取相关Dom元素');
                this.go('绑定用户切换事件');
                this.go('启动焦点图轮播');
                this.go('切换焦点图');
                this.go('高亮缩略图');
                this.go('切换焦点图标题');
                this.go('延迟');
                this.go('准备显示下一帧');
                this.go('切换焦点图');
                this._addInterface('goto',function(n){
                    this.go('播放到指定的帧数',{curr:n});
                    _this.go('切换焦点图');
                });
            }
        }
    });

    module.exports = CommonFocusFlow;
});

