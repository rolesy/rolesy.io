import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    name: {
      type: String,
      uppercase: true,
      required: true,
    },
    description: {
      type: String,
      uppercase: true,
      unique: true,
      required: true,
    },
    billing: {
      type: Object,
      required: true,
    },
    contact_information: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamp: true,
  }
);

const accountModel = mongoose.model("accounts", accountSchema);

export default accountModel;
