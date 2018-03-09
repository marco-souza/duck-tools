"use strict";
exports.__esModule = true;
var _ = require("lodash");
exports.defineReducer = function (reducersMap, getDefaultState) {
    if (getDefaultState === void 0) { getDefaultState = function () { }; }
    reducersMap = _.defaults(reducersMap, {
        beforeReduce: _.identity,
        afterReduce: _.identity
    });
    return function (state, action) {
        if (state === undefined) {
            state = getDefaultState();
        }
        var payload = action.payload;
        state = reducersMap.afterReduce(state, payload);
        var reducer = reducersMap[action.type];
        if (reducer) {
            state = reducer(state, payload);
        }
        return reducersMap.afterReduce(state, payload);
    };
};
exports.defineTypes = function (obj, valuePrefix) {
    valuePrefix = valuePrefix || '';
    var ret = obj;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret[key] = valuePrefix ? valuePrefix + '#' + key : key;
        }
    }
    return ret;
};
