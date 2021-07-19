/**
 * Module dependencies.
 *  File name: tournaments.ts, 
    Author's name: Ofovwe Ewere
    Student's id: 301188196
    Web App name: The tournament bracket app
    Date: June 25, 2021
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
    finished:String
    
},
{
  collection: "tournaments"
});

const Model = mongoose.model('Tournament', TournamentSchema);
export default Model;
