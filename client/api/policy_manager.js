import http from './http';
import VueCookies from 'vue-cookies'

http.defaults.headers.common.accessToken = VueCookies.get('accessToken')

export async function getNode(nodeSeq){
    return http.post(`/api/getNode`, { nodeSeq : nodeSeq })
}

export async function getAllNode (){
    return http.get(`/api/getAllNode`);
}

export async function getRootNode (){
    return http.get(`/api/getRootNode`);
}

export async function getChildNode (parentSeq){
    return http.get(`/api/getChildNode/${parentSeq}`);
}

export async function deleteNode (nodeSeq){
    return http.post(`/api/deleteNode`, { nodeSeq : nodeSeq });
}

export async function saveNode (data){
    return http.post(`/api/saveNode`, data);
}

export async function modifyNode (data){
    return http.post(`/api/modifyNode`, data);
}

export async function filterSearch (data){
    return http.post(`/api/filterSearch`, data);
}

export async function exportFlowChart (){
    return http.get(`/api/exportFlowChart`);
}

export async function importFlowChart (encryptFile){
    return http.post(`/api/importFlowChart`, { encryptFile : encryptFile })
}