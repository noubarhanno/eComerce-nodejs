const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);

const errorController = require("./controllers/error");

//models
const User = require("./models/user");

const MONGODB_URI = 'mongodb+srv://nodecomplete:kwCfeRS4lKG71qcW@cluster-test-te9za.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();

// prepare the session in the database
const store = new mongodbStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set("view engine", "ejs");
app.set("views", "views");

// import the routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoute = require('./routes/auth');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  }) // resave and saveUninitialized to ensure will not save the session in every request unless we have changed something in the request
);
app.use((req, res, next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoute);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user){
        const user = new User({
          name: 'noubar',
          email: 'noubar@noubar.com',
          cart:{
            items: []
          }
        });
        user.save();
      }
    })
    app.listen(3000);
    console.log("connected");
  })
  .catch(err => {
    console.log(err);
  });
