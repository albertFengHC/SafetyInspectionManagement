import axios from 'axios';

// const baseUrl = 'http://192.168.1.5:8044/safeScreen/App/';
const baseUrl = 'http://129.28.66.56:8044/safeScreen/App/';

//登录
export function LoginUrl(parameter){
    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            url: baseUrl+'user/login.do',
            data: parameter,
        })
            .then(response => {
                if(response.data.errcode === '-1'){
                    reject(response.data.errcode);
                }else {
                    resolve(response.data);
                }
            })
            .catch(function (error) {
                // console.log(error);
            });
    })
}

//隐患排查清单管理首页
export function MHDIListUrl(parameter){
    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            url: baseUrl+'CheckTrap/getTrapDaily.do',
            data: parameter,
        })
            .then(response => {
                resolve(response.data.data);
            })
            .catch(function (error) {
                // console.log(error);
            });
    })
}

//隐患排查清单管理未按期销号统计
export function NCOScheduleUrl(parameter){
    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            url: baseUrl+'CheckTrap/getTrapDailyList.do',
            data: parameter,
        })
            .then(response => {
                resolve(response.data.data);
            })
            .catch(function (error) {
                // console.log(error);
            });
    })
}

//隐患排查清单管理未按期销号统计详情
export function NCOScheduleDetailsUrl(parameter){
    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            url: baseUrl+'CheckTrap/getTrapDailyByFid.do',
            data: parameter,
        })
            .then(response => {
                resolve(response.data.data);
            })
            .catch(function (error) {
                // console.log(error);
            });
    })
}