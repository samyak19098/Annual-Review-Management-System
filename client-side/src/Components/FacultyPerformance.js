import React from 'react'
import {Tab, Tabs} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import Navbar from "./Navbar";
import ViewGrade from "./ViewGrade";
import FacultyReviewView from "./FacultyReviewView";

function FacultyPerformance(props) {

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
                            <Tab label="Performance Summary" value="1" />
                            <Tab label="Review" value="2" />
                            {/*<Tab label="Grading" value="3" />*/}
                        </TabList>
                    </Box>
                    <TabPanel value="1"> <ViewGrade {...props}/> </TabPanel>
                    <TabPanel value="2"> <FacultyReviewView {...props}/> </TabPanel>
                    {/*<TabPanel value="3"> <GradingForm {...props}/> </TabPanel>*/}
                </TabContext>
            </Box>
        </div>
    );

    return (
        element
    );
}

export default FacultyPerformance;
