const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leadersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    abbr: {
      type: String,
      default: ""
    },
    designation: {
      type: String
    },
    feature: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

let leaders = mongoose.model("Leader", leadersSchema);

module.exports = leaders;
