
const getAllFacultyDetails = function (app, con) {
    app.get('/api/getFacultyDetails', (req, res) => {
        var sqlQuery = `SELECT faculty.id AS id,
                           faculty.firstName AS firstName,
                           faculty.middleName AS middleName,
                           faculty.lastName as lastName,
                           faculty.emailAddress as emailAddress,
                           faculty.gender as gender,
                           faculty.doj as doj,
                           faculty.phoneNumber as phoneNumber,
                           faculty.primaryDepartment as primaryDepartment,
                           faculty.secondaryDepartment as secondaryDepartment,
                           faculty.role as role,
                           faculty.researchAreas as researchAreas,
                           faculty.designation as designation,
                           faculty.empId as empId,
                           faculty.phd as phd
                    from faculty;`
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
            // console.log("HERE IS SHY : " + queryResult);
            res.json(queryResult);
        });

    });
};

const getFacultyGrade = function (app, con) {
    app.get('/api/grade/view/:id', (req, res) => {
       var sqlQuery = `SELECT facultyId as id, 
                        year as year,
                        grade as grade from facultyGrade WHERE facultyId = ${req.params.id};`;

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
            // console.log("HERE IS SHY : " + queryResult);
            res.json(queryResult);
        });

    });
}

const getCurrentReportID = function(app, con) {
    app.get('/api/faculty/setReportId/:facultyId', (req, res) => {
        var currentTime = new Date()
        var sqlQuery = `SELECT id as reportId
                        from report WHERE facultyId = ${req.params.facultyId} AND submissionDate = ${String(currentTime.getFullYear())};`;
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
            // console.log("HERE IS SHY : " + queryResult);
            res.json(queryResult);
        });
    });
}

module.exports = {
    getAllFacultyDetails,
    getFacultyGrade,
    getCurrentReportID
};