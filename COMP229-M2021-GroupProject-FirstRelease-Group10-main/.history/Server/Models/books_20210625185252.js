/**
 * Module dependencies.
 *  File name: books.js, 
    Author's name: Ofovwe Ewere
    Student's id: 301188196
    Web App name: The Favorite Book List App
    Date: June 25, 2021
 */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const BookSchema = new Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
}, {
    collection: "books"
});
const Model = mongoose_1.default.model('Book', BookSchema);
exports.default = Model;
//# sourceMappingURL=books.js.map