const { Schema } = require('mongoose')

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    desc: { type: String },
    pic: { type: String }
  },
  { timestamps: true }
)

module.exports = itemSchema
