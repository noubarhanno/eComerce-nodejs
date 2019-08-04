const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'login',
        isAuthenticated: false
    })
    
};

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10') // to set a cookie and this cookie will be sent with every request to the backend server
    User.findById("5d39d5de9ecc532af6b8d00a")
    .then(user => {
        console.log(user);
      // req.user = new User(user.name, user.email, user.cart, user._id);
      req.session.user = user; // we save it like this because now we have mongoose object which let us access all the user object 
      req.session.isLoggedin = true
      res.redirect('/');
    })
    .catch(err => console.log(err));
    res.redirect('/');
};