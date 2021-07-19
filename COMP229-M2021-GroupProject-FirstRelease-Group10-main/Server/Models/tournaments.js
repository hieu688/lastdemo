"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TournamentSchema = new Schema({
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
    PlayerEight: String,
    IsSet: String,
    WinnerFirstQuarterFinal: String,
    WinnerSecondQuarterFinal: String,
    WinnerThirdQuarterFinal: String,
    WinnerFourthQuarterFinal: String,
    WinnerFirstSemiFinal: String,
    WinnerSecondSemiFinal: String,
    WinnerFinal: String,
    ScoreOne: Number,
    ScoreTwo: Number,
    ScoreThree: Number,
    ScoreFour: Number,
    ScoreFive: Number,
    ScoreSix: Number,
    ScoreSeven: Number,
    ScoreEight: Number,
    ScoreNine: Number,
    ScoreTen: Number,
    ScoreEleven: Number,
    ScoreTwelve: Number,
    ScoreThirteen: Number,
    ScoreFourteen: Number,
    Finished: String,
    CompleteTournament: String,
    IsActive: String
}, {
    collection: "tournaments"
});
const Model = mongoose_1.default.model('Tournament', TournamentSchema);
exports.default = Model;
//# sourceMappingURL=tournaments.js.map