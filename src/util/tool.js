/*
 *
 * 简易工具
 *
 *
 */

define(function (require, exports, module) {
    module.exports = {
        isArray: Array.isArray || function (arg) {
            return Object.prototype.toString.call(arg) == '[object Array]';
        },
        log:function(){
            if(window.console){
                console.log.apply(console,arguments);
            }
        }
    }
});