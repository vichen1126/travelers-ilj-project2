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

