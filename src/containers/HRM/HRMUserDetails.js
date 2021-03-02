import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { useHistory } from "react-router-dom";


import { useParams } from "react-router-dom";
// import { USERS } from "../../shared/routes";
import { Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { getUser } from "../../api/Users";
// import Button from '@material-ui/core/Button';
// import { updateObject, formIsValid } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import Users from "../HRM/HRMusers"
import Contact from "../Admin/Contact"
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
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser(id)
            .then(response => {
                if (!response.error) {
                    console.log(response)
                    setUser(response.data[0]);
                }
            })
    }, [setUser, id]);

    if (false) {
        // return <Spinner />
    } else {
        return (
          <div>
            {/* <Navbar/> */}
            <Users />
            <Paper className={classes.paper}>
                <div>
                    {Object.keys(user).map((users, index) => {
                        return(<h4>{users} : {user && user[users]}</h4>)
                    })}
                </div>
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