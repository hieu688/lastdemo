/**
 * Module dependencies.
 *  File name: index.js, 
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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
router.get('/', (req, res, next) => {
    res.render('content/index', {
        title: 'Home',
        page: 'home',
        books: ''
    });
});
//# sourceMappingURL=index.js.map