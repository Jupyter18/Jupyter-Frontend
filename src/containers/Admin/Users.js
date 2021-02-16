import React, { useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { getAllUsers, deleteUsers, updateUsers } from "../../api/Users";
import {removeItemFromArray, replaceItemInArray} from "../../shared/utility"
// import { USERS } from "../../shared/routes";
import Table from "../../components/UI/Table/MaterialTable/Table";
// import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from '../../store/actions/index';
// import { SNACKBAR } from "../../components/UI/FHSnackBar/FHSnackBar";
// import FHButton from "../../components/UI/FHButton/FHButton";
// import Switch from '@material-ui/core/Switch';

const tableTitle = "User Information";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Users = props => {
  const { addAlert } = props;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isLoading) {
        getAllUsers()
        .then((response) => {
          if (!response.error) {
            console.log(response.data);
            setUsers(response.data);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);

  const deleteUser = useCallback(
    (oldLesson) => {
        return new Promise((resolve, reject) => {
            deleteUsers(oldLesson.emp_id)
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
        console.log(newLesson)
        return new Promise((resolve, reject) => {
            updateUsers(oldLesson.emp_id, newLesson)
                .then((response) => {
                    if (!response.error) {
                        addAlert({
                            message: "User Updated Successfully!",
                        });
                        setUsers(replaceItemInArray(users, 'emp_id', response.data, oldLesson.emp_id))
                        return resolve();
                    }
                    return reject();
                })
        });
    },
    [addAlert, users]
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

//   const renderProfileBtn = useCallback(
//     (rowData) => <FHButton color="primary" onClick={() => history.push(`${USERS}/${rowData.id}`)}>Profile</FHButton>,
//     [history]
//   );

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
    { title: "Employee ID", field: "emp_id" },
    { title: "First Name", field: "first_name" },
    { title: "Last Name", field: "last_name" },
    { title: "Birth Date", field: "birth_date",type: "date" },
    { title: "Martial Status", field: "marital_status", lookup: { S:"single", M:"Married"}},
    { title: "Email", field: "email" },
    { title: "Gender", field: "gender", lookup: { M:"male", F:"Female"}},
    { title: "Job Title", field: "job_name", lookup: { HR_Manager:"HR_Manager", Accountant:"Accountant", Software_Engineer:"Software_Engineer"}},
    { title: "Pay Grade", field: "pay_level", lookup: { Level_1:"Level_1", Level_2:"Level_2",Level_3:"Level_3"}},
    { title: "Employment Status", field: "category", lookup: { 'Intern-Parttime':"Intern-Parttime", 'Intern-Fulltime':"Intern-Fulltime"}},
    { title: "Department", field: "department_name", lookup: { HR_Department:"HR_Department", Finance_Department:"Finance_Department"}},
    { title: "Branch", field: "branch_name", lookup: { 'Sri Lanka':"Sri Lanka", 'India':"India", 'Bangladesh':"Bangladesh"}},
    { title: "Supervisor ID", field: "supervisor_id" },
    { title: "Supervisor ID", field: "is_supervisor",lookup: { 0:"False", 1:"True"} },
    // { title: "Profile", render: renderProfileBtn },
    // { title: "Reset user device", render: renderResetBtn },
    // { title: "User status", render: renderStatusSwitch },
  ];

  if (false) {
    // return <Spinner />
  } else {
    return <Table
      data={users}
      title={tableTitle}
      columns={tableColumns}
      tableOptions={tableOptions}
      editable={{
        onRowUpdate: (newData, oldData) => updateUser(oldData, newData ),
        onRowDelete: oldData =>deleteUser(oldData),
      }}
    />
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: alert => dispatch(actions.addAlert(alert))
  };
}

export default connect(null, mapDispatchToProps)(Users);
