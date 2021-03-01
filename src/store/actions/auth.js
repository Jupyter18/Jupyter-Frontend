import axios from '../../axios-DB';
import * as actionTypes from './actionTypes';
import { loginRoute, authRequestTimeoutSec } from '../../shared/consts';

let authRequestInterceptor;

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, employeeId, isAdmin, isHrm,isSupervisor) => {
    authRequestInterceptor = axios.interceptors.request.use(request => {
        request.headers.Authorization = `Bearer ${token}`;
        return request;
    });

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        employeeID: employeeId,
        IsAdmin: isAdmin,
        IsHrm: isHrm,
        IsSupervisor: isSupervisor,      
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isHrm');
    localStorage.removeItem('isSupervisor');
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
        emp_id: email,
        password: password,
    }
    let url = loginRoute;
    console.log(authData)
    axios.post(`api/user/login`,
        authData)
        .then((response) => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + authRequestTimeoutSec * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('employeeId', response.data.emp_id);
                localStorage.setItem('isAdmin', response.data.is_admin);
                localStorage.setItem('isHrm', response.data.is_hrm);
                localStorage.setItem('isSupervisor', response.data.is_supervisor);
                localStorage.setItem('expirationDate', expirationDate);
                console.log(localStorage.getItem('employeeId'))
                console.log(localStorage.getItem('isAdmin'))
                console.log(localStorage.getItem('isSupervisor'))
                console.log(localStorage.getItem('isHrm'))
                dispatch(authSuccess(response.data.token, response.data.emp_id,response.data.is_admin,response.data.is_hrm,response.data.is_supervisor));
                dispatch(checkAuthTimeout(authRequestTimeoutSec));
        }).catch((error) =>{
            console.log("Try Again")
        })
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
            const employeeId = localStorage.getItem('employeeId');
            const isAdmin = localStorage.getItem('isAdmin');
            const isHrm = localStorage.getItem('isHrm');
            const isSupervisor = localStorage.getItem('isSupervisor');
            dispatch(authSuccess(token, employeeId, isAdmin, isHrm,isSupervisor));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}
