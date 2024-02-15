// Otetaan Mango-ajuri käyttöön
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
const dbname = "jyrintietokanta";
const url = "mongodb+srv://jyrilindroos:Teittine!2..@mongojyri.wsge5zd.mongodb.net/?retryWrites=true&w=majority";
const collectionName = 'blogs';

MongoClient.connect(url)
    .then(client => {
        console.log("Yhteys serveriin onnistui");
        const dbCon = client.db(dbname);
        const collection = dbCon.collection(collectionName);
        /* collectionin haku
        return collection.find({}).toArray()*/
        // Tiedon lisäys
        //return collection.insertOne({title: 'Otsikko 2', snippet: 'ingressi 2', body: 'sisältö 2'});
        // Monen tiedon lisäys
        /*return collection.insertMany([
            {
                title: 'Otsikko 3', 
                snippet: 'ingressi 3', 
                body: 'sisältö 3'
            },
            {
                title: 'Otsikko 4', 
                snippet: 'ingressi 4', 
                body: 'sisältö 4'
            },
            {
                title: 'Otsikko 5', 
                snippet: 'ingressi 5', 
                body: 'sisältö 5'
            },
        ]);*/
        // Tiedon muutos
        //return collection.updateOne({_id: new ObjectID("65cb25eb6f92f8b6bbdbfc05")}, {$set: {title: 'Otsikkoko tämä onkin'} });
        // Tiedon poisto
        //return collection.deleteOne({_id: new ObjectID("65cb25eb6f92f8b6bbdbfc05")});
    })
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log("Yhteysvirhe", err);
    })
