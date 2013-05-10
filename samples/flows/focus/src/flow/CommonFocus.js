define(function(require, exports, module) {
    var Class = Flowjs.Class;
    var Flow = Flowjs.Flow;
    var CommonFocusFlow = Class({
        extend:Flow,
        construct:function(options){
            this.callsuper(options);
            this._addStep('获取焦点图数据',require('./stepdefinition/getData'));
            this._addStep('获取焦点图模板',require('./stepdefinition/getTemplate'));
            this._addStep('渲染焦点图',require('./stepdefinition/render'));
            this._addStep('获取相关Dom元素',require('./stepdefinition/getDoms'));
            this._addStep('启动焦点图轮播',require('./stepdefinition/start'));
            this._addStep('切换焦点图',require('./stepdefinition/play'));
            this._addStep('高亮缩略图',require('./stepdefinition/highlight'));
            this._addStep('延迟',require('./stepdefinition/delay'));
            this._addStep('播放到指定的帧数',require('./stepdefinition/goto'));
            this._addStep('计算下一帧的帧数',require('./stepdefinition/next'));
            this._addStep('切换焦点图标题',require('./stepdefinition/changeTitle'));
            this._addStep('绑定用户切换事件',require('./stepdefinition/bindEvent'));
        },
        methods:{
            //初始化流程
            start:function(){
                var _this = this;
                this.go('获取焦点图数据');
                this.go('获取焦点图模板');
                this.go('渲染焦点图');
                this.go('获取相关Dom元素');
                this.go('绑定用户切换事件',null,{
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
                });
                this.go('启动焦点图轮播');
                this.go('切换焦点图');
                this.go('高亮缩略图');
                this.go('切换焦点图标题');
                this.go('延迟');
                this.go('计算下一帧的帧数');
                this.go('切换焦点图');
                this._addInterface('goto',function(n){
                    this.go('播放到指定的帧数',{goto:n});
                    this.go('切换焦点图');
                });
            }
        }
    });

    module.exports = CommonFocusFlow;
});

