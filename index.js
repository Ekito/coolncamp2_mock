const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

let id1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0QGVraXRvLmZyIn0.9qhlq0d5LOcsCxuz_ldmXX3ipvMY1bEN2rHEYtSZeaU"
let id2 = "BIDON_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0QGVraXRvLmZyIn0.9qhlq0d5LOcsCxuz_ldmXX3ipvMY1bEN2rHEYtSZeaU"

/**
 * URL pour tester 
 * 
  curl -X POST http://localhost:3000/auth/connexion -H 'cache-control: no-cache' -H 'content-type: application/json' \
    -d '{"login": "test@ekito.fr", "password":"ekito"}'

  curl -X POST http://localhost:3000/auth/connexion -H 'cache-control: no-cache' -H 'content-type: application/json' \
    -d '{"login": "test2@ekito.fr", "password":"ekito"}'

  curl -X POST http://localhost:3000/auth/connexion -H 'cache-control: no-cache' -H 'content-type: application/json' \
    -d '{"login": "test3@ekito.fr", "password":"ekito"}'
 * 
 */
app.post('/auth/connexion', function (req, res) {

  console.log('POST /auth/connexion')
  console.log('headers: ' + JSON.stringify(req.headers, null, 2))
  console.log('body: ' + JSON.stringify(req.body, null, 2))

  let login = req.body.login;
  let password = req.body.password;

  if (login === "test@ekito.fr" && password === "ekito") {
    res.send(JSON.stringify({id: id1, refresh: "refreshToken"}))    
  } else if (login === "test3@ekito.fr" && password === "ekito") {
    res.send(JSON.stringify({id: id2, refresh: "refreshToken"}))    
  } else if (login === "test2@ekito.fr" && password === "ekito") {
    res.sendStatus(400);
  } else {
    res.sendStatus(401);
  }
})

app.post('/auth/demande-raz-mdp', function (req, res) {
  let login = req.body.login;
  res.sendStatus(200);
})

app.post('/auth/creer-compte', function (req, res) {
  let login = req.body.login;
  
  if (login === "test@ekito.fr") {
    res.sendStatus(400);
  } else {
    res.sendStatus(200);
  }
})

app.get('/moi/sejours', function (req, res) {
  console.log('GET /moi/sejours')
  console.log('headers: ' + JSON.stringify(req.headers, null, 2))
  console.log('body: ' + JSON.stringify(req.body, null, 2))

  let sejours = 
   [
    {
      "id": "sejour_1",
      "id_hote": "hote_1",
      "nom": "La Dragonnière",
      "image": "https://www.sunelia.com/campsite/domaine-de-la-dragonniere/1200/490/picture_drago1.jpg",
      "date_debut": "2017-07-01",
      "date_fin": "2017-07-15",
      "itineraire": {
        "description": "Localisation Domaine de la Dragonnière - Vias-sur-mer",
        "lat": 43.31168928024891,
        "lng": 3.36456298828125
      }, 
      "ville": "Vias sur Mer",
      "pays": "France"
    },
    {
      "id": "sejour_2",
      "id_hote": "hote_2",
      "nom": "Le Fief",
      "image": "https://www.sunelia.com/campsite/le-fief/1200/490/picture_le-fief-76.jpg",
      "date_debut": "2017-08-01",
      "date_fin": "2017-08-15",
      "itineraire": {
        "description": "Localisation Le Fief - Saint-Brevin-Les-Pins",
        "lat": 47.23534195874878,
        "lng": -2.1670854091644287
      }, 
      "ville": "Saint-Brevin-Les-Pins",
      "pays": "France"
    },
    {
      "id": "sejour_3",
      "id_hote": "hote_3",
      "nom": "L’Escale St Gilles",
      "image": "https://www.sunelia.com/campsite/lescale-st-gilles/1200/490/picture_vue-parc-aquatique-benodet-ok.jpg",
      "date_debut": "2017-09-01",
      "date_fin": "2017-09-15",
      "itineraire": {
        "description": "Localisation L’Escale St Gilles - Bénodet",
        "lat": 47.86273,
        "lng": -4.095669
      }, 
      "ville": "Bénodet",
      "pays": "France"
    }  
  ];

  if (req.headers['authorization'] === 'Bearer ' + id1) {
      res.send(sejours);
  } else if (req.headers['authorization'] === 'Bearer ' + id2) {
    res.send([]);
  } else {
    res.sendStatus(401)
  }
})

app.post('/moi/sejours/import', function (req, res) {
  let nom = req.body.nom;
  let dossier = req.body.dossier;
  
  if (nom === "test" && dossier === "123") {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
})


app.post('/moi/hotes-promos/import', function (req, res) {
  let code = req.body.code;
  
  let promo = {
    "id": "promo_1",
    "id_hote": "hote_3",
    "nom": "Le Malazéou",
    "image": "https://www.sunelia.com/campsite/le-malazeou/1200/490/picture_malazeou-999.jpg",
    "ville": "Ax-les-thermes",
    "pays": "France",
    "nouveau": true
  };

  if (code === "test") {
    res.send(promo);
  } else {
    res.sendStatus(404);
  }
})


app.get('/moi/hotes-promos', function (req, res) {
  let promos = 
   [
    {
      "id": "promo_1",
      "id_hote": "hote_3",
      "nom": "Le Malazéou",
      "image": "https://www.sunelia.com/campsite/le-malazeou/240/190/picture_malazeou-999.jpg",
      "ville": "Ax-les-thermes",
      "pays": "France",
      "nouveau": true
    }
  ];
  if (req.headers['authorization'] === 'Bearer ' + id1) {
    res.send(promos);
  } else if (req.headers['authorization'] === 'Bearer ' + id2) {
    res.send([]);
  } else {
    res.sendStatus(401)
  }
})

app.delete('/moi/hotes-promos/:id', function (req, res) {
  res.sendStatus(204);
})  

app.get('/moi', function (req, res) {
  console.log('GET /moi')
  console.log('headers: ' + JSON.stringify(req.headers, null, 2))
  console.log('body: ' + JSON.stringify(req.body, null, 2))
  
  if (req.headers['authorization'] === 'Bearer ' + id1) {

    let moi = {
    "email": "test@ekito.fr",
    "sexe": "M",
    "date_naissance": "1971-08-19"
    }

    res.send(moi);
  } else if (req.headers['authorization'] === 'Bearer ' + id1) {
    
    let moi = {
    "email": "test3@ekito.fr",
    "sexe": "F",
    "date_naissance": "1975-08-02"
    }

    res.send(moi);
  } else {
    res.sendStatus(401);
  }
})

app.listen(3000, function () {
  console.log('Cool\'nCamp v2 (Mock) server listening on port 3000 !')
})

