/*
; ==============================
; Title: session-api.js
; Author: Professor Krasso
; Date: 16 April 2021
; Modified By: Juvenal Gonzalez, Dan  Ross
; Description: API to handle SignIn requests
; ==============================
*/

const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");

const router = express.Router();
/**
 * API SignIn
 * @param username
 * @param password
 * Used for Sign In Process
 */
router.post("/signin", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const signInMongodbErrorResponse = new ErrorResponse(
          500,
          "internal server error",
          err
        );
        res.status(500).send(signInMongodbErrorResponse.toObject());
      } else {
        console.log(user);

        //valid userName
        if (user) {
          let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          ); //compares the encrypted value to what user.passwords encrypted value would be without ever actually using the base string value of password

          //if password is valid and username is valid
          if (passwordIsValid) {
            console.log("login successful");
            const signinResponse = new BaseResponse(
              200,
              "Login Successful",
              user
            );
            res.json(signinResponse.toObject());
          } //invalid password
          else {
            console.log(`Invalid password for Username: ${user.userName}`);
            const invalidPasswordResponse = new BaseResponse(
              401,
              "Invalid password, please try again!",
              null
            );
            res.status(401).send(invalidPasswordResponse.toObject());
          }
        } //invalid username
        else {
          console.log(`Username: ${req.body.userName} is invalid`);
          const invalidUserNameResponse = new BaseResponse(
            200,
            "Invalid username, please try again!",
            null
          );
          res.status(200).send(invalidUserNameResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const signInCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(signInCatchErrorResponse.toObject());
  }
});

/**
 * VerifySecurityQuestions
 * Compare the answers given to the security questions to the actual answers on their account.
 * This is part of the forgot password process
 */

router.post("/verify/users/:userName/security-questions", async (req, res) => {
  try {
    //First, search for the user by username
    User.findOne({ userName: req.params.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const verifySecurityQuestionsMongodbErrorReponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res
          .status(500)
          .send(verifySecurityQuestionsMongodbErrorReponse.toObject());
      } else {
        console.log(user);


        const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(
          (q) => q.questionText === req.body.questionText1
        );
        const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(
          (q2) => q2.questionText === req.body.questionText2
        );
        const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find(
          (q3) => q3.questionText === req.body.questionText3
        );

        //Compare the answers on their account with the answers they gave in the form and make sure they match up.
        const isValidAnswerOne =
          selectedSecurityQuestionOne.answerText === req.body.answerText1;
        const isValidAnswerTwo =
          selectedSecurityQuestionTwo.answerText === req.body.answerText2;
        const isValidAnswerThree =
          selectedSecurityQuestionThree.answerText === req.body.answerText3;

        //If the answers are valid.
        if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree) {
          console.log(
            `User ${user.userName} answered their security questions correctly.`
          );
          const validSecurityQuestionsResponse = new BaseResponse(
            "200",
            "success",
            user
          );
          res.json(validSecurityQuestionsResponse.toObject());
        } else {
          //if the answers are not valid.
          console.log(
            `User ${user.userName} did not answer their security questions correctly`
          );
          const invalidSecurityQuestionsResponse = new BaseResponse(
            "200",
            "error",
            user
          );
          res.json(invalidSecurityQuestionsResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(verifySecurityQuestionsMongodbErrorReponse.toObject());
  }
});

module.exports = router;
