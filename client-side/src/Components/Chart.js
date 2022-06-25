import React from 'react'
import {Bar, Doughnut, Line, Radar} from 'react-chartjs-2'
import {Scatter} from "recharts";
import {departments, graphFieldColors, numericGradingFields} from "./HardCode";

function Chart(props) {

    function getDoughnut(data) {
        return (
            <Doughnut
                data={data}
                options={{
                    aspectRatio: 3.5,
                }}
            />
        )
    }

    function getDoughnuts() {
        const doughnuts = []
        console.log("DDD");
        console.log(props.stateDoughnut)
        for (const department of departments) {
            const datasets = [];
            for (const field in numericGradingFields) {
                try {
                    datasets.push(props.stateDoughnut[department][field])
                } catch(e) {
                    console.log("No data yet");
                }
            }
            doughnuts.push(
                getDoughnut({
                    labels: ['Research', 'Services (Institute + Professional)', 'Teaching'],
                    datasets: [
                        {
                            label: department,
                            borderWidth: 2,
                            backgroundColor: [
                                'rgb(151,17,88)',
                                'rgb(123,179,49)',
                                'rgb(49,119,179)',
                            ],
                            data: datasets,
                            tension: 0.1,
                        }
                    ]
                })
            )
        }
        return doughnuts;
    }

    const charts = {
        bar: (
            <Bar
                data={props.state}
                options={{
                    responsive: true,
                    aspectRatio: 3.5,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Department',
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Average Score',
                            }
                        },

                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Departmentwise Average Score',
                        },
                    }
                }}
            />
        ),
        stackedBar: (
            <Bar
                data={props.state}
                options={{
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    },
                    interaction: {
                        intersect: false,
                    },
                    plugins: {
                        legend: {
                            onClick: null,
                        },
                    },
                }}
            />
        ),
        scatter: (
            <Scatter
                data={props.state}
                // options={{
                //     aspectRatio: 2,
                //     plugins: {
                //         title: {
                //             display: true,
                //             text: 'Title'
                //         }
                //     }
                // }}
            />
        ),
        doughnut: (
            <div>
                {
                    getDoughnuts().map((value) => {
                        return value;
                    })
                }
            </div>
        ),
        radar: (
            <Radar
                data={props.state}
                options={{
                    aspectRatio: 3.5,
                }}
            />
        ),
        line: (
            <Line
                data={props.state}
                options={{
                    aspectRatio: 3.5
                }}
            />
        )
    };
    // console.log("Doughnut")
    // console.log(props.)
    return charts[props.chartType]
}

export default Chart