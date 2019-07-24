const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionsSchema = new Schema(
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
    label: {
      type: String,
      default: ""
    },
    price: {
      type: Currency,
      required: true,
      min: 0
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

let promotions = mongoose.model("Promition", promotionsSchema);

module.exports = promotions;
