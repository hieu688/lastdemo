/**
 * Module dependencies.
 *  File name: books.ts, 
    Author's name: Ofovwe Ewere
    Student's id: 301188196
    Web App name: The Favorite Book List App
    Date: June 25, 2021
 */
// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// define the book model
import tournament from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  tournament.find( (err, tournaments) => {
    if (err) {
      return console.error(err);
      
    }
    else {
        res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: tournaments
      });
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  /*****************
   * APPROPRIATE CODE ADDED HERE *
   *****************/
   let id = req.params.id;

   // db.clothing.remove({"_id: id"})
   tournament.remove({_id: id}, (err) => {
     if(err)
     {
       console.error(err);
       res.end(err);
     }
 
     res.redirect('/books');
   });
   
});




//module.exports = router;
