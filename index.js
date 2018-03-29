'use strict';

const express = require('express');
const app = express();
const moment = require('moment');

const cnc = require('./data_cnc');
const yelloh = require('./data_yelloh');
const sunelia = require('./data_sunelia');
const campeole = require('./data_campeole');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000
app.use('/static', express.static('public'));

app.listen(PORT, function () {
  console.log('Cool\'nCamp v2 (Mock) server listening on port ' + PORT + ' !')
})

function getDataset(req) {
  let appIssuer = req.headers['x-issuer'];

  switch (appIssuer) {
    case "Campeole":
      return campeole;
    case "Sunelia":
      return sunelia;
    case "Yelloh":
      return yelloh;
    default:
      return cnc;
  }
}

let id1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0QGVraXRvLmZyIn0.9qhlq0d5LOcsCxuz_ldmXX3ipvMY1bEN2rHEYtSZeaU"
let id2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0M0Bla2l0by5mciJ9.hoN_gskTqKOq8MbiDThzLIiemlTc1rn9TmQO2QpePiQ"

app.get('/auth/out', function (req, res) {

  console.log('POST /auth/out')
  console.log('headers: ' + JSON.stringify(req.headers, null, 2))
  console.log('body: ' + JSON.stringify(req.body, null, 2))

  if (!req.headers['authorization']) {
    res.sendStatus(400);
  } else {
    res.sendStatus(200);
  }
})

app.post('/auth/connexion', function (req, res) {

  console.log('POST /auth/connexion')
  console.log('headers: ' + JSON.stringify(req.headers, null, 2))
  console.log('body: ' + JSON.stringify(req.body, null, 2))

  let login = req.body.login;
  let password = req.body.password;

  if (!req.body.issuer) {
    res.sendStatus(400);
  } else if (login === "test@ekito.fr" && password === "ekito1") {
    res.send(JSON.stringify({
      id: id1,
      refresh: id1
    }))
  } else if (login === "test3@ekito.fr" && password === "ekito1") {
    res.send(JSON.stringify({
      id: id2,
      refresh: id2
    }))
  } else if (login === "test2@ekito.fr" && password === "ekito1") {
    res.sendStatus(400);
  } else {
    res.sendStatus(401);
  }
})

app.post('/auth/refresh', function (req, res) {

  console.log('POST /auth/connexion')
  console.log('headers: ' + JSON.stringify(req.headers, null, 2))
  console.log('body: ' + JSON.stringify(req.body, null, 2))

  if (req.body.refresh === id1) {
    res.send(JSON.stringify({
      id: id1,
      refresh: id1
    }))
  } else if (req.body.refresh === id2) {
    res.send(JSON.stringify({
      id: id2,
      refresh: id2
    }))
  } else {
    res.sendStatus(401);
  }
})

app.post('/auth/demande-raz-mdp', function (req, res) {
  let login = req.body.login;
  if (!req.body.issuer) {
    res.sendStatus(400);
  } else {
    res.sendStatus(200);
  }
})

app.post('/customer/new', function (req, res) {
  let login = req.body.login;

  if (!req.body.issuer || login === "test@ekito.fr") {
    res.sendStatus(400);
  } else {
    res.send(JSON.stringify({
      id: id1,
      refresh: id1
    }))
  }
})

app.get('/app/versions', function (req, res) {
  let payload = {
    "android": {
      "version_minimale": "1.0.0",
      "version_store": "2.0.0"
    },
    "ios": {
      "version_minimale": "1.0.0",
      "version_store": "2.0.0"
    }
  }
  res.send(payload)
})

app.get('/app/politique-confidentialite', function (req, res) {
  let payload = {
    "politique": "politique1",
    "url": "https://www.placealemploi.fr/divers/CGU.pdf"
  }

  res.send(payload)
})

app.get('/hotes/:id', function (req, res) {

  let dataSet = getDataset(req);

  if (req.params.id === "hote_0") {
    res.send(dataSet.hotes.hote_0);
  } else if (req.params.id === "hote_1") {
    res.send(dataSet.hotes.hote_1);
  } else if (req.params.id === "hote_2") {
    res.send(dataSet.hotes.hote_2);
  } else if (req.params.id === "hote_3") {
    res.send(dataSet.hotes.hote_3);
  } else if (req.params.id === "hote_4") {
    res.send(dataSet.hotes.hote_4);
  } else {
    res.sendStatus(404);
  }

})

app.get('/moi/messages', function (req, res) {
  let messages = [{
      id: "12345567889",
      emetteur: "Cool'n Camp",
      texte: "Cool'n Camp\n    Reprenez la main sur votre commercialisation avec Cool'n Camp ! \n Tél : +33 5 25 24 12 14\nFax : +33 5 25 24 12 13\n url: http://www.coolncamp.com",
      image: "https://coolncamp.com/RESSOURCES/IMAGES/header_illustration_03_03.png",
      date: "2017-10-23T21:30:00+02:00"
    },
    {
      id: "AAAAA12345567889",
      emetteur: "Julien (CnC)",
      texte: "Septembers wondering if you knew girlnextdooritis pop firefly-catchin' drunk. In pastel mattress Lorde Lena. Dunham Andrea Swift Shellback Tribeca for. The first time fans haunted shaky. Hands dvd house of cards last. Kiss Olivia Benson dvd Kanye West Famous Harry. Styles forcing laughter words like. Knives cats psycho string of lights. Girlnextdooritis pre-order candles psycho snotty little. \n\nTél : +33 5 25 24 12 14\n\nAnd grumbling on about how I can't sing club red.\n\nhttp://www.coolncamp.com \n\nFamily psycho best dress the. Start of an age Subway take me. Somewhere we can be alone drop everything now saint iHeart. Radio excluded from this narrative Natalie I'm on the bleachers Karlie. Kloss white veil occasion Chai Sugar. Cookies presumptuous as I do presumptuous the story. Of us fans Watch Hill dark days Big. Machine iHeart Radio polaroid vote for Taylor like. Septembers wondering if you knew girlnextdooritis pop firefly-catchin' drunk. And grumbling on about how I can't sing club red. In pastel mattress Lorde Lena. Dunham Andrea Swift Shellback Tribeca for. The first time fans haunted shaky. Hands dvd house of cards last. Kiss Olivia Benson dvd Kanye West Famous Harry. Styles forcing laughter words like. Knives cats psycho string of lights. Girlnextdooritis pre-order candles psycho snotty little. Family psycho best dress the. Start of an age Subway take me. Somewhere we can be alone drop everything now saint iHeart. Radio excluded from this narrative Natalie I'm on the bleachers Karlie. Kloss white veil occasion Chai Sugar. Cookies presumptuous as I do presumptuous the story. Of us fans Watch Hill dark days Big. Machine iHeart Radio polaroid vote for Taylor like. Septembers wondering if you knew girlnextdooritis pop firefly-catchin' drunk. And grumbling on about how I can't sing club red. In pastel mattress Lorde Lena. Dunham Andrea Swift Shellback Tribeca for. The first time fans haunted shaky. Hands dvd house of cards last. Kiss Olivia Benson dvd Kanye West Famous Harry. Styles forcing laughter words like. Knives cats psycho string of lights. Girlnextdooritis pre-order candles psycho snotty little. Family psycho best dress the. Start of an age Subway take me. Somewhere we can be alone drop everything now saint iHeart. Radio excluded from this narrative Natalie I'm on the bleachers Karlie. Kloss white veil occasion Chai Sugar. Cookies presumptuous as I do presumptuous the story. Of us fans Watch Hill dark days Big. Machine iHeart Radio polaroid vote for Taylor like. Septembers wondering if you knew girlnextdooritis pop firefly-catchin' drunk. And grumbling on about how I can't sing club red. In pastel mattress Lorde Lena. Dunham Andrea Swift Shellback Tribeca for. The first time fans haunted shaky. Hands dvd house of cards last. Kiss Olivia Benson dvd Kanye West Famous Harry. Styles forcing laughter words like. Knives cats psycho string of lights. Girlnextdooritis pre-order candles psycho snotty little. Family psycho best dress the. Start of an age Subway take me. Somewhere we can be alone drop everything now saint iHeart. Radio excluded from this narrative Natalie I'm on the bleachers Karlie. Kloss white veil occasion Chai Sugar. Cookies presumptuous as I do presumptuous the story. Of us fans Watch Hill dark days Big. Machine iHeart Radio polaroid vote for Taylor like.",
      date: "2017-10-22T21:30:00+02:00"
    }
  ];

  res.send(messages);
})

app.delete('/moi/messages/:id', function (req, res) {
  res.sendStatus(204);
})

app.get('/moi/sejours', function (req, res) {
  console.log('GET /moi/sejours')
  console.log('headers: ' + JSON.stringify(req.headers, null, 2))
  console.log('body: ' + JSON.stringify(req.body, null, 2))

  let now = new Date();
  let end = new Date();
  end.setDate(end.getDate() + 15);

  let dataSet = getDataset(req);

  let sejours = [{
      "id": "sejour_1",
      "id_hote": "hote_1",
      "date_debut": "2017-07-01",
      "date_fin": "2017-07-15",
      "nom": dataSet.hotes.hote_1.nom,
      "image": dataSet.hotes.hote_1.image,
      "itineraire": dataSet.hotes.hote_1.itineraire,
      "etoiles": dataSet.hotes.hote_1.etoiles || null,
      "ambiance": dataSet.hotes.hote_1.ambiance || null,
      "ambiance_logo": dataSet.hotes.hote_1.ambiance_logo || null,
      "qualite_logo":dataSet.hotes.hote_1.qualite_logo || null,
      "ville": dataSet.hotes.hote_1.ville,
      "pays": "France",
      "eta_debut_date_aff": "2017-06-30"
    },
    {
      "id": "sejour_2",
      "id_hote": "hote_2",
      "date_debut": "2017-08-01",
      "date_fin": "2017-08-15",
      "nom": dataSet.hotes.hote_2.nom,
      "image": dataSet.hotes.hote_2.image,
      "itineraire": dataSet.hotes.hote_2.itineraire,
      "etoiles": dataSet.hotes.hote_2.etoiles || null,
      "ambiance": dataSet.hotes.hote_2.ambiance || null,
      "ambiance_logo": dataSet.hotes.hote_2.ambiance_logo || null,
      "qualite_logo":dataSet.hotes.hote_2.qualite_logo || null,
      "ville": dataSet.hotes.hote_2.ville,
      "pays": "France",
      "eta_debut_date_aff": "2017-07-30"
    },
    {
      "id": "sejour_3",
      "id_hote": "hote_3",
      "date_debut": "2017-10-01",
      "date_fin": "2017-10-15",
      "nom": dataSet.hotes.hote_3.nom,
      "image": dataSet.hotes.hote_3.image,
      "itineraire": dataSet.hotes.hote_3.itineraire,
      "etoiles": dataSet.hotes.hote_3.etoiles || null,
      "ambiance": dataSet.hotes.hote_3.ambiance || null,
      "ambiance_logo": dataSet.hotes.hote_3.ambiance_logo || null,
      "qualite_logo":dataSet.hotes.hote_3.qualite_logo || null,
      "ville": dataSet.hotes.hote_3.ville,
      "pays": "France",
      "eta_debut_date_aff": "2017-07-30"
    },
    {
      "id": "sejour_4",
      "id_hote": "hote_0",
      "date_debut": now.toISOString().slice(0, 10),
      "date_fin": end.toISOString().slice(0, 10),
      "nom": dataSet.hotes.hote_0.nom,
      "image": dataSet.hotes.hote_0.image,
      "itineraire": dataSet.hotes.hote_0.itineraire,
      "etoiles": dataSet.hotes.hote_0.etoiles || null,
      "ambiance": dataSet.hotes.hote_0.ambiance || null,
      "ambiance_logo": dataSet.hotes.hote_0.ambiance_logo || null,
      "qualite_logo":dataSet.hotes.hote_0.qualite_logo || null,
      "ville": dataSet.hotes.hote_0.ville,
      "pays": "France",
      "eta_debut_date_aff": now.toISOString().slice(0, 10)
    }];

  if (req.headers['authorization'] === 'Bearer ' + id1) {
    res.send(sejours);
  } else if (req.headers['authorization'] === 'Bearer ' + id2) {
    res.send([]);
  } else {
    res.sendStatus(401)
  }
})

app.get('/moi/sejours/:id', function (req, res) {

  let dataSet = getDataset(req);

  let now = new Date();
  let end = new Date();
  end.setDate(end.getDate() + 15);

  let sejour_1 = {
    "id": "sejour_1",
    "id_hote": "hote_1",
    "date_debut": "2017-07-01",
    "date_fin": "2017-07-15",
    "nom": dataSet.hotes.hote_1.nom,
    "image": dataSet.hotes.hote_1.image,
    "itineraire": dataSet.hotes.hote_1.itineraire,
    "ville": dataSet.hotes.hote_1.ville,
    "pays": "France",
    "proprietaire": true,
    "restriction_service": [],
    "sejournants": [{
      email: "cnc@ekito.fr",
      avatar: "https://openclipart.org/image/2400px/svg_to_png/247319/abstract-user-flat-3.png"
    }],
    "categorie": "Mobil home 15 places",
    "eta_debut_date_aff": "2017-06-30"
  };

  let sejour_2 = {
    "id": "sejour_2",
    "id_hote": "hote_2",
    "date_debut": "2017-08-01",
    "date_fin": "2017-08-15",
    "nom": dataSet.hotes.hote_2.nom,
    "image": dataSet.hotes.hote_2.image,
    "itineraire": dataSet.hotes.hote_2.itineraire,
    "ville": dataSet.hotes.hote_2.ville,
    "pays": "France",
    "proprietaire": true,
    "restriction_service": ["tickets", "conforts"],
    "sejournants": [{
        email: "test@ekito.fr",
        avatar: "https://www.ekito.fr/dummy/avatars-circle-128x128/avatar3.png"
      },
      {
        email: "invite1@ekito.fr",
        avatar: "https://www.ekito.fr/dummy/avatars-circle-128x128/avatar1.png"
      },
      {
        email: "invite2@ekito.fr",
        avatar: "https://www.ekito.fr/dummy/avatars-circle-128x128/avatar2.png"
      },
      {
        email: "invite@error.com",
        avatar: "https://www.ekito.fr/dummy/avatars-circle-128x128/avatar4.png"
      },
      {
        email: "sendagain@error.com",
      },
      {
        email: "revoke@error.com",
      }
    ],
    "categorie": "Mobil home 6 places",
    "eta_debut_date_aff": "2017-07-30"
  }

  let sejour_3 = {
    "id": "sejour_3",
    "id_hote": "hote_3",
    "date_debut": "2017-10-01",
    "date_fin": "2017-10-15",
    "nom": dataSet.hotes.hote_3.nom,
    "image": dataSet.hotes.hote_3.image,
    "itineraire": dataSet.hotes.hote_3.itineraire,
    "ville": dataSet.hotes.hote_3.ville,
    "pays": "France",
    "proprietaire": true,
    "restriction_service": [],
    "sejournants": [],
    "categorie": "Mobil home 4 places",
    "type_sejour": {
      "id": "561e70142bd365546734bce1",
      "label": "En famille"
    },
    "eta": {
      "debut": "2017-10-22T10:00:00+02:00",
      "label": "10:00 - 10:30"
    },
    "eta_debut_date_aff": "2017-06-30"
  };

  let sejour_4 = {
    "id": "sejour_4",
    "id_hote": "hote_0",
    "date_debut": now.toISOString().slice(0, 10),
    "date_fin": end.toISOString().slice(0, 10),
    
    "nom": dataSet.hotes.hote_0.nom,
    "image": dataSet.hotes.hote_0.image,
    "itineraire": dataSet.hotes.hote_0.itineraire,
    "ville": dataSet.hotes.hote_0.ville,
    "pays": "France",
    "proprietaire": true,
    "restriction_service": [],
    "sejournants": [],
    "categorie": "Mobil home 4 places",
    "type_sejour": {
      "id": "561e70142bd365546734bce1",
      "label": "En famille"
    },
    "eta": {
      "debut": "2017-10-22T10:00:00+02:00",
      "label": "10:00 - 10:30"
    },
    "eta_debut_date_aff": now.toISOString().slice(0, 10)
  }

  if (req.params.id === "sejour_1") {
    res.send(sejour_1);
  } else if (req.params.id === "sejour_2") {
    res.send(sejour_2);
  } else if (req.params.id === "sejour_3") {
    res.send(sejour_3);
  } else if (req.params.id === "sejour_4") {
    res.send(sejour_4);
  } else {
    res.sendStatus(404);
  }
})

app.get('/moi/sejours/:id/eta', function (req, res) {
  if (req.params.id === "sejour_1" || req.params.id === "sejour_2" || req.params.id === "sejour_3" || req.params.id === "sejour_4") {

    let payload = [{
      "debut": "2017-10-22T09:30:00+02:00",
      "label": "9:00 - 9:30"
    }, {
      "debut": "2017-10-22T10:00:00+02:00",
      "label": "10:00 - 10:30"
    }, {
      "debut": "2017-10-22T10:03:00+02:00",
      "label": "10:30 - 11:30"
    }]

    res.set("Cache-Control", "max-age=900, max-stale=640800, only-if-cached");
    res.send(payload);
  } else {
    res.sendStatus(404);
  }
});

app.post('/moi/sejours/:id/eta', function (req, res) {
  res.sendStatus(200);
});

app.get('/moi/sejours/:id/conforts', function (req, res) {
  if (req.params.id === "sejour_1" || req.params.id === "sejour_2" || req.params.id === "sejour_3" || req.params.id === "sejour_4") {

    let payload = [{
        "id": "1",
        "titre": "Barbecue",
        "description": "Description longue, blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla ",
        "prix": "8€/day",
        "derniere_date_demande": "2017-10-22T09:30:00+02:00"
      },
      {
        "id": "2",
        "titre": "Serviettes",
        "description": "Description longue, blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla ",
        "prix": "Prix € / personne, réduction en couple avec 2 enfants minimum"
      },
      {
        "id": "3",
        "titre": "Titre loooooooooong de l'option",
        "description": "Description longue, blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla ",
        "prix": "Prix € / personne, réduction en couple avec 2 enfants minimum",
        "derniere_date_demande": "2017-10-22T09:30:00+02:00"
      },
      {
        "id": "4",
        "titre": "Tongs",
        "description": "Elles sont  neuves !",
        "prix": "8€/day"
      }
    ]

    let payload2 = [{
        "id": "1",
        "titre": "Barbecue",
        "description": "L'utilisation des barbecues à charbon est interdite sur le camping, nous vous fournissons les recharges de gaz ",
        "prix": "8€/jour",
        "derniere_date_demande": "2017-10-22T09:30:00+02:00"
      },
      {
        "id": "2",
        "titre": "Kit Bébé",
        "description": "Comprend la chaise haute, la baignoire et le lit parapluie ",
        "prix": "14€/Sem"
      },
      {
        "id": "3",
        "titre": "Ménage de fin de séjour",
        "description": "N'inclut pas le coin cuisine et la vaisselle",
        "prix": "90€",
        "derniere_date_demande": "2017-10-22T09:30:00+02:00"
      },
      {
        "id": "4",
        "titre": "Location de Vélo",
        "description": "Siège bébé inclus et anti-vol",
        "prix": "8€/jour"
      }
    ]

    res.send(payload2);
  } else {
    res.sendStatus(404);
  }
});

app.post('/moi/sejours/:id/conforts', function (req, res) {
  res.sendStatus(200);
});

app.get('/hotes/:id/reservation', function (req, res) {

  let moteur = {
    titre: "2018 au prix 2017 !",
    url: "https://coolncamp.com",
    tel: "+33123456789",
    description: "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p> </p>\n<ul style=\"list-style-type: circle;\">\n<li>Offre exclusive valable du 1er Juillet au 31 Octobre 2017<br />Location d’habitats =&gt; Réservez votre séjour par téléphone en contactant notre Centrale de Réservation au +33123456789</li>\n</ul>\n</div>\n</body>\n</html>",
  }
  if (req.params.id === "hote_1" || req.params.id === "hote_4") {
    delete moteur.tel
    delete moteur.url
    res.send(moteur);
  } else if (req.params.id === "hote_2") {
    delete moteur.tel
    res.send(moteur);
  } else if (req.params.id === "hote_3") {
    res.send(moteur);
  } else {
    res.sendStatus(404);
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

app.get('/moi/sejours/:id/etat-des-lieux', function (req, res) {

  let now = new Date();
  let end = new Date();
  end.setDate(end.getDate() + 15);

  let etat_1_non_fait = {
    "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: rgba(0,0,0,.05) !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p> </p>\n<ul style=\"list-style-type: circle;\">\n<li>Offre exclusive valable du 1er Juillet au 31 Octobre 2017<br />Location d’habitats =&gt; Réservez votre séjour par téléphone en contactant notre Centrale de Réservation au +33970825001</li>\n</ul>\n</div>\n</body>\n</html>",
  };

  let etat_2_fait = {
    "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: rgba(0,0,0,.05) !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p> </p>\n<ul style=\"list-style-type: circle;\">\n<li>Offre exclusive valable du 1er Juillet au 31 Octobre 2017<br />Location d’habitats =&gt; Réservez votre séjour par téléphone en contactant notre Centrale de Réservation au +33970825001</li>\n</ul>\n</div>\n</body>\n</html>",
    "incident": {
      "etat": true,
      "message": "Le lit s'est cassé."
    },
    "proprete": {
      "etat": false,
      "message": "Write Me A Song situation I would. Very much like to be #very good questions pre-order pre-order. Cat stickers awkward sparkly dress pie. Darling I'm a nightmare dressed. Like a daydream banana quinoa muffin Andrea Swift operation. Sparrow country pre-order mean Met. Gala Tree Paine pegacorn crop tops #bestower of. Guitar picks 1989 crop tops 13 Management. Red banana quinoa muffin pegacorn #🦆 mean. Festive Romeo Meredith Grey Ed. Sheeran stage five clinger Kanye West Famous #WHEN. PEOPLE I LOVE FALL IN. LOVE #right on target Jaime King so basically situation mean Katy. Perry chill Ed Sheeran #WHEN. PEOPLE I LOVE FALL IN LOVE Subway. Meredith Grey darling I'm a nightmare dressed like a daydream. 22 pop Loft 89 John Mayer #so little time flew. Me to places I'd never."
    },
    "date": "2017-10-22T21:30:00+02:00"
  }

  let etat_3_non_fait_date_depassee = {
    "message": "date limite dépassée"
  };

  if (req.params.id === "sejour_1" || req.params.id === "sejour_4") {
    res.send(etat_1_non_fait);
  } else if (req.params.id === "sejour_2") {
    res.send(etat_3_non_fait_date_depassee);
  } else if (req.params.id === "sejour_3") {
    res.send(etat_2_fait);
  } else {
    res.sendStatus(404);
  }
});

app.post('/moi/sejours/:id/etat-des-lieux', function (req, res) {
  console.log('POST /moi/sejours/:id/etat-des-lieux')
  console.log('headers: ' + JSON.stringify(req.headers, null, 2))
  console.log('body: ' + JSON.stringify(req.body, null, 2))
  let response = {
    "reponse": "Votre demande a bien été reçue, elle sera traitée dans les plus brefs délais"
  }
  if (req.body.incident.message === "400") {
    res.sendStatus(400)
  } else
  if (req.body.incident.message === "401") {
    res.sendStatus(401)
  } else
  if (req.body.incident.message === "403") {
    res.sendStatus(403)
  } else
  if (req.body.incident.message === "404") {
    res.sendStatus(404)
  } else
    res.send(response);
});

app.get('/moi/sejours/:id/type-sejour', function (req, res) {

  let types = [{
      "id": "561e70142bd365546734bce1",
      "label": "En famille"
    },
    {
      "id": "58d3e16352b2c093557c7396",
      "label": "Entre amis"
    },
    {
      "id": "5524d5e22296c66e13e34fa4",
      "label": "Solo"
    },
    {
      "id": "5609991711533b03005eed06",
      "label": "Travail"
    }
  ];
  res.set("Cache-Control", "max-age=900, max-stale=640800, only-if-cached");
  res.send(types);
})

app.get('/moi/sejours/:id/tickets', function (req, res) {

  let tickets = {
    "description": "Notre offre super confort est garantie sans problème… durable",
    "tickets": [{
        "date": "2017-10-26T21:30:00+02:00",
        "emetteur": "Jean Dupont",
        "message": "Bonjour\n\nL'ampoule du plafonnier du salon ne s'allume plus."
      },
      {
        "date": "2017-10-25T21:30:00+02:00",
        "emetteur": "j.dupont@gmail.com",
        "message": "Bonjour\n\nLa clim est en panne."
      },
      {
        "date": "2017-10-23T21:30:00+02:00",
        "emetteur": "m.dupont@gmail.com",
        "message": "Pas de croissants livrés le matin ?"
      }
    ]
  };

  let tickets_empty = {
    "description": "Notre offre super confort est garantie sans problème… durable",
    "tickets": []
  }

  if (req.params.id === "sejour_4") {
    res.send(tickets_empty);
  } else {
    res.send(tickets);
  }
})

app.post('/moi/sejours/:id/tickets', function (req, res) {
  let response = {
    "reponse": "Votre demande a bien été reçue, elle sera traitée dans les plus brefs délais"
  }
  res.send(response);
})

app.post('/moi/sejours/:id/type-sejour', function (req, res) {
  console.log('POST /moi/sejours/:id/type-sejour')
  console.log('headers: ' + JSON.stringify(req.headers, null, 2))
  console.log('body: ' + JSON.stringify(req.body, null, 2))
  res.sendStatus(200);
})

app.post('/moi/sejours/:id/sejournants/inviter', function (req, res) {
  console.log('POST /moi/sejours/:id/sejournants/inviter')
  console.log('headers: ' + JSON.stringify(req.headers, null, 2))
  console.log('body: ' + JSON.stringify(req.body, null, 2))
  let email = req.body.email;
  if (email === "invite@error.com") {
    res.sendStatus(400)
  } else if (req.params.id === "sejour_1") {
    res.sendStatus(404)
  } else {
    res.sendStatus(200);
  }
})
app.post('/moi/sejours/:id/sejournants/relancer', function (req, res) {
  console.log('POST /moi/sejours/:id/sejournants/relancer')
  console.log('headers: ' + JSON.stringify(req.headers, null, 2))
  console.log('body: ' + JSON.stringify(req.body, null, 2))
  let email = req.body.email;
  if (email === "sendagain@error.com") {
    res.sendStatus(400)
  } else if (req.params.id === "sejour_1") {
    res.sendStatus(404)
  } else {
    res.sendStatus(200);
  }
})
app.post('/moi/sejours/:id/sejournants/revoquer', function (req, res) {
  console.log('POST /moi/sejours/:id/sejournants/revoquer')
  console.log('headers: ' + JSON.stringify(req.headers, null, 2))
  console.log('body: ' + JSON.stringify(req.body, null, 2))
  let email = req.body.email;
  if (email === "revoke@error.com") {
    res.sendStatus(400)
  } else if (req.params.id === "sejour_1") {
    res.sendStatus(404)
  } else {
    res.sendStatus(200);
  }
})

app.post('/moi/hotes-promos/import', function (req, res) {
  let code = req.body.code;

  if (code === "test") {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
})

app.get('/moi/hotes-promos', function (req, res) {

  let dataSet = getDataset(req);

  let promos = [{
    "id": "promo_1",
    "id_hote": "hote_4",
    "nom": dataSet.hotes.hote_4.nom,
    "image": dataSet.hotes.hote_4.image,
    "itineraire": dataSet.hotes.hote_4.itineraire,
    "etoiles": dataSet.hotes.hote_4.etoiles || null,
    "ambiance": dataSet.hotes.hote_4.ambiance || null,
    "ambiance_logo": dataSet.hotes.hote_4.ambiance_logo || null,
    "qualite_logo":dataSet.hotes.hote_4.qualite_logo || null,
    "ville": dataSet.hotes.hote_4.ville,
    "pays": "France",
    "date_ouverture1": "2018-03-30",
    "date_fermeture1": "2018-09-01",
    "date_ouverture2": "2018-10-15",
    "date_fermeture2": "2018-12-31",
    "nouveau": true
  }];
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
      "nom": "Nomtest",
      "prenom": "Prenom-test",
      "sexe": "F",
      "date_naissance": "1996-08-19",
      "langue": "fr_FR",
      "avatar": "https://www.ekito.fr/dummy/avatars-circle-128x128/avatar4.png"
    }

    res.send(moi);
  } else if (req.headers['authorization'] === 'Bearer ' + id2) {

    let moi = {
      "email": "test3@ekito.fr",
      "sexe": "M",
      "date_naissance": "1975-08-02"
    }

    res.send(moi);
  } else {
    res.sendStatus(401);
  }
})

app.put('/moi', function (req, res) {
  console.log('GET /moi')
  console.log('headers: ' + JSON.stringify(req.headers, null, 2))
  console.log('body: ' + JSON.stringify(req.body, null, 2))

  if (req.headers['authorization'] === 'Bearer ' + id1) {

    let moi = {
      "email": "test@ekito.fr",
      "nom": "Nomtest",
      "prenom": "Prenom-test",
      "sexe": "F",
      "date_naissance": "1996-08-19",
      "avatar": "https://www.ekito.fr/dummy/avatars-circle-128x128/avatar4.png"
    }

    res.send(moi);
  } else if (req.headers['authorization'] === 'Bearer ' + id2) {

    let moi = {
      "email": "test3@ekito.fr",
      "sexe": "M",
      "date_naissance": "1975-08-02"
    }

    res.send(moi);
  } else {
    res.sendStatus(401);
  }
})

app.get('/hotes/:id/services', function (req, res) {

  let services = [{
      "id": "59b7af89ed44090f26a2c27e",
      "image": "https://coolncamp.s3.amazonaws.com/horaires/1443789725378ERj6BJFZX4ojhIE7.jpg",
      "titre": "Reception anglais",
      "soustitre": "8 am to 8 pm",
    },
    {
      "image": "https://coolncamp.s3.amazonaws.com/horaires/14780773235334sHUrzGhUvDMsWS8.jpg",
      "id": "5609818b0db27a0300b23d59",
      "titre": "Bar / Snack",
      "soustitre": "10 AM - 02 PM",
    },
    {
      "image": "https://coolncamp.s3.amazonaws.com/horaires/1442247724009j1gUwipHqrLbuwxZ.jpg",
      "id": "56098a147263d9030062b602",
      "titre": "Swimming Pool",
      "soustitre": "From 10 AM to 07h30 PM",
    },
    {
      "image": "https://coolncamp.s3.amazonaws.com/horaires/1475483927799gZ6VSv61bjbbeeG0.jpg",
      "id": "561d6d52005f556a5fb6b02a",
      "titre": "Mini-Club",
      "soustitre": "Your child from 5 to 12 years old are welcome",
    },
    {
      "image": "https://coolncamp.s3.amazonaws.com/horaires/1442247786942NsPMmb8tKmqWipr1.jpg",
      "id": "560981730db27a0300b23d58",
      "titre": "Bakery",
      "soustitre": "From 8am to 12am",
    },
    {
      "image": "https://coolncamp.s3.amazonaws.com/horaires/1444659643023OsTuAjCVCypQYbZV.jpg",
      "id": "561bc1c5ec553ff47ca62e83",
      "titre": "La Plage",
      "soustitre": "C'est quand vous voulez !",
    },
    {
      "image": "https://coolncamp.s3.amazonaws.com/horaires/1444817426029TuskFBBjAQVf5TVn.jpg",
      "id": "56098db111533b03005eecdc",
      "titre": "Sauna Hammam et Jacuzzi",
      "soustitre": "7/7 From 10 am to 06 pm",
    },
    {
      "image": "https://coolncamp.s3.amazonaws.com/horaires/1447321389513X3vU2NcCdZe2HxPO.jpg",
      "id": "56420918c59c19145428d84b",
      "titre": "Piscine Nocturne",
      "soustitre": "Tous les Mercredi jusqu'à 22h00",
    },
    {
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1443548109683e3GT1Gfmlq187ojB.jpg",
      "id": "594ce38b0f72330451286395",
      "titre": "Une petit faim ?",
      "soustitre": "Nous vous attendons",
    }
  ];

  res.set("Cache-Control", "max-age=900, max-stale=640800, only-if-cached");
  res.send(services);
})

app.get('/hotes/:id/services/:idService', function (req, res) {

  let service_1 = {
    "id": "59b7af89ed44090f26a2c27e",
    "titre": "Reception anglais",
    "soustitre": "8 am to 8 pm",
    "description": "Yummy yummy !",
    "lat": 43.601503,
    "lng": 1.444255,    
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "documents": [{
        "label": "Politique conf",
        "url": "https://www.placealemploi.fr/divers/CGU.pdf"
      },
      {
        "label": "Autre chose",
        "url": "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
      }
    ],
    "images": [
      "https://coolncamp.s3.amazonaws.com/horaires/1443789725378ERj6BJFZX4ojhIE7.jpg",
      "https://coolncamp.s3.amazonaws.com/horaires/14780773235334sHUrzGhUvDMsWS8.jpg"
    ]
  };

  let service_2 = {
    "id": "5609818b0db27a0300b23d59",
    "titre": "Bar / Snack",
    "soustitre": "10 AM - 02 PM",
    "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p style=\"text-align: center;\">Ceci est une description pour expliquer comment venir...</p>\n</div>\n</body>\n</html>",
    "lat": 43.601503,
    "lng": 1.444255,    
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "images": [
      "https://coolncamp.s3.amazonaws.com/horaires/14780773235334sHUrzGhUvDMsWS8.jpg"
    ]
  };

  let service_3 = {
    "id": "56098a147263d9030062b602",
    "titre": "Swimming Pool",
    "soustitre": "From 10 AM to 07h30 PM",
    "lat": 0,
    "lng": 0,
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "images": [
      "https://coolncamp.s3.amazonaws.com/horaires/1442247724009j1gUwipHqrLbuwxZ.jpg"
    ]
  };

  res.set("Cache-Control", "max-age=900, max-stale=640800, only-if-cached");
  if (req.params.idService === "59b7af89ed44090f26a2c27e") {
    res.send(service_1);
  } else if (req.params.idService === "5609818b0db27a0300b23d59") {
    res.send(service_2);
  } else if (req.params.idService === "56098a147263d9030062b602") {
    res.send(service_3);
  } else {
    res.sendStatus(404);
  }

})

app.get('/hotes/:id/infos', function (req, res) {

  let infos = [{
      "id": "59b7af89ed44090f26a2c27e",
      "image": "https://coolncamp.s3.amazonaws.com/infos/1500284099863zA8t7pJPNIwlBJlt.jpg",
      "titre": "Campsite Map"
    },
    {
      "id": "5609818b0db27a0300b23d59",
      "image": "https://coolncamp.s3.amazonaws.com/infos/1483959679583oAXgfKTdfE7zWakL.jpg",
      "titre": "défibrillateur cardiaque"
    },
    {
      "id": "56098a147263d9030062b602",
      "image": "https://coolncamp.s3.amazonaws.com/infos/1483958591671DD1gtGWocVjvUqQw.jpg",
      "titre": "Point des rassemblement"
    },
    {
      "id": "561d6d52005f556a5fb6b02a",
      "image": "https://coolncamp.s3.amazonaws.com/infos/1483968520899TORzlKQXoFk67KJu.jpg",
      "titre": "Numéros d'urgence"
    },
    {
      "id": "560981730db27a0300b23d58",
      "image": "https://coolncamp.s3.amazonaws.com/infos/1483959400952iyogYqCcduIeeTkC.jpg",
      "titre": "Médecins"
    }
  ];

  res.set("Cache-Control", "max-age=900, max-stale=640800, only-if-cached");
  res.send(infos);
})

app.get('/hotes/:id/infos/:idInfo', function (req, res) {

  let info_1 = {
    "id": "59b7af89ed44090f26a2c27e",
    "titre": "Campsite Map",
    "description": "Yummy yummy !",
    "lat": 43.601503,
    "lng": 1.444255,    
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "documents": [{
        "label": "Politique conf",
        "url": "https://www.placealemploi.fr/divers/CGU.pdf"
      },
      {
        "label": "Autre chose",
        "url": "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
      }
    ],
    "images": [
      "https://coolncamp.s3.amazonaws.com/infos/1500284099863zA8t7pJPNIwlBJlt.jpg",
      "https://coolncamp.s3.amazonaws.com/horaires/14780773235334sHUrzGhUvDMsWS8.jpg"
    ]
  };

  let info_2 = {
    "id": "5609818b0db27a0300b23d59",
    "titre": "défibrillateur cardiaque",
    "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p style=\"text-align: center;\">Ceci est une description pour expliquer comment venir...</p>\n</div>\n</body>\n</html>",
    "lat": 43.601503,
    "lng": 1.444255,    
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "images": [
      "https://coolncamp.s3.amazonaws.com/infos/1483959679583oAXgfKTdfE7zWakL.jpg"
    ]
  };

  let info_3 = {
    "id": "56098a147263d9030062b602",
    "titre": "Point des rassemblement",
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "images": [
      "https://coolncamp.s3.amazonaws.com/infos/1483958591671DD1gtGWocVjvUqQw.jpg"
    ]
  };

  res.set("Cache-Control", "max-age=900, max-stale=640800, only-if-cached");
  if (req.params.idInfo === "59b7af89ed44090f26a2c27e") {
    res.send(info_1);
  } else if (req.params.idInfo === "5609818b0db27a0300b23d59") {
    res.send(info_2);
  } else if (req.params.idInfo === "56098a147263d9030062b602") {
    res.send(info_3);
  } else {
    res.sendStatus(404);
  }

})

app.get('/hotes/:id/offres', function (req, res) {

  let offres = [{
      "id": "59b8efe70fc2de9806432513",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1505292481613iBjcUTxFTms2gdUa.jpg",
      "titre": "Soirée Crêpes",
      "soustitre": "Tous les mercredis, sur la terrasse du bar"
    },
    {
      "id": "56086a22d3bfcf03005f7ab0",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1444817806048Ur2C9RY3sJqMNL2K.jpg",
      "titre": "Cycling, skating",
      "soustitre": "Accessible aux rollers et PMR ."
    },
    {
      "id": "5819b3d54a81dd9f18ec67fd",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1478079326377FtMS9SckUAySTNhI.jpg",
      "titre": "Balade à cheval",
      "soustitre": "Inscription Club House"
    },
    {
      "id": "56d5634415bf11fb6df3c893",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1456825082073X9RxeGRvgsXrc2Ah.jpg",
      "titre": "Petit Déjeuner pour tous",
      "soustitre": "De 07h00 à 11h00 au Restaurant"
    },
    {
      "id": "56084e77d3bfcf03005f7aa3",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1442247341065JLo3HlOKoRkr7how.jpg",
      "titre": "Visits to our vineyard",
      "soustitre": "We invite you to visit our wine cellars"
    },
    {
      "id": "56085050d3bfcf03005f7aa6",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1479374713838dZ1MI4VfeggFkE7L.jpg",
      "titre": "Relaxation area",
      "soustitre": "Sauna, Hammam and Jacuzzi"
    },
    {
      "id": "560acbd6ff206b1306e3a347",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1443548109683e3GT1Gfmlq187ojB.jpg",
      "titre": "Une petit faim ?",
      "soustitre": "Nous vous attendons"
    }
  ];
  res.set("Cache-Control", "max-age=900, max-stale=640800, only-if-cached");
  res.send(offres);
})

app.get('/hotes/:id/offres/:idOffre', function (req, res) {

  let offre_1 = {
    "id": "59b8efe70fc2de9806432513",
    "titre": "Soirée Crêpes",
    "soustitre": "Tous les mercredis, sur la terrasse du bar",
    "description": "Yummy yummy !",
    "lat": 43.601503,
    "lng": 1.444255,  
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "documents": [{
        "label": "Politique conf",
        "url": "https://www.placealemploi.fr/divers/CGU.pdf"
      },
      {
        "label": "Autre chose",
        "url": "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
      }
    ],
    "images": [
      "https://coolncamp.s3.amazonaws.com/bonPlans/1505292481613iBjcUTxFTms2gdUa.jpg",
      "https://coolncamp.s3.amazonaws.com/horaires/14780773235334sHUrzGhUvDMsWS8.jpg"
    ]
  };

  let offre_2 = {
    "id": "56086a22d3bfcf03005f7ab0",
    "titre": "Cycling, skating",
    "soustitre": "Accessible aux rollers et PMR .",
    "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p style=\"text-align: center;\">Ceci est une description pour expliquer comment venir...</p>\n</div>\n</body>\n</html>",
    "lat": 43.601503,
    "lng": 1.444255,  
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "images": [
      "https://coolncamp.s3.amazonaws.com/bonPlans/1444817806048Ur2C9RY3sJqMNL2K.jpg"
    ]
  };

  let offre_3 = {
    "id": "5819b3d54a81dd9f18ec67fd",
    "titre": "Balade à cheval",
    "soustitre": "Inscription Club House",
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "images": [
      "https://coolncamp.s3.amazonaws.com/bonPlans/1478079326377FtMS9SckUAySTNhI.jpg"
    ]
  };

  res.set("Cache-Control", "max-age=900, max-stale=640800, only-if-cached");
  if (req.params.idOffre === "59b8efe70fc2de9806432513") {
    res.send(offre_1);
  } else if (req.params.idOffre === "56086a22d3bfcf03005f7ab0") {
    res.send(offre_2);
  } else if (req.params.idOffre === "5819b3d54a81dd9f18ec67fd") {
    res.send(offre_3);
  } else {
    res.sendStatus(404);
  }

})

app.get('/hotes/:id/tourisme', function (req, res) {

  let tourisme = [{
      "id": "5811f11bb372dd0c66b62dde",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/14775707718484kuBSpSfgLLGVwlh.jpg",
      "titre": "Nature & randonnée",
      "soustitre": "En pays Basque"
    },
    {
      "id": "596c7fa1c0633ece232d195f",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1500282800494bCQQuH6xNMmQRCbq.jpg",
      "titre": "Mont Saint Michel",
      "soustitre": "A 45 minutes du Camping"
    },
    {
      "id": "552567322296c66e13e34fcc",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1443805472379ow5vx6n7lAi1VzIA.jpg",
      "titre": "GR 10 Avec Guide Diplomé",
      "soustitre": "20% de Réduction"
    },
    {
      "id": "55255fe58055007960de6346",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1443807117622U1cDSxGnEQcxH73j.jpg",
      "titre": "Ecole de Surf",
      "soustitre": "Apprenez le Surf"
    },
    {
      "id": "5641cdd5cb7e263532c79031",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1447155374584nwCwpVho3MWKrj86.jpg",
      "titre": "Kitesurf",
      "soustitre": "Découvrez la glisse"
    },
    {
      "id": "5641c689cb7e263532c7902f",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1447151226466O1aaLebqN0XxpVXf.jpg",
      "titre": "Canal du Midi",
      "soustitre": "Promenade à pied, à vélo ou en bateau"
    },
    {
      "id": "560a6cf121b77b4031bdf718",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1443523819493OeyWMCtoztDcf849.jpg",
      "titre": "Visite de Fort Boyard",
      "soustitre": "Offre préférentielle à la Réception"
    },
    {
      "id": "59d3b4eca9c7af7564dceba4",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1504606838172fjSYfXucsmJBBzvx.jpg",
      "titre": "Sailboard",
      "soustitre": "Everyday on the Beach"
    },
    {
      "id": "59e5fe8c976a0ebd3bdcacde",
      "image": "https://coolncamp.s3.amazonaws.com/bonPlans/1508245105362iIF2qHUR6OvkVXUL.jpg",
      "titre": "Surf School",
      "soustitre": "best school in france"
    }
  ];
  res.set("Cache-Control", "max-age=900, max-stale=640800, only-if-cached");
  res.send(tourisme);
})

app.get('/hotes/:id/tourisme/:idTourisme', function (req, res) {

  let tourisme_1 = {
    "id": "5811f11bb372dd0c66b62dde",
    "titre": "Nature & randonnée",
    "soustitre": "En pays Basque",
    "description": "Yummy yummy !",
    "lat": 43.601503,
    "lng": 1.444255,  
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "documents": [{
        "label": "Politique conf",
        "url": "https://www.placealemploi.fr/divers/CGU.pdf"
      },
      {
        "label": "Autre chose",
        "url": "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
      }
    ],
    "images": [
      "https://coolncamp.s3.amazonaws.com/bonPlans/14775707718484kuBSpSfgLLGVwlh.jpg"
    ]
  };

  let tourisme_2 = {
    "id": "596c7fa1c0633ece232d195f",
    "titre": "Mont Saint Michel",
    "soustitre": "A 45 minutes du Camping",
    "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p style=\"text-align: center;\">Ceci est une description pour expliquer comment venir...</p>\n</div>\n</body>\n</html>",
    "lat": 43.601503,
    "lng": 1.444255,  
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "images": [
      "https://coolncamp.s3.amazonaws.com/bonPlans/1500282800494bCQQuH6xNMmQRCbq.jpg"
    ]
  };

  let tourisme_3 = {
    "id": "552567322296c66e13e34fcc",
    "titre": "GR 10 Avec Guide Diplomé",
    "soustitre": "20% de Réduction",
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "images": [
      "https://coolncamp.s3.amazonaws.com/bonPlans/1443805472379ow5vx6n7lAi1VzIA.jpg"
    ]
  };

  res.set("Cache-Control", "max-age=900, max-stale=640800, only-if-cached");
  if (req.params.idTourisme === "5811f11bb372dd0c66b62dde") {
    res.send(tourisme_1);
  } else if (req.params.idTourisme === "596c7fa1c0633ece232d195f") {
    res.send(tourisme_2);
  } else if (req.params.idTourisme === "552567322296c66e13e34fcc") {
    res.send(tourisme_3);
  } else {
    res.sendStatus(404);
  }

})

app.get('/hotes/:id/canaux-notif', function (req, res) {

  let canaux = [{
      "etat": false,
      "id": "561e70142bd365546734bce1",
      "label": "Canoë - KayaK"
    },
    {
      "etat": false,
      "id": "58d3e16352b2c093557c7396",
      "label": "Randonnée"
    },
    {
      "etat": true,
      "id": "5524d5e22296c66e13e34fa4",
      "label": "Surf"
    },
    {
      "etat": false,
      "id": "5609991711533b03005eed06",
      "label": "Adventure park"
    },
    {
      "etat": false,
      "id": "56420118c59c19145428d849",
      "label": "Marche a pied"
    },
    {
      "etat": false,
      "id": "561e702f2bd365546734bce2",
      "label": "Discover - Visit"
    },
    {
      "etat": false,
      "id": "556da73d8f957b1459592cb9",
      "label": "gastromy"
    },
    {
      "etat": false,
      "id": "5661591133c38c78048b5574",
      "label": "Windsurf"
    },
    {
      "etat": false,
      "id": "560950b90db27a0300b23c96",
      "label": "Wellness - Spa"
    },
    {
      "etat": false,
      "id": "5559e3d8d3380ae26c8dd742",
      "label": "Pétanque"
    },
    {
      "etat": false,
      "id": "56084f4fd3bfcf03005f7aa4",
      "label": "Oenologie"
    },
    {
      "etat": false,
      "id": "566fdfaae4924f961de8ad2c",
      "label": "Le Vélo"
    },
    {
      "etat": false,
      "id": "5609505e0db27a0300b23c94",
      "label": "Pony"
    },
    {
      "etat": true,
      "id": "5638b57f8e44eb7c033f61a2",
      "label": "Vin"
    },
    {
      "etat": false,
      "id": "5641c6a4cb7e263532c79030",
      "label": "Canal du midi"
    },
    {
      "etat": true,
      "id": "593e4ff3ea3f9089662e3601",
      "label": "Rugby"
    },
    {
      "etat": false,
      "id": "5641cdfccb7e263532c79032",
      "label": "Kitesurf"
    },
    {
      "etat": false,
      "id": "56cc2ec214aad13018d4f19e",
      "label": "Hébergement insolite"
    },
    {
      "etat": false,
      "id": "56fe2dde20ab3cd1609310d7",
      "label": "Jet ski"
    },
    {
      "etat": false,
      "id": "580f7e4cb372dd0c66b62db2",
      "label": "Voile"
    },
    {
      "etat": false,
      "id": "5751642c1409825734f4a2e4",
      "label": "Sport"
    },
    {
      "etat": false,
      "id": "56b9b7a7787307340fe6773d",
      "label": "Stand up Paddle"
    }
  ];
  res.send(canaux);
})

app.put('/hotes/:id/canaux-notif', function (req, res) {
  res.send(200);
})

app.get('/hotes/:id/activites', function (req, res) {

  let activites = [{
      "titre": "Mini Club / Kids Club",
      "date_debut_iso": moment().subtract(1, 'days').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date_fin_iso": moment().subtract(1, 'days').add(2, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date": moment().subtract(1, 'days').format("YYYY-MM-DD"),
      "heure_debut": moment().subtract(1, 'days').format("HH:mm"),
      "duree": "02:00",
      "meteo": "partlycloudy",
      "id": "activite_1",
      "couleur": "#46b29d",
      "rappel": true,
      "avis": {
        "total": 23,
        "note": 3.5
      }
    },
    {
      "titre": "Atelier Peinture ",
      "date_debut_iso": moment().subtract(1, 'days').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date_fin_iso": moment().subtract(1, 'days').add(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date": moment().subtract(1, 'days').format("YYYY-MM-DD"),
      "heure_debut": moment().subtract(1, 'days').format("HH:mm"),
      "duree": "01:00",
      "meteo": "partlycloudy",
      "id": "activite_2",
      "couleur": "#de4949",
      "rappel": false,
      "avis": {
        "total": 2,
        "note": 0
      }
    },
    {
      "titre": "Danses du village / Club dance",
      "date_debut_iso": moment().subtract(1, 'days').add(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date_fin_iso": moment().subtract(1, 'days').add(2, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date": moment().subtract(1, 'days').format("YYYY-MM-DD"),
      "heure_debut": moment().subtract(1, 'days').add(1, 'hours').format("HH:mm"),
      "duree": "01:00",
      "meteo": "sunny",
      "id": "activite_3",
      "couleur": "#f0ca4d",
      "rappel": false,
      "avis": {
        "total": 4,
        "note": 2
      }
    },
    {
      "titre": "Tir à l'Arc / Archery",
      "date_debut_iso": moment().subtract(1, 'days').add(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date_fin_iso": moment().subtract(1, 'days').add(2, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date": moment().subtract(1, 'days').format("YYYY-MM-DD"),
      "heure_debut": moment().subtract(1, 'days').add(1, 'hours').format("HH:mm"),
      "duree": "01:00",
      "meteo": "clear",
      "id": "activite_4",
      "couleur": "#324d5c",
      "rappel": true,
      "avis": {
        "total": 76,
        "note": 4
      }
    },
    {
      "titre": "Apéro Gourmand / English Apéro François",
      "date_debut_iso": moment().subtract(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date_fin_iso": moment().add(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date": moment().format("YYYY-MM-DD"),
      "heure_debut": moment().subtract(1, 'hours').format("HH:mm"),
      "duree": "2:00",
      "meteo": "rain",
      "id": "activite_5",
      "couleur": "#46b29d",
      "rappel": true,
      "avis": {
        "total": 0,
        "note": 0
      }
    },
    {
      "titre": "Soirée Burger Frites / Burger & chips",
      "date_debut_iso": moment().add(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date_fin_iso": moment().add(3, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date": moment().format("YYYY-MM-DD"),
      "heure_debut": moment().add(1, 'hours').format("HH:mm"),
      "duree": "02:00",
      "meteo": "clear",
      "id": "activite_6",
      "couleur": "#de4949",
      "rappel": false,
      "avis": {
        "total": 0,
        "note": 0
      }
    },
    {
      "titre": "Mini-disco / Mini Disco",
      "date_debut_iso": moment().add(1, 'days').add(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date_fin_iso": moment().add(1, 'days').add(3, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date": moment().add(1, 'days').format("YYYY-MM-DD"),
      "heure_debut": moment().add(1, 'days').add(1, 'hours').format("HH:mm"),
      "duree": "02:00",
      "id": "activite_7",
      "couleur": "#f0ca4d",
      "rappel": false,
      "avis": {
        "total": 0,
        "note": 0
      }
    },
    {
      "titre": "Step Aérobic",
      "date_debut_iso": moment().add(1, 'days').add(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date_fin_iso": moment().add(1, 'days').add(3, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date": moment().add(1, 'days').format("YYYY-MM-DD"),
      "heure_debut": moment().add(1, 'days').add(1, 'hours').format("HH:mm"),
      "duree": "02:00",
      "meteo": "clear",
      "id": "activite_8",
      "couleur": "#324d5c",
      "rappel": false,
      "avis": {
        "total": 0,
        "note": 0
      }
    },
    {
      "titre": "Inauguration Terrain de PADEL",
      "date_debut_iso": moment().add(1, 'days').add(3, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date_fin_iso": moment().add(1, 'days').add(4, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date": moment().add(1, 'days').format("YYYY-MM-DD"),
      "heure_debut": moment().add(1, 'days').add(3, 'hours').format("HH:mm"),
      "duree": "01:00",
      "meteo": "clear",
      "id": "activite_9",
      "couleur": "#324d5c",
      "rappel": false,
      "avis": {
        "total": 0,
        "note": 0
      }
    },
    {
      "titre": "Marché au Village",
      "date_debut_iso": moment().add(1, 'days').add(3, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date_fin_iso": moment().add(1, 'days').add(4, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date": moment().add(1, 'days').format("YYYY-MM-DD"),
      "heure_debut": moment().add(1, 'days').add(3, 'hours').format("HH:mm"),
      "duree": "01:00",
      "meteo": "clear",
      "id": "activite_10",
      "couleur": "#324d5c",
      "rappel": false,
      "avis": {
        "total": 0,
        "note": 0
      }
    },
    {
      "titre": "Pot d'accueil & soirée dansante / Welcome drink & dance",
      "date_debut_iso": moment().add(1, 'days').add(5, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date_fin_iso": moment().add(1, 'days').add(7, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
      "date": moment().add(1, 'days').format("YYYY-MM-DD"),
      "heure_debut": moment().add(1, 'days').add(5, 'hours').format("HH:mm"),
      "duree": "02:00",
      "meteo": "clear",
      "id": "activite_11",
      "couleur": "#324d5c",
      "rappel": false,
      "avis": {
        "total": 0,
        "note": 0
      }
    }
  ];
  res.send(activites);
});

app.get('/hotes/:hoteId/activites/:activiteId', function (req, res) {

  let activite_2 = {
    "titre": "Atelier Peinture ",
    "date_debut_iso": moment().subtract(1, 'days').format("YYYY-MM-DDTHH:mm:ssZ"),
    "date_fin_iso": moment().subtract(1, 'days').add(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
    "date": moment().subtract(1, 'days').format("YYYY-MM-DD"),
    "heure_debut": moment().subtract(1, 'days').format("HH:mm"),
    "heure_fin": moment().subtract(1, 'days').add(1, 'hours').format("HH:mm"),
    "duree": "01:00",
    "meteo": "partlycloudy",
    "id": "activite_2",
    "couleur": "#de4949",
    "rappel": false,
    "avis": {
      "total": 2,
      "note": 0
    },
    "image": "https://www.mairie-houplin-ancoisne.fr/wp-content/uploads/2014/10/atelier_peinture_houplin.jpg",
    "categorie": "Sport",
    "lieu": "Place du marché",
    "description": "Nous allons faire le tour du marché pour voir les supers sacs qu'ils vendent",
    "avis_autorise": false,
    "document": "http://www.pdf995.com/samples/pdf.pdf",
    "video": "https://www.youtube.com/watch?v=l7dnTU-GgEk",
    "url": "http://mariethomas.fr/cours_et_stages.html"
  }

  let activite_3 = {
    "titre": "Danses du village / Club dance",
    "date_debut_iso": moment().subtract(1, 'days').add(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
    "date_fin_iso": moment().subtract(1, 'days').add(2, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
    "date": moment().subtract(1, 'days').format("YYYY-MM-DD"),
    "heure_debut": moment().subtract(1, 'days').add(1, 'hours').format("HH:mm"),
    "heure_fin": moment().subtract(1, 'days').add(2, 'hours').format("HH:mm"),
    "duree": "01:00",
    "meteo": "sunny",
    "id": "activite_3",
    "couleur": "#f0ca4d",
    "rappel": false,
    "avis": {
      "total": 4,
      "note": 2
    },
    "image": "https://static.secureholiday.net/static/CMS/photos/000/001/000001626.jpg",
    "categorie": "Sport",
    "lieu": "Place du marché",
    "description": "Nous allons faire le tour du marché pour voir les supers sacs qu'ils vendent",
    "avis_autorise": true
  }

  let activite_4 = {
    "titre": "Tir à l'Arc / Archery",
    "date_debut_iso": moment().subtract(1, 'days').add(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
    "date_fin_iso": moment().subtract(1, 'days').add(2, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
    "date": moment().subtract(1, 'days').format("YYYY-MM-DD"),
    "heure_debut": moment().subtract(1, 'days').add(1, 'hours').format("HH:mm"),
    "heure_fin": moment().subtract(1, 'days').add(2, 'hours').format("HH:mm"),
    "duree": "01:00",
    "meteo": "clear",
    "id": "activite_4",
    "couleur": "#324d5c",
    "rappel": true,
    "avis": {
      "total": 76,
      "note": 4
    },
    "categorie": "Sport",
    "lieu": "Place du marché",
    "description": "Nous allons faire le tour du marché pour voir les supers sacs qu'ils vendent",
    "mon_avis": {
      "commentaire": "Trop joli marché",
      "note": 3
    },
    "avis_autorise": true
  }

  let activite_5 = {
    "titre": "Apéro Gourmand / English Apéro François",
    "date_debut_iso": moment().subtract(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
    "date_fin_iso": moment().add(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
    "date": moment().format("YYYY-MM-DD"),
    "heure_debut": moment().subtract(1, 'hours').format("HH:mm"),
    "heure_fin": moment().add(1, 'hours').format("HH:mm"),
    "duree": "2:00",
    "meteo": "clear",
    "id": "activite_5",
    "couleur": "#46b29d",
    "rappel": true,
    "image": "http://www.nouveautrader.com/v3/wp-content/uploads/2012/09/photosNT_21092012apero.JPG",
    "categorie": "Diététique",
    "lieu": "Au resto",
    "description": "Happy hour à partir de 8:00 du matin jusqu'à 23:30",
    "url": "https://www.google.com/",
    "avis_autorise": false
  }

  let activite_6 = {
    "titre": "Soirée Burger Frites / Burger & chips",
    "date_debut_iso": moment().add(1, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
    "date_fin_iso": moment().add(3, 'hours').format("YYYY-MM-DDTHH:mm:ssZ"),
    "date": moment().format("YYYY-MM-DD"),
    "heure_debut": moment().add(1, 'hours').format("HH:mm"),
    "heure_fin": moment().add(3, 'hours').format("HH:mm"),
    "duree": "02:00",
    "meteo": "clear",
    "id": "activite_6",
    "couleur": "#de4949",
    "rappel": false,
    "image": "https://www.ninkasi.fr/media/diaporama-home/ninkasi-burger.jpg?t=2014-11-20+13%3A49%3A08",
    "categorie": "Diététique",
    "lieu": "Au resto",
    "description": "Les meilleurs burgers du camping (il y en a même des végés miam) !",
    "url": "https://www.google.com/",
    "avis_autorise": false
  }

  if (req.params.activiteId === 'activite_2') {
    res.send(activite_2);
  } else if (req.params.activiteId === 'activite_3') {
    res.send(activite_3);
  } else if (req.params.activiteId === 'activite_4') {
    res.send(activite_4);
  } else if (req.params.activiteId === 'activite_5') {
    res.send(activite_5);
  } else {
    res.send(activite_6);
  }
});

app.post('/hotes/:hoteId/activites/:activiteId/rappel', function (req, res) {
  res.sendStatus(200);
});

app.post('/hotes/:hoteId/activites/:activiteId/noter', function (req, res) {
  res.sendStatus(200);
});

let location_cottage_twin = {
  "id": "location_cottage_twin",
  "groupe": "Quartier New Valley Premium",
  "nom": "Cottage Twin",
  "complement": "avec spa",
  "qualite_logo": "https://cnc-mock.herokuapp.com/static/premium.png",
  "pmr": true,
  "animaux_autorises": true,
  "climatisation": true,
  "slogan_nouveaute": "",
  "surface": "54 m²",
  "places": "6",
  "chambres": "3",
  "sdb": "3",
  "wc": "3",
  "photos_contractuelles": true,
  "photos": [
    "https://img.yellohvillage.fr/var/plain_site/storage/images/site_marchand/camping/les_grands_pins/nos_locations/25974/diaporama_hebergement/1_cottage_twin_6p_3ch_3sdb_pm1_exterieur2/1982796-1-fre-FR/1_cottage_twin_6p_3ch_3sdb_pm1_exterieur_galleria_slide_village_mobile.jpg",
    "https://img.yellohvillage.fr/var/plain_site/storage/images/site_marchand/camping/les_grands_pins/nos_locations/25974/diaporama_hebergement/2_cottage_twin_6p_3ch_3sdb_pm1_salon2/1982799-1-fre-FR/2_cottage_twin_6p_3ch_3sdb_pm1_salon_galleria_slide_village_mobile.jpg",
    "https://img.yellohvillage.fr/var/plain_site/storage/images/site_marchand/camping/les_grands_pins/nos_locations/25974/diaporama_hebergement/plan_twin_module_1_et_2/1647020-1-fre-FR/plan_twin_module_1_et_2_galleria_slide_village_mobile.jpg"
  ],
  "presentation": "Découvrez les vacances haut-de-gamme dans ce cottage convivial! Doté de deux modules dont la superficie totale est de 54m², de 3 chambres, d'un séjour/cuisine à l'américaine et de 3 salles de bain, cette location de vacances vous offre des prestations de standing. Grâce à sa terrasse commune aux deux modules et au calme du quartier PM1, vous passerez de belles soirées d'été en famille ou entre amis.",
  "caracteristiques": [{
      "nom": "Module 1",
      "details": [{
        "icone": "ic_type_hebergement",
        "nom": "Type d'hébergement",
        "valeurs": ["Mobilhome"]
      }, {
        "icone": "ic_location",
        "nom": "Hébergement",
        "valeurs": ["Quartier piétonnier/circulation limitée", "Isolation renforcée"]
      }, {
        "icone": "ic_salon",
        "nom": "Salon",
        "valeurs": ["Canapé", "Table et chaises", "Télévision", "Chauffage"]
      }]
    },
    {
      "nom": "Module 2",
      "details": [{
        "icone": "ic_type_hebergement",
        "nom": "Type d'hébergement",
        "valeurs": ["Mobilhome"]
      }, {
        "icone": "ic_salon",
        "nom": "Salon",
        "valeurs": ["Banquette convertible", "Table et chaises"]
      }, {
        "icone": "ic_chambre",
        "nom": "Chambre 1",
        "valeurs": ["1 Lit double : 160x200cm", "Mirroir", "Chauffage", "Penderie", "Volets roulants"]
      }]
    }
  ]
};

let location_cottage_twin_overview = {
  "id": "location_cottage_twin",
  "groupe": "Quartier New Valley Premium",
  "nom": "Cottage Twin",
  "complement": "avec spa",
  "qualite_logo": "https://cnc-mock.herokuapp.com/static/premium.png",
  "pmr": true,
  "animaux_autorises": true,
  "climatisation": true,
  "slogan_nouveaute": "",
  "surface": "54 m²",
  "places": "6",
  "chambres": "3",
  "sdb": "3",
  "image": "https://img.yellohvillage.fr/var/plain_site/storage/images/site_marchand/camping/les_grands_pins/nos_locations/25974/diaporama_hebergement/1_cottage_twin_6p_3ch_3sdb_pm1_exterieur2/1982796-1-fre-FR/1_cottage_twin_6p_3ch_3sdb_pm1_exterieur_galleria_slide_village_mobile.jpg"
};

let location_cottage_pinede = {
  "id": "location_cottage_pinede",
  "groupe": "Quartier New Valley Premium",
  "nom": "Cottage Pinède",
  "complement": "",
  "qualite_logo": "https://cnc-mock.herokuapp.com/static/fleur_orange4.png",
  "pmr": false,
  "animaux_autorises": true,
  "climatisation": false,
  "slogan_nouveaute": "Nouveauté 2018",
  "surface": "28 m²",
  "places": "4",
  "chambres": "2",
  "sdb": "1",
  "wc": "1",
  "photos_contractuelles": false,
  "photos": [
    "https://img.yellohvillage.fr/var/plain_site/storage/images/site_marchand/camping/les_grands_pins/nos_locations/52902/diaporama_hebergement/1_cottage_pinede_4p_2ch_4f_exterieur/2259635-1-fre-FR/1_cottage_pinede_4p_2ch_4f_exterieur_galleria_slide_village_mobile.jpg",
    "https://img.yellohvillage.fr/var/plain_site/storage/images/site_marchand/camping/les_grands_pins/nos_locations/52902/diaporama_hebergement/2_cottage_pinede_4p_2ch_4f_salon/2259632-1-fre-FR/2_cottage_pinede_4p_2ch_4f_salon_galleria_slide_village_mobile.jpg",
    "https://img.yellohvillage.fr/var/plain_site/storage/images/site_marchand/camping/les_grands_pins/nos_locations/52902/diaporama_hebergement/grands_pins_cottage_pinede_4p_2ch_4f_plan/2259641-1-fre-FR/grands_pins_cottage_pinede_4p_2ch_4f_plan_galleria_slide_village_mobile.jpg"
  ],
  "presentation": "Pour des vacances d'exception, faites le choix de ce charmant cottage Pinède, idéal pour accueillir toute votre petite tribu. Découvrez ses deux chambres séparées (dont une avec un grand lit double), son coin cuisine aménagée (avec 4 feu gaz, table et banquettes, évier, réfrigérateur et micro-ondes), ses WC séparés de la salle d'eau et son coin séjour agréable. Pour profiter pleinement des douces soirées d'été, en famille ou avec des amis, la terrasse couverte est idéale pour vous reposer en respirant l'air océanique.",
  "caracteristiques": [{
    "nom": "Module 1",
    "details": [{
      "icone": "ic_type_hebergement",
      "nom": "Type d'hébergement",
      "valeurs": ["Mobilhome"]
    }, {
      "icone": "ic_salon",
      "nom": "Salon",
      "valeurs": ["Banquette", "Table et chaises", "Mirroir", "Chauffage"]
    }]
  }]
};

let location_cottage_pinede_overview = {
  "id": "location_cottage_pinede",
  "groupe": "Quartier New Valley Premium",
  "nom": "Cottage Pinède",
  "complement": "",
  "qualite_logo": "https://cnc-mock.herokuapp.com/static/fleur_orange4.png",
  "pmr": false,
  "animaux_autorises": true,
  "climatisation": false,
  "slogan_nouveaute": "Nouveauté 2018",
  "surface": "28 m²",
  "places": "4",
  "chambres": "2",
  "sdb": "1",
  "image": "https://img.yellohvillage.fr/var/plain_site/storage/images/site_marchand/camping/les_grands_pins/nos_locations/52902/diaporama_hebergement/1_cottage_pinede_4p_2ch_4f_exterieur/2259635-1-fre-FR/1_cottage_pinede_4p_2ch_4f_exterieur_galleria_slide_village_mobile.jpg"
};

let emplacement_1 = {
  "id": "emplacement_1",
  "nom": "Emplacements",
  "complement": "",
  "qualite_logo": "https://cnc-mock.herokuapp.com/static/fleur_verte2.png",
  "pmr": false,
  "slogan_nouveaute": "",
  "surface": "Superficie de 80m² et plus",
  "animaux_autorises": "Animaux acceptés",
  "eaux_usagees": "",
  "electricite": "Electricité 16A",
  "raccordement_eau": "",
  "photos_contractuelles": false,
  "photos": [
    "https://img.yellohvillage.fr/var/plain_site/storage/images/site_marchand/camping/les_grands_pins/nos_emplacements_de_camping/2702/diaporama_hebergement/1_emplacements_lesgrandspins_lacanau/1985355-1-fre-FR/1_emplacements_lesgrandspins_lacanau_galleria_slide_village_mobile.jpg",
    "https://img.yellohvillage.fr/var/plain_site/storage/images/site_marchand/camping/les_grands_pins/nos_emplacements_de_camping/2702/diaporama_hebergement/2_emplacement_lesgrandspins_lacanau/1985361-1-fre-FR/2_emplacement_lesgrandspins_lacanau_galleria_slide_village_mobile.jpg",
    "https://img.yellohvillage.fr/var/plain_site/storage/images/site_marchand/camping/les_grands_pins/nos_emplacements_de_camping/2702/diaporama_hebergement/3_emplacement_lesgrandspins_lacanau/1985370-1-fre-FR/3_emplacement_lesgrandspins_lacanau_galleria_slide_village_mobile.jpg"
  ],
  "presentation": "Pour des vacances en pleine nature et à quelques pas de la plage, choisissez un de nos emplacements camping. Au milieu des pins, des arbousiers, des genêts, ils sont aménagés en terrasse sur une superficie de 80 à 100 m² et peuvent accueillir une caravane, un camping-car ou une tente. Vous y trouverez une alimentation électrique de 16 ampères à proximité. Les installations sanitaires, ainsi que des points d'eau potables et des barbecues sont répartis sur le terrain. Choisissez le calme du secteur sans circulation automobile, et laissez votre voiture sur le parking accessible 24h/24h, vos enfants seront les plus heureux...",
  "caracteristiques": [{
    "nom": "Module 1",
    "details": [{
      "icone": "ic_superficie",
      "nom": "Superficie",
      "valeurs": ["Superficie de 80m² et plus"]
    }, {
      "icone": "ic_elec",
      "nom": "Equipement",
      "valeurs": ["Electricité 16A"]
    }]
  }]

};

let emplacement_1_overview = {
  "id": "emplacement_1",
  "nom": "Emplacements",
  "complement": "",
  "qualite_logo": "https://cnc-mock.herokuapp.com/static/fleur_verte2.png",
  "pmr": false,
  "slogan_nouveaute": "",
  "image": "https://img.yellohvillage.fr/var/plain_site/storage/images/site_marchand/camping/les_grands_pins/nos_emplacements_de_camping/2702/diaporama_hebergement/1_emplacements_lesgrandspins_lacanau/1985355-1-fre-FR/1_emplacements_lesgrandspins_lacanau_galleria_slide_village_mobile.jpg",
  "surface": "Superficie de 80m² et plus",
  "animaux_autorises": "Animaux acceptés",
  "eaux_usagees": "",
  "electricite": "Electricité 16A",
  "raccordement_eau": ""
};

app.get('/hotes/:id/locations', function (req, res) {

  let locations_grands_pins = [];
  locations_grands_pins.push(location_cottage_twin_overview);
  locations_grands_pins.push(location_cottage_pinede_overview);
  res.send(locations_grands_pins);
});

app.get('/hotes/:id/locations/:idLocation', function (req, res) {
  if (req.params.idLocation === 'location_cottage_twin') {
    res.send(location_cottage_twin);
  } else if (req.params.idLocation === 'location_cottage_pinede') {
    res.send(location_cottage_pinede);
  } else {
    res.send(404);
  }
});

app.get('/hotes/:id/emplacements', function (req, res) {

  let emplacement_grands_pins = [];
  emplacement_grands_pins.push(emplacement_1_overview);
  res.send(emplacement_grands_pins);
});

app.get('/hotes/:id/emplacements/:idEmplacement', function (req, res) {

  if (req.params.idEmplacement === 'emplacement_1') {
    res.send(emplacement_1);
  } else {
    res.send(404);
  }
});

app.get('/hotes/:id/avis', function (req, res) {

  let avis = [{
      "id": "166727",
      "date_commentaire": "2017-10-30",
      "nom": "MAIREAUX",
      "prenom": "Alain",
      "ville": "MOUSSY LE NEUF",
      "nb_sejours": 5,
      "fidelite": true,
      "date_debut": "2017-09-10",
      "date_fin": "2017-10-01",
      "type_sejour": "Sans enfant",
      "type_hebergement": "Location",
      "message": "camping super déception concernant le tir a l arc matériel vétuste pas de cible de rechange pleine de trous lamentable",
      "note": 9,
      "notes_detail": [{
        "label": "Village",
        "note": 5
      }, {
        "label": "Hébergement",
        "note": 4
      }, {
        "label": "Piscine",
        "note": 5
      }, {
        "label": "Services",
        "note": 5
      }, {
        "label": "Activités",
        "note": -1
      }]
    },
    {
      "date_commentaire": "2017-10-29",
      "id": "167134",
      "nom": "GOUILLARD",
      "prenom": "Jean Francois",
      "ville": "CUCQ",
      "nb_sejours": 1,
      "fidelite": false,
      "date_debut": "2017-09-29",
      "date_fin": "2017-10-06",
      "type_sejour": "Avec enfants",
      "type_hebergement": "Location",
      "message": "camping tres agreable et tres propre meme hors saison .",
      "note": 8,
      "notes_detail": [{
        "label": "Village",
        "note": 5
      }, {
        "label": "Hébergement",
        "note": 4
      }, {
        "label": "Piscine",
        "note": 3
      }, {
        "label": "Services",
        "note": 1
      }, {
        "label": "Activités",
        "note": 2
      }]
    },
    {
      "id": "167056",
      "date_commentaire": "2017-10-24",
      "nom": "TROUBADY",
      "prenom": "Tecla",
      "ville": "SAINT ASTIER",
      "nb_sejours": 10,
      "fidelite": true,
      "date_debut": "2017-09-04",
      "date_fin": "2017-09-18",
      "type_sejour": "Sans enfant",
      "type_hebergement": "Location",
      "message": "Nous avons passé un très bon séjour. Le camping est très agréable. Nous avons apprécié la présence des petits commerces, de la salle de sport et du petit train; Nous avons trouvé le personnel très agréable. Nous avons adoré les cours d'aquagym.",
      "note": 9,
      "notes_detail": [{
        "label": "Village",
        "note": 5
      }, {
        "label": "Hébergement",
        "note": 4
      }, {
        "label": "Piscine",
        "note": 5
      }, {
        "label": "Services",
        "note": 5
      }, {
        "label": "Activités",
        "note": -1
      }]
    }
  ];

  let emplacement_avis = {
    "id": "167049",
    "date_commentaire": "2017-10-23",
    "nom": "DE GUISE",
    "prenom": "Gérard",
    "fidelite": true,
    "nb_sejours": 11,
    "ville": "SEVRAN",
    "date_debut": "2017-09-24",
    "date_fin": "2017-10-07",
    "type_sejour": "Sans enfant",
    "type_hebergement": "Emplacement",
    "message": "Séjour parfait qui m'a réconcilié après la déception de mon séjour au Ranolien, en Bretagne au mois de juin.",
    "note": 10,
    "notes_detail": [{
      "label": "Village",
      "note": 5
    }, {
      "label": "Hébergement",
      "note": 4
    }, {
      "label": "Piscine",
      "note": 5
    }, {
      "label": "Services",
      "note": 5
    }, {
      "label": "Activités",
      "note": 4
    }]
  };

  let payload = {
    "note": 8.3,
    "note_max": 10,
    "nb_notes": 2464,
    commentaires: []
  }

  if (req.query.type_hebergement === "LOCATION") {
    payload.commentaires = avis;
  } else if (req.query.type_hebergement === "EMPLACEMENT") {
    payload.commentaires.push(emplacement_avis);
  } else {
    payload.commentaires = avis;
    payload.commentaires.push(emplacement_avis);
  }
  res.send(payload);

});
