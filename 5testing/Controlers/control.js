const express = require('express');
const w = require('../web_new');
const acc = w.contract;
// const result = (req, res, next) => {
//   const result = validationResult(req);
//   const hasError = !result.isEmpty();

//   if (hasError) {
//     a = true;
//     const error = result.array()[0].msg;
//     res.status(400).json({ Sucess: "failed", message: error });
//   }
//   next();
// }
const viewAccount = async (req, res) => {

    const a = await acc.methods.totalSupply().call({ from: '0x3B13762681129743B3f9af5D5A076f0e2f4C5931' });
    res.send(a);
}

const transfer = async (req, res) => {

    const b = await acc.methods.transfer('0x0DC2F7cB378Fa14107d9871B573D31227AED186f', 10).send({ from: '0x3B13762681129743B3f9af5D5A076f0e2f4C5931' });
    res.send(b);
}

const balanceOf = async (req, res) => {

    const c = await acc.methods.balanceOf('0x0DC2F7cB378Fa14107d9871B573D31227AED186f').call({ from: '0x3B13762681129743B3f9af5D5A076f0e2f4C5931' });
    res.send(c);
}



// a();

// const signUp = (req, res) => {
//   res.sendFile(path.join(__dirname, "../Views/signUp.html"));
// }

// const signUpPost = async (req, res) => {
//   const data = new schema.form(req.body);
//   if (a==false) {
//     await data.save();
//   }
//   return res.status(200).sendFile(path.join(__dirname, "../Views/signSuccess.html"));
// }
// const logInPost = async (req, res) => {
//   const email = req.body.email;
//   const pass = req.body.password;
//   const data2 = await schema.form.findOne({ email: email, password: pass });
//   if (data2) {

//     return res.status(200).sendFile(path.join(__dirname, "../Views/logSuccess.html"));
//   }
//   else {

//     return res.status(400).sendFile(path.join(__dirname, "../Views/logInFailed.html"));
//   }
// }

module.exports = { viewAccount ,transfer , balanceOf};
