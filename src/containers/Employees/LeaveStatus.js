import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import {getLeaveStatus} from "../../api/Users"
import Navbar from "../../components/Navbar/NavbarEmp"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { DataGrid } from '@material-ui/data-grid';
import Paper from '@material-ui/core/Paper';

// grid

// card
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        width: '100%',
        color: 'blue',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        justifyItems: 'center'
    },
    card:{
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
      },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    }
}));
const addId = (arr) => {
    arr.forEach((e,id) => {
        e.id = id;
        e.leave_date = new Date(e.leave_date).toISOString().slice(0, 10);
    });
    return arr;
}

const LeaveStatus = props =>  {
    const rows = [
        {
          id: 0,
          leave_date: '',
          leave_type: '',
          is_approved: '',
        },
      ];
    const classes = useStyles();
    // const { addAlert } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [leaveDetail, setLeaveDetail] =useState(rows);


    useEffect(() => {
        if (isLoading) {
            getLeaveStatus()
            .then((response) => {
              if (!response.error) {
                const newList = addId(response.data)
                setLeaveDetail(newList);
                console.log(response.data)
              }
            })
            .finally(() => setIsLoading(false));
        }
      }, [isLoading,props.employeeID]);
    return (
        <div className={classes.root}>
            <Navbar/>
            <Paper className={classes.paper}>    
                <Card className={classes.card}>
                    <CardHeader
                        title="Leave application status"
                        subheader="Jupyter Lab"
                    />
                    <CardContent>
                    <div style={{ height: 250, width: '100%' }}>
                        <DataGrid
                            columns={[
                            {field: 'id'},
                            { field: 'leave_date', width: 200 },
                            { field: 'leave_type', width: 200 },
                            { field: 'is_approved', width: 200 },
                            ]}
                            rows={leaveDetail}
                        />
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </div>
    );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(LeaveStatus);