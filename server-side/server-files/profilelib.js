
// All profile related requests are handled here.
// Please don't mix requests of different types

const getProfile = function(app, con) {
    app.get('/api/profile/:table/:role/:id', (req, res) => {
        var table = req.params.table;
        var role = req.params.role;
        var id = req.params.id;

        var sqlQuery = ``;
        console.log(table)
        console.log(role)
        console.log(id)
        if(['prof', 'hod', 'dofa', 'doaa'].includes(role)) {
            sqlQuery = `SELECT firstName, middleName, lastName, gender, DATE_FORMAT(doj, '%Y-%m-%d') as doj, emailAddress, phoneNumber, designation, primaryDepartment, secondaryDepartment, researchAreas FROM ${table} WHERE id = ${id}`
        } else if(role === 'reviewer') {
            sqlQuery = `SELECT firstName, middleName, lastName, gender, emailAddress, phoneNumber, designation, primaryDepartment, researchAreas, organization FROM ${table} WHERE id = ${id}`
        }

        console.log(sqlQuery)
        con.query(sqlQuery, function (err, result, fields) {
            if (err) throw err;
            const queryResult = {
                status: "ERR",
                result: {}
            };
            if(result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = result[0];
            }
            res.json(queryResult);
        });
    })
}
const updateProfile = function(app, con) {
    app.post('/api/profile/update/:table/:role/:id', (req, res) => {
        var table = req.params.table;
        var role = req.params.role;
        var id = req.params.id;

        var sqlQuery = ``;
        console.log(table)
        console.log(role)
        console.log(id)

        if(['prof', 'hod', 'dofa', 'doaa'].includes(role)) {
            sqlQuery = `UPDATE ${table} SET firstName = '${req.body.firstName}', middleName = '${req.body.middleName}', lastName = '${req.body.lastName}', gender = '${req.body.gender}', doj = '${req.body.doj}', emailAddress = '${req.body.emailAddress}', phoneNumber = '${req.body.phoneNumber}', designation = '${req.body.designation}', primaryDepartment = '${req.body.primaryDepartment}', secondaryDepartment = '${req.body.secondaryDepartment}', researchAreas = '${req.body.researchAreas}'  WHERE id = ${id}`
        } else if(role === 'reviewer') {
            sqlQuery = `UPDATE ${table} SET firstName = '${req.body.firstName}', middleName = '${req.body.middleName}', lastName = '${req.body.lastName}', gender = '${req.body.gender}', emailAddress = '${req.body.emailAddress}', phoneNumber = '${req.body.phoneNumber}', designation = '${req.body.designation}', primaryDepartment = '${req.body.primaryDepartment}', researchAreas = '${req.body.researchAreas}', organization = '${req.body.organization}'  WHERE id = ${id}`
        }
        con.query(sqlQuery, function (err, result, fields){
            if (err) throw err;
            const queryResult = {
                status: "ERR",
                result: "UPDATE FAILED"
            };
            if(result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = "UPDATE SUCCESSFUL";
            }
            res.send(queryResult.result);
        });
    })
}

module.exports = {
    getProfile,
    updateProfile
}