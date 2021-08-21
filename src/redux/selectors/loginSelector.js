
export const getAccessTokenSelector = (state) => {
    return state.loginReducer.accessToken;
}
export const getCurrentUserSelector = (state) => {
    return state.loginReducer.currentUser;
}
export const getWasLogginStatusSelector = (state) => {
    return state.loginReducer.wasLogin;
}