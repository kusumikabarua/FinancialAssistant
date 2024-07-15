const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      unique: true,
    },
    answer: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Chat = mongoose.model("Chat",chatSchema);
module.exports =Chat;