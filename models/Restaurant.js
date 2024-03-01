const { Schema } = require('mongoose')

const restSchema = new Schema(
  {
    menu: { type: Schema.Types.ObjectId, ref: "Menu" },
    cuisine: { type: [String] },
  },
  { timestamps: true }
)

module.exports = restSchema