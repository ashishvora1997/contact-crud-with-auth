const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide a user id"],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
