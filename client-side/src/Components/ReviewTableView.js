import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TablePagination from '@mui/material/TablePagination';
import ReviewDisplay from "./ReviewDisplay";
import CollectiveReview from "./CollectiveReview";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CollapsibleTable from "./CollapsibleTable";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const styles = {
    splitScreen: {
        display: 'flex',
        flexDirection: 'row',
    },
    leftPane: {
        height: '100vh',
        width: '50%',
        backgroundColor: '#FFFFFF',
    },
    rightPane: {
        height: '100vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        width: '50%',
        backgroundColor: '#FFFFFF',
    },
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/*
List of all the columns in the review form
 */
const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'publication', label: 'Publication', minWidth: 100},
    {
        id: 'patents',
        label: 'Patents',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'funding',
        label: 'Funding',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'entrepreneurship',
        label: 'Entrepreneurship, Societal Impact',
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
];

const internal_rev = ["services", "teaching"];
const external_rev = ["funding", "patents", "publication", "entrepreneurship"];
const column_fields = ["funding", "patents", "publication", "entrepreneurship", "services", "teaching"];
const remark_fields = ["fundingRemark", "patentsRemark", "publicationRemark", "entrepreneurshipRemark", "servicesRemark", "teachingRemark", "finalReviewerRemark", "finalInternalRemark"]


/*
Returns the reviewer table and review form component
 */

function ReviewTableView(props) {
    const classes = useStyles();
    const [userDetails, setUserDetails] = useState({})
    const [table, setTable] = useState([])
    const [rows, setRows] = useState([]);
    const [currSelected, setCurrSelected] = useState({source:"modifiedReviews", id:-1});
    const [currReview, setCurrReview] = useState({});
    const [remarks, setRemarks] = useState({"fetched": {}, "formed": {"fundingRemark":"", "patentsRemark":"", "publicationRemark":"", "entrepreneurshipRemark":"", "finalReviewerRemark":"", "servicesRemark":"", "teachingRemark":"", "finalInternalRemark":""}});
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    useEffect(() => {

        // Fetch all the internal reviewer data
        fetch(`http://localhost:3001/api/internalReviews/${props.match.params.reportId}`, {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                for(const entry of data.result){
                    entry["source"] = "internalReviews";
                    entry["profileTable"] = "faculty";
                }
                setTable(table => [...table, data.result]);
            });

        // Fetch all the external reviewer data
        fetch(`http://localhost:3001/api/externalReviews/${props.match.params.reportId}`, {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                for(const entry of data.result){
                    entry["source"] = "reviews";
                    entry["profileTable"] = "reviewer";
                }
                setTable(table => [...table, data.result]);
            });
        }, []);
    useEffect(() => {
        var to_append = []
        for(const entry of table){
            for(const data of entry){
                var data_object = {"profileTable":"", "source": "","id": -1, "name": "-",  "publication" : "-", "patents" : "-", "funding" : "-","entrepreneurship" : "-",
                    "teaching" : "-", "services" : "-"};
                data_object["name"] = data['firstName']
                data_object["id"] = data['reviewerId']
                data_object["source"] = data['source']
                data_object["profileTable"] = data['profileTable']
                data_object["finalStatus"] = data['finalStatus'];

                const review_data = JSON.parse(data["reviewData"]);
                const keys = Object.keys(review_data)
                for(const cols of column_fields){
                    if(keys.includes(cols)){
                        data_object[cols] = review_data[cols]
                    }
                }
                for(const col of remark_fields){
                    if(keys.includes(col)){
                        remarks["formed"][col] += ' || ' + review_data[col]
                    }
                    remarks['formed'][col] += ' ||';
                }
                to_append.push(data_object);
            }
        }
        setRows(rows => [...to_append]);
    }, [table])
    
    

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function handleReviewOpen(row) {
        fetch(`http://localhost:3001/api/getReview/${row.source}/${row.profileTable}/${row.id}/${props.match.params.reportId}`, {
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
                    console.log(data.result[0]['reviewData'])
                    setCurrReview(data.result);
                }
            });
    }

    return (
        <div style={styles.splitScreen}>
            <div style={styles.leftPane}>
                <div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <CollapsibleTable rows={rows} columns={columns} reportId={props.match.params.reportId}/>
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
            <div style={styles.rightPane}>
                <CollectiveReview formData = {remarks} reportId={props.match.params.reportId} saveVisible = {true}></CollectiveReview>
                <Dialog
                    fullScreen
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleDialogClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Sound
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleDialogClose}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem button>
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText
                                primary="Default notification ringtone"
                                secondary="Tethys"
                            />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        </div>
    );
}

export default ReviewTableView;