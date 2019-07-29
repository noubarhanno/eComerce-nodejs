
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref:'Product', required: true },
        quantity: { type: Number, required: true }
      }
    ] // we put array [] to tell mongoose that this will be array
  }
});

userSchema.methods.addToCart = function(product) { // HOW TO Add methods to the mongoose schema to transfer the logic from the controller to the models
  const cartProductIndex = this.cart.items.findIndex(p => {
      return p.productId.toString() == product._id.toString(); // this will execute a callback for each item which is a product in the cart and will return true if the product exist and false if not
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0){
      newQuantity = this.cart.items[cartProductIndex].quantity +1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
      updatedCartItems.push({ productId: product._id, quantity: newQuantity })
      console.log(updatedCartItems)
  }
  
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
}

userSchema.methods.removeFromCart = function(productId){
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
}

userSchema.methods.clearCart = function(){
  this.cart = { items: []};
  return this.save();
}

module.exports = mongoose.model('User', userSchema);











// const mongodb = require("mongodb");

// const objectId = mongodb.ObjectID;

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart; // {items: []} // this is how it will store the products inside the cart
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection("users").insertOne(this);
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(p => {
//         return p.productId.toString() == product._id.toString(); // this will execute a callback for each item which is a product in the cart and will return true if the product exist and false if not
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0){
//         newQuantity = this.cart.items[cartProductIndex].quantity +1;
//         updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//         updatedCartItems.push({ productId: new objectId(product._id), quantity: newQuantity })
//     }
    
//     const updatedCart = {
//       items: updatedCartItems
//     };
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new objectId(this._id) },
//         { $set: { cart: updatedCart } },
//         { writeConcern: { w: "majority" , wtimeout: 5000 }  }
//       );
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString()
//     }); // will return new array with condition
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new objectId(this._id) },
//         { $set: { cart: {items: updatedCartItems} } },
//         { writeConcern: { w: "majority" , wtimeout: 5000 } }
//     )
//   }

//   addOrder(){
//     const db = getDb();
//     return this.getCart().then(products => {
//       const order = {
//         items: products,
//         user: {
//           _id: new objectId(this._id),
//           name: this.name
//         }
//       }
//       return db.collection('orders').insertOne(order , { writeConcern: { w: "majority", wtimeout: 5000 } })
//     }).then(result => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new objectId(this._id) },
//             { $set: { cart: { items: [] } } },
//             { writeConcern: { w: "majority", wtimeout: 5000 } }
//           );
//       })
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .find({ "user._id": new objectId(this._id) })
//       .toArray();
//   }

//   getCart() {
//       const db = getDb();
//       const productIds = this.cart.items.map(i => {
//           return i.productId;
//       })
//       return db
//         .collection("products")
//         .find({ _id: { $in: productIds } })
//         .toArray()
//         .then(products => {
//             return products.map(p => {
//               return {
//                 ...p,
//                 quantity: this.cart.items.find(i => {
//                   return (
//                     i.productId.toString() === p._id.toString()
//                   );
//                 }).quantity // this return products details and quantity
//               };
//             });
//         }).catch(err => console.log(err));
//   }

  

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .find(new objectId(userId))
//       .next()
//       .then(user => {
//         return user;
//       })
//       .catch(err => console.log(err)); // this is the same if you use .findOne but instead you don't need to use .next()
//   }
// }

// module.exports = User;
