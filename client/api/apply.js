import http from './http';
import VueCookies from 'vue-cookies'

http.defaults.headers.common.accessToken = VueCookies.get('accessToken')
/**
 * 
 * APPLY API REQUEST 
 * 
 */

 
 /**
 * 쓰고 있던 신청서가 있는지 체크한다.
 * @param {int} userSeq
 */
export async function checkApplyInWriting(userSeq){
    try{
        return http.get(`/api/checkApplyInWriting/${userSeq}`);
    }catch(err){
        console.log(err);
        return err;
    }
    
}

/**
 * 쓰고 있던 신청서 삭제.
 * @param {int} applySeq
*/
export async function deleteApplyInWriting(applySeq){
    try{
        return http.put(`/api/deleteApplyInWriting`, {"APPLY_SEQ" : applySeq});
    }catch(err){
        console.log(err);
        return err;
    }
}

/**
 * 신청서를 가져온다.
 * @param {int} applySeq : 신청서 seq
*/
export async function getApply(applySeq){
    try{
        // console.log("CONTROLLER");
        // console.log(applySeq);
        return http.get(`/api/getApply/${applySeq}`);
    }catch(err){
        console.log(err);
        return err;
    }
}

/**
 * 신청서 상태를 가져온다.
 * @param {int} applySeq : 신청서 seq
*/
export async function getApplyStatus(applySeq){
    try{
        return http.get(`/api/getApplyStatus/${applySeq}`);
    }catch(err){
        console.log(err);
        return err;
    }
}


/**
 * 모든 신청서를 가져온다.
 * @param {Object} searchOptions : 검색 옵션
*/
export async function getApplies(SearchOptions){
    try{
        const Flag = SearchOptions.flag;
        const UserSeq = VueCookies.get("USER_SEQ");
        const UserAuth =  VueCookies.get("USER_AUTH");
        if(Object.keys(SearchOptions).length > 1){
            const StartDate = SearchOptions.startDate;
            const EndDate = SearchOptions.endDate;
            const SearchField = SearchOptions.searchField;
            const SearchString = SearchOptions.searchString;

            return http.get(`/api/getApplies/${Flag}/user/${UserSeq}/${UserAuth}?searchField=${SearchField}&searchString=${SearchString}&startDate=${StartDate}&endDate=${EndDate}`);
        }else{
            return http.get(`/api/getApplies/${Flag}/user/${UserSeq}/${UserAuth}`);
        }
        
    }catch(err){
        console.log(err);
        return err;
    }
    
}

/**
 * 작업이 끝난 모든 내 신청서를 불러온다
 * @param {Object} searchOptions : 검색 옵션
 */
export async function getMyApplies(searchOptions){
    try{
        console.log(searchOptions);
        const UserSeq = VueCookies.get("USER_SEQ");
        // VueCookies.set("USER_SEQ", 1);
        if(Object.keys(searchOptions).length > 0){
            const SearchString = searchOptions.searchString;

            return http.get(`/api/getMyApplies/${UserSeq}?searchString=${SearchString}`);
        }else{
            return http.get(`/api/getMyApplies/${UserSeq}`);
        }
    }catch(err){
        return err;
    }
}

/**
 * 내 신청서 불러오기 데이터 뿌리기 (1번째 신청서)
 * @param {Int} applySeq
 * @returns 
 */
 export async function getApplyCopyData(applySeq){
    try{
        return http.get(`/api/getApplyCopyData/${applySeq}`);
    }catch(err){
        return err;
    }
}

/**
 * 신청서 불러오기 후 2번째 스탭에서 확인
 * @param {Int} applySeq
 * @returns 
 */
 export async function checkCopyData(applySeq){
    try{
        return http.get(`/api/checkCopyData/${applySeq}`);
    }catch(err){
        return err;
    }
}

/**
 * 가장 최근 결재라인을 불러온다.
 * @param {int} flag : 1: 일반 결재, 2: 일반 결재 참조, 3: 작업 결재, 4: 작업 결재 참조 (홀수 결재, 짝수 결재 참조 -> 5, 6, 7, 8 상황에 따라 추가될 수 있음)
 */
export async function getLatestConfirmLine(flag){
    try{
        const UserSeq = VueCookies.get("USER_SEQ");
        // const UserSeq = 1;
        // console.log(UserSeq);
        return http.get(`/api/getLatestConfirmLine/${flag}/user/${UserSeq}`);
    }catch(err){
        return err;
    }
}

/**
 * 현재 유저 정보를 가져온다.
 */
 export async function getCurrentUserInfo(){
    try{
        const UserSeq = VueCookies.get("USER_SEQ");
        // const UserSeq = 1;
        // console.log(UserSeq);
        return http.get(`/api/getCurrentUserInfo/${UserSeq}`);
    }catch(err){
        return err;
    }
    
}

/**
 * 신청서 저장
 * @param {FormData} appFormData : 신청서 저장 데이터
 */
 export async function saveAppForm(appFormData){
    try{
        return http.post("/api/saveAppForm", appFormData);
        
    }catch(err){
        return err;
    }
    
}

/**
 * 신청서 수정
 * @param {FormData} appFormData : 신청서 저장 데이터
 */
 export async function editAppForm(appFormData){
    try{
        return http.post("/api/editAppForm", appFormData);
        
    }catch(err){
        return err;
    }
    
}

/**
 * 신청서 저장 (Step2)
 * @param {FormData} ruleData : 신청서 저장 데이터
 */
 export async function saveAppForm2(ruleData){
    try{
        const UserSeq = VueCookies.get("USER_SEQ");
        ruleData.append("UserSeq", UserSeq);
        return http.post("/api/saveAppForm2", ruleData);
        
    }catch(err){
        return err;
    }
    
}

/**
 * 신청서 수정 (Step2)
 * @param {FormData} ruleData : 신청서 수정 데이터
 */
 export async function editAppForm2(ruleData){
    try{
        const UserSeq = VueCookies.get("USER_SEQ");
        ruleData.append("UserSeq", UserSeq);
        return http.post("/api/editAppForm2", ruleData);
        
    }catch(err){
        return err;
    }
    
}

/**
 * 신청서 저장 (Step3)
 * @param {FormData} updateData
 */
 export async function saveApply(updateData){
    try{
        const UserSeq = VueCookies.get("USER_SEQ");
        updateData.append("UserSeq", UserSeq);
        return http.put(`/api/saveApply`, updateData);
        
    }catch(err){
        return err;
    }
}

/**
 * 작업결재 신청 (Step3)
 * @param {FormData} updateData
 */
 export async function applyWork(updateData){
    try{
        const UserSeq = VueCookies.get("USER_SEQ");
        updateData.append("UserSeq", UserSeq);
        return http.post(`/api/applyWork`, updateData);
        
    }catch(err){
        return err;
    }
}

/**
 * 작업결재 신청 시 수정 (Step3)
 * @param {FormData} updateData
 */
 export async function editApplyAtWork(updateData){
    try{
        const UserSeq = VueCookies.get("USER_SEQ");
        updateData.append("UserSeq", UserSeq);
        return http.post(`/api/editApplyAtWork`, updateData);
        
    }catch(err){
        return err;
    }
}

/**
 * 작업결재 신청 시 수정 취소 (Step3)
 * @param {Object} (ApplySeq: 값 포함)
 */
 export async function editApplyAtWorkCancel(updateData){
    try{
        const UserSeq = VueCookies.get("USER_SEQ");
        updateData.UserSeq = UserSeq;
        return http.post(`/api/editApplyAtWorkCancel`, updateData);
        
    }catch(err){
        return err;
    }
}

/**
 * 결재 승인
 * @param {Object} confirmData : confirm 저장 정보 (seq, 메모)
 */
 export async function confirmApprove(confirmData){
    try{
        const UserSeq = VueCookies.get("USER_SEQ");
        confirmData.UserSeq = UserSeq;
        return http.put(`/api/confirmApprove`, confirmData);
        
    }catch(err){
        return err;
    }
}

/**
 * 결재 반려
 * @param {Object} rejectData : confirm 저장 정보 (seq, 메모)
 */
 export async function confirmReject(rejectData){
    try{
        const UserSeq = VueCookies.get("USER_SEQ");
        rejectData.UserSeq = UserSeq;
        return http.put(`/api/confirmReject`, rejectData);
        
    }catch(err){
        return err;
    }
}

/**
 * 
 * @param {String} fileUrl 파일경로
 * @returns 
 */
 export async function getApplyAttach(seq){
    try{
        return http.get(`/api/getApplyAttach/${seq}`);
    }catch(err){
        return err;
    }
}

/**
 * 
 * @param {FormData} file 파일 데이터
 * @returns 
 */
export async function checkFileSignatureAndParse(file){
    try{
        return http.post("/api/checkFileSignatureAndParse", file);
    }catch(err){
        return err;
    }
}