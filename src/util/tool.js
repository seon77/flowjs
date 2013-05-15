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
                if(console.log.apply){
                    console.log.apply(console,arguments);
                }
                else{
                    var args = Array.prototype.slice.apply(arguments,0);
                    var str = args.join(' ');
                    console.log(str);
                }
            }
        }
    }
});