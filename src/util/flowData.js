/*
 *
 * 流程共享数据
 *
 *
 */

define(function (require, exports, module) {

    var Class = require("./class");
    var tool = require("./tool");

    var FlowData = Class({
        construct: function (options) {
            /*
             *   data
             *       "name":
             *           exp:  过期时间
             *           data:
             *
             * */

            this._data = {};
        },
        methods: {
            /*
             * getData
             * param:
             *   dataNames  array/string
             *
             * */
            getData: function (dataNames) {
                var result = {};
                var now = new Date().getTime();
                if (tool.isArray(dataNames)) {
                    var length = dataNames.length;
                    for (var i = 0; i < length; i++) {
                        var name = dataNames[i];
                        if (this._data[name] && this._data[name]["exp"] > now) {
                            result[name] = this._data[name]["data"]
                        }
                    }
                } else {
                    result[dataNames.toString()] = this_data[dataNames.toString()];
                }
                return result;
            },
            setData: function (opt) {
                var name = opt.name;
                if (name) {
                    var data = opt.data;
                    var exp = opt.exp || 9366122571939;
                    this._data[name] = {
                        exp: exp,
                        data: data
                    };
                    return true;
                }
                return false;
            }
        }
    })


});