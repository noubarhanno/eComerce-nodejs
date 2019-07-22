const db = require('../util/database');
const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute("INSERT INTO products (title, imageUrl, price, description) values (? ,? ,? ,?)",
     [this.title, this.imageUrl, this.price, this.description])
  }

  static deleteById(id) {
    
  }

  static fetchAll() {
    return db.execute('SELECT * FROM Products');
  }

  static findById(id) {
    return db.execute("SELECT * FROM products where products.id=?",[id]);
  }
};