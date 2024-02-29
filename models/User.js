const { Schema } = require('mongoose')

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    type: {type: String, required: true},
    avatar: {type: String},
    contact: {type: String},
    address: {type: String},
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    restId: { type: Schema.Types.ObjectId, ref: "Rest" }
  },
  { timestamps: true }
)

module.exports = userSchema
