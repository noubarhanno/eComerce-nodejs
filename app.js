const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//mongo db connection
const mongoConnect = require('./util/database').mongoConnect;


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // User.findByPk(1).then(user => {
    //     req.user = user;
    //     // this will attach the user object to each request
    //     // and this user is not a user object fetched from the database
    //     // it's a sequelize object that can execute a method on like destroy foe example
    //     next();
    // }).catch(err => console.log(err));
    next();
});

app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
})

