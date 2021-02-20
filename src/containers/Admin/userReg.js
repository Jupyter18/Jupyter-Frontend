import React, { useState, useCallback, useEffect } from "react";
import { connect } from 'react-redux';

import {saveuser} from "../../api/Users"
import * as actions from '../../store/actions/index';
import Navbar from "../../components/Navbar/Navbar"
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
    contactNumber: {
        label: 'contactNumber*',
        validations: {
            required: true,
            minLength: 9,
            maxLength: 10,
            validationErrStr: 'Enter a valid number',
        }
    },
    supID: {
        label: 'supID*',
        validations: {
            required: true,
            validationErrStr: 'Required a value',
        }
    }
};
const UserProfile = props =>  {
    const classes = useStyles();
    const { addAlert } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [firstname, setFirstName] =useState();
    const [firstnameerr, setFirstNameerr] =useState();
    const [lastname, setLastName] =useState();
    const [lastnameerr, setLastNameerr] =useState();
    const [email, setEmail] =useState();
    const [emailerr, setEmailerr] =useState();
    const [contactNumber, setContactNumber] =useState();
    const [contactNumbererr, setContactNumbererr] =useState();
    const [supID, setsupID] =useState();
    const [supIDerr, setsupIDerr] =useState();
    const [departments, setDepartment] = useState([]);
    const [emp_status, setEmpStatus] = useState([]);
    const [paygradeDM, setPaygradeDM] = useState([]);
    const [jobtitleDM, setJobtitleDM] = useState([]);
    const [branchDM, setBranchDM] = useState([]);

    useEffect(() => {
        if (isLoading) {
            console.log(1)
          getAllItemsReg()
            .then((response) => {
              if (!response.error) {
                console.log(response.data)
                setDepartment(response.data.department);
                setEmpStatus(response.data.employment_status);
                setPaygradeDM(response.data.pay_grade)
                setJobtitleDM(response.data.job_title)
                setBranchDM(response.data.branch)
              }
            })
            .finally(() => setIsLoading(false));
        }
      }, [isLoading]);

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
        if (inputId==="supID") {
            console.log(event.target.value)
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
    const [martialstate, setMartialstate] = useState('');
    const handleChangeMS = (event) => {
        setMartialstate(event.target.value);
    };

    // gender
    const [gender, setGender] = useState('');
    const handleChangeG = (event) => {
        setGender(event.target.value);
    };

    // dep
    const [dep, setDep] = useState();
    const handleChangeD = (event) => {
        console.log("hiiiii")
        console.log(dep)
        console.log(event.target.value)
        setDep(event.target.value);
        console.log(dep)
    };

    // jobname
    const [jobname, setJob] = useState();
    const handleChangeJ = (event) => {
        setJob(event.target.value);
    };

    // paygrade
    const [paygrade, setPayGrade] = useState();
    const handleChangeP = (event) => {
        setPayGrade(event.target.value);
    };

    // empstatus
    const [empstatus, setEmpStastus] = useState();
    const handleChangeE = (event) => {
        setEmpStastus(event.target.value);
    };

    // branch
    const [branch, setBranch] = useState();
    const handleChangeB = (event) => {
        setBranch(event.target.value);
    };

    //supervisor
    const [state, setState] = useState(false);
    
      const handleChangesupervisor = (event) => {
        setState(event.target.checked);
      };

    const onSubmitHandler = useCallback((event) => {
        event.preventDefault()
        let obj={
            "first_name": firstname,
            "last_name": lastname,
            "birth_date": "1997-07-28",
            "marital_status": martialstate,
            "email": email,
            "gender": gender,
            "job_title_id": jobname,
            "pay_grade_id": paygrade,
            "employment_status_id": empstatus,
            "department_id": dep,
            "branch_id": branch,
            "is_supervisor": state,
            "supervisor_id": supID,
            "contact_no": contactNumber
        }
        saveuser(obj)
                .then((response) => {
                    if (!response.error) {
                        addAlert({
                            message: "User Saved Successfully!",
                        });
                    }else{
                        console.log(response)
                    }
                    
                })
    }, [addAlert,branch,contactNumber,dep,email,empstatus,firstname,gender,jobname,lastname,martialstate,paygrade,state,supID]);

    

    return (
        <div className={classes.root}>
            <Navbar/>
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
                                        defaultValue="" 
                                    >
                                        <MenuItem value={"S"}>Single</MenuItem>
                                        <MenuItem value={"M"}>Married</MenuItem>
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
                                    autoComplete="mobilenumber"
                                    onChange={(event)=>inputChangeHandler(event,"contactNumber")}
                                    error={contactNumbererr}
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
                                        defaultValue="" 
                                    >
                                        <MenuItem value={"M"}>Male</MenuItem>
                                        <MenuItem value={"F"}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                    <InputLabel id="departmetlabel"> Department</InputLabel>
                                    <Select onChange={handleChangeD} value={dep} defaultValue="" >
                                        {departments.map((dept) => (
                                            <MenuItem value={dept.department_id}>{dept.department_name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="jobtitlelabel">Job Title</InputLabel>
                                    <Select onChange={handleChangeJ} value={jobname} defaultValue="" >
                                        {jobtitleDM.map((job) => (
                                            <option value={job.job_title_id}>{job.job_name}</option>
                                        ))}
                                    </Select >
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                        <InputLabel id="paygradelabel">Pay Grade</InputLabel>
                                        <Select onChange={handleChangeP} value={paygrade} defaultValue="" >
                                            {paygradeDM.map((pay) => (
                                                <option value={pay.pay_grade_id}>{pay.pay_level}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <   FormControl className={classes.formControl}>
                                    <InputLabel id="employmetntstatuslabel">Emplyment Status</InputLabel>
                                    <Select onChange={handleChangeE} value={empstatus} defaultValue="" >
                                        {emp_status.map((emp_status) => (
                                            <option value={emp_status.employment_status_id}>{emp_status.category}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="branchlabel">Branch</InputLabel>
                                    <Select onChange={handleChangeB} value={branch} defaultValue="" >
                                        {branchDM.map((branch) => (
                                            <option value={branch.branch_id}>{branch.branch_name}</option>
                                        ))}
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
                                <TextField id="outlined-basic" label="Supervisor ID" variant="outlined" onChange={(event)=>inputChangeHandler(event,"supID")} error={supIDerr}/>
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" className={classes.button} type="submit" fullWidth>
                            Save
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