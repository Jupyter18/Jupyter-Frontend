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

import TextField from '@material-ui/core/TextField';
import { checkValidity } from '../../shared/validate';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';

import InputLabel from "@material-ui/core/InputLabel";

const CusUserTable = "Custom Attributes Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    width: '100%',
    color: 'blue',
    display: 'flex',
    flexDirection: "row"
  },
}));

const inputDefinitions = {
  employeeId: {
      label: 'Employee Id*',
      validations: {
          required: true,
          minLength: 2,
          maxLength: 40,
          validationErrStr: 'Use between 6 and 40 characters for your first Name',
      }
  },
  employeeId: {
    label: 'Employee Id*',
    validations: {
        required: true,
        minLength: 2,
        maxLength: 40,
        validationErrStr: 'Use between 6 and 40 characters for your first Name',
    }
  },
  AttributeValue: {
      label: 'Attribute Value*',
      validations: {
          required: true,
          minLength: 2,
          maxLength: 40,
          validationErrStr: 'Use between 6 and 40 characters for your Last Name',
      }
  },
};

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

  const [employeeId, setEmployeeId] =useState();
  const [employeeIdErr, setEmployeeIdErr] =useState();
  const [attributeValue, setAttributeValue] =useState();
  const [attributeValueErr, setAttributeValueErr] =useState();
  
  const inputChangeHandler = useCallback((event, inputId) => {
    let validationConst = inputDefinitions[inputId].validations;
    let isValid = checkValidity(validationConst, event.target.value);
    if (inputId==="employeeId") {
        setEmployeeId(event.target.value)
        setEmployeeIdErr(!isValid)
    }  
    if (inputId==="AttributeValue") {
        setAttributeValue(event.target.value)
        setAttributeValueErr(!isValid)
    }
  }, []);

  const onSubmitHandler = useCallback((event) => {
    event.preventDefault()
    let obj={
        "": employeeId,
        "last_name": attributeValue,
        // "birth_date": selectedDate,
    }
    console.log(JSON.stringify(obj))
    // saveuser(obj)
    //         .then((response) => {
    //             if (!response.error) {
    //                 addAlert({
    //                     message: "User Saved Successfully!",
    //                 });
    //             }else{
    //                 addAlert({
    //                     message: response.error.response.data.message,
    //                 });
    //             }
                
    //         })
  }, []);

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
      <Alert handleAlertClose={handleAlertClose} alerts={props.alerts} />
      <div className={classes.paper}>
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
        <form noValidate autoComplete="off" onSubmit={onSubmitHandler}>
          <Card className={classes.root}>
              <CardHeader
                  title="Fill Custom attributes to Employee"
                  subheader="Jupyter"
              />
              <CardContent>
                  <InputLabel id="demo-simple-select-label" >Employee Id</InputLabel>
                  <TextField
                      id="employeeId"
                      label="EmployeeId"
                      type="name"
                      fullWidth
                      autoComplete="name"
                      onChange={(event)=>inputChangeHandler(event,"employeeId")}
                      error={employeeIdErr}
                  />
                  <br/>
                  <InputLabel id="demo-simple-select-label" >Attribute Name</InputLabel>
                  <Select
                      labelId="Select Title"
                      id="title"
                      // value={title}
                      // onChange={handleChangeTitle}
                      defaultValue="" 
                      fullWidth
                  >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                  </Select>
                  <br />
                  <InputLabel id="demo-simple-select-label" >Attribute Value</InputLabel>
                  <TextField
                      id="AttributeValue"
                      label="Attribute Value"
                      type="name"
                      fullWidth
                      autoComplete="name"
                      onChange={(event)=>inputChangeHandler(event,"AttributeValue")}
                      error={attributeValueErr}
                  />
                  <br />
                  <Button variant="contained" color="primary" className={classes.button} type="submit" fullWidth>
                      Save
                  </Button>
              </CardContent>
          </Card>
        </form>
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
