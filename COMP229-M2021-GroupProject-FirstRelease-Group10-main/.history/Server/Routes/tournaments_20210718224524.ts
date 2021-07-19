/**
 * Module dependencies.
 *  File name: tournaments.ts, 
    Author's name: Ofovwe Ewere
    Student's id: 301188196
    Web App name: The Favorite Tournament List App
    Date: June 25, 2021
 */
// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// define the tournament model
import tournament from '../Models/tournaments';

/* GET tournaments List page. READ */
router.get('/', (req, res, next) => 
{
  // find all tournaments in the tournaments collection
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

//  GET the Tournament Details page in order to add a new Tournament
router.get('/add', (req, res, next) => {

  /*****************
   * APPROPRIATE CODE ADDED HERE *
   *****************/
  // show the edit view
  res.render('tournaments/details', { title: 'Createatournament', page: 'details', tournaments: '' });

});


// POST process the Tournament Details page and create a new Tournament - CREATE
router.post('/add', (req, res, next) => {

  /*****************
   * APPROPRIATE CODE ADDED HERE *
   *****************/
  // instantiate a new tournament Item
  let newTournament = new tournament
  ({
    "Name": req.body.name,
    "StartDate": req.body.startdate,
    "WinnerFirstQuarterFinal": "WinnerFirstQuarterFinal",
    "WinnerSecondQuarterFinal": "WinnerSecondQuarterFinal",
    "WinnerThirdQuarterFinal": "WinnerThirdQuarterFinal",
    "WinnerFourthQuarterFinal": "WinnerFourthQuarterFinal",
    "WinnerFirstSemiFinal": "WinnerFirstSemiFinal",
    "WinnerSecondSemiFinal": "WinnerSecondSemiFinal",
    "WinnerFinal": "WinnerFinal"
   });

 // db.tournaments.insert({tournament data is here...})  
 tournament.create(newTournament, (err) => {
 if(err)
 {
   console.error(err);
   res.end(err);
 }

 res.redirect('/tournaments');
});


});

// GET the Tournament brackets edit page in order to edit an existing Tournament
router.get('/:id/:match', (req, res, next) => {

  /*****************
   * APPROPRIATE CODE ADDED HERE *
   *****************/
   let id = req.params.id; 
   let match = req.params.match;
   // pass the id to the db
   tournament.findById(id, {}, {}, (err, tournamentItemToEdit) => 
   {
       if(err)
       {
           console.error(err);
           res.end(err);
       }

        if(match === "one")
        {
          res.render('tournaments/bracketsEditOne', { title: 'Bracketfortournament', page: 'bracketsEditOne', tournaments: tournamentItemToEdit});
        }
       
       
       
   });
});



// GET the Tournament Details page in order to edit an existing Tournament
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
       if(tournamentItemToEdit.IsSet==="TRUE")
       {
        // show the edit view
        res.render('tournaments/brackets', { title: 'Bracketfortournament', page: 'brackets', tournaments: tournamentItemToEdit});  
       }

       else
       {
        res.render('tournaments/registerplayers', { title: 'Registerplayers', page: 'edit', tournaments: tournamentItemToEdit});  
       }
       
   });
});

// POST - process the information passed from the details form and update the document
router.post('/:id/:match', (req, res, next) => {

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

      else
      {
          // show the edit view
           // instantiate a new tournament Item
   let updatedTournamentItem = new tournament
   ({
     "_id": id,
     "PlayerOne": req.body.name,
     "StartDate": req.body.startdate,
     "PlayerOne": req.body.playerone,
     "PlayerTwo": req.body.playertwo,
     "PlayerThree": req.body.playerthree,
     "PlayerFour": req.body.playerfour,
     "PlayerFive": req.body.playerfive,
     "PlayerSix": req.body.playersix,
     "PlayerSeven": req.body.playerseven,
     "PlayerEight": req.body.playereight,
     "IsSet": "TRUE"
     
   });
   updatedTournamentItem.WinnerFinal = req.params.match;;
 
   // find the tournament item via db.tournaments.update({"_id":id}) and then update
   tournament.updateOne({_id: id}, updatedTournamentItem, {}, (err) =>{
     if(err)
     {
       console.error(err);
       res.end(err);
     }

  // pass the id to the db
  tournament.findById(id, {}, {}, (err, tournamentItemToEdit) => 
  {
      if(err)
      {
          console.error(err);
          res.end(err);
      }

      // show the edit view
      res.render('tournaments/brackets', { title: 'Bracketfortournament', page: 'brackets', tournaments: tournamentItemToEdit});
  });
 
     
   });
        }
      

      

      
  });

  

});




// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

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

      else
      {
          // show the edit view
        
        
           // instantiate a new tournament Item
   let updatedTournamentItem = new tournament
   ({
     "_id": id,
     "PlayerOne": req.body.name,
     "StartDate": req.body.startdate,
     "PlayerOne": req.body.playerone,
     "PlayerTwo": req.body.playertwo,
     "PlayerThree": req.body.playerthree,
     "PlayerFour": req.body.playerfour,
     "PlayerFive": req.body.playerfive,
     "PlayerSix": req.body.playersix,
     "PlayerSeven": req.body.playerseven,
     "PlayerEight": req.body.playereight,
     "IsSet": "TRUE"
   });
 
   // find the tournament item via db.tournaments.update({"_id":id}) and then update
   tournament.updateOne({_id: id}, updatedTournamentItem, {}, (err) =>{
     if(err)
     {
       console.error(err);
       res.end(err);
     }

  // pass the id to the db
  tournament.findById(id, {}, {}, (err, tournamentItemToEdit) => 
  {
      if(err)
      {
          console.error(err);
          res.end(err);
      }

      // show the edit view
      res.render('tournaments/brackets', { title: 'Bracketfortournament', page: 'brackets', tournaments: tournamentItemToEdit});
  });
 
     
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
 
     res.redirect('/tournaments');
     // show the edit view
    
   });
   
});




//module.exports = router;
