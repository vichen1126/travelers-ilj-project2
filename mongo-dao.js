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

// retrieve a single book
module.exports.findBook = function (isbn, callback) {
    let dataPromise = collection.findOne({"isbn":isbn});
    dataPromise.then((book) => callback(book));
};

// delete a single book
module.exports.deleteBook = function (isbn, callback) {
    let dataPromise = collection.deleteOne({"isbn": isbn});
    dataPromise.then((ok) => callback(ok));
};

// update a single book
module.exports.updateBook = function (isbn, book, callback) {
	delete book._id;
    let dataPromise = collection.updateOne( {isbn: isbn}, {$set: book}, {upsert: true}, callback);
    dataPromise.then((ok) => callback(ok));
};
