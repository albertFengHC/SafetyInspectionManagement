import Vue from 'vue'
import Vuex from 'vuex'
import {LoginUrl} from './../urlBase';
import router from './../router/index'

Vue.use(Vuex);

const state = {
    loginState: '',
    companyTree: '',
    userInfo: '',
    trapClass: '',
    reviewCheck: '',
    trapType: '',
    testType: '',
    trapLevel: '',
    testObject: ''
};

const mutations = {
    LoginUrlData(state, value) {
        const parameter = {
            username: value.username,
            password: value.password,
        };
        // 发送 POST 请求
        LoginUrl(parameter)
            .then(function (dataUrl) {
                const data = dataUrl.data;
                state.companyTree = data.companyTree;
                state.userInfo = data.userInfo;
                state.trapClass = data.trapClass;
                state.reviewCheck = data.reviewCheck;
                state.trapType = data.trapType;
                state.testType = data.testType;
                state.trapLevel = data.trapLevel;
                state.testObject = data.testObject;
                router.push({name: 'index'}).then(() => {});
            })
            .catch(data => {
                // console.log(data);
                state.loginState= data;
                setTimeout(()=>{
                    state.loginState = 1;
                }, 3000);
            });
    }
};

const actions = {
    getLoginUrl(store, value) {
        store.commit('LoginUrlData', value)
    },
};

export default new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions,
    modules: {}
})
