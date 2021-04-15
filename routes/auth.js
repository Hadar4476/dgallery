const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({
    email: { $regex: new RegExp('^' + email.toLowerCase(), 'i') },
  });
  if (!user) return res.status(400).send('Invaild email or password');
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invaild email or password');
  res.json({ token: user.genAuthToken() });
});

module.exports = router;
