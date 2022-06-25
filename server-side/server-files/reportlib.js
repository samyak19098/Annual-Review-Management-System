// Handle all report queries here.
// Don't handle any other type of query in this file

const getReportsByFacultyId = function(app, con) {
    app.get('/api/uploadfiles/:id', (req, res) => {
        var facultyId = parseInt(req.params.id);
        var sqlQuery = `SELECT * from report WHERE facultyId = ${facultyId}`;

        con.query(sqlQuery, function(err, result){
            if (err) throw err;
            const queryResult = {
                status: "EMPTY",
                result: {}
            };
            if(result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = result;
            }
            // console.log(queryResult);
            res.json(queryResult);
        });
    });
}



// Get all reports in database along with faculty name
const getAllReports = function(app, con) {
    app.get('/api/getreports/all', (req, res) => {
        console.log("In upload");
        var sqlQuery = `SELECT report.id as id,
                           report.facultyId AS facultyId,
                           report.dofaReview AS status,
                           faculty.firstName AS firstName,
                           faculty.middleName AS middleName,
                           faculty.lastName AS lastName,
                           auth.username AS emailAddress,
                           report.submissionDate AS year,
                           report.generatedFileName AS generatedFileName,
                           report.fileName AS fileName
                    FROM report, auth, faculty
                    WHERE report.facultyId = auth.id AND report.facultyId = faculty.id;`
        console.log(sqlQuery)
        con.query(sqlQuery, (err, result) => {
            if(err) {
                throw err;
            }
            const queryResult = {
                status: "EMPTY",
                result: []
            };
            if(result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = result;
            }
            console.log(queryResult);
            res.json(queryResult);
        });
    });
}

// Change this to also extract report info from report table.
// Note that HOD is also a reviewer as they review reports of
// faculty from their own department.
const getReviewerReports = function(app, con) {
    app.get('/api/reviewer/assignedReports/:reviewTable/:id', (req, res) => {
        let reviewTable = req.params.reviewTable;
        var sqlQuery = `SELECT ${reviewTable}.reportId AS reportId,
                        report.id AS reportName,
                        report.submissionDate AS yearOfReport,
                        ${reviewTable}.reviewerId AS reviewerId,
                        ${reviewTable}.reviewStatus AS reviewStatus,
                        report.facultyId AS facultyId,
                        CONCAT(faculty.firstName, " ", faculty.middleName, " ", faculty.lastName) AS facultyName,
                        faculty.emailAddress AS emailAddress
                        FROM ${reviewTable}, report, faculty WHERE ${reviewTable}.reviewerId = ${parseInt(req.params.id)} AND report.id = ${reviewTable}.reportId AND report.facultyId = faculty.id;`

        con.query(sqlQuery, function (err, result, fields) {
            if (err) throw err;
            const queryResult = {
                status: "ERR",
                result: {}
            };
            if(result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = result;
            }
            console.log("I am bored!!!");
            console.log(queryResult);
            // console.log(queryResult);
            console.log(`Assigned reports for reviewer ${req.params.id} are: ${res}`);
            res.json(queryResult);
            console.log(queryResult);
        });
    })
}

// const getHodReports = function(app, con) {
//     app.get('/api/hod/assignedReports/:id', (req, res) => {
//         console.log(`In HOD query`);
//         var sqlQuery = `SELECT internalReviews.reportId AS reportId,
//                         report.id AS reportName,
//                         YEAR(report.submissionDate) AS yearOfReport,
//                         internalReviews.reviewerId AS reviewerId,
//                         internalReviews.reviewStatus AS reviewStatus,
//                         report.facultyId AS facultyId,
//                         CONCAT(faculty.firstName, " ", faculty.middleName, " ", faculty.lastName) AS facultyName,
//                         faculty.emailAddress AS emailAddress
//                         FROM internalReviews, report, faculty WHERE internalReviews.reviewerId = ${parseInt(req.params.id)} AND report.id = internalReviews.reportId AND report.facultyId = faculty.id;`
//
//         con.query(sqlQuery, function (err, result, fields) {
//             if (err) throw err;
//             const queryResult = {
//                 status: "ERR",
//                 result: {}
//             };
//             if(result.length != 0) {
//                 queryResult.status = "OK";
//                 queryResult.result = result;
//             }
//             // console.log(queryResult);
//             console.log(`Assigned reports for reviewer ${req.params.id} are: ${res}`);
//             res.json(queryResult);
//             console.log(queryResult);
//         });
//     })
// }

const getFacultyDetailsByReportId = function(app, con) {
    app.get('/api/facultyDetails/:table/:reviewerId/:reportId', (req, res) => {

        // var sqlQuery = `SELECT faculty.firstName AS firstName,
        //                     faculty.middleName AS middleName,
        //                     faculty.lastName AS lastName,
        //                     YEAR(report.submissionDate) AS yearOfReport
        //                     FROM faculty, report
        //                     WHERE report.reportId = faculty.id AND report.reportId = ${parseInt(req.params.reportId)};`;
        var sqlQuery = `SELECT CONCAT(faculty.firstName, " ", faculty.middleName, " ", faculty.lastName) AS facultyName,
                            faculty.emailAddress AS emailAddress,
                            report.submissionDate as yearOfReport
                            FROM ${req.params.table}, report, faculty WHERE ${req.params.table}.reviewerId = ${parseInt(req.params.reviewerId)} AND report.id = ${parseInt(req.params.reportId)} AND report.id = ${req.params.table}.reportId AND report.facultyId = faculty.id;`
        console.log(`Here is the query \n ${sqlQuery}`);
        con.query(sqlQuery, function(err, result){
            const queryResult = {
                status: "EMPTY",
                result: {}
            };
            if (err) {
                console.log("Yep right here officer");
                console.log(result)
                res.json(queryResult);
                return;
            }
            console.log("In faculty deatils")
            if(result.length != 0) {
                queryResult.status = "OK";
                queryResult.result =  result;
            }
            console.log(queryResult)
            // console.log(queryResult);
            res.json(queryResult);
        });
    });
}
const sendReportByReportId = function(app, con) {
    app.get('/api/report/sendfile/:reportId', function(req, res, next) {
        var reportId = req.params.reportId;
        var sqlQuery = `SELECT generatedFileName FROM report WHERE id = ${reportId}`
        console.log(sqlQuery);
        con.query(sqlQuery, function(err, result) {
            console.log(result);
            var genFileName;
            try {
                genFileName = result[0].generatedFileName;
                res.sendFile(`${genFileName}`, {root: './uploads'});
            } catch (e) {
                console.log("No report with given id found");
            }
        });
    });
}

const getReportByYear = function(app, con) {
    app.get('/api/getReports/:year', (req, res) => {
        console.log("In getReport/year");
        var sqlQuery = `SELECT report.id as id,
                           report.facultyId AS facultyId,
                           faculty.firstName AS firstName,
                           faculty.middleName AS middleName,
                           faculty.lastName AS lastName,
                           auth.username AS emailAddress,
                           report.submissionDate AS submissionDate,
                           report.generatedFileName AS generatedFileName,
                           report.fileName AS fileName,
                           faculty.primaryDepartment as primaryDepartment
                    FROM report, faculty, auth
                    WHERE report.facultyId = auth.id AND report.facultyId = faculty.id AND auth.role = faculty.role AND report.submissionDate = "${req.params.year}";`
        // console.log(sqlQuery)
        con.query(sqlQuery, (err, result) => {
            if(err) {
                throw err;
            }
            const queryResult = {
                status: "EMPTY",
                result: {}
            };
            if(result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = result;
            }
            console.log("Result for current query");
            console.log(sqlQuery);
            console.log(queryResult);
            // console.log(queryResult);
            res.json(queryResult);
        });
    });
}

const getAssignedReports = function(app, con) {
    app.get('/api/getAssignedReports/:reviewerId', (req, res) => {

        var reviewerId = req.params.reviewerId;
        console.log("Selecting for reviewer id : " + reviewerId);
        var sqlQuery = `SELECT report.id as id,
                            report.facultyId AS facultyId,
                            faculty.firstName AS firstName,
                            faculty.middleName AS middleName,
                            faculty.lastName AS lastName,
                            auth.username AS emailAddress,
                            report.submissionDate AS submissionDate,
                            report.generatedFileName AS generatedFileName,
                            report.fileName AS fileName
                            FROM report, faculty, auth, reviews
                            WHERE report.id = reviews.reportId AND reviews.reviewerId = ${reviewerId} AND report.facultyId = auth.id 
                              AND report.facultyId = faculty.id AND auth.role = faculty.role;
                            `;
        // var sqlQuery = `SELECT report.id AS id,
        //                     report.fileName AS fileName,
        //                    facult.firstName AS firstName,
        //                    faculty.middleName AS middleName,
        //                    faculty.lastName as lastName
        //             from report, reviews, faculty where report.id = reviews.reportId AND reviews.reviewerId = ${reviewerId} AND faculty.id = report.facultyId;`
        con.query(sqlQuery, (err, result) => {
            if(err) {
                throw err;
            }
            const queryResult = {
                status: "EMPTY",
                result: []
            };
            if(result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = result;
            }
            console.log("HERE IS getReviewerbyReport : " + queryResult);
            res.json(queryResult);
        });

    });
};

module.exports = {
    getReportsByFacultyId,
    getAllReports,
    getReviewerReports,
    sendReportByReportId,
    getReportByYear,
    getFacultyDetailsByReportId,
    getAssignedReports,
    // getHodReports
}