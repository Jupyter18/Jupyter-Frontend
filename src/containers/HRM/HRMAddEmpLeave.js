import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import { getLeaveSummery } from "../../api/LeavesAPI";
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
  const [leaveSum, setLeaveSum] = useState(false);
  
  useEffect(() => {
        getLeaveSummery(props.employeeID)
        .then((response) => {
          if (!response.error) {
            console.log(response)
            setLeaveSum(response.data);
          }
        })
  }, [props.employeeID]);

  const tableColumnsfixed = [
    { title: "Leave Type", field: "leave_type"},
    { title: "Leave Ammount", field: "leave_amount"},
  ];

  const tableColumnsapproved = [
    { title: "Leave Type", field: "leave_type"},
    { title: "Leave Count", field: "leave_count"},
  ];

  const tableColumnsapplied = [
    { title: "Leave Type", field: "leave_type"},
    { title: "Count", field: "applied"},
  ];

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  
  if (false) {
    // return <Spinner />
  } else {
    return (
      <div className={classes.root}>
        <Navbar/>
        <Button
          color="primary"
          componentClass={classes.addButton}
          onClick={() => {
            setIsEdit(false);
            setIsModalOpen(true);
          }}
        >
          + Add new Leave
        </Button>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} sm={4}>
            <Table
              data={leaveSum.fixed}
              title="Fixed Leaves"
              columns={tableColumnsfixed}
              tableOptions={tableOptions}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Table
              data={leaveSum.approved}
              title="Approved leaves"
              columns={tableColumnsapproved}
              tableOptions={tableOptions}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Table
              data={leaveSum.applied}
              title="Applied Leave"
              columns={tableColumnsapplied}
              tableOptions={tableOptions}
            />
          </Grid>
        </Grid>
        <FHModal
          body={
            <HRMAddLeaveForm
              isEdit={isEdit}
              setIsModalOpen={setIsModalOpen}
            />
          }
          open={isModalOpen}
          handleClose={handleModalClose}
        />
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
