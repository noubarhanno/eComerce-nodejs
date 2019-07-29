const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");

//models
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// import the routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoute = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5d39d5de9ecc532af6b8d00a")
    .then(user => {
      // req.user = new User(user.name, user.email, user.cart, user._id);
      req.user = user; // we save it like this because now we have mongoose object which let us access all the user object 
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoute);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://nodecomplete:kwCfeRS4lKG71qcW@cluster-test-te9za.mongodb.net/shop?retryWrites=true&w=majority",
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
