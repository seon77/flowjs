flowjs
======

一个开放的，面向业务流程的，可灵活扩展和定制的前端业务开发框架。

框架思路
-------

互联网产品的特点就是快速的迭代更新，这就对前端的响应速度提出了挑战。flowjs的思路，就是通过抽象变化的产品形态背后相对稳定的业务流程，来以不变应万变！

框架由Flow（流程）和Step（步骤）两个类组成。Flow负责定义一个业务逻辑的流程，Step负责定义流程中的一个步骤。
这与一个流程图很类似，未来我们会提供工具来实现流程图与代码的互相转换。这样就可以实现可视化的流程制定。

Step类需要明确的定义本步骤所需要的参数。

基于同一个Flow，可以通过实现不同的Step类的子类来实现扩展与定制。

开发者可以贡献抽象的Flow，也可以贡献实现好的Step，达到开放、共享的目的。

Flow定义
-------

    var step1 = new Step({description:'step1'});
    var step2 = new Step({description:'step2'});
    var step3 = new Step({description:'step3'});
    var step4 = new Step({description:'step4'});
    var step5 = new ConditionStep({description:'step5',cases:{
        '1':function(){
            _this.go(step1);
        },
        '2':function(){
            _this.go(step6);
        }
    },defaultCase:function(){
        _this.go(step3);
    }});
    var step6 = new Step({description:'step6'});
    this.go(step1);
    this.go(step2);
    this.go(step3);
    this.go(step4);
    this.go(step5);

以上流程首先会顺序执行 1 -> 2 -> 3 -> 4 -> 5

step5是一个条件判断的步骤，这里会进行判断

如果结果为1，则继续 1 -> 2 -> 3 -> 4 -> 5

如果结果为2，则执行 6

其余情况，则继续 3 -> 4 -> 5

Step定义
-------

    var Next = Class({
        extend:Step,
        construct:function(options){
            this.callsuper(options);
        },
        methods:{
            _process:function(data,callback){
                var total = data.frames.length;
                var curr = data.curr + 1;
                if(curr == total){
                    curr = 0;
                }
                console.log(curr);
                callback(null,{curr:curr});
            },
            _describeData:function(){
                return {
                    input:{
                        frames:{
                            type:'object'
                        },
                        curr:{
                            type:'number'
                        }
                    },
                    output:{
                        curr:{
                            type:'number'
                        }
                    }
                };
            }
        }
    });

以上定义了一个步骤，要求输入的数据对象结构为：{curr:1,frames:{}}

v1.0.3发布
---------

流程支持暂停与恢复

规范接口，双下划线接口，子类及其他类均禁止使用与重写

焦点图demo支持鼠标悬停时，停止自动播放

删除无用文件