const auth = require('../middleware/auth');
const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const _ = require('lodash');
const router = express.Router();

router.patch('/changePassword', auth, async (req, res) => {
  const { changePassword } = req.body;
  const { _id } = req.user;
  const { password } = await User.findOne({ _id: _id });
  const isSamePassword = await bcrypt.compare(changePassword, password);
  if (isSamePassword) {
    return res.status(400).send('Please update your password to a new one');
  }
  const salt = await bcrypt.genSalt(10);
  const bcryptPassword = await bcrypt.hash(changePassword, salt);
  const user = await User.findByIdAndUpdate(
    { _id: _id },
    { password: bcryptPassword }
  );
  await user.save();
  res.send(_.pick(user, ['id', 'username', 'email', 'iconBGColor']));
});

router.patch('/changeEmail', auth, async (req, res) => {
  const { changeEmail } = req.body;
  const { _id } = req.user;
  const { email } = await User.findById(_id).select('-password');
  if (email === changeEmail) {
    return res.status(400).send('Please update your email to a new one');
  }
  const isSameEmail = await User.findOne({
    email: changeEmail,
  }).select('-password');
  if (isSameEmail) {
    return res.status(400).send('This email is already taken');
  }
  const user = await User.findByIdAndUpdate(
    { _id: _id },
    { email: changeEmail }
  );
  await user.save();
  user.email = changeEmail;
  res.send(_.pick(user, ['id', 'username', 'email', 'iconBGColor']));
});

router.get('/me', auth, async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select('-password');
  if (!user) return res.status(404).send('User was not found.');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { email, username } = req.body;
  const isUsernameUnique = await User.findOne({ username: username });
  if (isUsernameUnique) {
    return res.status(400).send('Username is already in use');
  }
  const isEmailUnique = await User.findOne({ email: email });
  if (isEmailUnique) {
    return res.status(400).send('Email is already in use');
  }
  const user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['id', 'username', 'email', 'iconBGColor']));
});

module.exports = router;
