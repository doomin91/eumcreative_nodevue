import http from './http';
import VueCookies from 'vue-cookies'

http.defaults.headers.common.accessToken = VueCookies.get('accessToken')

export async function getInterestPolicies (){
    return http.post(`/api/getInterestPolicies`);
}

export async function getInterestPolicy (deviceSeq){
    return http.get(`/api/getInterestPolicy/${deviceSeq}`);
}

export async function setInterestPolicy (data){
    const now = new Date();
    const userSeq = VueCookies.get("USER_SEQ");
    const insertData = {
        IP_TITLE: data.IP_TITLE,
        IP_CONTENT: data.IP_CONTENT,
        DEVICE_ID: data.DEVICE_ID,
        POLICY_DATA: JSON.stringify(data.POLICY_DATA),
        START_DATETIME: data.START_DATETIME,
        END_DATETIME: data.END_DATETIME,
        ALERT_MAIL: data.ALERT_MAIL,
        CREATE_USER: userSeq,
        DEL_YN: 'N',
        IP_STATUS: 'N',
        CREATE_DATE: now
    }
    return http.post("/api/setInterestPolicy", insertData);
}

export async function getDevice (){
    return http.get(`/api/getDevice`);
}

export async function getDeviceInfo (deviceSeq){
    return http.get(`/api/getDeviceInfo/${deviceSeq}`);
}

export async function newDeviceInfo(deviceForm){
    return http.post(`/api/newDeviceInfo`, deviceForm);
}

export async function setDeviceInfo (deviceForm){
    return http.post(`/api/setDeviceInfo`, deviceForm);
}

export async function deleteDevice (deviceSeq){
    return http.post(`/api/deleteDevice`, { deviceSeq : deviceSeq });
}

export async function getDeviceFromCollector (){
    return http.get(`/api/getDeviceFromCollector`);
}

export async function getAllPolicy(data){
    return http.post(`/api/getAllPolicy`, data);
}

export async function getUnusedPolicy(data){
    return http.post(`/api/getUnusedPolicy`, data);
}

export async function getPolices (deviceId) {
    return http.get(`/api/getPolices/${deviceId}`);
}

export async function getPolicy (deviceId, policyNumber) {
    return http.get(`/api/getPolicy/${deviceId}/${policyNumber}`);
}

export async function getRelativePolices (data){
    return http.post(`/api/getRelativePolices`, data);
}

export async function getNatPolices (){
    return http.get(`/api/getNatPolices`);
}

export async function getNatPolicyOne (deviceId){
    return http.get(`/api/getNatPolicyOne/:deviceId`, {deviceId : deviceId});
}

// type = Network, User, Application
export async function getObject (type){
    return http.get(`/api/getObject/${type}`);
}

export async function getAddress (data){
    return http.post(`/api/getAddress`, data);
}

export async function getService (data){
    return http.post(`/api/getService`, data);
}

export async function getUser (data){
    return http.post(`/api/getUser`, data);
}

export async function getUserGroup (data){
    return http.post(`/api/getUserGroup`, data);
}

export async function getMapData (){
    return http.get(`/api/getMapData`);
}