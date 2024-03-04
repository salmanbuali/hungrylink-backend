const { Schema } = require('mongoose')

const restSchema = new Schema(
  {
    menu: { type: Schema.Types.ObjectId, ref: "Menu" },
    cuisine: [String],
  },
  { timestamps: true }
)

module.exports = restSchema