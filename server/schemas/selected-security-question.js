/*
; ==============================
; Title: selected-security-question.js
; Author: Professor Krasso
; Date: 16 April 2021
; Modified By: Brooklyn Hairston
; Description: Selected security question schema
; ==============================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates a new selectedSecurityQuestionSchema with two string objects
let selectedSecurityQuestionSchema = new Schema({
  questionText: { type: String },
  answerText: { type: String }
})

//exports the schema
module.exports = selectedSecurityQuestionSchema;
