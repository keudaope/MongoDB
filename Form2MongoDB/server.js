const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3000;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://jyrilindroos:Teittine!2..@mongojyri.wsge5zd.mongodb.net/jyrintietokanta?retryWrites=true&w=majority");
const db = mongoose.connection;
db.once('open', () => {
    console.log("Mongodb yhteys luotu onnistuneesti");
})

const userSchema = new mongoose.Schema({
    reknro: String,
    nimi: String,
    email: String,
    linja: String

})

const Users = mongoose.model("data", userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'))
})

app.post('/post', async (req, res)=>{
    const {reknro, nimi, email, linja} = req.body;
    const user = new Users({
        reknro,
        nimi,
        email,
        linja
    });
    await user.save();
    console.log(user);
    res.send("Lomake lähetettiin onnistuneesti");
});

app.listen(port, () => {
    console.log("Palvelin käynnistetty");
})