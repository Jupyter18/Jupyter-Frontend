import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import {getEmployeeDetails} from "../../api/Users"
import Navbar from "../../components/Navbar/NavbarEmp"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

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
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


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
        width: '60%',
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

const UserProfile = props =>  {
    const classes = useStyles();
    // const { addAlert } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [empDetails, setEmpDetails] =useState([{}]);


    useEffect(() => {
        if (isLoading) {
          getEmployeeDetails(props.employeeID)
            .then((response) => {
              if (!response.error) {
                setEmpDetails(response.data)
                console.log(response.data)
              }
            })
            .finally(() => setIsLoading(false));
        }
      }, [isLoading,props.employeeID]);
      console.log(empDetails[0].first_name)
    return (
        <div className={classes.root}>
            <Navbar/>
            <Paper className={classes.paper}>    
                <Card className={classes.card}>
                    <CardHeader
                        title="My profile"
                        subheader="Jupyter Lab"
                    />
                    <CardContent>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="firstname"
                                    label="First Name"
                                    value={empDetails[0].first_name}
                                    fullWidth
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastname"
                                    label="Last Name"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    value={empDetails[0].last_name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="birthdate"
                                        label="BirthDate"
                                        format="MM/dd/yyyy"
                                        fullWidth
                                        value={empDetails[0].birth_date}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TextField
                                        type="name"
                                        id="martial status"
                                        label="Martial Status"
                                        fullWidth
                                        value={empDetails[0].marital_status}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="emp_id"
                                    label="Employee Id"
                                    type="name"
                                    fullWidth
                                    value={props.employeeID}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    type="name"
                                    fullWidth
                                    value={empDetails[0].email}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TextField
                                        type="name"
                                        id="gender"
                                        label="Gender"
                                        fullWidth
                                        value={empDetails[0].gender}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TextField
                                        type="name"
                                        id="departmetlabel"
                                        label="Department"
                                        fullWidth
                                        value={empDetails[0].department_name}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TextField
                                        type="name"
                                        id="jobtitlelabel"
                                        label="Job Title"
                                        fullWidth
                                        value={empDetails[0].job_name}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TextField
                                        type="name"
                                        id="paygradelabel"
                                        label="Pay Grade"
                                        fullWidth
                                        value={empDetails[0].pay_level}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            {/* <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TextField
                                        type="name"
                                        id="employmetntstatuslabel"
                                        label="Emplyment Status"
                                        fullWidth
                                        value={empDetails[0].marital_status}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid> */}
                            <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TextField
                                        type="name"
                                        id="branchlabel"
                                        label="Branch"
                                        fullWidth
                                        value={empDetails[0].branch_name}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={empDetails[0].is_supervisor}
                                    name="checkedB"
                                    color="primary"
                                    disabled 
                                />
                                }
                                label="Supervisor"
                            />
                            </Grid>
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);