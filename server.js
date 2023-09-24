import express from 'express';

import fs from 'fs';
import path from 'path';
import Game from './Game.mjs'

const app = express();

const hostname = '127.0.0.1';
const port = process.env.PORT || 9090;

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
})

app.get('/game/:name', (req, res) => {
    res.status(200).json({message: `The name of the game is ${req.params.name}`})
})

// var jsonPath = path.join('./', 'Game.mjs')
// var jsonString = fs.readFileSync(jsonPath, 'utf8'); 
app.get('/entity', (req, res) => {
    const game = new Game("GTA6", 2025);
    res.status(200).json(game);
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});


//Exercice 6 
//sur git
//3 commits pour chaque question