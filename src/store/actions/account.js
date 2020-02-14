import {
    SET_ACCOUNT,
    SIGN_IN_ACCOUNT,
    // START_LOADING
} from ''


export const signIn = (acountInfo) => {
    console.log("sigInのaction処理が実装された")
    return {
        type: SIGN_IN_ACCOUNT,
        payload: {
            token:"aa1",
            id: 1,
            email: acountInfo.inputEmail,
            username:acountInfo.inputPassword
        }
    }
}




export const signUp = (acountInfo) => {
    console.log("sigUpのaction処理が実装された")
    return {
        type: SET_ACCOUNT,
        payload: {
            token:"aa1",
            id: 3,
            email: acountInfo.inputEmail,
            username:acountInfo.inputPassword
        }
    }
}