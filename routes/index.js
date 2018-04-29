/* GET home page.
*/

path = require('path');

exports.index = function(req, res) {
    var message = '';
    var user = req.session.user;
    userId = req.session.userId;

    if (userId == null) {
        res.render('login.ejs',{message : message});
        return;
    }
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));

};


exports.signup = function(req, res) {
    message = '';
    if(req.method == "POST"){
        //post data

    } else {
        res.render('signup');
    }
};

exports.app = function(req, res) {

    var user = req.session.user;
    userId = req.session.userId;

    if (userId == null) {
        res.redirect('/login');
        return;
    }
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
}
