// 配置API接口地址
var root = '/weixin-user-server'
    // 引用axios
var axios = require('axios')
    // 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}

function apiAxios(method, url, params, call) {
    if (params) {
        params = filterNull(params);
    }
    axios({
            method: method,
            url: url,
            // headers: { Authorization: 'BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJIYW5XZWkiLCJjb3JwSWQiOiJ3d2MwMjYxNWY0YTg4NzNiNDYiLCJuYW1lIjoi6Z-p5LyfIiwiZXhwIjoxNTI2NjMwNzg4fQ.Euc6akUCTv4bOM9QNVx8VwTZZo3QvOc1SIOSV-RhEfCP3Za14iNL6ti_9Mcw77Sl2p3LoocD3aStZoo3mZx-zg' },
            headers: { Authorization: sessionStorage['token'] },
            params: params,
            baseURL: root,
            withCredentials: false
        })
        .then(function(res) {
            if (res.data.message) {
                // this.$Message.info('没有要导出的数据！！');
                document.body.childNodes[7].style.display = 'none'
                    // window.alert('')
            } else {
                call(res);
            }
        })
        .catch(function(err) {
            console.log(err);
            let res = err.response;
            if (err) {
                if (res.status == "401") {
                    location.href = "/oc/";
                }
                window.alert('api error, HTTP CODE: ' + res.status)
            }
        });
}

// 返回在vue模板中的调用接口
export default {
    get: function(url, params, call) {
        return apiAxios('GET', url, params, call)
    },
    post: function(url, params, call) {
        return apiAxios('POST', url, params, call)
    },
    put: function(url, params, call) {
        return apiAxios('PUT', url, params, call)
    },
    delete: function(url, params, call) {
        return apiAxios('DELETE', url, params, call)
    }
}