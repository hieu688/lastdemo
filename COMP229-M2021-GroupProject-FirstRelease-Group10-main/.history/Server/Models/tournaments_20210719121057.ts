/**
 * Module dependencies.
 *  File name: tournaments.ts, 
    Author's: Ofovwe Ewere,Gagandeep Kaur,  Qiuqi Lu, Duy Hieu Nguyen, Farishta Sultani
    Web App name: The Favorite Tournament List App first release 
    Description: The database model for tournament bracket app
    Date: July 17, 2021
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

// create a model class
const TournamentSchema = new Schema
({
    Name: String,
    StartDate: String,
    Description: String,
    PlayerOne: String,
    PlayerTwo: String,
    PlayerThree: String,
    PlayerFour: String,
    PlayerFive: String,
    PlayerSix: String,
    PlayerSeven: String,
    PlayerEight:String,
    IsSet: String,
    WinnerFirstQuarterFinal:String,
    WinnerSecondQuarterFinal:String,
    WinnerThirdQuarterFinal:String,
    WinnerFourthQuarterFinal:String,
    WinnerFirstSemiFinal:String,
    WinnerSecondSemiFinal:String,
    WinnerFinal:String,
    ScoreOne:Number,
    ScoreTwo:Number,
    ScoreThree:Number,
    ScoreFour:Number,
    ScoreFive:Number,
    ScoreSix:Number,
    ScoreSeven:Number,
    ScoreEight:Number,
    ScoreNine:Number,
    ScoreTen:Number,
    ScoreEleven:Number,
    ScoreTwelve:Number,
    ScoreThirteen:Number,
    ScoreFourteen:Number,
    Finished:String,
    CompleteTournament:String,
    IsActive:String
    
},
{
  collection: "tournaments"
});

const Model = mongoose.model('Tournament', TournamentSchema);
export default Model;
