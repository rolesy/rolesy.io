import mongoose from 'mongoose';

const scopeSchema = mongoose.Schema({
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
  module: {
    type: String,
    uppercase: true,
    required: true,
  },
  active: {
    type: Boolean,
    require: true,
    default: true,
  },
}, {
  timestamp: true,
});

const scopeModel = mongoose.model('scopes', scopeSchema);

export default scopeModel;
