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


/* GET tournaments active page. READ */
router.get('/landing', (req, res, next) => 
{
  // find all tournaments in the tournaments collection
  tournament.find( (err, tournaments) => {
    if (err) {
      return console.error(err);
      
    }
    else {
        res.render('tournaments/landing', {
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
    "Description":req.body.briefdescription,
    "WinnerFirstQuarterFinal": "WinnerFirstQuarterFinal",
    "WinnerSecondQuarterFinal": "WinnerSecondQuarterFinal",
    "WinnerThirdQuarterFinal": "WinnerThirdQuarterFinal",
    "WinnerFourthQuarterFinal": "WinnerFourthQuarterFinal",
    "WinnerFirstSemiFinal": "WinnerFirstSemiFinal",
    "WinnerSecondSemiFinal": "WinnerSecondSemiFinal",
    "WinnerFinal": "WinnerFinal",
    "IsActive":"FALSE"
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
router.get('/:id/:match/:firstplayer/:secondplayer', (req, res, next) => {

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
       
       if(match === "eight")
       {
           //Renders the edit a bracket page
       res.render('tournaments/bracketsEditTwo', { title: 'Bracketfortournament', page: 'bracketsEditTwo', tournaments: tournamentItemToEdit});
       }
       else
       {
        //Renders the edit a bracket page
       res.render('tournaments/bracketsEditOne', { title: 'Bracketfortournament', page: 'bracketsEditOne', tournaments: tournamentItemToEdit});
       }
       
        

        
       
       
       
   });
});



// GET the Tournament Details page in order to edit an existing Tournament
router.get('/:id/activate', (req, res, next) => {

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

       
        res.render('tournaments/activate', { title: 'Activatetournament', page: 'activate', tournaments: tournamentItemToEdit});  
       
       
   });
});
// POST - process the information passed from the details form and update the document
router.post('/:id/activate', (req, res, next) => {

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
              "Name": req.body.name,
              "StartDate": req.body.startdate,
              "PlayerOne": req.body.playerone,
              "PlayerTwo": req.body.playertwo,
              "PlayerThree": req.body.playerthree,
              "PlayerFour": req.body.playerfour,
              "PlayerFive": req.body.playerfive,
              "PlayerSix": req.body.playersix,
              "PlayerSeven": req.body.playerseven,
              "PlayerEight": req.body.playereight,
              "IsSet": "TRUE",
              "WinnerFirstQuarterFinal":req.body.winnerfirstquarterfinal,
              "WinnerSecondQuarterFinal":req.body.winnersecondquarterfinal,
              "WinnerThirdQuarterFinal":req.body.winnerthirdquarterfinal,
              "WinnerFourthQuarterFinal":req.body.winnerfourthquarterfinal,
              "WinnerFirstSemiFinal":req.body.winnerfirstsemifinal,
              "WinnerSecondSemiFinal":req.body.winnersecondsemifinal,
              "WinnerFinal": req.body.winnerfinal
              
            });

            updatedTournamentItem.IsActive = "TRUE";
            
   
 
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
router.post('/:id/:match/:firstplayer/:secondplayer', (req, res, next) => {

  /*****************
    * APPROPRIATE CODE ADDED HERE *
    *****************/
   let id = req.params.id; 
   let firstPlayer = req.params.firstplayer;
   let secondPlayer = req.params.secondplayer;
  let match = req.params.match;
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
              "Name": req.body.name,
              "StartDate": req.body.startdate,
              "PlayerOne": req.body.playerone,
              "PlayerTwo": req.body.playertwo,
              "PlayerThree": req.body.playerthree,
              "PlayerFour": req.body.playerfour,
              "PlayerFive": req.body.playerfive,
              "PlayerSix": req.body.playersix,
              "PlayerSeven": req.body.playerseven,
              "PlayerEight": req.body.playereight,
              "IsSet": "TRUE",
              "WinnerFirstQuarterFinal":req.body.winnerfirstquarterfinal,
              "WinnerSecondQuarterFinal":req.body.winnersecondquarterfinal,
              "WinnerThirdQuarterFinal":req.body.winnerthirdquarterfinal,
              "WinnerFourthQuarterFinal":req.body.winnerfourthquarterfinal,
              "WinnerFirstSemiFinal":req.body.winnerfirstsemifinal,
              "WinnerSecondSemiFinal":req.body.winnersecondsemifinal,
              "WinnerFinal": req.body.winnerfinal
              
            });

           
            if(match === "eight")
            {
              
                updatedTournamentItem.Finished = "Congratulations: "+ secondPlayer;
                updatedTournamentItem.CompleteTournament = "TRUE";
            } 
            
            if(match === "one")
            {
              updatedTournamentItem.ScoreOne = req.body.scoreone;
              updatedTournamentItem.ScoreTwo = req.body.scoretwo;
              //Move winner to the next round
              if(updatedTournamentItem.ScoreOne > updatedTournamentItem.ScoreTwo)
              {
                updatedTournamentItem.WinnerFirstQuarterFinal = firstPlayer;
              }

              else if(updatedTournamentItem.ScoreOne < updatedTournamentItem.ScoreTwo)
              {
                updatedTournamentItem.WinnerFirstQuarterFinal = secondPlayer ;
              }
              
            }

            else if(match === "two")
            {
              updatedTournamentItem.ScoreThree = req.body.scoreone;
              updatedTournamentItem.ScoreFour = req.body.scoretwo;
              //Move winner to the next round
              if(updatedTournamentItem.ScoreThree > updatedTournamentItem.ScoreFour)
              {
                updatedTournamentItem.WinnerSecondQuarterFinal = firstPlayer;
              }

              else if(updatedTournamentItem.ScoreThree < updatedTournamentItem.ScoreFour)
              {
                updatedTournamentItem.WinnerSecondQuarterFinal = secondPlayer ;
              }
            }

            else if(match === "three")
            {
              updatedTournamentItem.ScoreFive = req.body.scoreone;
              updatedTournamentItem.ScoreSix = req.body.scoretwo;
              //Move winner to the next round
              if(updatedTournamentItem.ScoreFive > updatedTournamentItem.ScoreSix)
              {
                updatedTournamentItem.WinnerThirdQuarterFinal = firstPlayer;
              }

              else if(updatedTournamentItem.ScoreFive < updatedTournamentItem.ScoreSix)
              {
                updatedTournamentItem.WinnerThirdQuarterFinal = secondPlayer ;
              }
            }

            else if(match === "four")
            {
              updatedTournamentItem.ScoreSeven = req.body.scoreone;
              updatedTournamentItem.ScoreEight = req.body.scoretwo;
              //Move winner to the next round
              if(updatedTournamentItem.ScoreSeven > updatedTournamentItem.ScoreEight)
              {
                updatedTournamentItem.WinnerFourthQuarterFinal = firstPlayer;
              }

              else if(updatedTournamentItem.ScoreSeven < updatedTournamentItem.ScoreEight)
              {
                updatedTournamentItem.WinnerFourthQuarterFinal = secondPlayer ;
              }
            }

            else if(match === "five")
            {
              updatedTournamentItem.ScoreNine  = req.body.scoreone;
              updatedTournamentItem.ScoreTen  = req.body.scoretwo;
              //Move winner to the next round
              if(updatedTournamentItem.ScoreNine  > updatedTournamentItem.ScoreTen )
              {
                updatedTournamentItem.WinnerFirstSemiFinal = firstPlayer;
              }

              else if(updatedTournamentItem.ScoreNine  < updatedTournamentItem.ScoreTen )
              {
                updatedTournamentItem.WinnerFirstSemiFinal = secondPlayer ;
              }
              
            }

            else if(match === "six")
            {
              updatedTournamentItem.ScoreEleven  = req.body.scoreone;
              updatedTournamentItem.ScoreTwelve  = req.body.scoretwo;
              //Move winner to the next round
              if(updatedTournamentItem.ScoreEleven  > updatedTournamentItem.ScoreTwelve )
              {
                updatedTournamentItem.WinnerSecondSemiFinal = firstPlayer;
              }

              else if(updatedTournamentItem.ScoreEleven  < updatedTournamentItem.ScoreTwelve )
              {
                updatedTournamentItem.WinnerSecondSemiFinal = secondPlayer ;
              }
              
            }


            else if(match === "seven")
            {
              updatedTournamentItem.ScoreThirteen  = req.body.scoreone;
              updatedTournamentItem.ScoreFourteen  = req.body.scoretwo;
              //Move winner to the next round
              if(updatedTournamentItem.ScoreThirteen  > updatedTournamentItem.ScoreFourteen )
              {
                updatedTournamentItem.WinnerFinal = firstPlayer;
              }

              else if(updatedTournamentItem.ScoreThirteen  < updatedTournamentItem.ScoreFourteen )
              {
                updatedTournamentItem.WinnerFinal = secondPlayer ;
              }

              
              
            }

            

           


            
           

           
   
 
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
