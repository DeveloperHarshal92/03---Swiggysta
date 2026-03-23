const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Food item name is required."],
  },
  video: {
    type: String,
    required: [true, "Food item video is required"],
  },
  description: {
    type: "String",
  },
  foodPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodpartners",
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;
