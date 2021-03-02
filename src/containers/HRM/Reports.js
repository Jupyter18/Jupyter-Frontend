import React, { useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import { getTitleEmployees } from "../../api/Reports";
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


import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const tableOptions = {
  pageSize: 10,
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

    const [title, setTitle] = useState();
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

  const tableColumnsTitle = [
    { title: "Leave Type", field: "emp_id"},
    { title: "Leave Ammount", field: "first_name"},
    { title: "Leave Type", field: "last_name"},
    { title: "Leave Ammount", field: "department_name"},
  ];

  const tableColumnsapproved = [
    { title: "Leave Type", field: "leave_type"},
    { title: "Leave Count", field: "leave_count"},
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
                        title="Employees by ID"
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
            {/* <Grid item xs={12} sm={12}>
            <   Card className={classes.root}>
                    <CardHeader
                        title="Employees by ID"
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
                    </CardContent>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Table
                                data={employeesTitle}
                                title="Employees by title"
                                columns={tableColumnsTitle}
                                tableOptions={tableOptions}
                            />
                        </CardContent>
                    </Collapse>
                </Card>
                <br />
            </Grid> */}
          </Grid>
          {/* <Grid item>
            <Grid item xs={12} sm={12}>
            <Card className={classes.root}>
                    <CardHeader
                        title="Employees by ID"
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
                    </CardContent>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Table
                                data={employeesTitle}
                                title="Employees by title"
                                columns={tableColumnsTitle}
                                tableOptions={tableOptions}
                            />
                        </CardContent>
                    </Collapse>
                </Card>
                <br />
            </Grid>
            <Grid item xs={12} sm={12}>
            <Card className={classes.root}>
                    <CardHeader
                        title="Employees by ID"
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
                    </CardContent>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Table
                                data={employeesTitle}
                                title="Employees by title"
                                columns={tableColumnsTitle}
                                tableOptions={tableOptions}
                            />
                        </CardContent>
                    </Collapse>
                </Card>
                <br />
            </Grid>
          </Grid> */}
          {/* <Grid item>
            <Grid item xs={12} sm={12}>
            <Card className={classes.root}>
                    <CardHeader
                        title="Employees by ID"
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
                    </CardContent>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Table
                                data={employeesTitle}
                                title="Employees by title"
                                columns={tableColumnsTitle}
                                tableOptions={tableOptions}
                            />
                        </CardContent>
                    </Collapse>
                </Card>
                <br />
            </Grid>
            <br /> */}
            {/* <Grid item xs={12} sm={12}>
            <Card className={classes.root}>
                    <CardHeader
                        title="Employees by ID"
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
                    </CardContent>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Table
                                data={employeesTitle}
                                title="Employees by title"
                                columns={tableColumnsTitle}
                                tableOptions={tableOptions}
                            />
                        </CardContent>
                    </Collapse>
                </Card>
                <br />
            </Grid>
            <br />
          </Grid> */}
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
