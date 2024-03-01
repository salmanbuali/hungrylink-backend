const { Schema } = require('mongoose')

const menuSchema = new Schema(
  {
    categoryId: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    restaurant: { type: Schema.Types.ObjectId, ref: "Rest" },
  },
  { timestamps: true }
)

module.exports = menuSchema