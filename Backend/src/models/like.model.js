const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "food",
      required: [true, "Food is required"],
    },
  },
  {
    timestamps: true,
  },
);

const likeModel = mongoose.model("like",likeSchema)

module.exports = likeModel
