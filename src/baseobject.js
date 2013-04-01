define(function(require,exports,module){

    var _Object = function(){};
    var proto = new Object();
    proto.superclass = Object;
    proto.__NAME__ = 'Object';
    proto.superinstance = new Object();
    var extend = function (target, source) {
        for (var p in source) {
            if (source.hasOwnProperty(p)) {
                target[p] = source[p];
            }
        }
        return target;
    };
    proto.callsuper = function(methodName){
        var _this = this;
        /* 在一次调用过程中，逐级记录父类引用，保证正确调用父类方法。不支持在异步过程中调用callsuper */
        if(!this._realsuper){
            this._realsuper = this.superclass;
        }
        else{
            this._realsuper = this._realsuper.prototype.superclass;
        }
        if(typeof methodName == 'string'){
            var args = Array.prototype.slice.call(arguments,1);
            _this._realsuper.prototype[methodName].apply(_this,args);
        }
        else{
            var args = Array.prototype.slice.call(arguments,0);
            _this._realsuper.apply(_this,args);

        }
        this._realsuper = null;
    };
    _Object.prototype = proto;
    module.exports = _Object;
});
