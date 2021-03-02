import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { useHistory } from "react-router-dom";


import { useParams } from "react-router-dom";
// import { USERS } from "../../shared/routes";
import { Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { getUserHRM } from "../../api/Users";
// import Button from '@material-ui/core/Button';
// import { updateObject, formIsValid } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import HRMUsers from "../HRM/HRMusers"
// import Navbar from "../../components/Navbar/Navbar"

// const tableOptions = {
//     pageSize: 10,
//     pageSizeOptions: [10, 30, 50]
// };

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20px',
        padding: theme.spacing(2),
        textAlign: 'center',
        width: '100%',
        color: 'blue',
        display: 'flex',
        flexDirection: "column",
        alignContent: 'center',
        justifyContent: 'center',
        justifyItems: 'center'
    },
    paper: {
        margin: '20px',
        width: "100%",
    },
}));

const UsersDetail = props => {
    // const history = useHistory();
    // const { addAlert } = props;
    const classes = useStyles();
    const { id } = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        getUserHRM(id)
            .then(response => {
                if (!response.error) {
                    setUser(response.data);
                }
            })
    }, [setUser, id]);

    if (false) {
        // return <Spinner />
    } else {
        return (
          <div>
            {/* <Navbar/> */}
            <HRMUsers />
            <Paper className={classes.paper}>
              <h4>First Name : {user && user.first_name}</h4>
              <h4>Last Name : {user && user.last}</h4>
              <h4>Email : {user && user.email}</h4>
              <h4>Gender : {user && user.gender}</h4>
            </Paper>
          </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addAlert: alert => dispatch(actions.addAlert(alert))
    };
}

export default connect(null, mapDispatchToProps)(UsersDetail);