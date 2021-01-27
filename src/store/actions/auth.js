import axios from '../../axios-SE';
import * as actionTypes from './actionTypes';
import { loginRoute, authRequestTimeoutSec } from '../../shared/consts';

let authRequestInterceptor;

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, type, stationId) => {
    authRequestInterceptor = axios.interceptors.request.use(request => {
        request.headers.Authorization = `Bearer ${token}`;
        return request;
    });

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        usertype: type,
        station: stationId,
    };
};

const authFail = (error) => {
    console.log("hiii")
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
    localStorage.removeItem('station');
    localStorage.removeItem('expirationDate');
    axios.interceptors.request.eject(authRequestInterceptor);
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const checkAuthTimeout = (expirationTime) => (dispatch) => {
    setTimeout(() => {
        dispatch(authLogout());
    }, expirationTime * 1000)
};

export const auth = (email, password) => (dispatch) => {
    dispatch(authStart());
    let authData = {
        email: email,
        password: password,
    }
    let url = loginRoute;

    axios.post(url,
        authData)
        .then((response) => {
            console.log(response)
            console.log(response.data)
            console.log(response.data.success)
            if (response.data.success) {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + authRequestTimeoutSec * 1000);
                console.log(response.data.type);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('usertype', response.data.type);
                console.log(response.data.stationID);
                localStorage.setItem('station', response.data.stationID);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.token, response.data.type,response.data.stationID));
                dispatch(checkAuthTimeout(authRequestTimeoutSec));
            } else {
                dispatch(authFail('Invalid Username or Password'));
            }
            if (response.error){
                dispatch(authFail('Invalid Username or Password'));
            }
        });
}

export const authCheckState = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(authLogout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(authLogout());
        } else {
            const usertype = localStorage.getItem('usertype');
            const stationId = localStorage.getItem('station');
            console.log(stationId);
            dispatch(authSuccess(token, usertype, stationId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}
