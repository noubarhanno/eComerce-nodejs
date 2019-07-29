const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  imageUrl:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // same what you named the model this is to setup a relation to user model
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

























// const mongodb = require('mongodb');

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectID(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id){
//       dbOp = db.collection('products').updateOne({_id: this._id} , {$set: this})
//     } else {
//       dbOp = db.collection('products').insertOne(this, {writeConcern: { w: "majority" , wtimeout: 5000 }});
//     }
//       return dbOp
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then(products => {
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectID(prodId) }) // we used mongodb.ObjectID(prodId) because we cannot compare string id with objectID which is used in mongodb to store id
//       .next()
//       .then(product => {
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)}).then(result => {
//       console.log('Deleted');
//     }).catch(err => {
//       console.log(err);
//     })
//   }

// }

// module.exports = Product;
