const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  contactName: {
    type: String,
    required: [true, "Contact name is required"],
  },
  phone: {
    type : String,
    required : [true , "Phone number is required"]
  },
  address : {
    type : String,
    required : [true , "Address is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

const foodPartnerModel = mongoose.model("foodPartner", foodPartnerSchema);

module.exports = foodPartnerModel;
