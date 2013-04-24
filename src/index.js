define(function(require,exports,module){
    window.Flowjs = {
        Class:require('./util/class'),
        Flow:require('./flow'),
        Step:require('./step'),
        ConditionStep:require('./condition'),
        InputStep:require('./input')
    };
});
