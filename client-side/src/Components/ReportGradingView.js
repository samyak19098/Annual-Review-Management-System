import React, {useEffect, useState} from "react";
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Navbar from "./Navbar";
import ReviewerListCumReview from "./ReviewerListCumReview";
import Card from "@mui/material/Card";

// Remove scroll bar from body
// document.body.style.overflow = 'hidden';

function ReportView(props) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    var fetchUrl = `http://localhost:3001/api/report/sendfile/${props.match.params.reportId}`;
    // const styles = {
    //     splitScreen: {
    //         display: 'flex',
    //         flexDirection: 'row',
    //         marginLeft: '50px',
    //         marginRight: '50px',
    //         marginTop: '10px',
    //         borderRadius: '30px',
    //         // border: '2px solid red'
    //     },
    //     leftPane: {
    //         width: '60%',
    //         margin: '20px',
    //         boxShadow: '10px 10px 5px grey',
    //         minHeight: '40vh',
    //     },
    //     rightPane: {
    //         display: 'flex',
    //         width: '100%',
    //         margin: '20px',
    //         // border: '2px solid cyan',
    //         boxShadow: '10px 10px 5px grey',
    //         minHeight: '40vh',
    //         // backgroundColor: 'cyan',
    //     },
    // }

    const styles = {
        splitScreen: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '50px',
            marginRight: '50px',
            marginTop: '10px',
            // borderRadius: '30px',
            // border: '2px solid red'
        },
        leftPane: {
            width: '60%',
            margin: '20px',
            minHeight: '40vh',
            // border: '2px solid green',
            boxShadow: '10px 10px 5px grey',
            // borderRadius: '2%'

            // backgroundColor: 'yellow',
        },
        rightPane: {
            width: '40%',
            margin: '20px',
            minHeight: '40vh',
            // border: '2px solid cyan',
            // boxShadow: '10px 10px 5px grey',
            // borderRadius: '2%',
            display: 'flex',
            flexDirection: 'column'
            // backgroundColor: 'cyan',
        },
        topRightPane: {
            height: '50%',
            width: '100%',
            boxShadow: '10px 10px 5px grey',
            // borderRadius: '2%',
            // border: '2px solid red',

        },
        bottomRightPane: {
            height: '50%',
            width: '100%',
            boxShadow: '10px 10px 5px grey',
            // borderRadius: '2%',
            // border: '2px solid red',
        }
    }

    const [internalReviewers, setInternalReviewers] = useState([]);
    const [externalReviewers, setExternalReviewers] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/report/reviewers/${props.match.params.reportId}`, {method: "get", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if(data.status != 'EMPTY') {
                    setInternalReviewers(data.result);
                } else {
                    // props.history.push('/unauthorized');
                }

            });

        fetch(`http://localhost:3001/api/report/internalReviewers/${props.match.params.reportId}`, {method: "get", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if(data.status != 'EMPTY') {
                    setExternalReviewers(data.result);
                } else {
                    // props.history.push('/unauthorized');
                }

            });
    }, []);

    const element = (
        <div>
            <Navbar userrole={props.user.role} active="Report View" match={props.match} user={props.user} history={props.history}/>

            <div style={{textAlign: 'center', fontSize: '30px', fontWeight: 'bold'}}>Reviewers</div>
            <div style={styles.splitScreen}>
                <div style={styles.leftPane}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                        <div
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                height: '100vh',
                                overflow: 'hidden',
                                width: '100%'
                            }}
                        >
                            <Viewer
                                fileUrl={fetchUrl}
                                plugins={[
                                    // Register plugins
                                    defaultLayoutPluginInstance
                                ]}
                            />
                        </div>
                    </Worker>
                </div>
                <div style={styles.rightPane}>
                    {/*<Card>*/}
                    <div style={styles.topRightPane}>
                        <ReviewerListCumReview reviewerType='external' user={props.user} key={internalReviewers} {...props} list={internalReviewers} reportId={props.match.params.reportId}/>
                    </div>
                    <div style={styles.bottomRightPane}>
                        <ReviewerListCumReview reviewerType='internal' user={props.user} key={externalReviewers} {...props} list={externalReviewers} reportId={props.match.params.reportId}/>
                    </div>
                    {/*</Card>*/}
                </div>
            </div>
        </div>

    );

    return (
        element
    );

}

export default ReportView;