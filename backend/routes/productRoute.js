const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, 
    createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controller/productController")
const { isAuthentacated, authorizeRole } = require("../middleware/auth")
const router = express.Router()

router.route("/admin/product/:id")
.put(isAuthentacated, authorizeRole("admin"), updateProduct)
.delete(isAuthentacated, authorizeRole("admin"), deleteProduct)
router.route("/product/:id").get(getProductDetails)

router.route("/products").get(getAllProducts)
router.route("/admin/products").get(isAuthentacated, authorizeRole("admin"), getAdminProducts)
router.route("/admin/product/new").post(isAuthentacated, authorizeRole("admin"), createProduct)
router.route("/review").put(isAuthentacated, createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthentacated, deleteReview)

module.exports = router