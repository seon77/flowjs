flowjs
======

一个开放的，面向业务流程的，可灵活扩展和定制的前端业务开发框架。

框架思路
-------

互联网产品的特点就是快速的迭代更新，这就对前端的响应速度提出了挑战。flowjs的思路，就是通过抽象变化的产品形态背后相对稳定的业务流程，来以不变应万变！

流程定义
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

以上流程首先会顺序执行1 -> 2 -> 3 -> 4 -> 5

step5是一个条件判断的步骤，这里会进行判断

如果结果为1，则继续 1 -> 2 -> 3 -> 4 -> 5

如果结果为2，则执行 6

其余情况，则继续 3 -> 4 -> 5