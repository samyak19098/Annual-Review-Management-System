const assignReviewerToReport = function (app, con) {
    app.post("/api/assignReviewer/add", (req, res) => {
        var reviewers = req.body.reviewers;
        var reportId = req.body.report.id;
        // console.log('reportId = ' + reportId);

        var sqlQuery = "INSERT IGNORE INTO reviews (reportId, reviewerId, reviewStatus) VALUES ?";
        var values = [];
        for (let i = 0; i < reviewers.length; i++) {
            console.log(reviewers[i].id);
            values.push([reportId, parseInt(reviewers[i].id), 'Pending']);
        }
        console.log("SQL QUERY : " + sqlQuery);
        console.log(values);
        // var sqlQuery = `INSERT INTO reviews VALUES (${reportId}, ${reviewerId}, NULL, 'Pending', NULL);`
        con.query(sqlQuery, [values], (err, result) => {
            if (err) {
                throw err;
            }
            const queryResult = {
                status: "EMPTY",
                result: {}
            };
            if (result.length != 0) {
                queryResult.status = "Added";
                queryResult.result = result;
            }
            console.log("HERE IS getReviewerbyReport : " + JSON.stringify(queryResult));
            res.json(queryResult.status);
        });
    });
}


const removeReviewerFromReport = function (app, con) {
    app.post("/api/assignReviewer/remove", (req, res) => {
        var reviewers = req.body.reviewers;
        var reportId = req.body.report.id;

        toDelete = [];
        for (let i = 0; i < reviewers.length; i++) {
            toDelete.push([reviewers[i].id, reportId]);
        }
        var sqlQuery = `DELETE
                        FROM reviews
                        WHERE (reviewerId, reportId) IN (?)`;
        con.query(sqlQuery, [toDelete], (err, result) => {
            if (err) {
                throw err;
            }
            const queryResult = {
                status: "EMPTY",
                result: {}
            };
            if (result.length != 0) {
                queryResult.status = "Deleted";
                queryResult.result = result;
            }
            res.json(queryResult.status);
        });

    });
}

//------------------------------------------------------------------------------


//------------Final Assign Part ------------------------------------
const assignReportToReviewer = function (app, con) {
    app.post("/api/assignReport/add", (req, res) => {
        // var reviewers = req.body.reviewers;
        // var reportId = req.body.report.id;
        var reports = req.body.reports;
        var reviewerId = req.body.reviewer.id
        // console.log('reportId = ' + reportId);

        var sqlQuery = "INSERT IGNORE INTO reviews (reportId, reviewerId, reviewStatus) VALUES ?";
        var values = [];
        for (let i = 0; i < reports.length; i++) {
            console.log(reports[i].id);
            values.push([parseInt(reports[i].id), parseInt(reviewerId), 'Pending']);
        }
        console.log("SQL QUERY : " + sqlQuery);
        console.log(values);
        // var sqlQuery = `INSERT INTO reviews VALUES (${reportId}, ${reviewerId}, NULL, 'Pending', NULL);`
        con.query(sqlQuery, [values], (err, result) => {
            if (err) {
                throw err;
            }
            const queryResult = {
                status: "EMPTY",
                result: {}
            };
            if (result.length != 0) {
                queryResult.status = "Added";
                queryResult.result = result;
            }
            // console.log("HERE IS getReviewerbyReport : " + JSON.stringify(queryResult));
            res.json(queryResult.status);
        });
    });
}

const removeReportFromReviewer = function (app, con) {
    app.post("/api/assignReport/remove", (req, res) => {
        // var reviewers = req.body.reviewers;
        // var reportId = req.body.report.id;
        var reports = req.body.reports;
        var reviewerId = req.body.reviewer.id;
        toDelete = [];
        for (let i = 0; i < reports.length; i++) {
            toDelete.push([reviewerId, reports[i].id]);
        }
        var sqlQuery = `DELETE
                        FROM reviews
                        WHERE (reviewerId, reportId) IN (?)`;
        con.query(sqlQuery, [toDelete], (err, result) => {
            if (err) {
                throw err;
            }
            const queryResult = {
                status: "EMPTY",
                result: {}
            };
            if (result.length != 0) {
                queryResult.status = "Deleted";
                queryResult.result = result;
            }
            res.json(queryResult.status);
        });

    });
}

//-------------------------------------------------------------------


const updateModifiedReview = function (app, con) {
    app.post('/api/updateModifiedReview/:table/:reviewerId/:reportId', function (req, res) {
        const reviewerId = req.params.reviewerId;
        const reportId = req.params.reportId;

        console.log(req.body);
        console.log(JSON.stringify(req.body));

        const fetchQuery = `SELECT *
                            FROM reviews
                            WHERE reportId = ${reportId}
                              AND reviewerId = ${reviewerId}`;
        con.query(fetchQuery, function (err, result, fields) {
            console.log("Modified reviews query here");
            console.log(result);
            try {
                result = result[0]
            } catch (err) {
                throw err;
            }
            const insertQuery = `INSERT INTO modifiedReviews
                                 VALUES (${result.reportId}, ${result.reviewerId}, ${result.reviewDate},
                                         '${result.reviewStatus}', '${result.reviewData}', 'False')`
            con.query(insertQuery, function (err, result, fields) {
                const queryResult = {
                    status: 'ERR'
                };
                if (err) {
                    throw err;
                }
                console.log("Executed modified insert query successfully!");
                queryResult.status = 'OK';
                res.send(queryResult);
            })
        });


        // con.query(sqlQuery, function (err, result, fields) {
        //     if (err) throw err;
        //     const queryResult = {
        //         status: "ERR",
        //         result: "UPDATE FAILED"
        //     };
        //     if (result.length != 0) {
        //         queryResult.status = "OK";
        //         queryResult.result = "UPDATE SUCCESSFUL";
        //     }
        //     console.log("JSON data added successfully");
        // });
    })
}
const finalizeModifiedReview = function (app, con) {
    app.post('/api/finalizeModifiedReview/:table/:reviewerId/:reportId', function (req, res) {

        console.log("INSIDE FINALIZE MODIF")
        const reviewerId = req.params.reviewerId;
        const reportId = req.params.reportId;

        console.log(req.body);
        console.log(JSON.stringify(req.body));
        const sqlQuery = `UPDATE ${req.params.table}
                          SET reviewData  = '${JSON.stringify(req.body)}',
                              finalStatus = 'True'
                          WHERE reportId = ${reportId}
                            AND reviewerId = ${reviewerId};`
        console.log(sqlQuery);
        con.query(sqlQuery, function (err, result, fields) {
            if (err) throw err;
            const queryResult = {
                status: "ERR",
                result: "UPDATE FAILED"
            };
            if (result.length != 0) {
                console.log("RESULTS : ");
                console.log(result);
                queryResult.status = "OK";
                queryResult.result = "UPDATE SUCCESSFUL";
            }
            res.send(queryResult)
        });
    })
}

const updateReview = function (app, con) {
    app.post('/api/updateReview/:table/:reviewerId/:reportId', function (req, res) {
        const reviewerId = req.params.reviewerId;
        const reportId = req.params.reportId;

        console.log(req.body);
        console.log(JSON.stringify(req.body));
        const sqlQuery = `UPDATE ${req.params.table}
                          SET reviewData   = '${JSON.stringify(req.body)}',
                              reviewStatus = 'reviewed'
                          WHERE reportId = ${reportId}
                            AND reviewerId = ${reviewerId};`

        con.query(sqlQuery, function (err, result, fields) {
            if (err) throw err;
            const queryResult = {
                status: "ERR",
                result: "UPDATE FAILED"
            };
            if (result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = "UPDATE SUCCESSFUL";
            }
            console.log("JSON data added successfully yahi toh hai yar");
            res.send(queryResult)
        });
    })
}

const saveCollectiveReview = function (app, con) {
    app.post('/api/saveCollectiveReview/:reportId', function (req, res) {
        const reportId = req.params.reportId;
        const sqlQuery = `INSERT INTO collectiveReviews (reportId, reviewData, finalStatus)
                          VALUES (${reportId}, '${JSON.stringify(req.body)}', "False")
                          ON DUPLICATE KEY UPDATE reviewData = '${JSON.stringify(req.body)}';`
        con.query(sqlQuery, function (err, result, fields) {
            if (err) throw err;
            const queryResult = {
                status: "ERR",
                result: "SAVE FAILED"
            };
            if (result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = "SAVE SUCCESSFUL";
            }
            console.log("JSON data added successfully");
        });
    });
}
const finalizeCollectiveReview = function (app, con) {
    app.post('/api/finalizeCollectiveReview/:reportId', function (req, res) {

        console.log("INSIDE FINALIZE MODIF")
        const reportId = req.params.reportId;

        console.log(req.body);
        console.log(JSON.stringify(req.body));
        const sqlQuery = `UPDATE collectiveReviews
                          SET reviewData  = '${JSON.stringify(req.body)}',
                              finalStatus = 'True'
                          WHERE reportId = ${reportId};`
        console.log(sqlQuery);
        con.query(sqlQuery, function (err, result, fields) {
            if (err) throw err;
            const queryResult = {
                status: "ERR",
                result: "UPDATE FAILED"
            };
            if (result.length != 0) {
                console.log("RESULTS : ");
                console.log(result);
                queryResult.status = "OK";
                queryResult.result = "UPDATE SUCCESSFUL";
            }
            res.send(queryResult)
        });
    })
}
const saveModifiedReview = function (app, con) {
    app.post('/api/updateModifiedReview/saveForm/:table/:reviewerId/:reportId', function (req, res) {

        console.log("INSIDE SAVE MODIF");

        const reviewerId = req.params.reviewerId;
        const reportId = req.params.reportId;

        console.log(req.body);
        console.log(JSON.stringify(req.body));
        const sqlQuery = `UPDATE ${req.params.table}
                          SET reviewData = '${JSON.stringify(req.body)}'
                          WHERE reportId = ${reportId}
                            AND reviewerId = ${reviewerId};`
        con.query(sqlQuery, function (err, result, fields) {
            if (err) throw err;
            const queryResult = {
                status: "ERR",
                result: "SAVE FAILED"
            };
            if (result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = "SAVE SUCCESSFUL";
            }
            console.log("JSON data added successfully");
        });
    })
}

const saveReview = function (app, con) {
    app.post('/api/updateReview/saveForm/:table/:reviewerId/:reportId', function (req, res) {
        const reviewerId = req.params.reviewerId;
        const reportId = req.params.reportId;

        console.log(req.body);
        console.log(JSON.stringify(req.body));
        const sqlQuery = `UPDATE ${req.params.table}
                          SET reviewData   = '${JSON.stringify(req.body)}',
                              reviewStatus = 'partially reviewed'
                          WHERE reportId = ${reportId}
                            AND reviewerId = ${reviewerId};`
        con.query(sqlQuery, function (err, result, fields) {
            if (err) throw err;
            const queryResult = {
                status: "ERR",
                result: "SAVE FAILED"
            };
            if (result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = "SAVE SUCCESSFUL";
            }
            console.log("JSON data added successfully");
        });
    })
}


const getFormValues = function (app, con) {
    app.get('/api/formValues/:table/:reviewerId/:reportId', function (req, res) {
        const reviewerId = req.params.reviewerId;
        const reportId = req.params.reportId;
        const table = req.params.table
        const sqlQuery = `SELECT *
                          FROM ${table}
                          WHERE reportId = ${reportId}
                            AND reviewerId = ${reviewerId};`
        console.log("QUERY IS : ")
        console.log(sqlQuery);
        con.query(sqlQuery, function (err, result, fields) {
            if (err) throw err;
            try {
                if (!result[0].reviewData) {
                    result[0].reviewData = JSON.stringify({reviewDone: 'Nope'});
                }
            } catch (err) {

            }

            const queryResult = {
                status: "OK",
                result: result
            };
            console.log(queryResult);
            res.json(queryResult);
        });
    });

}

const getCollectiveReviews = function (app, con) {
    app.get('/api/collectiveReview/:reportId', function (req, res) {
        const reportId = req.params.reportId;
        const sqlQuery = `SELECT reportId   as reportId,
                                 reviewData as reviewData
                          FROM collectiveReviews
                          WHERE reportId = ${reportId}`;
        con.query(sqlQuery, function (err, result, fields) {
            console.log("DONE QUERY")
            if (err) throw err;
            const queryResult = {
                status: "OK",
                result: null
            };
            console.log("RESULTT :::::::::::::::");
            console.log(result);
            if (!result[0]) {
                // result[0].reviewData = JSON.stringify({reviewFinalized: 'No'});
                queryResult['status'] = "EMPTY";
            } else {
                queryResult['result'] = result;
            }
            // const queryResult = {
            //     status: "OK",
            //     result: result
            // };
            console.log("HERE IS THE FETCH QUERY :::::");
            console.log(queryResult);
            res.json(queryResult);
        });
    });
}
const getReview = function (app, con) {
    app.get('/api/getReview/:reviewTable/:profileTable/:reviewerId/:reportId', function (req, res) {
        const reviewerId = req.params.reviewerId;
        const reportId = req.params.reportId;
        const reviewTable = req.params.reviewTable;
        const profileTable = req.params.profileTable;
        const sqlQuery = `SELECT ${profileTable}.firstName as firstName,
                                 ${reviewTable}.reviewData as reviewData,
                                 ${profileTable}.id        as reviewerId
                          FROM ${reviewTable},
                               ${profileTable}
                          WHERE ${profileTable}.id = ${reviewTable}.reviewerId
                            AND ${profileTable}.id = ${reviewerId}
                            AND ${reviewTable}.reportId = ${reportId}`
        console.log(sqlQuery);
        con.query(sqlQuery, function (err, result) {
            if (err) throw err;
            console.log('Result is:');
            console.log(result)
            const queryResult = {
                status: "OK",
                result: result
            };
            if(result.length == 0) {
                queryResult.status = 'ERR';
            }
            else if (!result[0].reviewData) {
                result[0].reviewData = JSON.stringify({reviewDone: 'Nope'});
            }
            console.log(queryResult);
            res.json(queryResult);
        });
    });
}

const getInternalReviewsByFacultyId = function (app, con) {
    app.get('/api/internalReviews/:reportId', function (req, res) {
        const sqlQuery = `SELECT faculty.firstName          AS firstName,
                                 faculty.id                 AS reviewerId,
                                 faculty.middleName         AS middleName,
                                 faculty.lastName           AS lastName,
                                 faculty.emailAddress       as emailAddress,
                                 internalReviews.reviewDate as reviewDate,
                                 internalReviews.reviewData as reviewData
                          FROM internalReviews,
                               faculty,
                               report
                          WHERE internalReviews.reviewStatus = 'reviewed'
                            AND faculty.id = internalReviews.reviewerId
                            AND report.id = internalReviews.reportId
                            AND report.id = ${req.params.reportId}
        `

        console.log(`Query for getting all reviews using faculty ID: ${sqlQuery}`);

        con.query(sqlQuery, function (err, result, fields) {
            if (err) {
                console.log("getInternalReviewsByFacultyId failed");
                throw err;
            }

            const queryResult = {
                status: "OK",
                result: result
            };

            console.log(queryResult);
            res.json(queryResult);
        });
    });
}

const getExternalReviewsByFacultyId = function (app, con) {
    app.get('/api/externalReviews/:reportId', function (req, res) {
        const sqlQuery = `SELECT reviewer.firstName          AS firstName,
                                 reviewer.id                 AS reviewerId,
                                 reviewer.middleName         AS middleName,
                                 reviewer.lastName           AS lastName,
                                 reviewer.emailAddress       as emailAddress,
                                 reviews.reviewDate  as reviewDate,
                                 reviews.reviewData  as reviewData
#                                  reviews.finalStatus as finalStatus
                          FROM reviews,
                               reviewer,
                               report
                          WHERE reviews.reviewStatus = 'reviewed'
                            AND reviewer.id = reviews.reviewerId
                            AND report.id = reviews.reportId
                            AND report.id = ${req.params.reportId}
        `

        console.log(`Query for getting all reviews using faculty ID: ${sqlQuery}`);

        con.query(sqlQuery, function (err, result, fields) {
            if (err) {
                console.log("getExternalReviewsByFacultyId failed");
                throw err;
            }

            const queryResult = {
                status: "OK",
                result: result
            };

            console.log(queryResult);
            res.json(queryResult);
        });
    });
}

module.exports = {
    finalizeModifiedReview,
    saveModifiedReview,
    updateModifiedReview,
    updateReview,
    saveReview,
    assignReviewerToReport,
    removeReviewerFromReport,
    getReview,
    getFormValues,
    assignReportToReviewer,
    removeReportFromReviewer,
    getInternalReviewsByFacultyId,
    getExternalReviewsByFacultyId,
    getCollectiveReviews,
    saveCollectiveReview,
    finalizeCollectiveReview
};