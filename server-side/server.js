const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const cookieParser = require("cookie-parser");
const redis = require('redis');
const connectRedis = require('connect-redis');
const session = require('express-session');

const port = 3001;

// Non require declarations
const app = express();
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});
// app.use(flash());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));

const sessionStore = new RedisStore({ client: redisClient });
const fiveMinutes = 30000000000000;
app.use(session({
    store: sessionStore,
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    name: "namedSession",
    cookie: {
        maxAge: fiveMinutes,
        secure: false,
        httpOnly: false,
    }
}));

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});



var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQL@1408",
    database: "rms"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// Custom server files
const profilelib = require('./server-files/profilelib');
const filelib = require('./server-files/filelib');
const reportlib = require('./server-files/reportlib');
const reviewerlib = require('./server-files/reviewerlib');
const reviewslib = require('./server-files/reviewslib');
const authenticationlib = require('./server-files/authenticationlib')
const reviewlib = require('./server-files/reviewlib')
const facultylib = require('./server-files/facultylib')
const adminlib = require('./server-files/adminlib')
const dofalib = require('./server-files/dofalib')
const googleauthlib = require('./server-files/googleauthlib')
const {getAllReviewerById} = require("./server-files/reviewerlib");

profilelib.getProfile(app, con);
profilelib.updateProfile(app, con);

filelib.uploadReport(app, con);
filelib.downloadReport(app, con);

reportlib.getReportsByFacultyId(app, con);
reportlib.getAllReports(app, con);
reportlib.getReviewerReports(app, con);
reportlib.sendReportByReportId(app, con);
reportlib.getReportByYear(app, con);
reportlib.getFacultyDetailsByReportId(app, con);
reportlib.getAssignedReports(app, con);
// reportlib.getHodReports(app, con);

authenticationlib.getUserFromCookie(app, con, sessionStore);
authenticationlib.login(app, con);
authenticationlib.logout(app, con);
authenticationlib.createReviewerAccount(app, con);

reviewerlib.getAllReviewers(app, con);
reviewerlib.getReviewerbyReport(app, con);
reviewerlib.getAllReviewerDetails(app, con);
reviewerlib.getAllReviewerById(app, con);

reviewlib.assignReviewerToReport(app, con);
reviewlib.removeReviewerFromReport(app, con);
reviewlib.assignReportToReviewer(app, con);
reviewlib.removeReportFromReviewer(app, con);
reviewlib.updateReview(app, con);
reviewlib.saveReview(app, con)
reviewlib.getReview(app, con);
reviewlib.getExternalReviewsByFacultyId(app, con);
reviewlib.getInternalReviewsByFacultyId(app, con);
reviewlib.getFormValues(app, con);
reviewlib.updateModifiedReview(app, con);
reviewlib.finalizeModifiedReview(app, con);
reviewlib.saveModifiedReview(app, con);
reviewlib.getCollectiveReviews(app, con);
reviewlib.saveCollectiveReview(app, con);
reviewlib.finalizeCollectiveReview(app, con);


adminlib.updateReviewerProfile(app, con);
adminlib.getFacultyById(app, con);
adminlib.updateFacultyProfile(app, con);
adminlib.freezeAssign(app, con);
adminlib.getMessageTemplates(app, con);
adminlib.addTemplate(app, con);


dofalib.getFacultyDetailsByReportId(app, con);
dofalib.enterFacultyGrade(app, con);
dofalib.getAllGrades(app, con);
dofalib.getGradebyFacultyId(app, con);
dofalib.saveFacultyGrade(app, con)


facultylib.getAllFacultyDetails(app, con);
facultylib.getFacultyGrade(app, con);
facultylib.getCurrentReportID(app, con);

googleauthlib.googleAuth(app, con);
googleauthlib.test(app, con);
googleauthlib.googleAuthSignOut(app, con);

app.get("/api/report/reviewers/:reportId", function(req, res) {
    var reportId = req.params.reportId;
    var sqlQuery = `SELECT firstName, middleName, lastName, emailAddress, reviewer.id as reviewerId FROM reviews, reviewer WHERE reviews.reviewerId = reviewer.id AND reviews.reportId = ${reportId}`;

    con.query(sqlQuery, function(err, result) {
        const queryResult = {
            status: "EMPTY",
            result: []
        };
        if(err) {
            res.json(queryResult);
            return;
        }
        if(result.length != 0) {
            queryResult.status = "OK";
            queryResult.result = result;
        }

        res.json(queryResult);
    });
});

app.get("/api/report/internalReviewers/:reportId", function(req, res) {
    var reportId = req.params.reportId;
    var sqlQuery = `SELECT firstName, middleName, lastName, emailAddress, faculty.id as reviewerId FROM internalReviews, faculty WHERE internalReviews.reviewerId = faculty.id AND internalReviews.reportId = ${reportId}`;

    con.query(sqlQuery, function(err, result) {
        const queryResult = {
            status: "EMPTY",
            result: []
        };
        if(err) {
            res.json(queryResult);
            return;
        }
        if(result.length != 0) {
            queryResult.status = "OK";
            queryResult.result = result;
        }

        res.json(queryResult);
    });
});





app.get('/api', (req, res) => {
    res.send({dummyField: "dummyData"});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})