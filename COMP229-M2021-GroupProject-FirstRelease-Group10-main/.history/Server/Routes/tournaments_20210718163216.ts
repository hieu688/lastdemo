/**
 * Module dependencies.
 *  File name: tournaments.ts, 
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
import tournament from '../Models/tournaments';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  tournament.find( (err, tournaments) => {
    if (err) {
      return console.error(err);
      
    }
    else {
        res.render('tournaments/index', {
        title: 'Tournaments',
        page: 'tournaments',
        tournaments: tournaments
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  /*****************
   * APPROPRIATE CODE ADDED HERE *
   *****************/
  // show the edit view
  res.render('tournaments/details', { title: 'Create a tournament', page: 'details', tournaments: '' });

});


// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  /*****************
   * APPROPRIATE CODE ADDED HERE *
   *****************/
  // instantiate a new book Item
  let newTournament = new tournament
  ({
    "Name": req.body.name,
    "StartDate": req.body.startdate
    
   });

 // db.books.insert({book data is here...})  
 tournament.create(newTournament, (err) => {
 if(err)
 {
   console.error(err);
   res.end(err);
 }

 res.redirect('/tournaments');
});


});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  /*****************
   * APPROPRIATE CODE ADDED HERE *
   *****************/
   let id = req.params.id;

   // pass the id to the db
   tournament.findById(id, {}, {}, (err, tournamentItemToEdit) => 
   {
       if(err)
       {
           console.error(err);
           res.end(err);
       }

       // show the edit view
       res.render('tournaments/details', { title: 'Edit a tournament information', page: 'details', tournaments: tournamentItemToEdit});
   });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  /*****************
    * APPROPRIATE CODE ADDED HERE *
    *****************/
   let id = req.params.id;

   // instantiate a new book Item
   let updatedTournamentItem = new tournament
   ({
     "_id": id,
     "Name": req.body.name,
     "StartDate": req.body.startdate,
     
   });
 
   // find the book item via db.books.update({"_id":id}) and then update
   tournament.updateOne({_id: id}, updatedTournamentItem, {}, (err) =>{
     if(err)
     {
       console.error(err);
       res.end(err);
     }
 
     res.redirect('/tournaments');
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
 
     res.redirect('/tournaments');
   });
   
});




//module.exports = router;
