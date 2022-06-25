import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {reviewerFields} from "./HardCode";

function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [currentReview, setCurrentReview] = React.useState({'reviewData': ''});

    function handleReviewOpen(row) {
        fetch(`http://localhost:3001/api/getReview/${row.source}/${row.profileTable}/${row.id}/${props.reportId}`, {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "ERR") {
                    return;
                }
                else{
                    console.log("Review data fetched on the click is : ");
                    console.log(data.result[0])
                    data.result[0].reviewData = JSON.parse(data.result[0].reviewData)
                    delete data.result[0].reviewData.reviewDone
                    // handleDialogOpen(data.result);
                    setCurrentReview(data.result[0]);
                    console.log("Final current review is:")
                    console.log(data.result[0]);
                    // /api/getReview/:reviewTable/:profileTable/:reviewerId/:reportId
                }
            });
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={
                            () => {
                                setOpen(!open);
                                handleReviewOpen(row)
                            }
                        }
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {/*<TableCell component="th" scope="row">*/}
                {/*    {row.name}*/}
                {/*</TableCell>*/}
                {/*<TableCell align="right">{row.calories}</TableCell>*/}
                {/*<TableCell align="right">{row.fat}</TableCell>*/}
                {/*<TableCell align="right">{row.carbs}</TableCell>*/}
                {/*<TableCell align="right">{row.protein}</TableCell>*/}

                {props.columns.map((column, index) => {
                    const value = row[column.id];
                    return (
                        <TableCell key={index}>
                            {value}
                        </TableCell>
                    );
                })}

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit style={{backgroundColor: 'white'}}>
                        <Box>
                            <Typography variant="h6" gutterBottom component="div">
                                    REVIEW
                            </Typography>
                            {
                                Object.keys(currentReview['reviewData']).map((field) => {
                                    return (
                                        <Typography variant="h6" gutterBottom component="div">
                                            <div style={{
                                                color: 'blue',
                                                display: 'inline',
                                            }}>
                                                {reviewerFields[field]['label']}
                                            </div>
                                            : {currentReview['reviewData'][field]}
                                        </Typography>
                                    )
                                })
                            }
                            {/*{*/}
                            {/*    currentReview['reviewData']*/}
                            {/*}*/}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable(props) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {
                            props.columns.map((column) => {
                                return (
                                    <TableCell>{column.label}</TableCell>
                                )
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row, index) => (
                        <Row key={index} row={row} columns={props.columns} reportId={props.reportId}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
