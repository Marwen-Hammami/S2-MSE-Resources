import express from 'express';

import fs from 'fs';
import path from 'path';
import Game from './Game.mjs';

const app = express();

const hostname = '127.0.0.1';
const port = process.env.PORT || 9090;

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
})

// app.get('/game/:name', (req, res) => {
//     res.status(200).json({message: `The name of the game is ${req.params.name}`});
// })

app.get('/entity', (req, res) => {
    const game = new Game("GTA6", 2025);
    res.status(200).json(game);
})

//DEbut EX6 *************************************
function getListGames() {
    var jsonPath = path.join('./', 'SteamGames.json');

    let rawdata = fs.readFileSync(jsonPath);
    let tabGames = JSON.parse(rawdata);

    return tabGames;
}

//1
app.get('/game', (req, res) => {
    let tabGames = getListGames()

    res.status(200).json(tabGames);
})

//2
app.get('/game/select/:year', (req, res) => {
    var tabGames = getListGames()
    let year = req.params.year

    var filteredList = tabGames.filter((game) => game["Year"] > year);
    res.status(200).json(filteredList);
})

//3
app.get('/game/:name', (req, res) => {
    var tabGames = getListGames()
    let name = req.params.name
    var found = false

    for (let i = 0; i < tabGames.length; i++) {
        if (tabGames[i]["Game"] == name) {
            found = true
            var link = tabGames[i]["GameLink"];
            res.redirect(301, link);
        }
    }
    if(!found)
        res.status(404).setHeader('Content-Type', 'text/plain').end("Game not found");
})

//Fin EX6 ***************************************

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});