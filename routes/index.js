'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');

const Picture = require('../models/pictures');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

//POST file with multier
const upload = multer({
  dest: './public/uploads/'
});

router
  .post('/upload', upload.single('photo'), function (req, res, next) {

    const pic = new Picture({
      name: req.body.name,
      pic_path: `/uploads/${req.file.filename}`, //This is multer stuff (boilerplate)
      pic_name: req.file.originalname //This is multer stuff (boilerplate)
    });

    pic.save((err) => {
      if (err) {
        next(err);
      } else {
        res.redirect('/');
      }

    });
  });


module.exports = router;