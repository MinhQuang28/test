"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var axios_1 = require("axios");
var query_string_1 = require("query-string");
var index_1 = require("../../config/index");
//function alertSessionTimeout() {
//   if (!sessionExpired) {
//     sessionExpired = true;
//     Alert.alert('Thông báo', 'Phiên đăng nhập hết hạn', [
//       {
//         text: 'Ok',
//         onPress: () => {
//           store.dispatch(action.authenticate.doLogout());
//           sessionExpired = false;
//         },
//       },
//     ]);
//   }
// }
var authorizedRequest = axios_1["default"].create({
    baseURL: index_1["default"].BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: function (parameters) {
        return query_string_1.stringify(parameters, { arrayFormat: 'comma' });
    }
});
authorizedRequest.interceptors.request.use(function (config) {
    var newConfig = __assign({}, config);
    if (config.data instanceof FormData) {
        newConfig.headers.common['Content-Type'] = 'multipart/form-data';
    }
    return newConfig;
});
var sessionExpired = false;
authorizedRequest.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    if (error && error.response && error.response.status === 401) {
        // alertSessionTimeout();
        return new Promise(function () { });
    }
    throw error;
});
exports["default"] = authorizedRequest;
