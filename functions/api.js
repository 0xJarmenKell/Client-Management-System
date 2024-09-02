const express = require('express');
const mongoose = require('mongoose');
const app =  express();
const router = express.Router();
const serverless = require('serverless-http');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const User = require('../models/UserSchema');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
let moment = require('moment');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log('connected to the database successfuly..');
}).catch((err)=>{
  console.log(err.message);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Application is up and running on Port: ${PORT}`);
});

//Get requests

app.get('/', (req, res) => {
  User.find().then((result)=>{
    res.render('index', { arr: result, moment: moment });
  }).catch((err)=>{
    console.log(err);
  });
});

app.get('/user/add.html', (req, res) => {
  res.render('user/add');
});

app.get('/edit/:id', (req, res) => {
  User.findById(req.params.id).then((result)=>{
    res.render('user/edit', { obj: result });
  }).catch((err)=>{
     console.log(err);
  });
});

app.get('/user/:id', (req, res) => {

  User.findById(req.params.id).then((result)=>{
    console.log(result);
    res.render('user/view', { obj: result, moment: moment });
  }).catch((err)=>{
     console.log(err);
  });
});


// Post Data 
app.post('/user/add.html', (req, res) => {
    User.create(req.body).then(()=>{
       res.redirect('/');
    }).catch((err)=>{
       console.log(err);
    });
});


app.post('/search', (req, res) => {
  const searchText = req.body.searchText;
  User.find({
    $or: [
      { firstName: searchText },
      { lastname: searchText }
    ]
  })
  .then((result) => {
    res.render("user/search", { arr: result });
  })
  .catch((err) => {
    console.log(err);
  });
});

// Update user
app.put('/edit/:id', (req, res) => {
     User.updateOne({_id: req.params.id}, req.body).then(()=>{
        res.redirect('/');
     }).catch((err)=>{
      console.log(err);
     });
});

// Delete user 
app.delete('/delete/:id', (req, res) => {
  User.deleteOne({ _id: req.params.id })
  .then(()=>{
    res.redirect('/');
 }).catch((err)=>{
  console.log(err);
 });
});


app.use('./netlify/functions/api', router);
module.exports.handler = serverless(app);

