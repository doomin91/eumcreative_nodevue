import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://192.168.219.100:5000'
    baseURL: 'http://13.209.227.34'
});

// instance.interceptors.request.use(
//     function (config) {
//         // 요청 성공 직전 호출됩니다.
//         // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
//         console.log('success')
//         return config;
//     }, 
//     function (error) {
//         // 요청 에러 직전 호출됩니다.
//         console.log('failed')
//         return Promise.reject(error);
//     }
// );

export default instance;