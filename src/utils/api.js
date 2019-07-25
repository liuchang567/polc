/* eslint-disable */
import axios from 'axios';
// 统一请求路径前缀
let base = 'http://127.0.0.1:3000';
// 超时设定
axios.defaults.timeout = 10000;

axios.interceptors.request.use(config => {
    return config;
}, err => {
    // Message.error('请求超时');
    return Promise.resolve(err);
});

export const getAxios = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params,
        withCredentials: true
    });
};

export const postAxios = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const postAxios2 = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};
