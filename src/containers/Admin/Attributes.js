import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
// import { useHistory } from "react-router-dom";

import { getCusAttributes , saveCusAttributes, deleteCusAttributes} from "../../api/Other"
import { removeItemFromArray, addItemToArray, } from "../../shared/utility";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';
import Navbar from "../../components/Navbar/Navbar";
import Alert from '../../components/UI/FHAlert/FHAlert';
import { removeAlert } from "../../store/actions/index";

const CusUserTable = "Custom Attributes Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    width: '60%',
    color: 'blue',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    justifyItems: 'center'
  },
}));

const Users = props => {
  // let history = useHistory();
  const classes = useStyles();
  const [cusattributes, setCusAttributes] = useState([]);
  const { addAlert } = props;
   
  useEffect(() => {
    getCusAttributes()
      .then((response) => {
        console.log(response.data)
        if (!response.error) {
          // setAttributes(updateObject(attributes,response.data))
          setCusAttributes(response.data)
        }
      })
}, []);

  const removeAlert = props.removeAlert;
  const handleAlertClose = useCallback((alertId) => {
      removeAlert(alertId);
  }, [removeAlert]);

  const deleteUser = useCallback(
    (oldUser) => {
      return new Promise((resolve, reject) => {
        deleteCusAttributes(oldUser.COLUMN_NAME)
              .then((response) => {
                console.log(response);
                  if (!response.error) {
                      addAlert({
                          message: "Attribute deletion Successful!",
                      });
                      setCusAttributes(removeItemFromArray(cusattributes, 'COLUMN_NAME', oldUser.COLUMN_NAME))
                      return resolve();
                  }
                  addAlert({
                    message: "Failed!",
                  });
                  return reject();
              })
      });
    },
    [addAlert, cusattributes]
  );

  // const updateUser = useCallback(
  //   (newUser,oldUser) => {
  //     return new Promise((resolve, reject) => {
  //         updateUsers(oldUser.officerID, newUser)
  //             .then((response) => {
  //                 if (!response.error) {
  //                     addAlert({
  //                         message: "User Updated Successfully!",
  //                     });
  //                     setUsers(replaceItemInArray(users, 'officerID', newUser, oldUser.officerID))
  //                     return resolve();
  //                 }
  //                 addAlert({
  //                   message: "Failed!",
  //                 });
  //                 return reject();
  //             })
  //     });
  //   },
  //   [addAlert, users]
  // );

  const saveUser = useCallback(
    (newUser) => {
      var data=({
        "COLUMN_NAME": newUser.COLUMN_NAME,
        "COLUMN_TYPE": newUser.COLUMN_TYPE,
      })
      return new Promise((resolve, reject) => {
        saveCusAttributes(data)
              .then((response) => {
                  console.log(response)
                  if (!response.error) {
                      addAlert({
                          message: "Attribute Saved Successfully!",
                      });
                      setCusAttributes(addItemToArray(cusattributes, newUser))
                      return resolve();
                  }
                  console.log(response)
                  addAlert({
                    message: "Failed!",
                  });
                  return reject();
              })
        });
    },
    [addAlert, cusattributes]
  );

  const tableColumns = [
    { title: "Column Name", field: "COLUMN_NAME"},
    { title: "Column Type", field: "COLUMN_TYPE", lookup: { int:"int", long_string:"long_string", short_string:"short_string",img:"img",date:"date"}},
  ];

  if (false) {
    //return <Spinner />
  } else {
    return (
    <div >
      <Navbar />
      <div className={classes.paper}>
        <Alert handleAlertClose={handleAlertClose} alerts={props.alerts} />
        <Table
          data={cusattributes}
          title={CusUserTable}
          columns={tableColumns}
          tableOptions={tableOptions}
          editable={{
            onRowAdd: newData =>saveUser(newData),
            // onRowUpdate: (newData, oldData) =>updateUser(newData, oldData ),
            onRowDelete: oldData => deleteUser(oldData),
          }}
        />
      </div>
    </div>
    )
  }
};

const mapStateToProps = (state) => {
	return {
    isAuthenticated: state.auth.token != null,
    alerts: state.alert.alerts
	};
};


const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: alert => dispatch(actions.addAlert(alert)),
    removeAlert: (alertId) => dispatch(removeAlert(alertId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

// export default (Users);
