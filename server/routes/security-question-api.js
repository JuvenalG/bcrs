/*
; ==============================
; Title: security-question-qpi.js
; Author: Professor Krasso
; Date: 16 April 2021
; Modified By: Brooklyn Hairston
; Description: Security question router
; ==============================
*/


//require statements
const express = require('express')
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

//create router
const router = express.Router();



/**
 * FindAll API
 */




/**
 * FindById API
 */



/**
 * CreateSecurityQuestion API
 * @param
 * @returns A new security question record or null
 * @description Creates and adds a new security question to the security question model with a post request or returns an error message
*/

router.post('/', async(req, res) => {
  try
  {

    let newSecurityQuestion = {
      text: req.body.text
    };

    SecurityQuestion.create(newSecurityQuestion, function(err, securityQuestion) {
      if (err)
      {
        console.log(err);
        const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
      }
      else
      {

        console.log(securityQuestion);
        const createSecurityQuestionResponse = new BaseResponse(200, 'Query successful', securityQuestion);
        res.json(createSecurityQuestionResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const createSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
  }
});


/**
 * UpdateSecurityQuestion API
 */



/**
 * DeleteSecurityQuestion API
 * @param id
 * @returns an updated security question document with the queried id disabled or a an error message
 * @description queries the security question collection for the document id and sets the isDisabled flag to true
 */

router.delete('/:id', async (req, res) => {
  try
  {
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
      if (err)
      {
        console.log(err);
        const deleteSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(deleteSecurityQuestionMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(securityQuestion);

        securityQuestion.set({
          isDisabled: true
        });

        securityQuestion.save(function (err, savedSecurityQuestion) {
          if (err)
          {
            console.log(err);
            const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
          }
          else
          {
            console.log(savedSecurityQuestion);
            const deleteSecurityQuestionResponse = new BaseResponse(200, 'Query successful', savedSecurityQuestion);
            res.json(deleteSecurityQuestionResponse.toObject());
          }
        })
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const deleteSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());
  }
});