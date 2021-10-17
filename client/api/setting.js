import http from './http';
import VueCookies from 'vue-cookies'

http.defaults.headers.common.accessToken = VueCookies.get('accessToken')

/**
 * 
 * TAKEOVER API REQUEST
 * 
 */

export async function getTakeOver (){
    return http.post('/api/getTakeOver');
}

export async function getTakeOverOne (data){
    return http.post('/api/getTakeOverOne', data);
}

/**
 * Policy Setting Request
 */

export async function getPolicyAdminList (){
    return http.post('/api/getPolicyAdminList');
}

export async function insertPolicyAdmin (data){
    return http.post('/api/insertPolicyAdmin', data);
}

export async function deletePolicyAdmin (data){
    return http.post('/api/deletePolicyAdmin', data);
}

export async function updatePolicyAdmin (data){
    return http.post('/api/deletePolicyAdmin', data);
}

export async function getPolicyLimits (){
    return http.post('/api/getPolicyLimits');
}

export async function insertPolicyLimit (data){
    return http.post('/api/insertPolicyLimit', data);
}

export async function updatePolicyLimit (data){
    return http.post('/api/updatePolicyLimit', data);
}

export async function deletePolicyLimit (data){
    return http.post('/api/deletePolicyLimit', data);
}

export async function getDeviceList(){
    return http.post('/api/getDeviceList');
}

export async function getDeviceFromCollector() {
    return http.post('/collector/getDeviceList');
}

export async function getSmtpInfo(){
    return http.post('/api/getSmtpinfo');
}

export async function saveSmtpSetting(data) {
    return http.post('/api/saveSmtpSetting', data);
}

export async function sendTestEmail(data) {
    return http.post('/api/sendTestEmail', data);
} 

export async function sendMail(data) {
    return http.post('/api/sendMail', data);
} 

export async function getMailForm(data){
    return http.post('/api/getMailForm', data);
}

export async function getMailFormList(){
    return http.post('/api/getMailFormList');
}

export async function updateMailForm(data){
    return http.post('/api/updateMailForm', data);
}

export async function getConfirmLineList(){
    const UserSeq = VueCookies.get("USER_SEQ");
    return http.get(`/api/getConfirmLineList/${UserSeq}`);
}

export async function newConfirmLine(data){
    return http.post(`/api/newConfirmLine`, data);
}

export async function deleteConfirmLine(data){
    return http.post('/api/deleteConfirmLine', data);
}

export async function moveApplies(data){
    return http.post('/api/moveApplies', data);
}

export async function approvalTakeOver(data){
    return http.post('/api/approvalTakeOver', data);
}
/**
 * Device Info
 */