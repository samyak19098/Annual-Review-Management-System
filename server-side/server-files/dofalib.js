
/*
This function fetches faculty details using report ID
faculty ID associated with that report
 */

const getFacultyDetailsByReportId = function (app, con) {
    app.get('/api/facultyDetails/gradingForm/:reportId', (req, res) => {
        var sqlQuery = `SELECT faculty.id            AS facultyId,
                               faculty.firstName     AS firstName,
                               faculty.middleName    AS middleName,
                               faculty.lastName      AS lastName,
                               faculty.emailAddress  AS emailAddress,
                               report.submissionDate as yearOfReport
                        FROM report,
                             faculty
                        WHERE report.id = ${parseInt(req.params.reportId)}
                          AND report.facultyId = faculty.id;`
        console.log(`Here is the query \n ${sqlQuery}`);
        con.query(sqlQuery, function (err, result) {
            const queryResult = {
                status: "EMPTY",
                result: {}
            };
            if (err) {
                console.log(result)
                res.json(queryResult);
                return;
            }
            console.log("In faculty deatils")
            if (result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = result;
            }
            console.log(queryResult)
            // console.log(queryResult);
            res.json(queryResult);
        });
    });
}


const getFormValues = function (app, con) {
    app.get('/api/formValues/gradingForm/:reportId', (req, res) => {
        var sqlQuery = `SELECT faculty.id            AS facultyId,
                               faculty.firstName     AS firstName,
                               faculty.middleName    AS middleName,
                               faculty.lastName      AS lastName,
                               faculty.emailAddress  AS emailAddress,
                               report.submissionDate as yearOfReport
                        FROM report,
                             faculty
                        WHERE report.id = ${parseInt(req.params.reportId)}
                          AND report.facultyId = faculty.id;`
        console.log(`Here is the query \n ${sqlQuery}`);
        con.query(sqlQuery, function (err, result) {
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
            if (result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = result;
            }
            console.log(queryResult)
            // console.log(queryResult);
            res.json(queryResult);
        });
    });
}

/*
Enter the faculty grade into the facultyGrade table
 */

const enterFacultyGrade = function (app, con) {
    app.post('/api/facultyGrade/:reportId', function (req, res) {
        const facultyId = req.params.facultyId;
        const jsonBody = req.body;
        console.log(req.body);
        console.log(JSON.stringify(req.body));
        console.log("here!!!")
        console.log('Request body:');
        console.log(req.body);
        const queryFinal = `INSERT INTO facultyGrade
                            VALUES (${req.body.facultyId}, ${req.body.yearOfReport}, '${JSON.stringify(req.body)}', 'true')
                            ON DUPLICATE KEY UPDATE grade = '${JSON.stringify(req.body)}', finalStatus = 'true'`;
        const query = `SELECT Count(*) AS count
                       FROM facultyGrade
                       where facultyId = ${req.body.facultyId};`
        const sqlQuery = `INSERT INTO facultyGrade
                          VALUES (${req.body.facultyId}, ${req.body.yearOfReport}, '${JSON.stringify(req.body)}', 'true');`
        const q = `UPDATE report
                   set dofaReview = 'reviewed'
                   where report.facultyId = ${req.body.facultyId}
                     AND report.submissionDate = ${req.body.yearOfReport};`
        const updateQuery = `UPDATE facultyGrade
                             SET grade = '${JSON.stringify(req.body)}'
                             WHERE facultyId = ${req.body.facultyId};`
        con.query(queryFinal, function (err, result, fields) {
            console.log(query)
            if (err) {
                throw err;
                console.log()
            }
            const queryResult = {
                status: "EMPTY",
                result: {}
            };
            console.log("Faculty Details Updated");
        });
        con.query(q, function (err, result, fields) {

        });
    })
}


/*
Save facultyGrade in its current state
 */

const saveFacultyGrade = function (app, con) {
    app.post('/api/facultyGrade/save/:reportId', function (req, res) {
        const facultyId = req.params.facultyId;
        const jsonBody = req.body;
        console.log(req.body);
        console.log(JSON.stringify(req.body));
        const queryFinal = `INSERT INTO facultyGrade
                            VALUES (${req.body.facultyId}, ${req.body.yearOfReport}, '${JSON.stringify(req.body)}', 'false')
                            ON DUPLICATE KEY UPDATE grade = '${JSON.stringify(req.body)}', finalStatus = 'false'`;
        const query = `SELECT Count(*) AS count
                       FROM facultyGrade
                       where facultyId = ${req.body.facultyId};`
        const sqlQuery = `INSERT INTO facultyGrade
                          VALUES (${req.body.facultyId}, ${req.body.yearOfReport}, '${JSON.stringify(req.body)}', 'false');`
        const q = `UPDATE report
                   set dofaReview = 'partially reviewed'
                   where report.facultyId = ${req.body.facultyId}
                     AND report.submissionDate = ${req.body.yearOfReport};`
        const updateQuery = `UPDATE facultyGrade
                             SET grade = '${JSON.stringify(req.body)}'
                             WHERE facultyId = ${req.body.facultyId};`
        con.query(queryFinal, function (err, result, fields) {
            console.log(query)
            if (err) throw err;
            const queryResult = {
                status: "EMPTY",
                result: {}
            };
            console.log("Faculty Details Updated");
        });
        con.query(q, function (err, result, fields) {
            if(err) {
                throw err;
            }
        });
    })
}

/*
Returns the grades of all the faculty members
 */

const getAllGrades = function (app, con) {
    app.get('/api/facultyGrade/getAll', function (req, res) {
        const sqlQuery = `SELECT facultyGrade.grade        AS grade,
                                 facultyGrade.year         AS year,
                                 faculty.primaryDepartment AS department
                          FROM faculty,
                               facultyGrade
                          WHERE facultyGrade.facultyId = faculty.id;`

        con.query(sqlQuery, function (err, result, fields) {
            console.log(sqlQuery)
            const queryResult = {
                status: "ERR",
                result: "UPDATE FAILED"
            };
            if (err) {
                console.log("Could not query all grades");
                throw err;
            }

            queryResult.status = "OK";
            queryResult.result = result;
            res.json(queryResult)
        });
    });
}

/*
Return grade of faculty with given faculty ID
 */

const getGradebyFacultyId = function (app, con) {
    app.get('/api/facultyGrade/save/:facultyId/:yearOfReport', function (req, res) {
        const facultyId = req.params.facultyId;
        const yearOfReport = req.params.yearOfReport;
        const sqlQuery = `SELECT facultyGrade.grade AS grade, facultyGrade.year AS year, facultyGrade.finalStatus as finalStatus
                            FROM facultyGrade
                            WHERE facultyGrade.facultyId = ${facultyId} AND facultyGrade.year = ${yearOfReport};`

        con.query(sqlQuery, function (err, result, fields) {
            console.log(sqlQuery)
            const queryResult = {
                status: "ERR",
                result: "UPDATE FAILED"
            };
            if (err) {
                console.log("Could not query all grades");
                throw err;
            }

            queryResult.status = "OK";
            queryResult.result = result;
            console.log(queryResult);
            res.json(queryResult)
        });
    });
}


module.exports = {
    getFacultyDetailsByReportId,
    enterFacultyGrade,
    getAllGrades,
    getGradebyFacultyId,
    saveFacultyGrade
};