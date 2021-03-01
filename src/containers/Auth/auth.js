import React, { useState, useCallback, useEffect}  from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { checkValidity } from '../../shared/validate';
import { updateObject } from '../../shared/utility';
import { buildTextFields } from '../../helpers/uiHelpers';
import { auth } from '../../store/actions/index';
import { addAlert } from '../../store/actions/index';
import * as routez from '../../shared/routes';


const inputDefinitions = {
    gmail: {
        label: 'Employee ID*',
        validations: {
            required: true,
            validationErrStr: 'Enter a valid email',
        }
    },
    password: {
        label: 'Password*',
        type: 'password',
        validations: {
            required: true,
            minLength: 2,
            maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your password',
        }
    }
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginInput: {
    width: '100%',
    marginTop: '20px',
    color: 'white'
  },
}));

function SignIn(props) {
    const classes = useStyles();
    let history = useHistory();

    const [inputIsValid, setInputIsValid] = useState({
        gmail: true,
        password: true
    });

    const [authObj, setAuthObj] = useState({
        gmail: '',
        password: ''
    });

    const inputProperties = {
        gmail: {
            styleClass: classes.loginInput
        },
        password: {
            styleClass: classes.loginInput
        }
    };

    const checkInputValidity = useCallback((inputId, newValue) => {
        let isValid = true;
        let validationConst = inputDefinitions[inputId].validations;
        isValid = checkValidity(validationConst, newValue ? newValue : authObj[inputId])

        return isValid;
    }, [authObj])

    const inputChangeHandler = useCallback((event, inputId) => {
        let validationConst = inputDefinitions[inputId].validations;
        let isValid = checkValidity(validationConst, event.target.value);
        setInputIsValid(updateObject(inputIsValid, { [inputId]: isValid }));
        setAuthObj(updateObject(authObj, { [inputId]: event.target.value }))
    }, [authObj, inputIsValid]);

    let inputFields = buildTextFields(inputDefinitions, inputProperties, inputChangeHandler, inputIsValid);

    const onSubmitHandler = useCallback((event) => {
        event.preventDefault()

        let localInputIsValid = { ...inputIsValid };
        localInputIsValid['gmail'] = checkInputValidity('gmail');
        localInputIsValid['password'] = checkInputValidity('password');
        setInputIsValid(localInputIsValid);

        if (localInputIsValid['gmail'] && localInputIsValid['password']) {
            props.onAuth(
                authObj.gmail,
                authObj.password
            );
        }
    }, [authObj, checkInputValidity, inputIsValid, props]);

    const authError = props.error;
    useEffect(() => {
        if (authError) {
            alert(authError)
        }
    }, [authError,history]);

    // console.log(props.isAuthenticated)
    console.log("123")
    console.log(props.isAdmin)
    console.log(props.isHrm)
    console.log(props.IsSupervisor)
    console.log("123")
    // console.log(props.employeeID)
    let authRedirect = null;
    if (props.isAuthenticated){
        if(props.isAdmin===1){
            authRedirect = <Redirect to={routez.USER} />
        }else if(props.IsSupervisor===1){
            authRedirect = <Redirect to={routez.VIEWLEAVEAPPLICATION} />
        }else if(props.IsSupervisor===1){
            authRedirect = <Redirect to={routez.VIEWLEAVEAPPLICATION} />
        }else{
            authRedirect = <Redirect to={routez.EMPVIEWPROFILE} />
        }
    }

  return (
    <React.Fragment>
        <div className={classes.paper}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div >
                    <form noValidate autoComplete="off" className={classes.form} onSubmit={onSubmitHandler}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography variant="h5">
                            Sign In
                        </Typography>
                        {inputFields}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
        {authRedirect}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token != null,
        authRedirectPath: state.auth.authRedirectPath,
        employeeID:state.auth.employeeID,
        isAdmin:state.auth.IsAdmin,
        isHrm:state.auth.IsHrm,
        IsSupervisor:state.auth.IsSupervisor,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (gmail, password) => dispatch(auth(gmail, password)),
        addAlert: (alert) => dispatch(addAlert(alert))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);