const foodModel = require("../models/food.model");
const likeModel = require("../models/like.model");
const saveModel = require("../models/save.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid(),
  );

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message: "Food Item created successfully.",
    food: foodItem,
  });
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});

  const likedFoods = await likeModel.find({
    user: req.user._id,
  });

  const likedSet = new Set(likedFoods.map((l) => l.food.toString()));

  const savedFoods = await saveModel.find({
    user: req.user._id,
  });

  const savedSet = new Set(savedFoods.map((s) => s.food.toString()));

  const result = foodItems.map((item) => ({
    ...item.toObject(),
    isLiked: likedSet.has(item._id.toString()),
    isSaved: savedSet.has(item._id.toString()),
  }));

  res.status(200).json({
    message: "Food items fetched successfully.",
    foodItems: result,
  });
}

async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });

    return res.status(200).json({
      message: "Food unliked successfully.",
      like: false,
    });
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });

  res.status(201).json({
    message: "Food liked successfully.",
    like: true,
  });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { saveCount: -1 },
    });

    return res.status(200).json({
      message: "Food unsaved successfully.",
      save: false,
    });
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { saveCount: 1 },
  });

  res.status(201).json({
    message: "Food saved successfully.",
    save: true,
  });
}

async function getSavedFood(req, res) {
  const user = req.user;

  const saveFoods = await saveModel.find({ user: user._id }).populate("food");

  const foods = saveFoods.map((s) => ({
    ...s.food.toObject(),
    isSaved: true,
  }));

  return res.status(200).json({
    message: "Saved foods fetched successfully",
    foods,
  });
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSavedFood,
};
