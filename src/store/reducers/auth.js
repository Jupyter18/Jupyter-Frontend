import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { authRedirectPath } from '../../shared/consts';

const initialState = {
    token: null,
    employeeID: null,
    IsAdmin: null,
    IsHrm: null,
    IsSupervisor: null,
    error: null,
    loading: false,
    authRedirectPath: authRedirectPath
};

const authStart = (state) => {
    return updateObject(
        state,
        {
            error: null,
            loading: true
        }
    );
};

const authSuccess = (state, action) => {
    return updateObject(
        state,
        {
            token: action.idToken,
            employeeID: action.employeeID,
            IsAdmin: action.IsAdmin,
            IsHrm: action.IsHrm,
            IsSupervisor: action.IsSupervisor,
            error: null,
            loading: false
        }
    );
};

const authFail = (state, action) => {
    return updateObject(
        state,
        {
            token: null,
            employeeID: null,
            IsAdmin: null,
            IsHrm: null,
            IsSupervisor: null,
            error: action.error,
            loading: false
        }
    );
};

const authLogout = (state) => {
    return updateObject(
        state,
        {
            token: null,
            employeeID: null,
            IsAdmin: null,
            IsHrm: null,
            IsSupervisor: null,
        }
    );
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        default: return state;
    };
};

export default reducer;