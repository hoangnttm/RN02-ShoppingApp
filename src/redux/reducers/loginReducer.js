import { USER_UPDATE_PROFILE_FAILURE, USER_HAS_LOGIN, USER_UPDATE_PROFILE_SUCCESS } from "../actions/userAction"

const initialState = {
    accessToken: null,
    currentUser: {},
    wasLogin: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_ACCESS_TOKEN":
            console.log(`SET_ACCESS_TOKEN ${action.payload.accessToken}`);
            return { ...state, accessToken: action.payload.accessToken };
        case "LOGOUT":
            console.log(`LOGOUT`);
            return { ...state, accessToken: null, wasLogin: false };
        case USER_HAS_LOGIN:
            console.log(`USER_HAS_LOGIN`);
            return { ...state, currentUser: action.payload, wasLogin: true };
        case USER_UPDATE_PROFILE_SUCCESS:

            console.log(`USER_UPDATE_PROFILE_SUCCESS`);
            let _user = action.payload;
            if (!!state.currentUser.avatar) {
                _user = { ..._user, avatar: state.currentUser.avatar }
            }
            return { ...state, currentUser: _user };
        case USER_UPDATE_PROFILE_FAILURE:
            return { ...state, currentUser: null };
        default:
            return { ...state };
    }
}
