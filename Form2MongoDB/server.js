// Otetaan tarpeelliset kirjastot käyttöön
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Määritetään oletusportti
const port = 3000;

// Tehdään perusasetukset
const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));

// View-moottoriksi määritetään ejs
app.set('view engine', 'ejs');

// Otetaan yhteys MongoDB Atlasiin
mongoose.connect("mongodb+srv://jyrilindroos:Teittine!2..@mongojyri.wsge5zd.mongodb.net/jyrintietokanta?retryWrites=true&w=majority");
const db = mongoose.connection;
db.once('open', () => {
    console.log("Mongodb yhteys luotu onnistuneesti");
})

// Tehdään Schema, jonka avulla syötetään tiedot kantaan
const userSchema = new mongoose.Schema({
    reknro: String,
    nimi: String,
    email: String,
    linja: String
},{ timestamps: true });

// Tehdään Schemasta malli
const Users = mongoose.model("data", userSchema);

// Reititetään localhost:3000/ -hakemistoon syöttölomake
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'))
});

// Reititetään localhost:3000/data -hakemistoon tulostusnäkymä
app.get('/data', (req, res) =>{
Users.find()
    .then(result => {
        res.render('data', {users: result});
    })
    .catch(err => {
        console.log(err);
    })
})

// Reititetään lomakkeen lähetys ja sen toiminnat
app.post('/post', async (req, res)=>{
    // haetaan muuttujiin lomakkeelta tiedot
    const {reknro, nimi, email, linja} = req.body;
    // Luodaan uusi olio mallista ja syötetään tiedot
    const user = new Users({
        reknro,
        nimi,
        email,
        linja
    });
    // Tallennetaan olion tiedot
    await user.save();
    // Tulostetaan olio konsoliin
    console.log(user);
    // Ohjataan localhost:3000/data -sivulle
    res.redirect('/data');
});

app.get('/data/:id', (req, res) => {
    const id = req.params.id;
    Users.findById(id)
    .then(result => {
        res.render('details', {users: result});
    })
    .catch(err => {
        console.log(err);
    });
})


// Kuunnellaan 3000-portin tapahtumia
app.listen(port, () => {
    console.log("Palvelin käynnistetty");
})