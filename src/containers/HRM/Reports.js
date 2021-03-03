import React, { useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import { getTitleEmployees, getGradeEmployees, getDepEmployees, getNationEmployees, getQualificationEmployees, getReligionEmployees, getServiceEmployees,getLeavesEmployees } from "../../api/Reports";
import Table from "../../components/UI/Table/MaterialTable/Table";
import Grid from "@material-ui/core/Grid";
// import Spinner from "../../components/UI/Spinner/Spinner";
import { Button } from "@material-ui/core";
import Navbar from "../../components/Navbar/NavbarHRM"
import FHModal from "../../components/UI/FHModal/FHModal";
import HRMAddLeaveForm from "../HRM/HRMAddLeaveForm";
// import { SNACKBAR } from "../../components/UI/FHSnackBar/FHSnackBar";
// import FHButton from "../../components/UI/FHButton/FHButton";
// import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';


import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const tableOptions = {
  pageSize: 5,
  pageSizeOptions: [10, 30, 50]
};

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      overflow: "visible",
      height:"100%"
    },
    addButton: {
      marginBottom: "50px",
      marginTop: "50px",
    },
    grid:{
      display: "flex",
      justifyContent: "center",
      justifyItems: "center",
      alignContent: "center"
    }
}));

const LeaveSum = props => {
  const classes = useStyles();
  // const { addAlert } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [employeesTitle, setEmployeesTitle] = useState([]);
  const [employeesGrade, setEmployeesGrade] = useState([]);
  const [employeesDep, setEmployeesDep] = useState([]);
  const [employeesNation, setEmployeesNation] = useState([]);
  const [employeesQualification, setEmployeesQualification] = useState([]);
  const [employeesReligion, setEmployeesReligion] = useState([]);
  const [employeesService, setEmployeesService] = useState([]);
  const [employeesLeaves, setEmployeesLeaves] = useState([]);
  const [start, setStart] = useState("2020-08-08");
  const [end, setEnd] = useState("2021-12-08");

    const handleChangeFrom =(useCallback)((event) => {
        setStart(event.target.value);
        console.log(event.target.value)
    },[]);

    const [dept, setDept] = useState(2);
    const handleChangeDept =(useCallback)((event) => {
        setDept(event.target.value);
    },[dept]);

    const handleChangeTo =(useCallback)((event) => {
        setEnd(event.target.value);
        getLeavesEmployees(dept,start,end)
            .then((response) => {
            if (!response.error) {
                console.log(response)
                setEmployeesLeaves(response.data);
            }
        })
        console.log(event.target.value)
    },[]);

    const [title, setTitle] = useState(1);
    const handleChangeTitle =(useCallback)((event) => {
        setTitle(event.target.value);
        getTitleEmployees(title)
            .then((response) => {
            if (!response.error) {
                console.log(response)
                setEmployeesTitle(response.data);
            }
            })
    },[title]);

    const [grade, setGrade] = useState(1);
    const handleChangeGrade =(useCallback)((event) => {
        setGrade(event.target.value);
        getGradeEmployees(grade)
            .then((response) => {
            if (!response.error) {
                console.log(response)
                setEmployeesGrade(response.data);
            }
            })
    },[grade]);

    const [dep, setDep] = useState(1);
    const handleChangeDep =(useCallback)((event) => {
        setDep(event.target.value);
        getDepEmployees(dep)
            .then((response) => {
            if (!response.error) {
                console.log(response)
                setEmployeesDep(response.data);
            }
            })
    },[dep]);

    const [qualification, setQualification] = useState("Bsc-Eng");
    const handleChangeQualification =(useCallback)((event) => {
        setQualification(event.target.value);
        getQualificationEmployees(qualification)
            .then((response) => {
            if (!response.error) {
                console.log(response)
                setEmployeesQualification(response.data);
            }
            })
    },[qualification]);

    const [nation, setNation] = useState("SL");
    const handleChangeNation =(useCallback)((event) => {
        setNation(event.target.value);
        getNationEmployees(nation)
            .then((response) => {
            if (!response.error) {
                console.log(response)
                setEmployeesNation(response.data);
            }
            })
    },[nation]);

    const [religion, setReligion] = useState("Buddhist");
    const handleChangeReligon =(useCallback)((event) => {
        setReligion(event.target.value);
        getReligionEmployees(religion)
            .then((response) => {
            if (!response.error) {
                console.log(response)
                setEmployeesReligion(response.data);
            }
            })
    },[religion]);

    const [service, setService] = useState();
    const handleChangeService =(useCallback)((event) => {
        setService(event.target.value);
        console.log(event.target.value)
        getServiceEmployees(service)
            .then((response) => {
            if (!response.error) {
                console.log(response)
                setEmployeesService(response.data);
            }
            })
    },[service]);

  const tableColumnsTitle = [
    { title: "Employee Id", field: "emp_id"},
    { title: "First Name", field: "first_name"},
    { title: "Last Name", field: "last_name"},
    { title: "Department Name", field: "department_name"},
  ];

  const tableColumnsGrade = [
    { title: "Employee Id", field: "emp_id"},
    { title: "First Name", field: "first_name"},
    { title: "Last Name", field: "last_name"},
    { title: "Department Name", field: "department_name"},
  ];
  
  const tableColumnsDep = [
    { title: "Employee Id", field: "emp_id"},
    { title: "First Name", field: "first_name"},
    { title: "Last Name", field: "last_name"},
    { title: "Job Name", field: "job_name"},
  ];

  const tableColumnsNation = [
    { title: "Employee Id", field: "emp_id"},
    { title: "First Name", field: "first_name"},
    { title: "Last Name", field: "last_name"},
    { title: "Email", field: "email"},
  ];

  const tableColumnsQualification = [
    { title: "Employee Id", field: "emp_id"},
    { title: "First Name", field: "first_name"},
    { title: "Last Name", field: "last_name"},
    { title: "Email", field: "email"},
  ];
  
  const tableColumnsReligion = [
    { title: "Employee Id", field: "emp_id"},
    { title: "First Name", field: "first_name"},
    { title: "Last Name", field: "last_name"},
    { title: "Email", field: "email"},
  ];

  const tableColumnsService = [
    { title: "Employee Id", field: "emp_id"},
    { title: "First Name", field: "first_name"},
    { title: "Last Name", field: "last_name"},
    { title: "Email", field: "email"},
  ];

  const tableColumnsLeaves = [
    { title: "Total Count", field: "Total_count"},
  ];

  if (false) {
    // return <Spinner />
  } else {
    return (
      <div className={classes.root}>
        <Navbar/>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item>
            <Grid item xs={12} sm={12}>
                <Card className={classes.root}>
                    <CardHeader
                        title="Employees by Title"
                        subheader="Jupyter"
                    />
                    <CardContent>
                        <InputLabel id="demo-simple-select-label" >Select Title</InputLabel>
                        <Select
                            labelId="Select Title"
                            id="title"
                            value={title}
                            onChange={handleChangeTitle}
                            defaultValue="" 
                        >
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                        </Select>
                        <br />
                        <Table
                            data={employeesTitle}
                            title="Employees by title"
                            columns={tableColumnsTitle}
                            tableOptions={tableOptions}
                        />
                    </CardContent>
                </Card>
                <br />
            </Grid>
            <br />
            <Grid item xs={12} sm={12}>
                <  Card className={classes.root}>
                    <CardHeader
                        title="Employees by Grade"
                        subheader="Jupyter"
                    />
                    <CardContent>
                        <InputLabel id="demo-simple-select-label" >Select Grade</InputLabel>
                        <Select
                            labelId="Select Grade"
                            id="grade"
                            value={grade}
                            onChange={handleChangeGrade}
                            defaultValue="" 
                        >
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                        </Select>
                        <Table
                            data={employeesGrade}
                            title="Employees by Grade"
                            columns={tableColumnsGrade}
                            tableOptions={tableOptions}
                        />
                    </CardContent>
                </Card>
                <br />
            </Grid>
          </Grid>
          <Grid item>
            <Grid item xs={12} sm={12}>
                <Card className={classes.root}>
                    <CardHeader
                        title="Employees by Department"
                        subheader="Jupyter"
                    />
                    <CardContent>
                        <InputLabel id="demo-simple-select-label" >Select Department</InputLabel>
                        <Select
                            labelId="Select Department"
                            id="dep"
                            value={dep}
                            onChange={handleChangeDep}
                            defaultValue="" 
                        >
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                        </Select>
                        <Table
                            data={employeesDep}
                            title="Employees by Department"
                            columns={tableColumnsDep}
                            tableOptions={tableOptions}
                        />
                    </CardContent>
                </Card>
                <br />
            </Grid>
            <Grid item xs={12} sm={12}>
                <Card className={classes.root}>
                        <CardHeader
                            title="Employees by Nation"
                            subheader="Jupyter"
                        />
                        <CardContent>
                            <InputLabel id="demo-simple-select-label" >Select Nation</InputLabel>
                            <Select
                                labelId="Select Nation"
                                id="nation"
                                value={nation}
                                onChange={handleChangeNation}
                                defaultValue="" 
                            >
                                <MenuItem value={"SL"}>SL</MenuItem>
                                <MenuItem value={"India"}>India</MenuItem>
                            </Select>
                                <Table
                                    data={employeesNation}
                                    title="Employees by Nation"
                                    columns={tableColumnsNation}
                                    tableOptions={tableOptions}
                                />
                        </CardContent>
                </Card>
                <br />
            </Grid>
          </Grid>
          <Grid item>
            <Grid item xs={12} sm={12}>
                <Card className={classes.root}>
                    <CardHeader
                        title="Employees by Qualification"
                        subheader="Jupyter"
                    />
                    <CardContent>
                        <InputLabel id="demo-simple-select-label" >Select Qualification</InputLabel>
                        <Select
                            labelId="Select Qualification"
                            id="qualification"
                            value={qualification}
                            onChange={handleChangeQualification}
                            defaultValue="" 
                        >
                            <MenuItem value={"Bsc-Eng"}>Bsc-Eng</MenuItem>
                            <MenuItem value={"Diploma"}>Diploma</MenuItem>
                        </Select>
                        <Table
                            data={employeesQualification}
                            title="Employees by Department"
                            columns={tableColumnsQualification}
                            tableOptions={tableOptions}
                        />
                    </CardContent>
                </Card>
                <br />
            </Grid>
            <br />
            <Grid item xs={12} sm={12}>
                <Card className={classes.root}>
                    <CardHeader
                        title="Employees by Religion"
                        subheader="Jupyter"
                    />
                    <CardContent>
                        <InputLabel id="demo-simple-select-label" >Select Religion</InputLabel>
                        <Select
                            labelId="Select Religion"
                            id="religion"
                            value={religion}
                            onChange={handleChangeReligon}
                            defaultValue="" 
                        >
                            <MenuItem value={"Buddhist"}>Buddhist</MenuItem>
                            <MenuItem value={"Muslim"}>Muslim</MenuItem>
                            <MenuItem value={"Tamil"}>Tamil</MenuItem>
                        </Select>
                        <Table
                            data={employeesReligion}
                            title="Employees by Department"
                            columns={tableColumnsReligion}
                            tableOptions={tableOptions}
                        />
                    </CardContent>
                </Card>
                <br />
            </Grid>
            <br />
          </Grid>
          <Grid item>
            <Grid item xs={12} sm={12}>
                <Card className={classes.root}>
                    <CardHeader
                        title="Employees by Service Time"
                        subheader="Jupyter"
                    />
                    <CardContent>
                        <InputLabel id="demo-simple-select-label" >Select Service Time</InputLabel>
                        <TextField
                            id="date"
                            label="Select Service Time"
                            type="date"
                            defaultValue="2017-05-24"
                            fullWidth
                            onChange={(event) => handleChangeService(event)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Table
                            data={employeesService}
                            title="Employees by Department"
                            columns={tableColumnsService}
                            tableOptions={tableOptions}
                        />
                    </CardContent>
                </Card>
                <br />
            </Grid>
            <br />
            <Grid item xs={12} sm={12}>
                <Card className={classes.root}>
                    <CardHeader
                        title="Employees by Leaves"
                        subheader="Jupyter"
                    />
                    <CardContent>
                        <InputLabel id="demo-simple-select-label" >Select Department</InputLabel>
                        <Select
                            labelId="Select Department"
                            id="dept"
                            value={dep}
                            onChange={handleChangeDept}
                            defaultValue="" 
                        >
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                        </Select>
                        <InputLabel id="demo-simple-select-label" >From</InputLabel>
                        <TextField
                            id="from"
                            label="From"
                            type="date"
                            defaultValue="2017-05-24"
                            fullWidth
                            onChange={(event) => handleChangeFrom(event)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        <InputLabel id="demo-simple-select-label" >To</InputLabel>
                        <TextField
                            id="to"
                            label="To"
                            type="date"
                            defaultValue="2017-05-24"
                            fullWidth
                            onChange={(event) => handleChangeTo(event)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        <Table
                            data={employeesLeaves}
                            title="Employees by Department"
                            columns={tableColumnsLeaves}
                            tableOptions={tableOptions}
                        />
                    </CardContent>
                </Card>
                <br />
            </Grid>
            <br />
          </Grid>
        </Grid>
      </div>
    )
  }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(LeaveSum);
