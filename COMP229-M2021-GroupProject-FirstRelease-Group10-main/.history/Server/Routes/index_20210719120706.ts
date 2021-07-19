/**
 * Module dependencies.
 *  File name: index.ts, 
    Author's: Ofovwe Ewere,Gagandeep Kaur,  Qiuqi Lu, Duy Hieu Nguyen, Farishta Sultani
    Web App name: The Favorite Tournament List App first release
    Date: July 17, 2021
 */
// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

import mongoose from 'mongoose';

// define the tournament model
import tournament from '../Models/tournaments';

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    page: 'home',
    tournaments: ''
   });
});

//module.exports = router;
