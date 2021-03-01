import React, { useState, useCallback } from "react";
import { connect } from 'react-redux';

import {saveLeave} from "../../api/LeavesAPI"
import * as actions from '../../store/actions/index';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { checkValidity } from '../../shared/validate';

import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

// grid

// card
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';


// form
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


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
            minLength: 2,
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
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const onSubmitHandler = useCallback((event) => {
        event.preventDefault()
        let obj={
            "employeeId": employee_ID,
            "leaveType": leave_Type,
            "birth_date": "1997-07-28",
        }
        console.log(JSON.stringify(obj))
        saveLeave(obj)
                .then((response) => {
                    if (!response.error) {
                        addAlert({
                            message: "User Saved Successfully!",
                        });
                    }else{
                        console.log(response)
                    }
                    
                })
    }, [addAlert,employee_ID,leave_Type]);

    

    return (
        <div className={classes.root}>
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
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="employeeID"
                                    label="Employee ID"
                                    type="name"
                                    fullWidth
                                    autoComplete="name"
                                    onChange={(event)=>inputChangeHandler(event,"employeeId")}
                                    error={employeeIderr}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="leaveType"
                                    label="Leave Type"
                                    type="name"
                                    fullWidth
                                    autoComplete="name"
                                    onChange={(event)=>inputChangeHandler(event,"leaveType")}
                                    error={leaveTypeerr}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date"
                                        label="Date"
                                        format="MM/dd/yyyy"
                                        value={selectedDate}
                                        fullWidth
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Paper>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
      addAlert: alert => dispatch(actions.addAlert(alert))
    };
}
  
export default connect(null, mapDispatchToProps)(UserProfile);