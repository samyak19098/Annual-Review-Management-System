import React, {useEffect, useState} from 'react'
import Chart from "./Chart";
import Navbar from "./Navbar";
import {Bar, Doughnut, Line} from 'react-chartjs-2'
import {departments} from "./HardCode";
import {InputLabel, Select} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import {numericGradingFields} from "./HardCode";
import {graphFieldColors} from "./HardCode";

const state = {
    labels: ['January', 'February', 'March',
        'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Research',
            backgroundColor: 'rgb(151,17,88)',
            borderWidth: 0,
            data: [65, 59, 80, 81, 56, 60, 60],
        },
        {
            label: 'Teaching',
            backgroundColor: 'rgb(49,119,179)',
            borderWidth: 0,
            data: [65, 59, 80, 81, 56, 60, 60],
        },
        {
            label: 'Services',
            backgroundColor: 'rgb(123,179,49)',
            borderWidth: 0,
            data: [65, 59, 80, 81, 56, 60, 60],
        }
    ]
}
const styles = {
    splitScreen: {
        display: 'flex',
        flexDirection: 'row',
    },
    leftPane: {
        width: '100%',
        padding: '20px',
    },
    rightPane: {
        width: '50%',
        padding: '20px',
    },
}


/*
Returns the performance analysis componenet which contains
options to plot different types of graphs for different
years
 */

function PerformanceAnalysis(props) {
    const [yearList, setYearList] = useState([]);
    const [data, setData] = useState({});
    const [meanData, setMeanData] = useState({});
    const [meanDataDoughnut, setMeanDataDoughnut] = useState({});
    const [stackedData, setStackedData] = useState({});
    // TODO: change year to current year
    const [year, setYear] = useState(2022);
    const [isFetched, setIsFetched] = useState(false);
    const [department, setDepartment] = useState("CSE")
    const [standardDeviation, setStandardDeviation] = useState('NA')
    const [type, setType] = useState('bar');
    function handleChange(event) {
        setYear(event.target.value);
    }
    function handleChangeType(event) {
        setType(event.target.value);
    }
    function handleDeptChange(event) {
        setDepartment(event.target.value);
    }

    function getStandardDeviation (array) {
        const n = array.length
        const mean = array.reduce((a, b) => a + b) / n
        return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    }

    function mean(state) {
        const currentMeanData = {
            labels: departments,
            datasets: [],
        }
        const currentMeanDataDoughnut = {};
        for (const field in numericGradingFields) {
            const dataOfField = []
            for (const department of departments) {
                let sum = 0.0;
                for (const entry of state[year][department]) {
                    sum += parseInt(JSON.parse(entry)[field]);
                }
                dataOfField.push(sum / state[year][department].length);
            }
            currentMeanData['datasets'].push({
                label: numericGradingFields[field]['label'],
                borderWidth: 2,
                backgroundColor: graphFieldColors[field],
                data: dataOfField,
                tension: 0.1,
            });
        }

        for (const department of departments) {
            const dataOfField = {}
            for (const field in numericGradingFields) {
                let sum = 0.0;
                for (const entry of state[year][department]) {
                    sum += parseInt(JSON.parse(entry)[field]);
                }
                dataOfField[field] = sum / state[year][department].length;
            }
            currentMeanDataDoughnut[department] = {...dataOfField}
        }
        setMeanDataDoughnut(currentMeanDataDoughnut);
        setMeanData(currentMeanData);
    }

    function stacked(state) {
        const currentStackedData = {
            labels: departments,
            datasets: [],
        }

        for(let score = 1; score <= 5; score++) {
            for(const field in numericGradingFields) {
                const dataOfField = [];
                let stackno = 0;
                for(const department of departments) {
                    let cnt = 0;
                    for(const entry of state[year][department]) {
                        const parsedEntry = JSON.parse(entry);
                        if(parsedEntry[field] == score) {
                            cnt++;
                        }
                    }
                    dataOfField.push(cnt)
                }
                currentStackedData['datasets'].push({
                    label: numericGradingFields[field]['label'],
                    borderWidth: 0,
                    backgroundColor: graphFieldColors[field],
                    data: dataOfField,
                    stackno: `stackno${stackno}`,
                })
                stackno++;
            }
        }

        console.log("Stacked data")

    }

    useEffect(() => {
        const yearLower = 2019;
        const yearUpper = new Date().getFullYear();

        const yearListTemp = [];

        for(let currentYear = yearUpper; currentYear > Math.max(yearLower - 1, yearUpper - 5); currentYear--) {
            yearListTemp.push(currentYear);
        }

        setYearList([...yearListTemp]);

        if(!isFetched) {
            fetch(`http://localhost:3001/api/facultyGrade/getAll`, {
                method: "get",
                credentials: "include"
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "ERR") {
                        alert("Could not load grades");
                        console.log("Error loading grades");
                        return;
                    }
                    setIsFetched(true);
                    console.log(data);
                    const state = {};
                    for (let currentYear = 2015; currentYear <= 2022; currentYear++) {
                        state[currentYear] = {};
                        for (const department of departments) {
                            state[currentYear][department] = [];
                        }
                    }

                    for (const entry of data.result) {
                        state[entry.year][entry.department].push(entry.grade)
                    }
                    console.log(state);
                    setData(state);

                    // Setting mean data
                    mean(state);
                });
        }
    }, []);

    useEffect(() => {
        if(isFetched) {

            // Mean plot calculations
            mean(data)
        }
    }, [year]);

    useEffect( () => {
        if(isFetched){

        }
    }, [department]);



    const element = (
        <div>
            <Navbar userrole={props.user.role} active="Performance Analysis" match={props.match} user={props.user} history={props.history}/>

            <div style={{margin: 'auto', padding: '10px', textAlign: 'center'}}>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="Year"
                    onChange={handleChange}
                >
                    {
                        yearList.map((value) => {
                            return (
                                <MenuItem value={value}>{value}</MenuItem>
                            )
                        })
                    }
                </Select>
            </div>

            <div style={{margin: 'auto', padding: '10px', textAlign: 'center'}}>
                <InputLabel id="demo-simple-select-label">Chart Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Year"
                    onChange={handleChangeType}
                >
                    <MenuItem value={'bar'}>Bar</MenuItem>
                    <MenuItem value={'doughnut'}>Doughnut</MenuItem>
                    <MenuItem value={'radar'}>Radar</MenuItem>
                    <MenuItem value={'line'}>Line</MenuItem>
                </Select>
            </div>

            <div style={styles.splitScreen}>
                <div style={styles.leftPane}>
                    <Chart
                        state={meanData}
                        stateDoughnut={meanDataDoughnut}
                        chartType={type}
                    />
                </div>
            </div>
        </div>

    );

    return element
}

export default PerformanceAnalysis;