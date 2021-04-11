const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const _ = require('lodash');

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    image: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 255,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    iconBGColor: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Post = mongoose.model('Post', postSchema);

exports.Post = Post;
