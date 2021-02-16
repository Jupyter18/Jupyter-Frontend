import React, { useState, useCallback } from "react";
import { connect } from 'react-redux';

import {saveuser} from "../../api/Users"
import * as actions from '../../store/actions/index';

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

const inputDefinitions = {
    firstname: {
        label: 'FirstName*',
        validations: {
            required: true,
            minLength: 2,
            maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your first Name',
        }
    },
    lastname: {
        label: 'LastName*',
        validations: {
            required: true,
            minLength: 2,
            maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your Last Name',
        }
    },
    email: {
        label: 'Email*',
        validations: {
            required: true,
            isEmail: true,
            validationErrStr: 'Enter a valid email',
        }
    },
    contactnumber: {
        label: 'Password*',
        type: 'password',
        validations: {
            required: true,
            minLength: 9,
            maxLength: 10,
            validationErrStr: 'Enter a valid number',
        }
    },
    supID: {
        label: 'Password*',
        type: 'password',
        validations: {
            required: true,
            validationErrStr: 'Required a value',
        }
    }
};
const UserProfile = props =>  {
    const classes = useStyles();
    const { addAlert } = props;

    const [firstname, setFirstName] =useState();
    const [firstnameerr, setFirstNameerr] =useState();
    const [lastname, setLastName] =useState();
    const [lastnameerr, setLastNameerr] =useState();
    const [email, setEmail] =useState();
    const [emailerr, setEmailerr] =useState();
    const [contactnumber, setContactNumber] =useState();
    const [contactnumbererr, setContactNumbererr] =useState();
    const [supID, setsupID] =useState();
    const [supIDerr, setsupIDerr] =useState();

    const inputChangeHandler = useCallback((event, inputId) => {
        let validationConst = inputDefinitions[inputId].validations;
        let isValid = checkValidity(validationConst, event.target.value);
        if (inputId==="firstname") {
            setFirstName(event.target.value)
            setFirstNameerr(!isValid)
        }  
        if (inputId==="lastname") {
            setLastName(event.target.value)
            setLastNameerr(!isValid)
        }
        if (inputId==="email") {
            setEmail(event.target.value)
            setEmailerr(!isValid)
        }
        if (inputId==="contactNumber") {
            setContactNumber(event.target.value)
            setContactNumbererr(!isValid)
        }
        if (inputId==="SupId") {
            setsupID(event.target.value)
            setsupIDerr(!isValid)
        }
    }, []);

    // birthdate
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // martial status
    const [martialstate, setMartialstate] = React.useState('');
    const handleChangeMS = (event) => {
        setMartialstate(event.target.value);
    };

    // gender
    const [gender, setGender] = React.useState('');
    const handleChangeG = (event) => {
        setGender(event.target.value);
    };

    // dep
    const [dep, setDep] = React.useState('');
    const handleChangeD = (event) => {
        setDep(event.target.value);
    };

    // jobname
    const [jobname, setJob] = React.useState('');
    const handleChangeJ = (event) => {
        setJob(event.target.value);
    };

    // paygrade
    const [paygrade, setPayGrade] = React.useState('');
    const handleChangeP = (event) => {
        setPayGrade(event.target.value);
    };

    // empstatus
    const [empstatus, setEmpStastus] = React.useState('');
    const handleChangeE = (event) => {
        setEmpStastus(event.target.value);
    };

    // branch
    const [branch, setBranch] = React.useState('');
    const handleChangeB = (event) => {
        setBranch(event.target.value);
    };

    //supervisor
    const [state, setState] = useState(false);
    
      const handleChangesupervisor = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    const onSubmitHandler = useCallback((event) => {
        event.preventDefault()
        let obj={
            "first_name": firstname,
            "last_name": lastname,
            "birth_date": selectedDate,
            "marital_status": martialstate,
            "email": email,
            "gender": gender,
            "job_title_id": jobname,
            "pay_grade_id": paygrade,
            "employment_status_id": empstatus,
            "department_id": dep,
            "brach_id": branch,
            "is_supervisor": state,
            "supervisor_id": supID,
            "contact_no": contactnumber
        }
        console.log(firstname)
        console.log(lastname)
        console.log(selectedDate)
        console.log(martialstate)
        console.log(email)
        console.log(gender)
        console.log(jobname)
        console.log(paygrade)
        console.log(empstatus)
        console.log(dep)
        console.log(branch)
        console.log(state)
        console.log(supID)
        console.log(state)
        console.log(contactnumber)
        saveuser(obj)
                .then((response) => {
                    if (!response.error) {
                        addAlert({
                            message: "User Saved Successfully!",
                        });
                    }
                })
    }, []);

    

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
                        title="User Registeration"
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="firstname"
                                    label="First Name"
                                    type="name"
                                    fullWidth
                                    autoComplete="name"
                                    onChange={(event)=>inputChangeHandler(event,"firstname")}
                                    error={firstnameerr}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastname"
                                    label="Last Name"
                                    type="name"
                                    fullWidth
                                    autoComplete="name"
                                    onChange={(event)=>inputChangeHandler(event,"lastname")}
                                    error={lastnameerr}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="birthdate"
                                        label="BirthDate"
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
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label" >Martial STatus</InputLabel>
                                    <Select
                                        labelId="Martial Status"
                                        id="martial status"
                                        value={martialstate}
                                        onChange={handleChangeMS}
                                    >
                                        <MenuItem value={0}>Single</MenuItem>
                                        <MenuItem value={1}>Married</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    autoComplete="email"
                                    onChange={(event)=>inputChangeHandler(event,"email")}
                                    error={emailerr}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="contactnumber"
                                    label="Contact Number"
                                    type="name"
                                    fullWidth
                                    autoComplete="contactnumber"
                                    onChange={(event)=>inputChangeHandler(event,"contactnumber")}
                                    error={contactnumbererr}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="genderlabel" >Gender</InputLabel>
                                    <Select
                                        labelId="Gender"
                                        id="gender"
                                        value={gender}
                                        onChange={handleChangeG}
                                    >
                                        <MenuItem value={0}>Male</MenuItem>
                                        <MenuItem value={1}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                    <InputLabel id="departmetlabel"> Department</InputLabel>
                                    <Select
                                        labelId="Department"
                                        id="department"
                                        value={dep}
                                        onChange={handleChangeD}
                                    >
                                        <MenuItem value={0}>CSE</MenuItem>
                                        <MenuItem value={1}>TRICAL</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="jobtitlelabel">Job Title</InputLabel>
                                    <Select
                                        labelId="Job Title"
                                        id="job title"
                                        value={jobname}
                                        onChange={handleChangeJ}
                                    >
                                        <MenuItem value={0}>HRM</MenuItem>
                                        <MenuItem value={1}>Supervisor</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                        <InputLabel id="paygradelabel">Pay Grade</InputLabel>
                                        <Select
                                            labelId="Pay Grade"
                                            id="paygrade"
                                            value={paygrade}
                                            onChange={handleChangeP}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                        </Select>
                                    </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <   FormControl className={classes.formControl}>
                                    <InputLabel id="employmetntstatuslabel">Emplyment Status</InputLabel>
                                    <Select
                                        labelId="Employment Status"
                                        id="employmentstatus"
                                        value={empstatus}
                                        onChange={handleChangeE}
                                    >
                                        <MenuItem value={0}>Permanent</MenuItem>
                                        <MenuItem value={1}>Temperary</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="branchlabel">Branch</InputLabel>
                                    <Select
                                        labelId="Branch"
                                        id="branch"
                                        value={branch}
                                        onChange={handleChangeB}
                                    >
                                        <MenuItem value={1}>Sri Lanka</MenuItem>
                                        <MenuItem value={2}>India</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={state.checkedB}
                                    onChange={handleChangesupervisor}
                                    name="checkedB"
                                    color="primary"
                                />
                                }
                                label="Supervisor"
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" error={false} onChange={(event)=>inputChangeHandler(event,"contactnumber")} error={supIDerr}/>
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" className={classes.button} type="submit" fullWidth>
                            Primary
                        </Button>
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