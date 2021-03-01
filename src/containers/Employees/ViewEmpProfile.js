import React, { useState, useCallback, useEffect } from "react";
import { connect } from 'react-redux';
import {getEmployeeDetails} from "../../api/Users"
import * as actions from '../../store/actions/index';
import Navbar from "../../components/Navbar/NavbarEmp"
import { getAllItemsReg} from "../../api/Other";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { checkValidity } from '../../shared/validate';

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

// grid

// card
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';


// form
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
    const { addAlert } = props;
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
                            ```<MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                                    id="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    value={empDetails[0].email}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="contactnumber"
                                    label="Contact Number"
                                    type="name"
                                    fullWidth
                                    value={empDetails[0].marital_status}
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