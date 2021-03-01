import React, { useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import { getAllLeavesApplications,Accept_Leave,Reject_Leaave} from "../../api/LeavesAPI";
import {removeItemFromArray} from "../../shared/utility"
import Table from "../../components/UI/Table/MaterialTable/Table";
// import Spinner from "../../components/UI/Spinner/Spinner";
import { Button } from "@material-ui/core";
import Navbar from "../../components/Navbar/NavbarSup"

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
  // const { addAlert } = props;
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

  const AcceptLeave = useCallback((rowData) => {
    let data={
      "emp_id":rowData.emp_id,
      "leave_date":"2021-03-21"
    }
    Accept_Leave(data)
        .then((response) => {
            console.log(response.data);
            setLeaves(removeItemFromArray(leaves, 'emp_id',rowData.emp_id ))
            if (!response.error) {              
                // addAlert({
                //     message: "Leave Accepted Successful!",
                // });
            }
        });
    }, [leaves]);

    const RejectLeave = useCallback((rowData) => {
        Reject_Leaave(0)
            .then((response) => {
                console.log(response.data);
                setLeaves(removeItemFromArray(leaves, 'emp_id',rowData.emp_id ))
                if (!response.error) {
                    // addAlert({
                    //     message: "Leave Rejected Successful!",
                    // });
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaves);
