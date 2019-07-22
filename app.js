const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        // this will attach the user object to each request
        // and this user is not a user object fetched from the database
        // it's a sequelize object that can execute a method on like destroy foe example
        next();
    }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

//force: true will drop the database and create new one 
// we do this because we add the constraints and these constraints will not be applied if the 
// database and the tables already created , and this option should not be applied in the production
// only in the development , beause we don't need to override the tables every time we restart our server
sequelize
    .sync()
    .then(result => {
        return User.findByPk(1)
        
}).then(user => {
    if (!user){
        return User.create({name: 'noubar', email: 'noubar@noubar.com'});
    }
    return Promise.resolve(User); // we wrapped the User with a promise that will be already added once we return from a promise function , each return
    // already wrapped in promise function , and if we removed the promise function that's totaly fine
}).then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})


// incoming request is only executed through middleware like app.use

