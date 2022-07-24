const express = require("express")
const { newOrder, getSingleOrder, myOrder, getAllOrders, updateOrder, deleteOrder } = require("../controller/orderController")
const { isAuthentacated, authorizeRole } = require("../middleware/auth")
const router = express.Router()

router.route("/order/new").post(isAuthentacated, newOrder)
router.route("/order/:id").get(isAuthentacated, getSingleOrder)
router.route("/orders/me").get(isAuthentacated, myOrder)
router.route("/admin/orders").get(isAuthentacated, authorizeRole("admin"),getAllOrders)
router.route("/admin/order/:id").put(isAuthentacated, authorizeRole("admin"), updateOrder)
.delete(isAuthentacated, authorizeRole("admin"), deleteOrder)


module.exports = router