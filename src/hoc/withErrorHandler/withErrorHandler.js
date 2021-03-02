import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addAlert } from '../../store/actions/index'
import getAlertFromError from '../../shared/errorAdapter';

const withErrorhandler = (WrappedComponent, axios) => {
    return (props) => {
        const { addAlert } = props;

        useEffect(() => {
            const resInterceptor = axios.interceptors.response.use(res => res, error => {
                addAlert(getAlertFromError(error));
                return Promise.reject(error);
            });

            return () => {
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [addAlert]);

        return (
            <WrappedComponent {...props} />
        );
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: (alert) => dispatch(addAlert(alert))
    };
};

const composedWithErrorHandler = compose(
    connect(null, mapDispatchToProps),
    withErrorhandler
);

export default composedWithErrorHandler;