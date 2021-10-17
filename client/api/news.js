import http from './http';

export async function getNewsData (){
    return http.get('/api/getNewsInfo');
}