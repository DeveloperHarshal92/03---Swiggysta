const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth.middleware");
const foodController = require("../controllers/food.controller");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

/**
 * @method POST
 * @route /api/food/
 * @access [protected]
 */
router.post(
  "/",
  authMiddleware.authFoodpartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

/**
 * @method GET
 * @route /api/food/
 * @access [protected]
 */
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

/*
 * @method POST
 * @route /api/food/like
 * @access [protected]
 */
router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood,
);

/*
 * @method POST
 * @route /api/food/save
 * @access [protected]
 */
router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood,
);

module.exports = router;
