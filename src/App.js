import React, { Suspense, useEffect }  from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import SignIn from '../src/containers/Auth/auth';
import Users from '../src/containers/Admin/Users';
import UserReg from '../src/containers/Admin/userReg';
import UserDetail from '../src/containers/Admin/UserDetails';
import Contact from '../src/containers/Admin/Contact';
import Attribute from '../src/containers/Admin/Attributes';

import ViewLeaveApplication from '../src/containers/Supervisor/ViewLeaveApplications';
import AddLeaveApplication from './containers/Supervisor/AddLeave';
import ViewProfile from '../src/containers/Supervisor/ViewProfile';

import EmpAddLeaveApplication from './containers/Employees/AddEmpLeave';
import EmpViewProfile from '../src/containers/Employees/ViewEmpProfile';
import LeaveStatus from '../src/containers/Employees/LeaveStatus'

import HRMUsers from '../src/containers/HRM/HRMusers';
import HRMUserReg from '../src/containers/HRM/HRMuserReg';
import HRMUserDetail from '../src/containers/HRM/HRMUserDetails';
import HRMViewProfile from '../src/containers/HRM/HRMViewProfile';
import HRMAddLeaveApplication from './containers/HRM/HRMAddEmpLeave';
import Reports from './containers/HRM/Reports';

import * as routez from './shared/routes';
import * as actions from "./store/actions/index";
import axios from "./axios-DB";
import withErrorHandler from "../src/hoc/withErrorHandler/withErrorHandler";

import './App.css';

function App(props) {

  const onTryAutoSignIn = props.onTryAutoSignIn;

  useEffect(() => {
    onTryAutoSignIn();
  }, [onTryAutoSignIn]);

  let routes = (
    <Suspense >
      <Switch>
        <Route exact path={routez.CONTACT} component={Contact}/>
        <Route exact path={routez.SIGNIN} component={SignIn}/>
        
        <Route exact path={routez.USER} component={Users}/>
        <Route exact path={routez.USERREG} component={UserReg}/>
        <Route exact path={routez.USERDETAIL} component={UserDetail}/>
        <Route exact path={routez.ATTRIBUTE} component={Attribute}/>

        <Route exact path={routez.HRMUSER} component={HRMUsers}/>
        <Route exact path={routez.HRMUSERREG} component={HRMUserReg}/>
        <Route exact path={routez.HRMUSERDETAIL} component={HRMUserDetail}/>
        <Route exact path={routez.HRMEMPVIEWPROFILE} component={HRMViewProfile}/>
        <Route exact path={routez.HRMADDLEAVEAPPLICATION} component={HRMAddLeaveApplication}/>
        <Route exact path={routez.REPORTS} component={Reports}/>

        <Route exact path={routez.VIEWLEAVEAPPLICATION} component={ViewLeaveApplication}/>
        <Route exact path={routez.ADDLEAVEAPPLICATION} component={AddLeaveApplication}/>
        <Route exact path={routez.VIEWPROFILE} component={ViewProfile}/>

        <Route exact path={routez.EMPADDLEAVEAPPLICATION} component={EmpAddLeaveApplication}/>
        <Route exact path={routez.EMPVIEWPROFILE} component={EmpViewProfile}/>
        <Route exact path={routez.EMPLEAVESTATUS} component={LeaveStatus}/>

        <Redirect path="/" to={routez.SIGNIN} />
      </Switch>
    </Suspense>
  );


  return (
    <div className="App">
      {routes}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState()),
  };
};

// const withErrorhandlerWrappedComponent = withErrorHandler(App, axios);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
