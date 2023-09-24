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

app.get('/game/:name', (req, res) => {
    res.status(200).json({message: `The name of the game is ${req.params.name}`});
})

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

//3

//Fin EX6 ***************************************

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});