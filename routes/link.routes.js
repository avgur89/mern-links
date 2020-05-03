const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');

// @desc    Create new link
// @route   POST /api/link/generate
// @access  Private
router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL;
    const { from } = req.body;

    const code = shortid.generate();
    const existing = await Link.findOne({ from });

    if (existing) {
      return res.status(200).json({ link: existing });
    }

    const to = baseUrl + '/t/' + code;

    const link = new Link({ code, to, from, owner: req.user.userId });

    await link.save();
    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all links
// @route   GET /api/link
// @access  Protected
router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });

    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single link
// @route   GET /api/link/id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
