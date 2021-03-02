import React, { useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import { getAllLeavesApplications,Accept_Leave,Reject_Leaave} from "../../api/LeavesAPI";
import {removeItemFromArray} from "../../shared/utility"
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';
// import Spinner from "../../components/UI/Spinner/Spinner";
import { Button } from "@material-ui/core";
import Navbar from "../../components/Navbar/NavbarSup"
import Alert from '../../components/UI/FHAlert/FHAlert';
import { removeAlert } from "../../store/actions/index";

const tableTitle = "User Information";

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
}));

const Leaves = props => {
  const classes = useStyles();
  const { addAlert } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    console.log(props.employeeID)
      getAllLeavesApplications(props.employeeID)
        .then((response) => {
          console.log(response)
          if (!response.error) {
            setLeaves(response.data);
          }
        })
        .finally(() => setIsLoading(false));
  }, [props.employeeID]);

  const removeAlert = props.removeAlert;
  const handleAlertClose = useCallback((alertId) => {
      removeAlert(alertId);
  }, [removeAlert]);

  const AcceptLeave = useCallback((rowData) => {
    let data={
      "emp_id":rowData.emp_id,
      "leave_date":new Date(rowData.leave_date).toISOString().slice(0, 10)
    }
    Accept_Leave(data)
        .then((response) => {
            console.log(response.data);
            if (!response.error) {     
                setLeaves(removeItemFromArray(leaves, 'emp_id',rowData.emp_id ))         
                addAlert({
                    message: "Leave Acception Successful!",
                });
            }
        });
    }, [leaves]);

    const RejectLeave = useCallback((rowData) => {
        let data={
          "emp_id":rowData.emp_id,
          "leave_date":new Date(rowData.leave_date).toISOString().slice(0, 10)
        }
        Reject_Leaave(data)
            .then((response) => {
                console.log(response.data);
                if (!response.error) {
                  setLeaves(removeItemFromArray(leaves, 'emp_id',rowData.emp_id ))
                  addAlert({
                    message: "Leave Rejection Successful!",
                  });
                }
            });
    }, [leaves]);
    


  const renderAcceptBtn = useCallback(
    (rowData) => <Button color="primary" onClick={() => AcceptLeave(rowData)}>Accept</Button>,
    []
  );

  const renderRejectBtn = useCallback(
    (rowData) => <Button color="secondary" onClick={() => RejectLeave(rowData)}>Reject</Button>,
    []
  );

    console.log(props.isAuthenticated)
    console.log(props.isAdmin)
    console.log(props.isHrm)
    console.log(props.IsSupervisor)

  const tableColumns = [
    { title: "First Name", field: "first_name"},
    { title: "Last Name", field: "last_name"},
    { title: "Employee Id", field: "emp_id"},
    { title: "Leave Date", field: "leave_date", type:"date"},
    { title: "Leave Type Id", field: "leave_type_id"},
    { title: "Leave Ammount", field: "leave_amount"},
    { title: "Leave Count", field: "leave_count"},
    { title: "Accept", render: renderAcceptBtn },
    { title: "Reject", render: renderRejectBtn },
  ];

  if (false) {
    // return <Spinner />
  } else {
    return (
      <div className={classes.root}>
        <Navbar/>
        <Alert handleAlertClose={handleAlertClose} alerts={props.alerts} /> 
        <Table
          data={leaves}
          title={tableTitle}
          columns={tableColumns}
          tableOptions={tableOptions}
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
      alerts: state.alert.alerts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: alert => dispatch(actions.addAlert(alert)),
    removeAlert: (alertId) => dispatch(removeAlert(alertId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaves);
