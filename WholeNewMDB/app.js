// Käytetään tässä sivujen reitittämiseen
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// Jäsentää tiedot json-muotoon
app.use(bodyParser.json());
// staattisten HTML-tiedostojen tarjoamiseen käyttäjälle
const path = require('path');

const db = require('./db');
const collection = 'todo';