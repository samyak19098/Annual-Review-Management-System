const { OAuth2Client } = require('google-auth-library')
const cookieParser = require("cookie-parser");
const client = new OAuth2Client('549456913622-6hbfpv1lhevrmrvv9k9co5ghpl1iq6rh.apps.googleusercontent.com')

const googleAuth = function(app, con) {
    app.post('/api/v1/auth/google', async (req, res) => {
        const { token }  = req.body
        if(!token) {
            console.log("User not verified!!");
            return;
        }
        console.log("Token is:");
        console.log(token);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '549456913622-6hbfpv1lhevrmrvv9k9co5ghpl1iq6rh.apps.googleusercontent.com'
        });
        const { name, email, picture } = ticket.getPayload();
        console.log("Verified google auth");
        console.log(name)
        console.log(email)
        console.log(picture)

        const sqlQuery = `SELECT * FROM googleAuth WHERE emailAddress = '${email}'`;
        con.query(sqlQuery, function(err, rows) {
            if(err) {
                throw err;
            }
            console.log("User info from google auth:");
            console.log(rows[0]);
            const userData = rows[0];
            const currentSession = req.session;
            req.session.userId = userData.id;
            req.session.userRole = userData.role;
            req.session.status = true;
            req.session.token = token;
            req.session.save();
            console.log("Current session in google auth");
            console.log(req.session)
        });

        res.send('success')
        // res.status(201)
    });
}
const googleAuthSignOut = function(app, con) {
    app.delete('/api/v1/auth/logout', async (req, res) => {
        await req.session.destroy();
        console.log("DESTROYED!!!");
        res.status(200);
        res.json({
            message: 'Logged out successfully',
        });
    });
}
const test = function(app, con) {
    app.get('/api/test/gauth', (req, res) => {
        console.log("Google auth req session")
        console.log(req.session)
    });
}



module.exports = {
    googleAuth,
    test,
    googleAuthSignOut,
}