/*
============================================
; Title: user-api.js
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross, Brooklyn Hairston, Juvenal Gonzalez
; Description: CRUD APIs for Users
;===========================================
*/
// require statements
const express = require("express");
const User = require("../models/user");

const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");
const RoleSchema = require("../schemas/user-role");
const bcrypt = require('bcrypt')

//create router
const router = express.Router();
const saltRounds = 10;
//   route: /api/users

/**
 * API FindALL
 * @returns all users
 */

router.get('/', async (req, res) => {
  try{
    User.find({}).where('isDisabled').equals(false).exec(function(err,users){
      if(err) {
          console.log(err);
          const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
          res.status(500).send(findAllMongodbErrorResponse.toObject());
      } else {
          console.log(users);
          const findAllUsersResponse = new BaseResponse(200,"Query Successful", users);
          res.json(findAllUsersResponse.toObject());
      }
    });
  }
  catch(e){
      const findAllCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
      res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

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
      e.message
    );
    res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
});

/**
 * API CreateUser
 * @returns a new user object or null
 * @description adds a new user object to the users collection with a post request or returns an error message
 */

 router.post('/', async(req, res) => {
  try
  {
    // salt and hash the password
      let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
      standardRole = {
          role: 'standard'
      }

      //user object
      let newUser = {
          userName: req.body.userName,
          password: hashedPassword,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          email: req.body.email,
          role: standardRole
      };

      User.create(newUser, function(err, user) {
          if (err) {
              console.log(err);
              const createUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
              res.status(500).send(createUserMongodbErrorResponse.toObject());
          }
          else
          {
              console.log(user);
              const createUserResponse = new BaseResponse(200, 'Query successful', user);
              res.json(createUserResponse.toObject());
          }
      })
  }
  catch (e) {
      console.log(e);
      const createUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
      res.status(500).send(createUserCatchErrorResponse.toObject());
  }
})

/**
 * UpdateUser
 * @param id
 * @returns updated user
 * Inserts new updated user into postion of old user
 */

  router.put('/:id', async (req,res) => {
      try{
          User.findOne({'_id': req.params.id}, function (err,user){
              if(err) {
                  console.log(err);
                  const updateUserMongodbErrorResponse = new ErrorResponse(500, "Internal Server Error", err);
                  res.status(500).send(updateUserMongodbErrorResponse.toObject());
              }
              else{
                  console.log(user);

                  user.set({
                      firstName: req.body.firstName,
                      lastName: req.body.lastName,
                      phoneNumber: req.body.phoneNumber,
                      address: req.body.address,
                      email: req.body.email
                  })

                  user.save(function(err, savedUser){
                      if(err) {
                          console.log(err);
                          const savedUserMongodbErrorResponse = new ErrorResponse(500, "interal sever error(.save function)", err);
                          res.status(500).send(savedUserMongodbErrorResponse.toObject());
                      } else {
                          console.log(savedUser);
                          const savedUserResponse = new BaseResponse(200,'Query Successful', savedUser);
                          res.json(savedUserResponse.toObject());
                      }
                  })
              }
          })
      }
      catch(e)
      {
        console.log(e);
        const updateUserCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
        res.json(updateUserCatchErrorResponse.toObject());
      }
  });


/**
 * API deleteUser
 * @param id
 * @returns User document or null
 * This will set the users field isDisabled to true, rather than actually deleting.
 */

 router.delete("/:id", async (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const deleteUserMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(deleteUserMongodbErrorResponse.toObject());
      } else {
        console.log(user);

        user.set({
          isDisabled: true,
        });

        user.save(function (err, savedUser) {
          if (err) {
            console.log(err);
            const savedUserMongodbErrorResponse = new ErrorResponse(
              500,
              "Internal server error",
              err
            );
          } else {
            console.log(savedUser);
            const savedUserResponse = new BaseResponse(
              200,
              "Query Successful",
              savedUser
            );
            res.json(savedUserResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const deleteUserCatchErrorResponse = new BaseResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(deleteUserCatchErrorResponse.toObject());
  }
});

/**
 * FindSelectedSecurityQuestions
 * @returns The selected security questions for the user
 * @description Queries the database using the userName and returns the selected security questions for that userName
 */
router.get('/:userName/security-questions', async (req, res) => {
  try
  {
    User.findOne({'userName': req.params.userName}, function(err, user)
    {
      if (err)
      {
        console.log(err);
        const findSelectedSecurityQuestionsMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(findSelectedSecurityQuestionsMongodbErrorResponse.toObject());
      }
      else
      if (user)
      {
        console.log(user);
        const findSelectedSecurityQuestionsResponse = new BaseResponse('200', 'Query successful', user.selectedSecurityQuestions);
        res.json(findSelectedSecurityQuestionsResponse.toObject());
      }
      else
      {
        console.log('Invalid username');
        const invalidUserNameResponse = new ErrorResponse('401', 'Username is invalid', null)
        res.status(401).send(invalidUserNameResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const findSelectedSecurityQuestionsCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e);
    res.status(500).send(findSelectedSecurityQuestionsCatchErrorResponse.toObject());
  }
});

/**
 * ResetPassword API
 * @params userName
 * @returns new password
 */

  router.post('/:userName/reset-password', async(req, res) => {
       console.log('HERE');
      try{
          console.log('here2');
          const password = req.body.password;

           User.findOne({'userName': req.params.userName}, function(err, user)
           {
             if (err)
             {
               console.log(err);//SERVER ERROR
               const ResetPasswordErrorRespons = new ErrorResponse('500', "Internal Server Error", err);
               res.status(500).send(ResetPasswordErrorRespons.toObject());
             }
             else if(User)     //checks for user
             {
               console.log(user);

               let hashedPassword = bcrypt.hashSync(password, saltRounds);

               user.set({  //sends encrypted value instead of actual password
                  password: hashedPassword
               });

                   // .save is a mongoDb funtion to store documents in a document store
               user.save(function(err, updatedUser)
               {
                  if(err)
                  {
                    console.log(err);
                    const updatedUserMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
                    res.status(500).send(updatedUserMongodbErrorResponse.toObject());
                  }
                  else
                  {     //successful update of password
                   console.log(updatedUser);
                   const updatedPasswordResponse = new ErrorResponse('200', 'Successfull query', updatedUser);
                   res.json(updatedPasswordResponse.toObject());
                  }
               })
             }
             else
             {    //invalid USERNAME
               console.log('Username does not exist!');
               const noUserResponse = new BaseResponse('200', 'User does not exist!', req.params.userName);
               res.json(noUserResponse.toObject());
             }
           })
      }
      catch(e)
      {
        console.log(e);  //Internal server error catch
        const ResetPasswordCatchError = new ErrorResponse('500', 'Internal Server Error', e);
        res.status(500).send(ResetPasswordCatchError.toObject());
      }
  });

module.exports = router;
