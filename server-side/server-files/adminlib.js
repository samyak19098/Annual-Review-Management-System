const updateReviewerProfile = function (app, con) {
    app.post('/api/updatedReviewerDetails/:reviewerId', function (req, res) {
        const reviewerId = req.params.reviewerId;
        const jsonBody = req.body
        console.log(req.body);
        console.log(JSON.stringify(req.body));
        // req.body.leaveStartDate = req.body.leaveStartDate.split('T')[0]
        // req.body.leaveEndDate = req.body.leaveEndDate.split('T')[0]
        var leaveStartUpdate = null;
        var leaveEndUpdate = null;
        if(req.body.leaveStartDate != null){
            leaveStartUpdate = req.body.leaveStartDate.toString();
        }
        if(req.body.leaveEndDate != null){
            leaveEndUpdate = req.body.leaveStartDate.toString();
        }
        console.log("LEAVES SETTING: ")
        var sqlQuery = `UPDATE reviewer
                          SET reviewer.firstName= "${req.body.firstName}",
                              reviewer.middleName= "${req.body.middleName}",
                              reviewer.lastName= "${req.body.lastName}",
                              reviewer.gender = "${req.body.gender}",
                              reviewer.emailAddress= "${req.body.emailAddress}",
                              reviewer.phoneNumber= "${req.body.phoneNumber}",
                              reviewer.primaryDepartment= "${req.body.primaryDepartment}",
                              reviewer.researchAreas= "${req.body.researchAreas}",
                              reviewer.designation= "${req.body.designation}",
                              reviewer.organization= "${req.body.organization}",
                              reviewer.status= "${req.body.reviewerStatus}",
                              reviewer.leaveStartDate = "${req.body.leaveStartDate}",
                              reviewer.natureOfLeave = "${req.body.natureOfLeave}",
                              reviewer.leaveEndDate = "${req.body.leaveEndDate}",
                              reviewer.domain = "${req.body.domain}"
                          WHERE reviewer.id = ${reviewerId};`
        if(req.body.leaveStartDate === null && req.body.leaveEndDate === null){
            sqlQuery = `UPDATE reviewer
                          SET reviewer.firstName= "${req.body.firstName}",
                              reviewer.middleName= "${req.body.middleName}",
                              reviewer.lastName= "${req.body.lastName}",
                              reviewer.gender = "${req.body.gender}",
                              reviewer.emailAddress= "${req.body.emailAddress}",
                              reviewer.phoneNumber= "${req.body.phoneNumber}",
                              reviewer.primaryDepartment= "${req.body.primaryDepartment}",
                              reviewer.researchAreas= "${req.body.researchAreas}",
                              reviewer.designation= "${req.body.designation}",
                              reviewer.organization= "${req.body.organization}",
                              reviewer.status= "${req.body.reviewerStatus}",
                              reviewer.leaveStartDate = ${req.body.leaveStartDate},
                              reviewer.natureOfLeave = "${req.body.natureOfLeave}",
                              reviewer.leaveEndDate = ${req.body.leaveEndDate},
                              reviewer.domain = "${req.body.domain}"
                          WHERE reviewer.id = ${reviewerId};`
        }
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
            console.log("Reviewer Details Updated");
        });
    })
}

const updateFacultyProfile = function (app, con) {
    app.post('/api/updatedFacultyDetails/:facultyId', function (req, res) {
        const facultyId = req.params.facultyId;
        const jsonBody = req.body
        console.log(req.body);
        console.log(JSON.stringify(req.body));
        // req.body.leaveStartDate = req.body.leaveStartDate.split('T')[0]
        // req.body.leaveEndDate = req.body.leaveEndDate.split('T')[0]
        console.log("BEFORE SHUTTING OFF: ");
        console.log(req.body.leaveStartDate === null)
        console.log(typeof req.body.leaveStartDate)

        var leaveStartDate_toSet = req.body.leaveStartDate;
        var leaveEndDate_toSet = req.body.leaveEndDate;
        if(req.body.leaveStartDate === null){
            leaveStartDate_toSet = "NULL";
        }
        if(req.body.leaveEndDate === null){
            leaveEndDate_toSet = "NULL";
        }

        var sqlQuery = `UPDATE faculty
                          SET faculty.firstName= "${req.body.firstName}",
                              faculty.middleName= "${req.body.middleName}",
                              faculty.lastName= "${req.body.lastName}",
                              faculty.gender = "${req.body.gender}",
                              faculty.doj = "${req.body.doj}",
                              faculty.emailAddress= "${req.body.emailAddress}",
                              faculty.phoneNumber= "${req.body.phoneNumber}",
                              faculty.primaryDepartment= "${req.body.primaryDepartment}",
                              faculty.secondaryDepartment = "${req.body.secondaryDepartment}",
                              faculty.researchAreas= "${req.body.researchAreas}",
                              faculty.designation= "${req.body.designation}",
                              faculty.role= "${req.body.role}",
                              faculty.phd= "${req.body.phd}",
                              faculty.empId= "${req.body.empId}",
                              faculty.status= "${req.body.facultyStatus}",
                              faculty.leaveStartDate = "${req.body.leaveStartDate}",
                              faculty.natureOfLeave = "${req.body.natureOfLeave}",
                              faculty.leaveEndDate = "${req.body.leaveEndDate}"
                          WHERE faculty.id = ${facultyId};`
        if(req.body.leaveStartDate === null && req.body.leaveEndDate === null){
            sqlQuery = `UPDATE faculty
                          SET faculty.firstName= "${req.body.firstName}",
                              faculty.middleName= "${req.body.middleName}",
                              faculty.lastName= "${req.body.lastName}",
                              faculty.gender = "${req.body.gender}",
                              faculty.doj = "${req.body.doj}",
                              faculty.emailAddress= "${req.body.emailAddress}",
                              faculty.phoneNumber= "${req.body.phoneNumber}",
                              faculty.primaryDepartment= "${req.body.primaryDepartment}",
                              faculty.secondaryDepartment = "${req.body.secondaryDepartment}",
                              faculty.researchAreas= "${req.body.researchAreas}",
                              faculty.designation= "${req.body.designation}",
                              faculty.role= "${req.body.role}",
                              faculty.phd= "${req.body.phd}",
                              faculty.empId= "${req.body.empId}",
                              faculty.status= "${req.body.facultyStatus}",
                              faculty.leaveStartDate = ${req.body.leaveStartDate},
                              faculty.natureOfLeave = "${req.body.natureOfLeave}",
                              faculty.leaveEndDate = ${req.body.leaveEndDate}
                          WHERE faculty.id = ${facultyId};`
        }
        con.query(sqlQuery, function (err, result, fields) {
            console.log(sqlQuery)
            if (err) throw err;
            const queryResult = {
                status: "ERR",
                result: "UPDATE FAILED"
            };
            if(result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = "UPDATE SUCCESSFUL";
            }
            console.log("Faculty Details Updated");
        });
    })
}
const getMessageTemplates = function(app, con) {
    app.get('/api/messageTemplate', (req, res) => {
        // var facultyId = req.params.facultyId;
        var sqlQuery = `SELECT * from messageTemplate;`
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

const addTemplate = function (app, con) {
    app.post('/api/addTemplate', function (req, res) {

        console.log(req.body);
        console.log(JSON.stringify(req.body));
        // req.body.leaveStartDate = req.body.leaveStartDate.split('T')[0]
        // req.body.leaveEndDate = req.body.leaveEndDate.split('T')[0]
        const sqlQuery = `INSERT INTO messageTemplate (messageTemplate.message) VALUES ("${req.body.emailMessage}");`
        con.query(sqlQuery, function (err, result, fields) {
            console.log(sqlQuery)
            if (err) throw err;
            const queryResult = {
                status: "ERR",
                result: "UPDATE FAILED"
            };
            if(result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = "Insert SUCCESSFUL";
            }
            console.log("Templates Updated");
        });
    })
}
const getFacultyById = function (app, con) {
    app.get('/api/getFacultyDetails/:facultyId', (req, res) => {
        var facultyId = req.params.facultyId;
        var sqlQuery = `SELECT faculty.id AS id,
                           faculty.firstName AS firstName,
                           faculty.middleName AS middleName,
                           DATE_FORMAT(STR_TO_DATE(faculty.doj ,'%Y-%m-%dT%H:%i:%s.000Z'),'%Y-%m-%d') as doj,
                           faculty.lastName as lastName,
                           faculty.emailAddress as emailAddress,
                           faculty.gender as gender,
                           faculty.phoneNumber as phoneNumber,
                           faculty.primaryDepartment as primaryDepartment,
                           faculty.secondaryDepartment as secondaryDepartment,
                            faculty.role as role,
                           faculty.researchAreas as researchAreas,
                           faculty.designation as designation,
                           faculty.phd as phd,
                           faculty.status as facultyStatus,
                           faculty.natureOfLeave as natureOfLeave,
                           DATE_FORMAT(STR_TO_DATE(faculty.leaveStartDate ,'%Y-%m-%dT%H:%i:%s.000Z'),'%Y-%m-%d') as leaveStartDate,
                           DATE_FORMAT(STR_TO_DATE(faculty.leaveEndDate ,'%Y-%m-%dT%H:%i:%s.000Z'),'%Y-%m-%d') as leaveEndDate
                           
                           
                           
                    from faculty where faculty.id = ${facultyId};`
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

const freezeAssign = function(app, con) {
    app.post('/api/timelines/freeze/assign/:role', (req, res) => {
        console.log("IN FREEZE")
        var sqlQuery = "select faculty.id as revID, faculty.role as revRole, B.* from faculty, (select A.rid, A.rfid, faculty.id as fid, faculty.primaryDepartment as fdep, faculty.role as frole from faculty, (select report.id as rid, report.facultyID as rfid from report where submissionDate=YEAR(curdate())) as A where (A.rfid=faculty.id AND faculty.role regexp 'HoD*')) as B where faculty.role='DoAA';"
        if(req.params.role == "hod") {
            sqlQuery = "select faculty.id as revID, faculty.role as revRole, B.* from faculty, (select A.rid, A.rfid, faculty.id as fid, faculty.primaryDepartment as fdep, faculty.role as frole from faculty, (select report.id as rid, report.facultyID as rfid from report where submissionDate=YEAR(curdate())) as A where (A.rfid=faculty.id AND (NOT (faculty.role regexp 'HoD*')) )) as B where faculty.role=CONCAT('HoD-',B.fdep);"
        }

        // console.log(sqlQuery)
        con.query(sqlQuery, function (err, result) {
            console.log("Assigning to " + req.params.role);
            if (err) {
                console.log("error in  sqlQuery");
                throw err;
            }
            console.log("Query done: ")
            console.log(result);
            const queryResult = {
                status: "ERR",
                result: {}
            };
            if (result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = result;
                // console.log(queryResult.result);

                var insertQuery = `INSERT IGNORE INTO internalReviews (reportId, reviewerId, reviewStatus) VALUES ?`;
                var values = [];
                for(let i = 0 ;i < queryResult.result.length; i++){
                    values.push([parseInt(queryResult.result[i].rid), parseInt(queryResult.result[i].revID), 'Pending']);
                }
                console.log("INSERTING: ");
                console.log(values);
                // if(values == []){
                //     console.log("EMPTY INSERTION");
                //     const finalQueryResult = {
                //         status: "EMPTY",
                //         result: {}
                //     }
                //     res.json(finalQueryResult)
                // }
                // else{
                    con.query(insertQuery, [values], (err, resultFinal) => {
                        if(err) {
                            console.log("Error executing")
                            throw err;
                        }
                        const finalQueryResult = {
                            status: "EMPTY",
                            result: {}
                        };
                        if(resultFinal.length != 0) {
                            finalQueryResult.status = "OK";
                            finalQueryResult.result = resultFinal;
                        }
                        res.send(finalQueryResult.status);
                    });
                // }
            }
            else{
                console.log("NOTHING TO INSERT")
                const finalQueryResult = {
                    status:"EMPTY",
                    result: {}
                }
                res.send("EMPTY");
            }
        });


    });

};

module.exports = {
    updateReviewerProfile,
    updateFacultyProfile,
    getFacultyById,
    freezeAssign,
    getMessageTemplates,
    addTemplate
};