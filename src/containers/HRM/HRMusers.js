import React, { useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { getAllUsersHRM, deleteUsersHRM, updateUsersHRM } from "../../api/Users";
import { getAllItems} from "../../api/Other";
import {removeItemFromArray, replaceItemInArray} from "../../shared/utility"
// import { USERS } from "../../shared/routes";
import Table from "../../components/UI/Table/MaterialTable/Table";
// import Spinner from "../../components/UI/Spinner/Spinner";
import { Button } from "@material-ui/core";
import * as routez from '../../shared/routes';
import Navbar from "../../components/Navbar/NavbarHRM"
// import { SNACKBAR } from "../../components/UI/FHSnackBar/FHSnackBar";
// import FHButton from "../../components/UI/FHButton/FHButton";
// import Switch from '@material-ui/core/Switch';

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
  const [users, setUsers] = useState([]);
  const [departments, setDepartment] = useState();
  const [emp_status, setEmpStatus] = useState();
  const [paygradeDM, setPaygradeDM] = useState();
  const [jobtitleDM, setJobtitleDM] = useState();
  const [branchDM, setBranchDM] = useState();
  useEffect(() => {
    if (isLoading) {
        getAllUsersHRM(props.branch)
        .then((response) => {
          console.log(response.data)
          if (!response.error) {
            setUsers(response.data);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoading,props.branch]);

  useEffect(() => {
    if (isLoading) {
      getAllItems()
        .then((response) => {
          if (!response.error) {
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

  const deleteUser = useCallback(
    (oldLesson) => {
        return new Promise((resolve, reject) => {
            deleteUsersHRM(oldLesson.emp_id)
                .then((response) => {
                    if (!response.error) {
                        addAlert({
                            message: "User Deleted Successfully!",
                        });
                        setUsers(removeItemFromArray(users, 'emp_id', oldLesson.emp_id))
                        return resolve();
                    }
                    return reject();
                })
        });
    },
    [addAlert, users]
  );

  const updateUser = useCallback(
    (oldLesson,newLesson) => {
        delete newLesson.emp_id;
        console.log(newLesson)
        return new Promise((resolve, reject) => {
            updateUsersHRM(oldLesson.emp_id, newLesson)
                .then((response) => {
                    if (!response.error) {
                        addAlert({
                            message: "User Updated Successfully!",
                        });
                        console.log(replaceItemInArray(users, 'emp_id', newLesson, oldLesson.emp_id))
                        setUsers(replaceItemInArray(users, 'emp_id', newLesson, oldLesson.emp_id))
                        return resolve();
                    }
                    return reject();
                })
        });
    },
    [addAlert, users, setUsers]
  );

//   const renderStatus = useCallback(
//     (id,enabled) => {
      
//       let enable={
//         "enabled": `${!enabled}`
//       };
//       changestatus(id,enable)
//         .then((response) => {
//           setUsers(replaceItemInArray(users, 'id', response.data, id))
//           if (!response.error) {
//             addAlert({
//               message: "User Status Changed Successful!",
//               type: SNACKBAR
//             });
//           }
//         })
//     },
//     [addAlert,users,setUsers]
//   );

//   const renderResetBtn = useCallback(
//     (rowData) => <FHButton color="primary" onClick={() => resetDeviceHandler(rowData.id)}>Reset</FHButton>,
//     [resetDeviceHandler]
//   );

  const renderProfileBtn = useCallback(
    (rowData) => <Button color="primary" onClick={() => history.push(`${routez.HRMUSER}/${rowData.emp_id}`)}>Profile</Button>,
    [history]
  );

//   const renderStatusSwitch = useCallback(
//     (rowData) => (
//       <Switch
//         checked={rowData.enabled}
//         onChange={() => renderStatus(rowData.id,rowData.enabled)}
//         name="checkedB"
//         color="primary"
//       />
//     ),
//     [renderStatus]
//   );

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
    { title: "Profile", render: renderProfileBtn },
    // { title: "Reset user device", render: renderResetBtn },
    // { title: "User status", render: renderStatusSwitch },
  ];

  if (false) {
    // return <Spinner />
  } else {
    return (
      <div className={classes.root}>
        <Navbar/>
        <Table
          data={users}
          title={tableTitle}
          columns={tableColumns}
          tableOptions={tableOptions}
          editable={{
            onRowUpdate: (newData, oldData) => updateUser(oldData, newData ),
            onRowDelete: oldData =>deleteUser(oldData),
          }}
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
      branch:state.auth.branch
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
