import React, { useState, useCallback } from "react";
import { connect } from 'react-redux';

import {saveLeaveHRM} from "../../api/LeavesAPI"
import * as actions from '../../store/actions/index';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { checkValidity } from '../../shared/validate';

import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
// grid

// card
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';


// form
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import Alert from '../../components/UI/FHAlert/FHAlert';
import { removeAlert } from "../../store/actions/index";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        width: '100%',
        color: 'blue',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        justifyItems: 'center'
    },
    card:{
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
      },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    }
}));

const inputDefinitions = {
    employeeId: {
        label: 'Employee Id*',
        validations: {
            required: true,
            minLength: 2,
            maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your first Name',
        }
    },
    leaveType: {
        label: 'Leave Type*',
        validations: {
            required: true,
            minLength: 1,
            maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your Last Name',
        }
    },
};
const UserProfile = props =>  {
    const classes = useStyles();
    const { addAlert } = props;
    const [employeeIderr, setEmployeeIderr] =useState();
    const [leaveTypeerr, setLeaveTypeerr] =useState();
    const [employee_ID, setEmployeeId] = useState([]);
    const [leave_Type, setLeaceType] = useState([]);

    const removeAlert = props.removeAlert;
    const handleAlertClose = useCallback((alertId) => {
        removeAlert(alertId);
    }, [removeAlert]);


    const inputChangeHandler = useCallback((event, inputId) => {
        let validationConst = inputDefinitions[inputId].validations;
        let isValid = checkValidity(validationConst, event.target.value);
        if (inputId==="employeeId") {
            setEmployeeId(event.target.value)
            setEmployeeIderr(!isValid)
        }  
        if (inputId==="leaveType") {
            setLeaceType(event.target.value)
            setLeaveTypeerr(!isValid)
        }
    }, []);

    // birthdate
    const [selectedDate, setSelectedDate] = useState();
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        console.log(selectedDate)
    };

    const [leavetype, setLeaveType] = useState();
    const handleChangeLeaveType = (event) => {
        setLeaveType(event.target.value);
        console.log(leavetype)
    };

    const onSubmitHandler = useCallback((event) => {
        event.preventDefault()
        let obj={
            "emp_id": props.employeeID,
            "leave_date": selectedDate,
            "leave_type_id": leavetype,
        }
        console.log(JSON.stringify(obj))
        saveLeaveHRM(obj)
                .then((response) => {
                    if (!response.error) {
                        addAlert({
                            message: "Leave Saved Successfully!",
                        });
                    }else{
                        addAlert({
                            message: "Failed!",
                        });
                    }
                    
                })
    }, [addAlert,selectedDate,leavetype,props.employeeID]);

    

    return (
        <div className={classes.root}>
            <Alert handleAlertClose={handleAlertClose} alerts={props.alerts} />  
            <Paper className={classes.paper}>  
                <Card className={classes.card}>
                    <CardHeader
                        // avatar={
                        // <Avatar aria-label="recipe" className={classes.avatar}>
                        //     R
                        // </Avatar>
                        // }
                        // action={
                        // <IconButton aria-label="settings">
                        //     <MoreVertIcon />
                        // </IconButton>
                        // }
                        title="Request Leave"
                        subheader="Jupyter Lab"
                    />
                    {/* <CardMedia
                        className={classes.media}
                        image="/static/images/cards/paella.jpg"
                        title="Paella dish"
                    /> */}
                    <CardContent>
                    <form noValidate autoComplete="off" onSubmit={onSubmitHandler}>
                        <Grid container spacing={3}>
                            {/* <Grid item xs={12} sm={12}>
                                <TextField
                                    id="employeeID"
                                    label="Employee ID"
                                    type="name"
                                    fullWidth
                                    autoComplete="name"
                                    onChange={(event)=>inputChangeHandler(event,"employeeId")}
                                    error={employeeIderr}
                                />
                            </Grid> */}
                            <Grid item xs={12} sm={12}>
                                    <InputLabel id="genderlabel" >Leave Type</InputLabel>
                                    <Select
                                        labelId="Leave Type"
                                        id="leavetype"
                                        value={leavetype}
                                        onChange={handleChangeLeaveType}
                                        defaultValue="" 
                                        fullWidth
                                    >
                                        <MenuItem value={1}>Annual</MenuItem>
                                        <MenuItem value={2}>Cassual</MenuItem>
                                        <MenuItem value={3}>Maternity</MenuItem>
                                        <MenuItem value={4}>No-Pay</MenuItem>
                                    </Select>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TextField
                                        id="date"
                                        label="Date"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        fullWidth
                                        onChange={(event) => handleDateChange(event)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Button variant="contained" color="primary" className={classes.button} type="submit" fullWidth>
                                Save
                            </Button>
                        </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Paper>
        </div>
    );
}

const mapStateToProps = (state) => {
	return {
    isAuthenticated: state.auth.token != null,
    alerts: state.alert.alerts,
    employeeID:state.auth.employeeID,
	};
};


const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: alert => dispatch(actions.addAlert(alert)),
    removeAlert: (alertId) => dispatch(removeAlert(alertId))
  };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);