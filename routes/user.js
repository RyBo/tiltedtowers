const bcrypt = require('bcrypt');

exports.login = function(req, res){
    var message = '';
    var sess = req.session; 

    if(req.method == "POST"){
        var post  = req.body;
        var username = post.username;
        var pass = post.password;

        var sql="SELECT userid, username, email, hash FROM `users` WHERE `username`='" + username + "'";
        db.query(sql, function(err, results){      

            if(results){
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
