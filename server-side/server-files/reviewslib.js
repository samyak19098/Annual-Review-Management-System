
function genAddReviewerQuery(reviewerId, reportId){
    var query = `INSERT IGNORE INTO reviews VALUES (${reportId}, ${reviewerId}, NULL, 'Pending', NULL);`
    return query;
}

const assignReviewerToReport = function (app, con) {
    app.post("/api/assignReviewer/add", (req, res) => {
        var reviewers = req.body.reviewers;
        var reportId = req.body.report.id;
        console.log('reportId = ' + reportId);

        var sqlQuery = "INSERT IGNORE INTO reviews (reportId, reviewerId, reviewStatus) VALUES ?";
        var values = [];
        for(let i = 0 ;i < reviewers.length; i++){
            values.push([reportId, reviewers[i].id, 'Pending']);
        }
        console.log("SQL QUERY : " + sqlQuery);
        // var sqlQuery = `INSERT INTO reviews VALUES (${reportId}, ${reviewerId}, NULL, 'Pending', NULL);`
        con.query(sqlQuery, [values], (err, result) => {
            if(err) {
                throw err;
            }
            const queryResult = {
                status: "EMPTY",
                result: {}
            };
            if(result.length != 0) {
                queryResult.status = "Added";
                queryResult.result = result;
            }
            console.log("HERE IS getReviewerbyReport : " + queryResult);
            res.json(queryResult.status);
        });

    });
}

const removeReviewerFromReport = function (app, con) {
    app.post("/api/assignReviewer/remove", (req, res) => {
        var reviewerIdToDel = req.body.reviewer.id;
        var reportIdToDel = req.body.report.id;

        var sqlQuery = `DELETE FROM reviews WHERE reviewerId = ${reviewerIdToDel} AND reportId = ${reportIdToDel}`;
        con.query(sqlQuery, (err, result) => {
            if(err) {
                throw err;
            }
            const queryResult = {
                status: "EMPTY",
                result: {}
            };
            if(result.length != 0) {
                queryResult.status = "Removed";
                queryResult.result = result;
            }
            res.json(queryResult.status);
        });

    });
}

module.exports = {
    assignReviewerToReport,
    removeReviewerFromReport,
};