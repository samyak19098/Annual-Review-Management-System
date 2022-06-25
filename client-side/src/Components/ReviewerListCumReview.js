import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import {navbarFields} from "./HardCode";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ReportView from "./ReportView";
import ReviewView from "./ReviewView";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function ReviewerListCumReview(props) {
    const [element, setElement] = useState('1000');
    console.log("Here i am")
    console.log(props.list);
    function setToList() {
        setElement(getList(props.list));
    }
    function setToReview(reportId, reviewerId) {
        // console.log('reportId = ' + info.reportId + ' reviewerId = ' + info.reviewerId);
        const review = (
            <div style={{height: '100%'}}>
                <ReviewView reviewerType={props.reviewerType} reviewerId={reviewerId} user={props.user} reportId={reportId} backButton={<ArrowBackIcon button onClick={() => {setToList()}}/>}/>
            </div>
        )
        setElement(review);
    }
    function getField(field) {
        const element = (
            <ListItem button key={field.emailAddress} onClick={() => {setToReview(props.reportId, field.reviewerId)}}>
                <ListItemText primary={`${field.firstName} (${field.emailAddress})`} />
            </ListItem>
        );
        return element;
    }

    function getList(fieldsList, title) {
        return (
            <List>
                <div style={{textAlign: 'center', fontSize: '30px', fontWeight: 'bold'}}>{title}</div>
                {
                    fieldsList.map((value) => {
                        return getField(value);
                    })
                }
            </List>
        )
    }
    // <ReviewView reviewerId={1} reportId={1} />
    useEffect(() => {
        console.log("Here is props.list");
        console.log(props.list);
        setElement(getList(props.list, props.title));
    }, []);
    console.log(element);
    // const element = getList(props.list);
    return (
        element
    );
}

export default ReviewerListCumReview;