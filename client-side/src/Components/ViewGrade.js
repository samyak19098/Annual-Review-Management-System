import React, {Component, useEffect, useState} from 'react';
import Navbar from "./Navbar";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TablePagination from '@mui/material/TablePagination';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const columns = [
    { id: 'year', label: 'Year', minWidth: 170 },

    {
        id: 'research',
        label: 'Research',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'teaching',
        label: 'Teaching',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'services',
        label: 'Services',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'remark',
        label: 'Remark',
        minWidth: 170,
        align: 'right',
    },

];
// function createData(name, publication, patents, funding, entrep, teaching, services) {
//     return { name, publication, patents, funding, entrep, teaching, services};
// }
const internal_rev = ["services", "teaching"];
const external_rev = ["funding", "patents", "publication", "entrepreneurship"];
const column_fields = ["research", "year", "remark", "services", "teaching"];

function ViewGrade(props){

    const classes = useStyles();
    // const [rows, setRows] = useState([]);
    const [userDetails, setUserDetails] = useState({})
    const [table, setTable] = useState([])
    const [rows, setRows] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/api/grade/view/${props.user.id}`, {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("DATA RESULT = ")
                console.log(data.result);
                console.log(data.status)
                console.log(typeof data.result)
                console.log(data.result === null)
                // var gradeDetails = JSON.stringify(data.result.grade);
                // gradeDetails["year"] = data.result.year
                // if(table.indexOf(data.result)){
                //     setTable(table => [...table, data.result]);
                // }
                console.log("Grade Table View")
                // console.log(data.result);
                //
                //
                // console.log(table);
                if(data.status != "EMPTY"){
                    var to_append = []
                    for(const entry of data.result){
                        // for(const data_dict in entry){

                        var data_object = {"year": "-", "research": "-",
                            "teaching" : "-", "services" : "-", "remark":"-"};
                        const yearToSet = JSON.parse(entry["grade"])["yearOfReport"]
                        console.log("got data : " + JSON.stringify(entry));
                        data_object["year"] = yearToSet;
                        console.log("data grade: ");
                        console.log(entry["grade"]);
                        const review_data = JSON.parse(entry["grade"]);
                        console.log("-------------------")
                        console.log("review data = ")
                        console.log(review_data)
                        console.log("-------------------")
                        const keys = Object.keys(review_data)
                        for(const cols of column_fields){
                            if(keys.includes(cols)){
                                data_object[cols] = review_data[cols]
                            }
                        }
                        to_append.push(data_object);
                        console.log("TO APPEND");
                        console.log(to_append);
                    }
                    // }
                    setRows(rows => [...rows, ...to_append]);
                    console.log(rows)
                }


            });

    }, []);

    // useEffect(() => {
    //     console.log("Table = ");
    //     console.log(table);
    //     var to_append = []
    //     for(const entry of table){
    //         for(const data of entry){
    //
    //             var data_object = {"year": "-", "research": "-",
    //                 "teaching" : "-", "services" : "-", "remark":"-"};
    //             console.log("got data : " + JSON.stringify(data));
    //
    //             data_object["year"] = data["year"];
    //
    //             const review_data = JSON.parse(data["grade"]);
    //             console.log("-------------------")
    //             console.log("review data = ")
    //             console.log(review_data)
    //             console.log("-------------------")
    //             const keys = Object.keys(review_data)
    //             for(const cols of column_fields){
    //                 if(keys.includes(cols)){
    //                     data_object[cols] = review_data[cols]
    //                 }
    //             }
    //             to_append.push(data_object);
    //             console.log("TO APPEND");
    //             console.log(to_append);
    //         }
    //     }
    //     setRows(rows => [...rows, ...to_append]);
    //     console.log(rows)
    // }, [])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <div>
            <Navbar userrole={props.user.role} active="Performance Summary" match={props.match} user={props.user} history={props.history}/>
            <Typography variant="h2" style={{margin:"2%", padding:"2%", color:'#032a73'}}>Performance Summary Table</Typography>
            <div style ={{margin:"4%", padding:"2%"}}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );

}

export default ViewGrade;
