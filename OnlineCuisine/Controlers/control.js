const express = require('express');
const app = express();
const path = require('path');
const schema = require('../models/schema');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/OnlineCuisine', { useNewUrlParser: true });
const { validationResult } = require('express-validator');
var a = false;
const result = (req, res, next) => {
  const result = validationResult(req);
  const hasError = !result.isEmpty();

  if (hasError) {
    a = true;
    const error = result.array()[0].msg;
    res.status(400).json({ Sucess: "failed", message: error });
  }
  next();
}

const viewRes = (req, res) => {
res.sendFile(path.join(__dirname, "../Views/logIn.html"));
}
const signUp = (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/signUp.html"));
}
const home = (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/home.html"));
}

const aboutUs = (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/aboutUs.html"));
}

const food = (req, res) => {
  res.sendFile(path.join(__dirname, "../palak/pages/food.html"));
}
const drink = (req, res) => {
  res.sendFile(path.join(__dirname, "../palak/pages/drinks.html"));
}
const dessert = (req, res) => {
  res.sendFile(path.join(__dirname, "../palak/pages/desserts.html"));
}
const signUpPost = async (req, res) => {
  const data = new schema.form(req.body);
  if (a==false) {
    await data.save();
  }
  return res.status(200).sendFile(path.join(__dirname, "../Views/signSuccess.html"));
}
const logInPost = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  const data2 = await schema.form.findOne({ email: email, password: pass });
  if (data2) {

    return res.status(200).sendFile(path.join(__dirname, "../Views/home.html"));
  }
  else {

    return res.status(400).sendFile(path.join(__dirname, "../Views/logInFailed.html"));
  }
}

module.exports = { viewRes, signUp, signUpPost, logInPost, result , home , aboutUs , food , drink , dessert}

