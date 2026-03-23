const {Router} = require("express")
const authMiddleware = require("../middleware/auth.middleware");
const foodPartnerContoller = require("../controllers/food-partner.controller")

const router = Router()

/**
 * @method GET
 * @route /api/food-partner/:id
 * @access Public
 */
router.get("/:id",authMiddleware.authUserMiddleware,foodPartnerContoller.getFoodPartnerById)


module.exports = router