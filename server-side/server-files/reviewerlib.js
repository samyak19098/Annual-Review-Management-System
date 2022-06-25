const getAllReviewers = function (app, con) {
    app.get('/api/getReviewers/all', (req, res) => {
        var sqlQuery = `SELECT reviewer.id AS id,
                           reviewer.firstName AS firstName,
                           reviewer.middleName AS middleName,
                           reviewer.lastName as lastName,
                           reviewer.emailAddress as emailAddress,
                           reviewer.organization as organization,
                           reviewer.domain as domain
                    from reviewer;`
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
const getAllReviewerDetails = function (app, con) {
    app.get('/api/getReviewerDetails', (req, res) => {

        var sqlQuery = `SELECT reviewer.id AS id,
                           reviewer.firstName AS firstName,
                           reviewer.middleName AS middleName,
                           reviewer.lastName as lastName,
                           reviewer.emailAddress as emailAddress,
                           reviewer.gender as gender,
                           reviewer.phoneNumber as phoneNumber,
                           reviewer.primaryDepartment as primaryDepartment,
                           reviewer.researchAreas as researchAreas,
                           reviewer.designation as designation,
                           reviewer.organization as organization,
                           reviewer.status as reviewerStatus,
                           reviewer.natureOfLeave as natureOfLeave,
                           DATE_FORMAT(STR_TO_DATE(reviewer.leaveStartDate ,'%Y-%m-%dT%H:%i:%s.000Z'),'%Y-%m-%d') as leaveStartDate,
                           DATE_FORMAT(STR_TO_DATE(reviewer.leaveEndDate ,'%Y-%m-%dT%H:%i:%s.000Z'),'%Y-%m-%d') as leaveEndDate,
                           reviewer.domain as domain
                           
                    from reviewer;`
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
const getAllReviewerById = function (app, con) {
    app.get('/api/getReviewerDetails/:reviewerId', (req, res) => {
        var reviewerId = req.params.reviewerId;
        var sqlQuery = `SELECT reviewer.id AS id,
                           reviewer.firstName AS firstName,
                           reviewer.middleName AS middleName,
                           reviewer.lastName as lastName,
                           reviewer.emailAddress as emailAddress,
                           reviewer.gender as gender,
                           reviewer.phoneNumber as phoneNumber,
                           reviewer.primaryDepartment as primaryDepartment,
                           reviewer.researchAreas as researchAreas,
                           reviewer.designation as designation,
                           reviewer.organization as organization,
                           reviewer.status as reviewerStatus,
                           reviewer.natureOfLeave as natureOfLeave,
                           DATE_FORMAT(STR_TO_DATE(reviewer.leaveStartDate ,'%Y-%m-%dT%H:%i:%s.000Z'),'%Y-%m-%d') as leaveStartDate,
                           DATE_FORMAT(STR_TO_DATE(reviewer.leaveEndDate ,'%Y-%m-%dT%H:%i:%s.000Z'),'%Y-%m-%d') as leaveEndDate,
                           reviewer.domain as domain
                           
                    from reviewer where reviewer.id = ${reviewerId};`
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

const getReviewerbyReport = function(app, con) {
    app.get('/api/getReviewers/:reportId', (req, res) => {

        var reportId = req.params.reportId;
        console.log("Selecting for report id : " + reportId);
        var sqlQuery = `SELECT reviewer.id AS id,
                           reviewer.firstName AS firstName,
                           reviewer.middleName AS middleName,
                           reviewer.lastName as lastName,
                           reviewer.emailAddress as emailAddress,
                           reviewer.organization as organization
                    from reviewer, reviews where reviewer.id = reviews.reviewerId AND reviews.reportId = ${reportId};`
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
}

module.exports = {
    getAllReviewers,
    getReviewerbyReport,
    getAllReviewerDetails,
    getAllReviewerById
};