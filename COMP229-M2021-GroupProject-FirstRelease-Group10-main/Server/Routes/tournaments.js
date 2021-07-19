"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const tournaments_1 = __importDefault(require("../Models/tournaments"));
router.get('/', (req, res, next) => {
    tournaments_1.default.find((err, tournaments) => {
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
router.get('/landing', (req, res, next) => {
    tournaments_1.default.find((err, tournaments) => {
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
router.get('/add', (req, res, next) => {
    res.render('tournaments/details', { title: 'Createatournament', page: 'details', tournaments: '' });
});
router.post('/add', (req, res, next) => {
    let newTournament = new tournaments_1.default({
        "Name": req.body.name,
        "StartDate": req.body.startdate,
        "Description": req.body.briefdescription,
        "WinnerFirstQuarterFinal": "WinnerFirstQuarterFinal",
        "WinnerSecondQuarterFinal": "WinnerSecondQuarterFinal",
        "WinnerThirdQuarterFinal": "WinnerThirdQuarterFinal",
        "WinnerFourthQuarterFinal": "WinnerFourthQuarterFinal",
        "WinnerFirstSemiFinal": "WinnerFirstSemiFinal",
        "WinnerSecondSemiFinal": "WinnerSecondSemiFinal",
        "WinnerFinal": "WinnerFinal",
        "IsActive": "FALSE"
    });
    tournaments_1.default.create(newTournament, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/tournaments');
    });
});
router.get('/:id/:match/:firstplayer/:secondplayer', (req, res, next) => {
    let id = req.params.id;
    let match = req.params.match;
    tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        if (match === "eight") {
            res.render('tournaments/bracketsEditTwo', { title: 'Bracketfortournament', page: 'bracketsEditTwo', tournaments: tournamentItemToEdit });
        }
        else {
            res.render('tournaments/bracketsEditOne', { title: 'Bracketfortournament', page: 'bracketsEditOne', tournaments: tournamentItemToEdit });
        }
    });
});
router.get('/:id/activate', (req, res, next) => {
    let id = req.params.id;
    tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('tournaments/activate', { title: 'Activatetournament', page: 'activate', tournaments: tournamentItemToEdit });
    });
});
router.post('/:id/activate', (req, res, next) => {
    let id = req.params.id;
    tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            let updatedTournamentItem = new tournaments_1.default({
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
                "WinnerFirstQuarterFinal": req.body.winnerfirstquarterfinal,
                "WinnerSecondQuarterFinal": req.body.winnersecondquarterfinal,
                "WinnerThirdQuarterFinal": req.body.winnerthirdquarterfinal,
                "WinnerFourthQuarterFinal": req.body.winnerfourthquarterfinal,
                "WinnerFirstSemiFinal": req.body.winnerfirstsemifinal,
                "WinnerSecondSemiFinal": req.body.winnersecondsemifinal,
                "WinnerFinal": req.body.winnerfinal
            });
            updatedTournamentItem.IsActive = "TRUE";
            tournaments_1.default.updateOne({ _id: id }, updatedTournamentItem, {}, (err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }
                    res.redirect('/tournaments');
                });
            });
        }
    });
});
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        if (tournamentItemToEdit.IsSet === "TRUE") {
            res.render('tournaments/brackets', { title: 'Bracketfortournament', page: 'brackets', tournaments: tournamentItemToEdit });
        }
        else {
            res.render('tournaments/registerplayers', { title: 'Registerplayers', page: 'edit', tournaments: tournamentItemToEdit });
        }
    });
});
router.post('/:id/:match/:firstplayer/:secondplayer', (req, res, next) => {
    let id = req.params.id;
    let firstPlayer = req.params.firstplayer;
    let secondPlayer = req.params.secondplayer;
    let match = req.params.match;
    tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            let updatedTournamentItem = new tournaments_1.default({
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
                "WinnerFirstQuarterFinal": req.body.winnerfirstquarterfinal,
                "WinnerSecondQuarterFinal": req.body.winnersecondquarterfinal,
                "WinnerThirdQuarterFinal": req.body.winnerthirdquarterfinal,
                "WinnerFourthQuarterFinal": req.body.winnerfourthquarterfinal,
                "WinnerFirstSemiFinal": req.body.winnerfirstsemifinal,
                "WinnerSecondSemiFinal": req.body.winnersecondsemifinal,
                "WinnerFinal": req.body.winnerfinal
            });
            if (match === "eight") {
                updatedTournamentItem.Finished = "Congratulations: " + secondPlayer;
                updatedTournamentItem.CompleteTournament = "TRUE";
            }
            if (match === "one") {
                updatedTournamentItem.ScoreOne = req.body.scoreone;
                updatedTournamentItem.ScoreTwo = req.body.scoretwo;
                if (updatedTournamentItem.ScoreOne > updatedTournamentItem.ScoreTwo) {
                    updatedTournamentItem.WinnerFirstQuarterFinal = firstPlayer;
                }
                else if (updatedTournamentItem.ScoreOne < updatedTournamentItem.ScoreTwo) {
                    updatedTournamentItem.WinnerFirstQuarterFinal = secondPlayer;
                }
            }
            else if (match === "two") {
                updatedTournamentItem.ScoreThree = req.body.scoreone;
                updatedTournamentItem.ScoreFour = req.body.scoretwo;
                if (updatedTournamentItem.ScoreThree > updatedTournamentItem.ScoreFour) {
                    updatedTournamentItem.WinnerSecondQuarterFinal = firstPlayer;
                }
                else if (updatedTournamentItem.ScoreThree < updatedTournamentItem.ScoreFour) {
                    updatedTournamentItem.WinnerSecondQuarterFinal = secondPlayer;
                }
            }
            else if (match === "three") {
                updatedTournamentItem.ScoreFive = req.body.scoreone;
                updatedTournamentItem.ScoreSix = req.body.scoretwo;
                if (updatedTournamentItem.ScoreFive > updatedTournamentItem.ScoreSix) {
                    updatedTournamentItem.WinnerThirdQuarterFinal = firstPlayer;
                }
                else if (updatedTournamentItem.ScoreFive < updatedTournamentItem.ScoreSix) {
                    updatedTournamentItem.WinnerThirdQuarterFinal = secondPlayer;
                }
            }
            else if (match === "four") {
                updatedTournamentItem.ScoreSeven = req.body.scoreone;
                updatedTournamentItem.ScoreEight = req.body.scoretwo;
                if (updatedTournamentItem.ScoreSeven > updatedTournamentItem.ScoreEight) {
                    updatedTournamentItem.WinnerFourthQuarterFinal = firstPlayer;
                }
                else if (updatedTournamentItem.ScoreSeven < updatedTournamentItem.ScoreEight) {
                    updatedTournamentItem.WinnerFourthQuarterFinal = secondPlayer;
                }
            }
            else if (match === "five") {
                updatedTournamentItem.ScoreNine = req.body.scoreone;
                updatedTournamentItem.ScoreTen = req.body.scoretwo;
                if (updatedTournamentItem.ScoreNine > updatedTournamentItem.ScoreTen) {
                    updatedTournamentItem.WinnerFirstSemiFinal = firstPlayer;
                }
                else if (updatedTournamentItem.ScoreNine < updatedTournamentItem.ScoreTen) {
                    updatedTournamentItem.WinnerFirstSemiFinal = secondPlayer;
                }
            }
            else if (match === "six") {
                updatedTournamentItem.ScoreEleven = req.body.scoreone;
                updatedTournamentItem.ScoreTwelve = req.body.scoretwo;
                if (updatedTournamentItem.ScoreEleven > updatedTournamentItem.ScoreTwelve) {
                    updatedTournamentItem.WinnerSecondSemiFinal = firstPlayer;
                }
                else if (updatedTournamentItem.ScoreEleven < updatedTournamentItem.ScoreTwelve) {
                    updatedTournamentItem.WinnerSecondSemiFinal = secondPlayer;
                }
            }
            else if (match === "seven") {
                updatedTournamentItem.ScoreThirteen = req.body.scoreone;
                updatedTournamentItem.ScoreFourteen = req.body.scoretwo;
                if (updatedTournamentItem.ScoreThirteen > updatedTournamentItem.ScoreFourteen) {
                    updatedTournamentItem.WinnerFinal = firstPlayer;
                }
                else if (updatedTournamentItem.ScoreThirteen < updatedTournamentItem.ScoreFourteen) {
                    updatedTournamentItem.WinnerFinal = secondPlayer;
                }
            }
            tournaments_1.default.updateOne({ _id: id }, updatedTournamentItem, {}, (err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }
                    res.render('tournaments/brackets', { title: 'Bracketfortournament', page: 'brackets', tournaments: tournamentItemToEdit });
                });
            });
        }
    });
});
router.post('/:id', (req, res, next) => {
    let id = req.params.id;
    tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            let updatedTournamentItem = new tournaments_1.default({
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
            tournaments_1.default.updateOne({ _id: id }, updatedTournamentItem, {}, (err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                tournaments_1.default.findById(id, {}, {}, (err, tournamentItemToEdit) => {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }
                    res.render('tournaments/brackets', { title: 'Bracketfortournament', page: 'brackets', tournaments: tournamentItemToEdit });
                });
            });
        }
    });
});
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    tournaments_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/tournaments');
    });
});
//# sourceMappingURL=tournaments.js.map