"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.alertError = exports.safeAlert = void 0;
var react_native_1 = require("react-native");
var lodash_1 = require("lodash");
exports.safeAlert = function (title, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    // dismiss the keyboard
    react_native_1.Keyboard.dismiss();
    react_native_1.InteractionManager.runAfterInteractions(function () {
        // run after interactions
        setTimeout(function () {
            // put it on queue
            if (typeof title !== 'string' ||
                (message && typeof message !== 'string')) {
                react_native_1.Alert.alert.apply(react_native_1.Alert, __spreadArrays(['Có lỗi xảy ra', 'Lỗi không xác định từ máy chủ'], args));
            }
            else {
                react_native_1.Alert.alert.apply(react_native_1.Alert, __spreadArrays([title, message], args));
            }
        }, 0);
    });
};
exports.alertError = function (error, m) {
    if (typeof error === 'string') {
        return exports.safeAlert('Có lỗi xảy ra', 'Lỗi không xác định từ máy chủ');
    }
    if (error && error.response) {
        if (error.response.data && typeof error.response.data !== 'string') {
            return exports.safeAlert('Thông báo', lodash_1.get(error, 'response.data.error.fieldErrors.provider[0].message', '') !== '' || lodash_1.get(error, 'response.data.error.message', 'Error'));
        }
        else {
            exports.safeAlert("L\u1ED7i kh\u00F4ng x\u00E1c \u0111\u1ECBnh t\u1EEB m\u00E1y ch\u1EE7 , " + error.message, m);
        }
    }
};
