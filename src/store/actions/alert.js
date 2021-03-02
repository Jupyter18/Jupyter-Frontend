import * as actionTypes from './actionTypes';

export const addAlert = (alert) => {
    console.log("111111111111111111")
    return {
        type: actionTypes.ADD_ALERT,
        alert: alert
    };
};

export const removeAlert = (alertId) => {
    return {
        type: actionTypes.REMOVE_ALERT,
        alertId: alertId
    };
};