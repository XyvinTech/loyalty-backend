const mongoose = require("mongoose");

const TierSchema = new mongoose.Schema({

   tier_name:{
    type:String
   },
   point_level:{
    type:Number
   },
   icon:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  conditions:{
    type: String,
    required: true,
  }

}, {
    timestamps: true,
})


module.exports = mongoose.model("tier", TierSchema);