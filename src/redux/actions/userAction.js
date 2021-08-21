import { userGetProfile,userUpdateProfile } from '../../apis/userLoginApi'

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const LOGOUT = 'LOGOUT';
export const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS';
export const USER_UPDATE_PROFILE_FAILURE = 'USER_UPDATE_PROFILE_FAILURE';
export const USER_HAS_LOGIN = 'USER_HAS_LOGIN';

 const userUpdateProfileSuccess = payload => ({ type: USER_UPDATE_PROFILE_SUCCESS, payload });
 const userUpdateProfileFailure = payload => ({ type: USER_UPDATE_PROFILE_FAILURE, payload });
 const userCheckLoginSuccess = payload => ({ type: USER_HAS_LOGIN, payload });
 const userLogout = payload => ({ type: LOGOUT, payload });

export const userGetProfileAction = () => {
    return  dispatch=> userGetProfile(null)
        .then(res => {
            console.info(res.data.content);
            dispatch(userUpdateProfileSuccess(res.data.content));
        })
        .catch(err => {
            dispatch(userUpdateProfileFailure(data));
        });
};

export const userUpdateProfileAction  = (data) => {
    return async dispatch=> await userUpdateProfile(data)
        .then(res => {
            console.info(res.data.content);
            dispatch(userUpdateProfileSuccess(data));
            return true;
        })
        .catch(err => {
          //  dispatch(userUpdateProfileFailure(data));
            return false;
        });
};

export const userCheckLogin = () => {
    return  dispatch=> userGetProfile(null)
        .then(res => {
            console.info(res.data.content);
            dispatch(userCheckLoginSuccess(res.data.content));
        })
        .catch(err => {
            dispatch(userLogout(null));
        });
};