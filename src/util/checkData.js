define(function (require, exports, module) {
    var isArray = Array.isArray || function(arg){
        return Object.prototype.toString.call(arg) == '[object Array]';
    }
    module.exports = {
        check:function (struct, data) {
            var self = this;
            if (!struct) {
                return true;
            }
            var result = true;
            for(var key in struct){
                var item = struct[key];
                if (!(key in data)) {
                    throw new Error('缺少字段[' + key + ']');
                }
                else {
                    if (struct[key].type == 'number' && typeof data[key] != 'number') {
                        throw new Error('字段[' + key + ']不是数字');
                    }
                    else if (struct[key].type == 'string' && typeof data[key] != 'string') {
                        throw new Error('字段[' + key + ']不是字符串');
                    }
                    else if (struct[key].type == 'array') {
                        if (!self.checkArray(struct[key], data[key])) {
                            throw new Error('字段[' + key + ']值与定义不符');
                        }
                    }
                    else if (struct[key].type == 'object') {
                        if (!self.checkObject(struct[key].struct, data[key])) {
                            throw new Error('字段[' + key + ']值与定义不符');
                        }
                    }
                    else if (struct[key].empty !== true && self.isEmpty(struct[key], data[key])) {
                        throw new Error('字段[' + key + ']值为空');
                    }
                }
            }
            return result;
        },
        checkArray:function (rule, data) {
            var self = this;
            if (isArray(data)) {
                for (var i = 0; i < data.length; i++){
                    var item = data[i];
                    if (!self.checkData(rule.item, item)) {
                        return false;
                    }
                }
                return true;
            }
            else {
                return false;
            }
        },
        checkObject:function (rule, data) {
            return this.check(rule, data);
        },
        isEmpty:function (rule, data) {
            if (rule.type == 'object') {
                return data === null;
            }
            else if (rule.type == 'array') {
                return data.length == 0;
            }
            else {
                return data === '';
            }
        },
        checkData:function (rule, data) {
            if (rule.type == 'number' && typeof data == 'number') {
                return true;
            }
            else if (rule.type == 'string' && typeof data == 'string') {
                return true;
            }
            else if (rule.type == 'boolean' && typeof data == 'boolean') {
                return true;
            }
            else if (rule.type == 'array') {
                return this.checkArray(rule.item, data);
            }
            else if (rule.type == 'object') {
                return this.checkObject(rule.struct, data);
            }
            return false;
        }
    }
});