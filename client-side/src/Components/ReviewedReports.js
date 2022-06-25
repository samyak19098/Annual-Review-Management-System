import React, {Component, useEffect, useState} from 'react';
// import {DataGrid} from "@material-ui/data-grid";
import Navbar from "./Navbar";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {reviewedReportsColumns} from "./HardCode";
// import {GridToolbar} from "@mui/x-data-grid";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';



const useStyles = makeStyles((theme) => {
    return ({
        root: {
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            backgroundSize: 'cover',
            position: 'absolute'
        },
        root2: {
            '& .MuiAvatar-img': {
                width: '100%',
                height: '100%',
            },
            height: '80%',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        dataGrid:{
            backgroundColor: 'white',
            // borderRadius: 15,
            border: '1px solid rgba(0, 0, 0, 0.3)',
            height: '80%',
            width:'85%',
            marginTop: '2%',
            boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, .6)',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
            overflow: "auto",

        },
        heading:{
            color: '#032a73',
            fontWeight: 'bold',
            fontSize: 40,
            marginTop: '5%',
            marginLeft: '7%'
        }


    });
});


/*
Returns the reviewed reports component which contains
data of all the reports (with their status)
 */
function ReviewedReports(props) {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const defaultColumns = JSON.parse(JSON.stringify(reviewedReportsColumns));
    const [columns, setColumns] = useState(defaultColumns);

    function handleOpenButton(params) {
        console.log("Trying to push to history");
        if(props.user.role == 'dofa') {
            props.history.push(`/report/view/grade/${params.getValue(params.id, 'id')}`);
        } else {
            props.history.push(`/report/view/${params.getValue(params.id, 'id')}`);
        }
    }
    useEffect(() => {
        setColumns(
            [
                ...columns,
                {
                    field: 'open',
                    headerName: 'Report',
                    width: 150,
                    sortable: false,
                    filterable: false,
                    renderCell: (params) => (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginLeft: 16 }}
                            onClick={() => {
                                handleOpenButton(params);
                            }}
                        >
                            Open
                        </Button>
                    )
                }
            ]
        )
        fetch(`http://localhost:3001/api/getreports/all`, {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                var currentSno = 1;
                data.result.forEach((value) => {
                    // value.id = currentId;
                    value.sno = currentSno;
                    currentSno++;
                });
                setRows(data.result);
            });
    }, []);

    function renderElement() {
        const element = (
            <div className={classes.root}>
                <div className={classes.root2}>
                    <Navbar userrole={props.user.role} active="Reports" match={props.match} user={props.user} history={props.history}/>
                    <div className={classes.heading}>
                        Submitted Faculty Reports
                    </div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}

                        // checkboxSelection
                        disableSelectionOnClick
                        className={classes.dataGrid}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </div>
            </div>

        );

        return element;
    }
    return (
        renderElement()
    );
}

export default ReviewedReports;