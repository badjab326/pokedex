const express = require('express');
const methodOverride = require("method-override");
const pokemon = require('./models/pokemon');
const app = express();
const port = 3000;

//mount middleware
app.use(express.static('style'))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

//Index
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { pokemon: pokemon })
});

//New
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs')
});

//Create
app.post("/pokemon", (req, res) => {
    pokemon.push({
        name: req.body.name,
        img: req.body.img,
        type: req.body.type,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spattack: req.body.spattack,
            spdefense: req.body.spdefense,
            speed: req.body.speed
        }
    })
    console.log(req)
    res.redirect("/pokemon")
  });

//Delete
app.delete('/pokemon/:id', (req, res) => {
    pokemon.splice(req.params.id, 1)
    res.redirect('/pokemon')
});

//Edit
app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        pokemon: pokemon[req.params.id],
        index: req.params.id
    })
});

//Update
app.put('/pokemon/:id', (req, res) => {
    pokemon[req.params.id] = {
        name: req.body.name,
        img: req.body.img,
        type: [req.body.type],
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spattack: req.body.spattack,
            spdefense: req.body.spdefense,
            speed: req.body.speed
        }},
    res.redirect('/pokemon')
});

//Show
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {
        pokemon: pokemon[req.params.id],
        index: req.params.id
    })
});

//listener
app.listen(port, () =>{
    console.log(`Listening on port`, port)
});