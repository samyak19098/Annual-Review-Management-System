import React, {Component, useEffect, useState} from 'react';
import ProfileForm from "./Components/ProfileForm";
import './App.css';
import LandingPage from "./Components/LandingPage";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import ProfileView from "./Components/ProfileView";
import FileUpload from "./Components/FileUpload";
import LoginForm from "./Components/LoginForm";
import ProtectedRoute from "./Components/ProtectedRoute";
import Unauthorized from "./Components/Unauthorized";
import CreateReviewerAccount from "./Components/CreateReviewerAccount";
import ReviewerReports from "./Components/ReviewerReports";
import ReviewedReports from "./Components/ReviewedReports";
import ExternalReviewerForm from "./Components/ExternalReviewerForm";
import ReportView from "./Components/ReportView";
import ReviewView from "./Components/ReviewView";
import InternalReviewerForm from "./Components/InternalReviewerForm";
import HodForm from "./Components/HodForm"
import AssignReport from "./Components/AssignReport";
import NotificationMenu from "./Components/NotificationMenu"
import PerformanceAnalysis from "./Components/PerformanceAnalysis"
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewFacultyList from "./Components/ViewFacultyList";
import ViewReviewerList from "./Components/ViewReviewerList";
import UpdateReviewerProfile from "./Components/UpdateReviewerProfile";
import UpdateFaculty from "./Components/UpdateFaculty";
import NewAssignReport from "./Components/NewAssignReport";
import Deadlines from "./Components/Deadlines";
import ReviewerForm from "./Components/ReviewerForm";
import ReportViewGraded from "./Components/ReportViewGraded";
import AssignReportFinal from "./Components/AssignReportFinal";
import ReviewTableView from "./Components/ReviewTableView";
import ViewGrade from "./Components/ViewGrade";
import FacultyPerformance from "./Components/FacultyPerformance";
import HomepageDesign from "./Components/HomepageDesign";
import GoogleAuth from "./Components/GoogleAuth";
import ProfileViewFaculty from "./Components/ProfileViewFaculty";
import SplitScreenTrial from "./Components/SplitScreenTrial";


function App(props) {
    const roles = ['prof', 'reviewer', 'dofa', 'admin', 'hod', 'doaa']
    var defaultUser = {
        status: false,
        id: -1,
        role: "*"
    };
    const [user, setUser] = useState(defaultUser);

    function handleLogin() {
        console.log("In handle login");
        fetch(`http://localhost:3001/api/test`, {method: "get", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                console.log("data to set");
                console.log(data);
                setUser({status: data.userId != -1, id: data.userId, role: data.userRole});
                console.log(user);
            });
    }
    function reportAccessCheck() {

    }
    useEffect(() => {
        console.log("In app useeffect");
        fetch(`http://localhost:3001/api/test`, {method: "get", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                console.log("data to set");
                console.log(data);
                setUser({status: data.userId != -1, id: data.userId, role: data.userRole});
                console.log(user);
            });
    }, []);
    return (
        <main>

            <Switch>
                <Route key={window.location.pathname} exact path="/"><Redirect to="/login"/></Route>
                <Route key={window.location.pathname} path="/login" handleLogin={handleLogin} render={props => <LoginForm {...props} user={user} handleLogin={handleLogin}/>} exact/>
                <Route key={window.location.pathname} path="/notif" component={NotificationMenu} user={user} exact></Route>
                {/*<ProtectedRoute path="/login" handleLogin={handleLogin} user={user} component={LoginForm} exact/>*/}
                <ProtectedRoute key={window.location.pathname} path="/profile/edit" component={ProfileForm} allowedRoles={roles} exact/>
                <ProtectedRoute key={window.location.pathname} path="/profile/view" component={ProfileView}  allowedRoles={['prof', 'doaa', 'hod', 'dofa', 'reviewer']} handleLogin={handleLogin} exact/>
                <ProtectedRoute key={window.location.pathname} path="/report/uploadfile/" component={FileUpload} allowedRoles={['prof', 'doaa', 'hod', 'dofa']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/createAccount" component={CreateReviewerAccount} allowedRoles={['admin']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/home/" component={LandingPage} allowedRoles={roles} exact/>
                <ProtectedRoute key={window.location.pathname} path="/assignedReports/" component={ReviewerReports} allowedRoles={['reviewer', 'hod', 'doaa']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/viewReviewerAccounts/" component={ViewReviewerList} allowedRoles={['admin']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/viewFacultyAccounts/" component={ViewFacultyList} allowedRoles={['admin']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/reviewedReports/" component={ReviewedReports} allowedRoles={['admin', 'dofa']} exact/>
                <Route path="/unauthorized/" component={Unauthorized} exact/>
                <ProtectedRoute key={window.location.pathname} path="/reviewerForm/:reportId" component={ReviewerForm} allowedRoles={['reviewer', 'hod', 'doaa']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/report/view/:reportId" component={ReportView} allowedRoles={['admin', 'dofa']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/review/view/:reviewerId/:reportId/" component={ReviewView} allowedRoles={['admin']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/assignReport/" component={AssignReportFinal} allowedRoles={['admin']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/deadlines/" component={Deadlines} allowedRoles={['admin']} exact/>
                <Route path="/unauthorized" component={Unauthorized} exact/>
                {/*<ProtectedRoute path="/doaaForm" component={InternalReviewerForm} allowedRoles={['doaa']} exact/>*/}
                <ProtectedRoute key={window.location.pathname} path="/hodForm" component={HodForm} allowedRoles={['hod']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/analysis" component={PerformanceAnalysis} allowedRoles={['dofa']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/performance" component={FacultyPerformance} allowedRoles={['prof']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/admin/updateReviewerProfile/:reviewerId" component={UpdateReviewerProfile} allowedRoles={['admin']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/admin/updateFaculty/:facultyId" component={UpdateFaculty} allowedRoles={['admin']} exact/>
                <ProtectedRoute key={window.location.pathname} path="/report/view/grade/:reportId" component={ReportViewGraded} allowedRoles={['dofa']} exact/>
                <Route path="/homepageDesign/" component={HomepageDesign} exact/>
                <Route path="/splitTest" component={SplitScreenTrial} exact/>
                <Route path="/gauth/" render={props => <GoogleAuth {...props} handleLogin={handleLogin}/>} exact/>

                <ProtectedRoute key={window.location.pathname} path="/profileDesign/" component={ProfileViewFaculty} allowedRoles={['prof', 'reviewer']} exact/>
                {/*<Route component={Error}/>*/}
            </Switch>

            {/*<ProfileForm id="facultyForm"/>*/}
        </main>
    );
}

export default withRouter(App);
