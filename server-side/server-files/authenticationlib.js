// Use this file to handle authentication or anything
// account related
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");

const getUserFromCookie = function(app, con, sessionStore) {
    app.get("/api/test", (req, res) => {
        // res.json(req.session);
        if(!req.session.userId) {
            res.json({userId: -1, userRole: "", status: false});
            return;
        }
        var toDecode = req.headers.cookie.substring(13, req.headers.cookie.length);
        var temp = decodeURIComponent(toDecode);
        var cookie = cookieParser.signedCookie(temp, 'secret');
        console.log(req.cookies);
        console.log("User is here");
        res.json(req.session)
        // sessionStore.get(cookie, function (err, session) {
        //     console.log("The session is:");
        //     console.log(req.session.userId.toString());
        //     console.log(req.session);
        //     res.json({userId: req.session.userId, userRole: req.session.userRole});
        // })
    });
}

//login-logout system

const login = function(app, con) {
    app.post('/api/login', (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var sqlQuery = `SELECT * FROM auth WHERE username = "${username}"`;

        con.query(sqlQuery, function(err, rows) {
            if(err) {
                throw err;
            }
            if(rows.length == 0) {
                console.log("No user found");
                res.send("failure");
                return;
            }
            console.log("Some user found");
            userData = rows[0];

            if (!bcrypt.compareSync(password, rows[0].passwordHash)) {
                console.log("Wrong password!!");
                return;
            }

            // User is found and has entered valid details
            var currentSession = req.session;
            currentSession.userId = userData.id;
            currentSession.userRole = userData.role;
            currentSession.status = true;
            currentSession.token = "token";
            console.log("Current session:");
            console.log(currentSession);
            console.log("req.session:");
            console.log(req.session);

            res.send("success");
        });
    });
}

const logout = function(app, con) {
    app.post('/api/logout', (req, res) => {
        console.log('logging out');
        req.session.destroy((err) => {
            if(err) console.log("error logging out");
            else{
                res.send("Logout !");
            }
        })
    });
}

//Reviewer Account Creation
const createReviewerAccount = function(app, con) {
    app.post('/api/createReviewerAccount', (req, res) => {
        var firstName = req.body.firstName;
        var emailAddress = req.body.emailAddress;
        var password = req.body.password;
        var passwordHash = bcrypt.hashSync(password, 10);
        var getLastID = "SELECT * FROM reviewer where id=(SELECT LAST_INSERT_ID());";

        var reviewerInsertQuery = `INSERT INTO reviewer (firstName, emailAddress) VALUES ("${firstName}", "${emailAddress}");`;
        con.query(reviewerInsertQuery, function(err, result) {
            if (err) throw err;
            const queryResult = {
                status: "ERR",
                result: "INSERTION INTO REVIEWERS FAILED."
            };
            if(result.length != 0) {
                queryResult.status = "OK";
                queryResult.result = "INSERTION SUCCESSFUL";
                console.log("inserted into reviewer");
                // console.log(result[0]);
                con.query(getLastID, function(err, resultRows) {
                    if (err) throw err;
                    const IDqueryResult = {
                        status: "EMPTY",
                        result: {}
                    };
                    if(resultRows.length != 0) {
                        queryResult.status = "OK";
                        queryResult.result = resultRows[0];
                        var reviewerID = queryResult.result.id;
                        console.log("got reviewer id = " + reviewerID);
                        // console.log("q2-res");
                        // console.log(queryResult.result);
                        var authInsertQuery = `INSERT INTO auth VALUES ("${emailAddress}","${passwordHash}", ${reviewerID},"reviewer" );`
                        con.query(authInsertQuery, function(err, authInsertResult) {
                            if(err) throw err;
                            if(authInsertResult.length != 0){
                                res.send("Account Creation Success");
                                console.log("inserted into auth");
                            }
                            else{
                                res.send("Account Creation Failed");
                            }
                        });
                    }
                    else{
                        res.send("Account Creation Failed");
                    }
                });
            }
            else{
                res.send("Account Creation Failed");
            }
        });
    });
}

module.exports = {
    getUserFromCookie,
    login,
    logout,
    createReviewerAccount
};
