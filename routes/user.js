const bcrypt = require('bcrypt');
const moment = require('moment');

exports.login = function(req, res){
    var message = '';
    var sess = req.session; 

    if(req.method == "POST"){

        var ip = req.ip;
        var post  = req.body;
        var username = post.username;
        var pass = post.password;

        var action = "none";
        var time = moment();

        // INSERT login attempt into login table

        // Grab all login attempts for this username and ip in the last hour
        var sql = "SELECT loginid, ip, user, date from `login` WHERE ip='" + ip + "' AND date > '" + time.subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss') + "' LIMIT 5";
        db.query(sql, function(err, results) {      

            if (results.length >= 3) {
                console.log("IP has failed login 3 times in the past hour, ignoring attempt.");
                message = 'Too many failed attempts, try again later.';
                action = "BANNED";
                res.render('index.ejs',{message: message});
            } else {
                // grab account info
                //
                var sql="SELECT userid, username, email, hash FROM `users` WHERE `username`='" + username + "'";
                db.query(sql, function(err, results) {      

                    if (results.length) {
                        var hash = results[0].hash;

                        // Check hash with supplied password
                        if (bcrypt.compareSync(pass,hash)) {
                            req.session.userId = results[0].userid;
                            req.session.user = results[0];
                            res.redirect('/');
                        } else {
                            message = 'Wrong Credentials.';
                            res.render('index.ejs',{message: message});
                        }
                    } else {
                        message = 'Wrong Credentials.';
                        res.render('index.ejs',{message: message});
                    }
                });
                var time = moment();
                var sql = "INSERT INTO `login`(`ip`, `user`, `date`, `action`) VALUES ('" + ip + "','" + username + "','" + time.format('YYYY-MM-DD HH:mm:ss') + "','" + action + "')";
                db.query(sql, function(err, results) {
                    console.log("IP logged");
                });
            }
        });
    } else {
        res.render('index.ejs',{message: message});
    }         
};

exports.signup = function(req, res){
    message = '';
    if(req.method == "POST"){
        var post  = req.body;
        var email = post.email;
        var username = post.username;
        var pass = post.password;

        //        var salt = bcrypt.genSaltSync(10);
        // Bycrypt can generate salt and hash with a single line
        var hash = bcrypt.hashSync(pass, 10);

        var sql = "INSERT INTO `users`(`username`, `hash`, `email`) VALUES ('" + username + "','" + hash + "','" + email + "')";
        console.log(sql);
        console.log(db);

        var query = db.query(sql, function(err, result) {

            message = "Your account has been created.";
            res.render('signup.ejs',{message: message});

        });

    } else {
        res.render('signup');
    }
};
