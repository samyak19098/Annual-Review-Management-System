// Use this file to do any file upload/download related requests

const multer = require('multer');
const crypto = require("crypto");

function randomStringGenerator(length){
    const stringId = crypto.randomBytes(length).toString('hex');
    return stringId;
}
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        // oldFileName = file.originalname;
        const len = file.originalname.length;
        file.originalname = file.originalname.substring(0, len - 4) + "SHY" + randomStringGenerator(26) + ".pdf";
        cb(null , file.originalname);
    }
});
const upload = multer({ storage: storage })

const uploadReport = function(app, con) {
    app.post('/report/uploadfile/:id', upload.single(`report`), (req, res) => {
        // try {
            console.log("here")
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = '"' + yyyy + '"';
            // today = '"2020"';
            var len;
            try {
                len = req.file.originalname.length;
                var oldFileName = req.file.originalname.substring(0, len - 59) + ".pdf";
            } catch (e) {
                console.log("No file name specified")
                return;
            }
            console.log(oldFileName);
            console.log(`today = ${today}`)
            var checkSqlQuery = `SELECT facultyId, submissionDate FROM report WHERE facultyId = ${req.params.id} AND submissionDate = ${today}`;
            var sqlQuery = `INSERT INTO report (facultyId, submissionDate, generatedFileName, fileName) values (${req.params.id}, ${today}, ${'"' + req.file.originalname + '"'}, ${'"' + oldFileName + '"'})
                            ON DUPLICATE KEY UPDATE generatedFileName = ${'"' + req.file.originalname + '"'}, fileName = "${oldFileName}"`;
            con.query(checkSqlQuery, function(err, result) {
                if(err) {
                    console.log(sqlQuery);
                    throw err;
                }
                console.log("wow");
                if(result.length == 0) {
                    con.query(sqlQuery, function(err, result) {
                        if(err) {
                            console.log("Error in uploading file");
                            throw err;
                        }
                        console.log("File uploaded successfully!");
                        return;
                    })
                } else {
                    const updateQuery = `UPDATE report SET generatedFileName = ${'"' + req.file.originalname + '"'}, fileName = "${oldFileName}" WHERE facultyId = ${req.params.id} AND submissionDate = ${today}`;
                    con.query(updateQuery, function(err, result) {
                        if(err) {
                            console.log("File information could not be updated");
                            throw err;
                        }
                        console.log("File information updated successfully!");
                    });
                }
                console.log("Query executed!");
            })
            // con.query(sqlQuery, function(err, result) {
            //     console.log(sqlQuery);
            //     if(err) {
            //         console.log("Could not insert / update file");
            //         throw err;
            //     }
            //     console.log("File uploaded successfully!");
            // });
            // res.send(req.file);

        // }catch(err) {
        //     res.send(400);
        // }
    });
};
const downloadReport = function(app, con) {
    app.get('/api/report/downloadfile/:generatedFileName', (req, res) => {
        const genFileName = req.params.generatedFileName;
        // console.log(genFileName);
        console.log("Downloading : " + genFileName);
        res.download('./uploads/' + genFileName);
    });
};
module.exports = {
    uploadReport,
    downloadReport
}