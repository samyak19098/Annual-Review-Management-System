import React from 'react'
import {Tab, Tabs} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import Navbar from "./Navbar";
import ReportView from "./ReportView";
import GradingForm from "./GradingForm";
import ReviewTableView from "./ReviewTableView";
import CollapsibleTable from "./CollapsibleTable";
import HomepageDesign from "./HomepageDesign";

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

/*
Returns the report view graded component which contains
three tabs: Report, Review and Grading
 */

function ReportViewGraded(props) {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const element = (
        <div>
            <Navbar userrole={props.user.role} active="Grade Report" match={props.match} user={props.user} history={props.history}/>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Report" value="1" />
                            <Tab label="Review" value="2" />
                            <Tab label="Grading" value="3" />
                        </TabList>
                    </Box>
                    {/*Three tabs: Report, Review and Grading*/}
                    <TabPanel value="1"> <ReportView {...props}/> </TabPanel>
                    <TabPanel value="2"> <ReviewTableView {...props}/> </TabPanel>
                    <TabPanel value="3"> <GradingForm {...props}/> </TabPanel>
                </TabContext>
            </Box>
        </div>
    );

    return (
        element
    );
}

export default ReportViewGraded;
