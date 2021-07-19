/**
 * Module dependencies.
 *  File name: server.ts, 
    Author's name: Ofovwe Ewere
    Student's id: 301188196
    Web App name: The Favorite Book List App
    Date: June 25, 2021
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

// create a model class
const BookSchema = new Schema
({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

const Model = mongoose.model('Book', BookSchema);
export default Model;
