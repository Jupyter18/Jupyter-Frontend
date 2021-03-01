import React, { useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { getAllLeavesApplications,Accept_Leave,Reject_Leaave} from "../../api/LeavesAPI";
import Table from "../../components/UI/Table/MaterialTable/Table";
// import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from '../../store/actions/index';
import { Button } from "@material-ui/core";
import * as routez from '../../shared/routes';
import Navbar from "../../components/Navbar/Navbar"

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

const Users = props => {
  const classes = useStyles();
  const { addAlert } = props;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    if (isLoading) {
      getAllLeavesApplications()
        .then((response) => {
          if (!response.error) {
            setLeaves(response.data);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [iscLoading]);

  const AcceptLeave = useCallback(() => {
    Accept_Leave(1)
        .then((response) => {
            console.log(response.data);
            if (!response.error) {
                addAlert({
                    message: "Leave Accepted Successful!",
                    type: SNACKBAR
                });
            }
        });
    }, [leaves]);

    const RejectLeave = useCallback(() => {
        Reject_Leaave(0)
            .then((response) => {
                console.log(response.data);
                if (!response.error) {
                    addAlert({
                        message: "Leave Rejected Successful!",
                        type: SNACKBAR
                    });
                }
            });
    }, [leaves]);
    


  const renderAcceptBtn = useCallback(
    (rowData) => <Button color="primary" onClick={() => AcceptLeave()}>Accept</Button>,
    []
  );

  const renderRejectBtn = useCallback(
    (rowData) => <Button color="secondary" onClick={() => RejectLeave()}>Reject</Button>,
    []
  );



  const tableColumns = [
    { title: "Employee ID", field: "emp_id", editable:"never" },
    { title: "First Name", field: "first_name" },
    { title: "Last Name", field: "last_name" },
    { title: "Birth Date", field: "birth_date",type: "date" },
    { title: "Martial Status", field: "marital_status", lookup: { S:"single", M:"Married"}},
    { title: "Email", field: "email" },
    { title: "Gender", field: "gender", lookup: { M:"male", F:"Female"}},
    { title: "Job Title", field: "job_title_id", lookup: jobtitleDM},
    { title: "Pay Grade", field: "pay_grade_id", lookup: paygradeDM},
    { title: "Employment Status", field: "employment_status_id", lookup:emp_status},
    { title: "Department", field: "department_id", lookup: departments},
    { title: "Branch", field: "branch_id", lookup: branchDM},
    { title: "Supervisor ID", field: "supervisor_id" },
    { title: "Supervisor ID", field: "is_supervisor",lookup: { 0:"False", 1:"True"} },
    { title: "Profile", render: renderAcceptBtn },
    { title: "Profile", render: renderRejectBtn },
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

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: alert => dispatch(actions.addAlert(alert))
  };
}

export default connect(null, mapDispatchToProps)(Users);
