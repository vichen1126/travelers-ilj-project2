const mongodb = require("mongodb"); // mongo client library  
const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = "swapi";
const films = "films";
const planets = "planets";
const fc = "films_characters";
const fp = "films_planets";
const characters =  "characters";
let filmsColl;
let planetsColl;
let charColl;
let fcColl;
let fpColl;

async function startup() {
    let client = new MongoClient(url);
    await client.connect();
    var db = client.db(dbName)
    filmsColl = db.collection(films);
    planetsColl = db.collection(planets);
    charColl = db.collection(characters);
    fcColl = db.collection(fc);
    fpColl = db.collection(fp);
}
startup();

// retrieve all planets
module.exports.findAllPlanets = function (callback) {
    let dataPromise = planetsColl.find({}).toArray();
    dataPromise.then((planets) => callback(planets));
};

// retrieve all films
module.exports.findAllFilms = function (callback) {
    let dataPromise = filmsColl.find({}).toArray();
    dataPromise.then((films) => callback(films));
};

// retrieve all characters
module.exports.findAllCharacters = function (callback) {
    let dataPromise = charColl.find({}).toArray();
    dataPromise.then((characters) => callback(characters));
};


module.exports.findCharacter = function (id, callback) {
    let dataPromise = charColl.findOne({"id":parseInt(id)});
    dataPromise.then((character) => callback(character));
};


module.exports.findFilm = function (id, callback) {
    let dataPromise = filmsColl.findOne({"id":+id});
    dataPromise.then((film) => callback(film));
};


module.exports.findPlanet = function (id, callback) {
    let dataPromise = planetsColl.findOne( {"id": parseInt(id)});
    dataPromise.then((planet) => callback(planet));
};

module.exports.findCharsByFilm = async function (id, callback) {
    let fcArr = await fcColl.find({"film_id":parseInt(id)}).toArray();
    let data = [];
    for (let i = 0; i < fcArr.length; i++) {
        let fc = fcArr[i];
        let record = await charColl.findOne({"id":parseInt(fc.character_id)});
        
        data.push(record);  
    }
    
    callback(data);
};

module.exports.findPlanetsByFilm = async function (id, callback) {
    let fpArr = await fpColl.find({"film_id":parseInt(id)}).toArray();
    let data = [];
    for (let i = 0; i < fpArr.length; i++) {
        let fp = fpArr[i];
        let record = await planetsColl.findOne({"id":parseInt(fp.planet_id)});
        
        data.push(record);  
    }
    
    callback(data);
};

module.exports.findFilmsByCharacter = async function (id, callback) {
    let fcArr = await fcColl.find({"character_id":parseInt(id)}).toArray();
    let data = [];
    for (let i = 0; i < fcArr.length; i++) {
        let fc = fcArr[i];
        let record = await filmsColl.findOne({"id":parseInt(fc.film_id)});
        
        data.push(record);  
    }
    
    callback(data);
};

module.exports.findFilmsByPlanet = async function (id, callback) {
    let fpArr = await fpColl.find({"planet_id":parseInt(id)}).toArray();
    let data = [];
    for (let i = 0; i < fpArr.length; i++) {
        let fp = fpArr[i];
        let record = await filmsColl.findOne({"id":parseInt(fp.film_id)});
        
        data.push(record);  
    }
    
    callback(data);
};

module.exports.findCharactersByPlanet = function (id, callback) {
    let dataPromise = charColl.find({"homeworld":parseInt(id)}).toArray();
    dataPromise.then((character) => callback(character)); 
}
