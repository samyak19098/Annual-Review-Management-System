import React, {Component, useEffect, useState} from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import '../style/CheckBoxStyle.scss';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";



const notAdded_useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor : 'green',
        // border : '2px solid #EA4335',
        color : '#FFFFFF',
        // width: '80%',
        // height:'80%',
    }
}));
const added_useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor : 'red',
        // border : '2px solid #9B84EF',
        color : '#FFFFFF',
        // width: '80%',
        // height:'80%',
    }
}));

function MyCheckBox(props){

    const notAdded_classes = notAdded_useStyles();
    const added_classes = added_useStyles();
    return (
        <React.Fragment>
            <div className = "reviewer-container"
                style = {{
                    backgroundColor: props.isUpdating ? props.activeColor : props.inactiveColor,
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '1%',
                }}
            >
                <div className = "left-flex-comp"
                style = {{
                    display: 'flex',
                    width: '70%',
                    alignItems:'center'
                }}
                >
                    <div className="person-icon"
                         style = {{
                             width: '10%',
                             padding:'2%',
                         }}
                    >
                        <AssignmentIndIcon/>
                    </div>
                    <div className="rev-name"
                         style = {{
                             width: '80%',
                             padding:'2%',
                         }}
                    >
                        <Typography>{props.reviewerName}</Typography>

                    </div>
                </div>
                <div className = "right-flex-comp"
                     style = {{
                         display: 'flex',
                         width: '30%',
                         justifyContent:'flex-end',
                         alignItems:'center'
                     }}
                >
                    {/*<Clickable>*/}
                        <div className="add-button" onClick={() => props.clickHandler(props.fieldId)}
                            style = {{
                                padding: '1%',
                                margin: '3%',
                            }}
                        >
                            { (props.isUpdating^(props.isAssigned)) ? <Avatar className = {added_classes.avatar}><IndeterminateCheckBoxIcon/></Avatar>:<Avatar className = {notAdded_classes.avatar}><AddBoxIcon/></Avatar>}
                        </div>
                    {/*</Clickable>*/}
                </div>
            </div>
        </React.Fragment>
    );
}
export default MyCheckBox;