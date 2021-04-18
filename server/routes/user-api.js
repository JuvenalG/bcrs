/*
============================================
; Title: user-api.js
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: CRUD APIs for Users
;===========================================
*/
// require statements
const express = require("express");
const User = require("../models/user");

const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");
const RoleSchema = require("../schemas/user-role");

//create router
const router = express.Router();

/**
 * API findUserById
 * @param id
 * @returns User document or null
 */

router.get("/:id", async (req, res) => {
  try {
    User.findOne({ '_id': req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const findByIdMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(findByIdMongodbErrorResponse.toObject());
      } else {
        console.log(user);
        const findByIdResponse = new BaseResponse(
          200,
          "Query successful",
          user
        );
        res.json(findByIdResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const findByIdCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e
    );
    res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
});

module.exports = router;
