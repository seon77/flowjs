define(function(require,exports,module){

    var _Object = require('./baseobject');

    var Class = function(data){
        var superclass = data.extend || _Object;
        var superproto = function(){};
        var plugins = data.plugins || [];
        superproto.prototype = superclass.prototype;
        var constructor = data.construct || function(){};
        var properties = data.properties || {};
        var methods = data.methods || {};
        var statics = data.statics || {};
        var proto = new superproto();
        for(var key in proto){
            if(proto.hasOwnProperty(key)){
                delete proto[key];
            }
        }
        for(var key in properties){
            proto[key] = properties[key];
        }
        for(var key in methods){
            proto[key] = methods[key];
        }
        for(var i = 0; i < plugins.length; i++){
            var plugin = plugins[i];
            for(var key in plugin){
                proto[key] = plugin[key];
            }
        }
        proto.constructor = constructor;
        proto.superclass = superclass;
        // proto.__NAME__ = name;
        constructor.prototype = proto;
        for(var key in statics){
            constructor[key] = statics[key];
        }
        return constructor;
    }

    Class.abstractMethod = function(){
        throw new Error('Not implement.');
    }
    
    module.exports = Class;
});
