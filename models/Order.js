const { Schema } = require('mongoose')

const orderSchema = new Schema(
  {
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    total: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    from: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
)

module.exports = orderSchema
