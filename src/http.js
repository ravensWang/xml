/**
 * 构造 Http 模块
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['module'], function(module){
            return factory(module, window['axios']);
        });
    } else {
        factory(module, require('axios'));
    }
})(function (module, axios) {
    function Http(baseURL, option) {
        var defOpt = {
            timeout: 5000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        // 初始化 http 对象
        var http = axios.create(Object.assign({
            baseURL: baseURL || '',
        }, defOpt, option || {}));
        http.interceptors.response.use(function(response){
            if (response.status === 200 || response.statusText === 'OK') {
                return response.data;
            }
            return response;
        }, function(error){
            return Promise.reject(error.response);
        });
        return http;
    }

    function qs (data) {
        var param = [];
        data || (data = {});
        for (var key in data) {
            param.push(key + '=' + data[key]);
        }
        if (param.length > 0) {
            return param.join('&')
        }
        return ''
    }

    function Ajax(baseURL, option) {
        let opt = Object.assign({
            success: 10000
        }, option || {})
        const http = new Http(baseURL, option);
        http.interceptors.response.use(function(response){
            if (response.code || response.code === 0) {
                if (response.code === opt.success) {
                    return response.data;
                }
                return Promise.reject(response);  
            } else {
                return response;
            }
        }, function(error){
            if (error) {
                return Promise.reject(error.response);  
            }
            return Promise.reject(error);
        });

        return {
            get: function(url, data) {
                let query = qs(data)
                return http({
                    method: 'get',
                    url: url + (query ? '?' + query : query),
                });
            },
            post: function(url, data) {
                return http({
                    method: 'post',
                    url: url,
                    data: qs(data),
                });
            },
            // 表单提交，比如需要上传文件
            form: function (url, data) {
                return http({
                    method: 'post',
                    url: url,
                    data: data,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            },
            put: function (url, data) {
                let query = qs(data)
                return http({
                    method: 'put',
                    url: url,
                    data: query,
                });
            },
            'delete': function () {
                let query = qs(data)
                return http({
                    method: 'delete',
                    url: url + (query ? '?' + query : query),
                });
            }
        };
    }
    module.exports = {
        Http: Http,
        Ajax: Ajax
    };
});

