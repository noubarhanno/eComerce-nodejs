const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// // /admin/add-product => GET
// the isAuth is a middle ware written to check if the user is authenticated so it will redirect to login and we can add it to the routes then the check will be handled
// in the routes from left to right (from '/add-product' to isAuth to adminController.getAddProduct) so it will see check first if the user is authenticated and if not 
// it will redirect to login page
router.get('/add-product', isAuth, adminController.getAddProduct);

// // /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// // /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
