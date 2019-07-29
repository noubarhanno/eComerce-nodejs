const Product = require("../models/product");
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products)
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products"
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId) // defined by mongoose and the prodId could be passed string and mongoose will convert it back to object
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products)
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  // we don't need to use the method we created when we used mongo driver
  console.log(req.user.cart.items);
  req.user
    .populate('cart.items.productId')
    // to have a promise for the population method we need to call execPopulate ,
    // populate will automatically look in the path you give her and go to the same table that has this path and populate all the data nested in the path key you provide 
    // and you can provide what data you want to populate in the second argument
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      console.log(product)
      req.user
        .addToCart(product) // this will work but not throught the mongodb driver and the method that we write for this logic but through the method we  added to mongoose schema UserSchema
        .then(result => console.log(result))
        .catch(err => console.log(err));
    })
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return {quantity: i.quantity, product: {...i.productId._doc }} // _doc will get the data inside the document
      })
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user // automatically mongoose will take the user Id
        },
        products: products
      });
      return order.save();
    })
  .then(result => {
    return req.user.clearCart();
  }).then(result => {
    res.redirect("/orders");
  })
  .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id})
  .then(orders => {
        res.render("shop/orders", {
          path: "/orders",
          pageTitle: "Your Orders",
          orders: orders
        });
  })
    .catch(err => console.log(err));
};
