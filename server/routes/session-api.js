/*
; ==============================
; Title: session-api.js
; Author: Professor Krasso
; Date: 16 April 2021
; Modified By: Juvenal Gonzalez
; Description: API to handle SignIn requests
; ==============================
*/


const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const ErrorResponse = require('../services/error-response')
const BaseResponse = require('../services/base-response');

const router = express.Router();

router.post('/signin', async (req, res) => {
    try{
        User.findOne({'userName': req.body.userName}, function (err, user)
        {
          if(err)
          {
            console.log(err);
            const signInMongodbErrorResponse = new ErrorResponse(500,'internal server error', err);
            res.status(500).send(signInMongodbErrorResponse.toObject());
          }
          else
          {
            console.log(user);

            //valid userName
            if (user)
            {
                  let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); //compares the encypted value to what user.passwords encrypted value would be without ever actually using the base string value of password

                  //if password is valid and username is valid
                  if (passwordIsValid)
                  {
                    console.log('login successful');
                    const signinResponse = new BaseResponse(200, 'Login Successful', user);
                    res.json(signinResponse.toObject());
                  } //invalid password
                  else
                  {
                    console.log(`Invalid password for Username: ${user.userName}`);
                    const invalidPasswordResponse = new BaseResponse(401, 'Invalid password, please try again!', null);
                    res.status(401).send(invalidPasswordResponse.toObject());
                  }
            }//invalid username
            else
            {
              console.log(`Username: ${req.body.userName} is invalid`);
              const invalidUserNameResponse = new BaseResponse(200, "Invalid username, please try again!", null);
              res.status(200).send(invalidUserNameResponse.toObject());
            }

          }
        })
    }
    catch(e)
    {
      console.log(e)
      const signInCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
      res.status(500).send(signInCatchErrorResponse.toObject());
    }
});

module.exports = router;
