const express = require('express');
const app = express();
app.use(express.json()); //Parse JSON body 
var dao = require("./mongo-dao");

const port = 4000
console.log("Open a browser to http://localhost:"+port+" to view the application");
app.listen(port);

app.get("/api/planets", function(req, res) {
    dao.findAllPlanets(function(data){
        res.send(data)
    })
});

app.get("/api/films", function(req, res) {
    dao.findAllFilms(function(data){
        res.send(data)
    })
});


app.get("/api/characters", function(req, res) {
    dao.findAllCharacters(function(data){
        res.send(data)
    })
});


app.get("/api/films/:id", (req, res) => {
    dao.findFilm( req.params.id,
        (film) => {
            if (!film) {
                res.status(404).end();
            } else {
                res.send(film);
            }
        })
});


app.get("/api/characters/:id", (req, res) => {
    dao.findCharacter( req.params.id,
        (character) => {
            if (!character) {
                res.status(404).end();
            } else {
                res.send(character);
            }
        })
});


app.get("/api/planets/:id", (req, res) => {
    dao.findPlanet( req.params.id,
        (planet) => {
            if (!planet) {
                res.status(404).end();
            } else {
                res.send(planet);
            }
        })
});

app.get("/api/films/:id/characters", async (req, res) => {
    await dao.findCharsByFilm( req.params.id,
        (fc) => {
            if (!fc) {
                res.status(404).end();
            } else {
                res.send(fc);
            }
        })
});

app.get("/api/films/:id/planets", async (req, res) => {
    await dao.findPlanetsByFilm( req.params.id,
        (fp) => {
            if (!fp) {
                res.status(404).end();
            } else {
                res.send(fp);
            }
        })
});

app.get("/api/characters/:id/films", async (req, res) => {
    await dao.findFilmsByCharacter( req.params.id,
        (fc) => {
            if (!fc) {
                res.status(404).end();
            } else {
                res.send(fc);
            }
        })
});

app.get("/api/planets/:id/films", async (req, res) => {
    await dao.findFilmsByPlanet( req.params.id,
        (fp) => {
            if (!dao.findPlanet) {
                res.status(404).end();
            } else {
                res.send(fp);
            }
        })
});

app.get("/api/planets/:id/characters", (req, res) => {
    dao.findCharactersByPlanet( req.params.id,
        (character) => {
            if (!character) {
                res.status(404).end();
            } else {
                res.send(character);
            }
        })
});


