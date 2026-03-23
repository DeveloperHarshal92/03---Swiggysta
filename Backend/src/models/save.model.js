const mongoose = require("mongoose");

const saveSchema = mongoose.Schema(
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

const saveModel = mongoose.model("save", saveSchema);

module.exports = saveModel;
