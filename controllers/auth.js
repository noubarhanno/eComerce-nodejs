exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'login',
        isAuthenticated: req.isLoggedin
    })
};

exports.postLogin = (req, res, next) => {
    req.isLoggedin = true; // this data stored in the request will not stick arround becuase this request data will die whenever we finished the request 
    // not like we did in the app.js as on every request before we start any request on any route the data of the user will be stored in the request  
    res.redirect('/');
};