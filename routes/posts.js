const express = require('express');
const _ = require('lodash');
const { Post } = require('../models/post');
const auth = require('../middleware/auth');
const router = express.Router();

const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');

router.get('/search/:post', auth, async (req, res) => {
  const { post } = req.params;
  const posts = await Post.find({
    caption: { $regex: new RegExp('^' + post.toLowerCase(), 'i') },
  });
  if (!posts.length) return res.status(404).send('No posts available');
  res.send(posts);
});

router.get('/', auth, async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.delete('/deletePost/:postId', auth, async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findOneAndDelete({ _id: postId });
  if (!post) return res.status(404).send('No post to delete');
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    Bucket: process.env.AWS_BUCKET_NAME,
  });
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: post.image,
  };
  s3.deleteObject(params, async (error, data) => {
    if (error) throw error;
    if (data) res.send(post);
  });
});

router.delete('/deleteMyGalleryPost/:postId', auth, async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByIdAndDelete({ _id: postId });
  if (!post) return res.status(404).send('No post to delete');
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    Bucket: process.env.AWS_BUCKET_NAME,
  });
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: post.image,
  };
  s3.deleteObject(params, async (error, data) => {
    if (error) throw error;
    if (data) res.send(post);
  });
});

router.get('/myGallery', auth, async (req, res) => {
  const { _id } = req.user;
  const userPosts = await Post.find({
    userId: _id,
  });
  if (!userPosts.length) return res.status(404).send('No posts available');
  res.send(userPosts);
});

const generateRandomCharacters = (length) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const randomCharacters = generateRandomCharacters(10);

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, '');
  },
  filename: function (req, file, cb) {
    const trimOriginalFileName = file.originalname.replace(/[\s]/g, '');
    cb(null, randomCharacters + trimOriginalFileName);
  },
});

const upload = multer({ storage: storage });
router.post('/', auth, upload.single('image'), async (req, res) => {
  const {
    file,
    body: { caption },
    user: { _id, username, iconBGColor },
  } = req;
  const trimOriginalFileName = file.originalname.replace(/[\s]/g, '');
  const randomFileName = randomCharacters + trimOriginalFileName;
  const userId = _id;

  const s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    Bucket: process.env.AWS_BUCKET_NAME,
  });

  s3bucket.createBucket(() => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: randomFileName,
      ContentType: 'image/jpg',
      Body: file.buffer,
      ACL: 'public-read-write',
    };
    s3bucket.upload(params, async (error, data) => {
      if (error) throw error;
      if (data.key) {
        const post = await new Post({
          userId: userId,
          username: username,
          caption: caption,
          image: randomFileName,
          iconBGColor: iconBGColor,
        }).save();
        res.send(post);
      }
    });
  });
});

module.exports = router;
