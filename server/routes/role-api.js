/*
; ==============================
; Title: role-api.js
; Author: Professor Krasso
; Date: 29 April 2021
; Modified By: Brooklyn Hairston
; Description: Role router
; ==============================
*/

//require statements
const express = require('express');
const Role = require('../models/role');
const User = require('../models/user');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require ('../services/base-response');

const router = express.Router();

/**
 * FindAll
 * @returns A list of roles
 * @description Queries the roles collection to for all roles where isDisabled is set to false
 */

router.get('/', async (req, res) => {
  try
  {
    Role.find({})
    .where('isDisabled')
    .equals(false)
    .exec(function(err, roles)
    {
      if (err)
      {
        console.log(err);
        const findAllRolesMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(roles);
        const findAllRoleResponse = new BaseResponse('200', 'Query successful', roles);
        res.json(findAllRoleResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const findAllRolesCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(findAllRolesCatchErrorResponse.toObject());
  }
});

/**
 * UpdateRole
 * @returns An updated role document
 * @description Queries the roles collection by the roleId and updates the record
 */

router.put('/:roleId', async(req, res) => {
  try
  {
    Role.findOne({'_id': req.params.roleId}, function(err, role)
    {
      if (err)
      {
        console.log(err);
        const updateRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(updateRoleMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(role);
        role.set({
          text: req.body.text
        });

        role.save(function(err, updatedRole)
        {
          if (err)
          {
            console.log(err);
            const updatedRoleMongodbErrorResponse = new ErrorResponse('500', 'internal server error', err);
            res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
          }
          else
          {
            console.log(updatedRole);
            const updatedRoleResponse = new BaseResponse('200', 'Query successful', updatedRole);
            res.json(updatedRoleResponse.toObject());
          }
        })
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const updatedRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(updatedRoleCatchErrorResponse.toObject());
  }
});


module.exports = router;
