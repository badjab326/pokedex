const express = require('express');
const methodOverride = require("method-override");
const pokemon = require('./models/pokemon');
const app = express();
const port = 3000;

//mount middleware
app.use(methodOverride("_method"));

//Index
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { pokemon: pokemon})
});

//New
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs')
});

//Create
app.post("/pokemon", (req, res) => {
    pokemon.push(req.body)
    console.log(pokemon)
    res.redirect("/pokemon")
  })


//Delete
app.delete('/pokemon/:id', (req, res) => {
    pokemon.splice(req.params.id, 1)
    res.redirect('/pokemon')
});

//Edit
app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        pokemon: pokemon[req.params.id],
        index: req.params.id,
    })
});

//Update
app.put('/pokemon/:id', (req, res) => {
    pokemon[req.params.id] = req.body
    res.redirect('/pokemon')
});

//Show
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {
        pokemon: pokemon[req.params.id]
    })
});

//listener
app.listen(port, () =>{
    console.log(`Listening on port`, port)
});