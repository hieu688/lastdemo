// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
      
    }
    else {
        res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // show the edit view
    res.render('books/details', { title: 'Add a book', page: 'details', books: '' });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // instantiate a new book Item
    let newBook = new book
    ({
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
     });

   // db.books.insert({book data is here...})  
   book.create(newBook, (err) => {
   if(err)
   {
     console.error(err);
     res.end(err);
   }

   res.redirect('/books');
 });

  
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;

     // pass the id to the db
     book.findById(id, {}, {}, (err, bookItemToEdit) => 
     {
         if(err)
         {
             console.error(err);
             res.end(err);
         }
 
         // show the edit view
         res.render('books/details', { title: 'Edit a book information', page: 'details', books: bookItemToEdit});
     });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

   

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     
});


//module.exports = router;
