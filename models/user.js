const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    iconBGColor: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

userSchema.methods.genAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, iconBGColor: this.iconBGColor },
    process.env.JWT_KEY
  );
  return token;
};

const User = mongoose.model('User', userSchema);

exports.User = User;
