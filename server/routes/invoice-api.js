/*
; ==============================
; Title: invoice-api.js
; Author: Professor Krasso
; Date: 30 April 2021
; Modified By: Brooklyn Hairston
; Description: Invoice router
; ==============================
*/

//require statements
const express = require("express");
const Role = require("../models/role");
const User = require("../models/user");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");
const router = express.Router();

/**
 * FindPurchaseByService
 * @returns
 * @description
 */
router.get('/purchases-graph', async(req, res) => {
  try
  {
    Invoice.aggregate([
      {
        $unwind: '$lineItems'
      },
      {
        $group:
        {
          '_id':
          {
            'title': '$lineItems.title',
            'price': '$lineItems.price'
          },
          'count':
          {
            $sum: 1
          }
        }
      },
      {
        $sort:
        {
          '_id.title': 1
        }
      }
    ], function(err, purchaseGraph)
    {
     if (err)
     {
       console.log(err);
       const findPurchaseByServiceGraphMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
       res.status(500).send(findPurchaseByServiceGraphMongodbErrorResponse.toObject());
     }
     else
     {
       console.log(purchaseGraph);
       const findPurchasesByServiceGraphResponse = new BaseResponse('200', 'Query successful', purchaseGraph);
       res.json(findPurchasesByServiceGraphResponse.toObject());
     }
    })
  }
  catch (e)
  {
    console.log(e);
    const findPurchasesByServiceCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(findPurchasesByServiceCatchErrorResponse.toObject());
  }
});



module.exports = router;
