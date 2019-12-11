import axios from 'axios'
import Vue from 'vue'

// 超时时间
axios.defaults.timeout = 15000;
// axios.defaults.withCredentials=true;
// http请求拦截器
axios.interceptors.request.use(config => {
    Vue.$vux.loading.show({
        text: 'Loading'
    });
    return config
}, error => {
    setTimeout(() => {
        Vue.$vux.loading.hide();
        Vue.$vux.toast.text('加载超时', 'middle')
    }, 3000);
    return Promise.reject(error)
});
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
    Vue.$vux.loading.hide();
    return data
}, error => {
    setTimeout(() => {
        Vue.$vux.loading.hide();
        Vue.$vux.toast.text('请求失败', 'middle')
    }, 1000);
    return Promise.reject(error)
});
export default axios;