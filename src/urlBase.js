import axios from 'axios';

// const baseUrl = 'http://192.168.1.5:8080/safeScreen/App/';
const baseUrl = 'http://129.28.66.56:8088/safeScreen/App/';

//登录
export function LoginUrl(url ,parameter){
    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            url: baseUrl+'user/login.do',
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
