import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


function ReviewView(props) {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [userDetails, setUserDetails] = useState({})
    useEffect(() => {
        let reviewTable = 'reviews', profileTable = 'reviewer';
        console.log("wth");
        console.log(props.user);
        if(props.reviewerType == 'internal') {
            reviewTable = 'internalReviews';
            profileTable = 'faculty';
        }
        fetch(`http://localhost:3001/api/getReview/${reviewTable}/${profileTable}/${props.reviewerId}/${props.reportId}/`, {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                setRows(data.result.map((value) => (
                    JSON.parse(value.reviewData)
                )));
                // setUserDetails({firstName: data.result[0].firstName, reviewerId: data.result[0].reviewerId})
                console.log("Data is");
                console.log(data.result.map((value) => (
                    JSON.parse(value.reviewData)
                )))
            });
    }, []);
    function toUpper(word) {
        return word.charAt(0).toUpperCase() + word.substring(1);
    }
    const element = (
        <div style={{height: '100%'}}>
            {/*<Navbar active="Report View" match={props.match} user={props.user} history={props.history}/>*/}
            <TableContainer component={Paper} style={{height: '100%', overflowY: 'scroll'}}>
                {
                    props.backButton
                }
                <div style={{textAlign: 'center', fontSize: '30px', fontWeight: 'bold'}}>Review</div>
                <Table sx={{ maxHeight: '10px' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Parameter</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Score/Remark</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map((row) => {
                                return (
                                    Object.keys(row).map((key) => {
                                        return (
                                            <TableRow key={key}>
                                                <TableCell component="th" scope="row">
                                                    {toUpper(key)}
                                                </TableCell>
                                                <TableCell align="right">{row[key]}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
    console.log(element);

    return element;
}

export default ReviewView;