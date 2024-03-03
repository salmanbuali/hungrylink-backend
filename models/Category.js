const { Schema } = require('mongoose')

const categorySchema = new Schema(
  {
    name: { type: String, required: true},
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
  },
  { timestamps: true }
)

module.exports = categorySchema
