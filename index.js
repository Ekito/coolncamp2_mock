const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())

let id1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0QGVraXRvLmZyIn0.9qhlq0d5LOcsCxuz_ldmXX3ipvMY1bEN2rHEYtSZeaU"
let id2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0M0Bla2l0by5mciJ9.hoN_gskTqKOq8MbiDThzLIiemlTc1rn9TmQO2QpePiQ"

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
    res.send(JSON.stringify({
      id: id1,
      refresh: id1
    }))
  } else if (login === "test3@ekito.fr" && password === "ekito") {
    res.send(JSON.stringify({
      id: id2,
      refresh: id2
    }))
  } else if (login === "test2@ekito.fr" && password === "ekito") {
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

app.get('/app/versions', function (req, res) {
  let payload = {
    "android": {
      "version_minimale": "2.0.0",
      "version_store": "2.0.0"
    },
    "ios": {
      "version_minimale": "2.0.0",
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

  let hote_1 = {
    "id_hote": "hote_1",
    "nom": "La Dragonnière",
    "image": "https://www.sunelia.com/campsite/domaine-de-la-dragonniere/1200/490/picture_drago1.jpg",
    "itineraire": {
      "description": "Localisation Domaine de la Dragonnière - Vias-sur-mer",
      "lat": 43.31168928024891,
      "lng": 3.36456298828125
    },
    "horaire": "9h00 à 19h00",
    "tel": "+339 70 77 43 29",
    "email": "contact@coolncamp.com",
    "media": {
      "images": []
    }
  }

  let hote_2 = {
    "id": "hote_2",
    "nom": "Le Fief",
    "image": "https://www.sunelia.com/campsite/le-fief/1200/490/picture_le-fief-76.jpg",
    "itineraire": {
      "description": "Localisation Le Fief - Saint-Brevin-Les-Pins",
      "lat": 47.23534195874878,
      "lng": -2.1670854091644287
    },
    "horaire": "9h00 à 19h00",
    "tel": "+339 70 77 43 29",
    "email": "contact@coolncamp.com",
    "rs": [{
      "label": "Facebook",
      "url": "https://www.facebook.com/238129529603295"
    },
    {
      "label": "Twitter",
      "url": "https://www.facebook.com/238129529603295"
    },
    {
      "label": "Instagram",
      "url": "https://www.facebook.com/238129529603295"
    },
    {
      "label": "Pinterest",
      "url": "https://www.facebook.com/238129529603295"
    },
    {
      "label": "Youtube",
      "url": "https://www.facebook.com/238129529603295"
    },
    {
      "label": "TripAdvisor",
      "url": "https://www.facebook.com/238129529603295"
    },
    {
      "label": "Google+",
      "url": "https://www.facebook.com/238129529603295"
    },
    {
      "label": "LinkedIn",
      "url": "https://www.facebook.com/238129529603295"
    },
    {
      "label": "Zoover",
      "url": "https://www.facebook.com/238129529603295"
    }
],
    "media": {
      "image_thumbnail": "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_parc-aquatique.jpg",
      "images": [
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_vue-aerienne.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_parc-aquatique.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_plage-st-brevin.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_piscine.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_jeux-aquatiques.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_basket.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_gym.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_terrasse-restaurant.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_restaurant.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_tennis.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_spa.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_massage-duo.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_salle-de-sport.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_volley-ball.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_espace-aquatique-couvert.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_toboggan.jpg",
        "https://www.sunelia.com/campsite/le-fief/903/423/sunelia-le-fief_aquabike.jpg"
      ]
    }
  }

  let hote_3 = {
    "id": "hote_3",
    "nom": "L’Escale St Gilles",
    "image": "https://www.sunelia.com/campsite/lescale-st-gilles/1200/490/picture_vue-parc-aquatique-benodet-ok.jpg",
    "itineraire": {
      "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p style=\"text-align: center;\">Camping de la Cité **** NN<br />route de St Hilaire<br />11000 Carcassonne</p>\n<p style=\"text-align: center;\">Tél : +33 5 25 24 12 14 <br />Fax : +33 5 25 24 12 13</p>\n<p style=\"text-align: center;\">GPS :</p>\n<p style=\"text-align: center;\">Latitude : 43:12:00 N</p>\n<p style=\"text-align: center;\">Longitude : 2:21:12 E</p>\n</div>\n</body>\n</html>",
      "lat": 47.86273,
      "lng": -4.095669
    },
    "horaire": "9h00 à 19h00",
    "tel": "+339 70 77 43 29",
    "email": "contact@coolncamp.com",
    "url": "http://www.coolncamp.com",
    "rs": [{
      "label": "Facebook",
      "url": "https://www.facebook.com/238129529603295"
    }],
    "media": {
      "image_thumbnail": "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-vue-port-plaisance-benodet.jpg",
      "images": [
        "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-vue-port-plaisance-benodet.jpg",
        "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-spa-camping-aquazen-detente.jpg",
        "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-enfant-sunny.jpg",
        "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-saint-gilles-voilier.jpg",
        "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-spa-camping-detente.jpg",
        "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-parc-aquatique-couvert-famille.jpg",
        "https://www.sunelia.com//campsite/lescale-st-gilles/903/423/escale-st-gilles-spa-camping-bain-bouillonnant.jpg",
        "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-pente-a-glisse-enfants.jpg",
        "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/54-pont-paillotte.jpg",
        "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/sunelia-l-escale_st-gilles_piscine-a-courant.jpg",
        "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-restaurant-safran.jpg",
        "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/sunelia-l-escale_st-gilles_plage-de-trez.jpg"
      ],
      "videos": [{
          "titre": "Surf session",
          "image_thumbnail": "https://www.youtube.com/watch?v=xpcbMkvQE8A",
          "url": "https://www.youtube.com/watch?v=xpcbMkvQE8A"
        },
        {
        "titre": "UCPA",
        "image_thumbnail": "https://img.youtube.com/vi/-QIyAaw1JdA/maxresdefault.jpg",
        "url": "https://www.youtube.com/watch?v=-QIyAaw1JdA"
      }]
    }
  }

  let hote_4 = {
    "id": "hote_4",
    "nom": "Le Malazéou",
    "image": "https://www.sunelia.com/campsite/le-malazeou/1200/490/picture_malazeou-999.jpg",
    "itineraire": {
      "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p style=\"text-align: center;\">Camping de la Cité **** NN<br />route de St Hilaire<br />11000 Carcassonne</p>\n<p style=\"text-align: center;\">Tél : +33 5 25 24 12 14 <br />Fax : +33 5 25 24 12 13</p>\n<p style=\"text-align: center;\">GPS :</p>\n<p style=\"text-align: center;\">Latitude : 43:12:00 N</p>\n<p style=\"text-align: center;\">Longitude : 2:21:12 E</p>\n</div>\n</body>\n</html>",
      "lat": 42.72880157941809,
      "lng": 1.824878454208374
    },
    "horaire": "9h00 à 19h00",
    "tel": "+339 70 77 43 29",
    "email": "contact@coolncamp.com",
    "url": "http://www.coolncamp.com",
    "rs": [{
      "label": "Facebook",
      "url": "https://www.facebook.com/238129529603295"
    }],
    "media": {
      "image_thumbnail": "https://www.sunelia.com/campsite/le-malazeou/903/423/sunelia-le-malazeou_piscine.jpg",
      "images": [
        "https://www.sunelia.com/campsite/le-malazeou/903/423/sunelia-le-malazeou_montagne.jpg",
        "https://www.sunelia.com/campsite/le-malazeou/903/423/sunelia-le-malazeou_piscine.jpg",
        "https://www.sunelia.com/campsite/le-malazeou/903/423/sunelia-le-malazeou_animation.jpg",
        "https://www.sunelia.com/campsite/le-malazeou/903/423/sunelia-le-malazeou_soiree.jpg",
        "https://www.sunelia.com/campsite/le-malazeou/903/423/sunelia-le-malazeou_reception.jpg",
        "https://www.sunelia.com/campsite/le-malazeou/903/423/sunelia-le-malazeou_l-ariege.jpg",
        "https://www.sunelia.com/campsite/le-malazeou/903/423/sunelia-le-malazeou_sunelia-premium.jpg"
      ],
      "videos": [{
        "titre": "UCPA",
        "image_thumbnail": "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/54-pont-paillotte.jpg",
        "url": "https://www.youtube.com/watch?v\u003d-QIyAaw1JdA"
      }]
    }
  }

  if (req.params.id === "hote_1") {
    res.send(hote_1);
  } else if (req.params.id === "hote_2") {
    res.send(hote_2);
  } else if (req.params.id === "hote_3") {
    res.send(hote_3);
  } else if (req.params.id === "hote_4") {
    res.send(hote_4);
  } else {
    res.sendStatus(404);
  }

})

app.get('/moi/messages', function (req, res) {
    let messages = [{
      id: "12345567889",
      emetteur: "Le Fief",
      texte: "Cool'n Camp\n    Camping de la Cité **** NN\n route de St Hilaire\n 11000 Carcassonne\nTél : +33 5 25 24 12 14\nFax : +33 5 25 24 12 13\n url: http://www.coolncamp.com  \n",
      date: "2017-10-23T21:30:00+02:00"
    },
    {
      id: "AAAAA12345567889",
      emetteur: "La Dragonnière",
      texte: "Cool'n Camp\n    Camping de la Cité **** NN\n route de St Hilaire\n 11000 Carcassonne\nTél : +33 5 25 24 12 14\nFax : +33 5 25 24 12 13\n url: http://www.coolncamp.com  \n",
      date: "2017-10-22T21:30:00+02:00"
    }];

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

  let sejours = [{
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
      "pays": "France",
      "eta_debut_date_aff": "2017-06-30"
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
      "pays": "France",
      "eta_debut_date_aff": "2017-07-30"
    },
    {
      "id": "sejour_3",
      "id_hote": "hote_3",
      "nom": "L’Escale St Gilles",
      "image": "https://www.sunelia.com/campsite/lescale-st-gilles/1200/490/picture_vue-parc-aquatique-benodet-ok.jpg",
      "date_debut": now.toISOString().slice(0, 10),
      "date_fin": end.toISOString().slice(0, 10),
      "itineraire": {
        "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p style=\"text-align: center;\">Camping de la Cité **** NN<br />route de St Hilaire<br />11000 Carcassonne</p>\n<p style=\"text-align: center;\">Tél : +33 5 25 24 12 14 <br />Fax : +33 5 25 24 12 13</p>\n<p style=\"text-align: center;\">GPS :</p>\n<p style=\"text-align: center;\">Latitude : 43:12:00 N</p>\n<p style=\"text-align: center;\">Longitude : 2:21:12 E</p>\n</div>\n</body>\n</html>",
        "lat": 47.86273,
        "lng": -4.095669
      },
      "ville": "Bénodet",
      "pays": "France",
      "eta_debut_date_aff": now.toISOString().slice(0, 10)
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

app.get('/moi/sejours/:id', function (req, res) {

  let now = new Date();
  let end = new Date();
  end.setDate(end.getDate() + 15);

  let sejour_1 = {
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
    "pays": "France",
    "proprietaire": false,
    "restriction_service": [],
    "sejournants": [{
      email: "clamri@ekito.fr",
      avatar: "https://openclipart.org/image/2400px/svg_to_png/247319/abstract-user-flat-3.png"
    }],
    "categorie": "Mobil home 15 places",
    "eta_debut_date_aff": "2017-06-30"
  };

  let sejour_2 = {
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
    "pays": "France",
    "proprietaire": true,
    "restriction_service": ["etat_des_lieux", "tickets", "conforts"],
    "sejournants": [{
      email: "lbaresse@ekito.fr",
      avatar: "https://openclipart.org/image/2400px/svg_to_png/247319/abstract-user-flat-3.png"
    }],
    "categorie": "Mobil home 6 places",
    "eta_debut_date_aff": "2017-07-30"
  }

  let sejour_3 = {
    "id": "sejour_3",
    "id_hote": "hote_3",
    "nom": "L’Escale St Gilles",
    "image": "https://www.sunelia.com/campsite/lescale-st-gilles/1200/490/picture_vue-parc-aquatique-benodet-ok.jpg",
    "date_debut": now.toISOString().slice(0, 10),
    "date_fin": end.toISOString().slice(0, 10),
    "itineraire": {
      "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p style=\"text-align: center;\">Camping de la Cité **** NN<br />route de St Hilaire<br />11000 Carcassonne</p>\n<p style=\"text-align: center;\">Tél : +33 5 25 24 12 14 <br />Fax : +33 5 25 24 12 13</p>\n<p style=\"text-align: center;\">GPS :</p>\n<p style=\"text-align: center;\">Latitude : 43:12:00 N</p>\n<p style=\"text-align: center;\">Longitude : 2:21:12 E</p>\n</div>\n</body>\n</html>",
      "lat": 47.86273,
      "lng": -4.095669
    },
    "ville": "Bénodet",
    "pays": "France",
    "proprietaire": true,
    "restriction_service": [],
    "sejournants": [],
    "categorie": "Mobil home 4 places",
    "eta": {
      "debut": "2017-10-22T10:00:00+02:00",
      "label": "10:00 - 10:30"
    },
    "eta_debut_date_aff": now.toISOString().slice(0, 10)
  };

  if (req.params.id === "sejour_1") {
    res.send(sejour_1);
  } else if (req.params.id === "sejour_2") {
    res.send(sejour_2);
  } else if (req.params.id === "sejour_3") {
    res.send(sejour_3);
  } else {
    res.sendStatus(404);
  }
})

app.get('/moi/sejours/:id/eta', function (req, res) {
  if (req.params.id === "sejour_1" || req.params.id === "sejour_2" || req.params.id === "sejour_3") {

    let payload = [{
      "debut": "2017-10-22T09:30:00+02:00",
      "label": "9:00 - 9:30"
    },{
      "debut": "2017-10-22T10:00:00+02:00",
      "label": "10:00 - 10:30"
    },{
      "debut": "2017-10-22T10:03:00+02:00",
      "label": "10:30 - 11:30"
    }]
    res.send(payload);
  } else { res.sendStatus(404); }
});

app.post('/moi/sejours/:id/eta', function (req, res) {
  res.sendStatus(200);
});


app.get('/moi/sejours/:id/conforts', function (req, res) {
  if (req.params.id === "sejour_1" || req.params.id === "sejour_2" || req.params.id === "sejour_3") {

    let payload = [
      {
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
      }]
    res.send(payload);
  } else { res.sendStatus(404); }
});

app.post('/moi/sejours/:id/conforts', function (req, res) {
  res.sendStatus(200);
});

app.get('/hotes/:id/reservation', function (req, res) {

  let moteur = {
    titre: "2018 AU PRIX DE 2017",
    url: "https://www.sites-et-paysages.com/resultats-camping-disponibilite.html?paysage=&id_region=&hebergement=&numpers=1&datedeb=18%2F10%2F2017&datefin=25%2F10%2F2017&submit-recherche=Rechercher",
    tel: "+33970825001",
    description: "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p> </p>\n<ul style=\"list-style-type: circle;\">\n<li>Offre exclusive valable du 1er Juillet au 31 Octobre 2017<br />Location d’habitats =&gt; Réservez votre séjour par téléphone en contactant notre Centrale de Réservation au +33970825001</li>\n</ul>\n</div>\n</body>\n</html>",
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
      "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p> </p>\n<ul style=\"list-style-type: circle;\">\n<li>Offre exclusive valable du 1er Juillet au 31 Octobre 2017<br />Location d’habitats =&gt; Réservez votre séjour par téléphone en contactant notre Centrale de Réservation au +33970825001</li>\n</ul>\n</div>\n</body>\n</html>",
    };

    let etat_2_fait = {
      "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p> </p>\n<ul style=\"list-style-type: circle;\">\n<li>Offre exclusive valable du 1er Juillet au 31 Octobre 2017<br />Location d’habitats =&gt; Réservez votre séjour par téléphone en contactant notre Centrale de Réservation au +33970825001</li>\n</ul>\n</div>\n</body>\n</html>",
      "incident": {
        "etat": true,
        "message": "Le lit s'est cassé."
      },
      "proprete": {
        "etat": false
      },
      "date": "2017-10-22T21:30:00+02:00"
    }

    let etat_3_non_fait_date_depassee = {
      "message": "date limite dépassée"
    };

    if (req.params.id === "sejour_1") {
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
  let response = {
    "reponse": "Votre demande a bien été reçue, elle sera traitée dans les plus brefs délais"
  }
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
    res.send(types);
  })


  app.get('/moi/sejours/:id/tickets', function (req, res) {

      let tickets = {
        "description": "Notre offre super confort est garantie sans problème… durable",
        "tickets": [
          {
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
      res.send(tickets);
  })

  app.post('/moi/sejours/:id/tickets', function (req, res) {
    let response = {
      "reponse": "Votre demande a bien été reçue, elle sera traitée dans les plus brefs délais"
    }
    res.send(response);
  })

  app.post('/moi/sejours/:id/type-sejour', function (req, res) {
    res.send(200);
  })

  app.post('/moi/sejours/:id/sejournants/inviter', function (req, res) {
    console.log('GET /moi/sejours/:id/sejournants/inviter')
    console.log('headers: ' + JSON.stringify(req.headers, null, 2))
    console.log('body: ' + JSON.stringify(req.body, null, 2))
    let email = req.body.email;
    if (email === "invite@me.com") { res.sendStatus(400) } else if
    (req.params.id === "sejour_1") {res.sendStatus(404) } else {
      res.sendStatus(200);
    }
  })
  app.post('/moi/sejours/:id/sejournants/relancer', function (req, res) {
    console.log('GET /moi/sejours/:id/sejournants/relancer')
    console.log('headers: ' + JSON.stringify(req.headers, null, 2))
    console.log('body: ' + JSON.stringify(req.body, null, 2))
    let email = req.body.email;
    if (email === "sendagain@me.com") { res.sendStatus(400) } else if
    (req.params.id === "sejour_1") { res.sendStatus(404) } else {
      res.sendStatus(200);
    }
  })
  app.post('/moi/sejours/:id/sejournants/revoquer', function (req, res) {
    console.log('GET /moi/sejours/:id/sejournants/revoquer')
    console.log('headers: ' + JSON.stringify(req.headers, null, 2))
    console.log('body: ' + JSON.stringify(req.body, null, 2))
    let email = req.body.email;
    if (email === "revoke@me.com") { res.sendStatus(400) } else if
    (req.params.id === "sejour_1") { res.sendStatus(404) } else {
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
  let promos = [{
    "id": "promo_1",
    "id_hote": "hote_4",
    "nom": "Le Malazéou",
    "image": "https://www.sunelia.com/campsite/le-malazeou/1200/490/picture_malazeou-999.jpg",
    "ville": "Ax-les-thermes",
    "pays": "France",
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
      "sexe": "M",
      "date_naissance": "1971-08-19"
    }

    res.send(moi);
  } else if (req.headers['authorization'] === 'Bearer ' + id2) {

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

  res.send(services);
})

app.get('/hotes/:id/services/:idService', function (req, res) {

  let service_1 = {
    "id": "59b7af89ed44090f26a2c27e",
    "titre": "Reception anglais",
    "soustitre": "8 am to 8 pm",
    "description": "Yummy yummy !",
    "lat": 43.31168928024891,
    "lng": 3.36456298828125,
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "documents": [
      {
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
      "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-enfant-sunny.jpg",
      "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-saint-gilles-voilier.jpg",
      "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-spa-camping-detente.jpg"
    ]
  };

  let service_2 = {
    "id": "5609818b0db27a0300b23d59",
    "titre": "Bar / Snack",
    "soustitre": "10 AM - 02 PM",
    "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p style=\"text-align: center;\">Camping de la Cité **** NN<br />route de St Hilaire<br />11000 Carcassonne</p>\n<p style=\"text-align: center;\">Tél : +33 5 25 24 12 14 <br />Fax : +33 5 25 24 12 13</p>\n<p style=\"text-align: center;\">GPS :</p>\n<p style=\"text-align: center;\">Latitude : 43:12:00 N</p>\n<p style=\"text-align: center;\">Longitude : 2:21:12 E</p>\n</div>\n</body>\n</html>",
    "lat": 43.31168928024891,
    "lng": 3.36456298828125,
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

  res.send(infos);
})

app.get('/hotes/:id/infos/:idInfo', function (req, res) {

  let info_1 = {
    "id": "59b7af89ed44090f26a2c27e",
    "titre": "Campsite Map",
    "description": "Yummy yummy !",
    "lat": 43.31168928024891,
    "lng": 3.36456298828125,
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "documents": [
      {
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
      "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-enfant-sunny.jpg",
      "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-saint-gilles-voilier.jpg",
      "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-spa-camping-detente.jpg"
    ]
  };

  let info_2 = {
    "id": "5609818b0db27a0300b23d59",
    "titre": "défibrillateur cardiaque",
    "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p style=\"text-align: center;\">Camping de la Cité **** NN<br />route de St Hilaire<br />11000 Carcassonne</p>\n<p style=\"text-align: center;\">Tél : +33 5 25 24 12 14 <br />Fax : +33 5 25 24 12 13</p>\n<p style=\"text-align: center;\">GPS :</p>\n<p style=\"text-align: center;\">Latitude : 43:12:00 N</p>\n<p style=\"text-align: center;\">Longitude : 2:21:12 E</p>\n</div>\n</body>\n</html>",
    "lat": 43.31168928024891,
    "lng": 3.36456298828125,
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
  res.send(offres);
})

app.get('/hotes/:id/offres/:idOffre', function (req, res) {

  let offre_1 = {
    "id": "59b8efe70fc2de9806432513",
    "titre": "Soirée Crêpes",
    "soustitre": "Tous les mercredis, sur la terrasse du bar",
    "description": "Yummy yummy !",
    "lat": 43.31168928024891,
    "lng": 3.36456298828125,
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "documents": [
      {
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
      "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-enfant-sunny.jpg",
      "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-saint-gilles-voilier.jpg",
      "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-spa-camping-detente.jpg"
    ]
  };

  let offre_2 = {
    "id": "56086a22d3bfcf03005f7ab0",
    "titre": "Cycling, skating",
    "soustitre": "Accessible aux rollers et PMR .",
    "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p style=\"text-align: center;\">Camping de la Cité **** NN<br />route de St Hilaire<br />11000 Carcassonne</p>\n<p style=\"text-align: center;\">Tél : +33 5 25 24 12 14 <br />Fax : +33 5 25 24 12 13</p>\n<p style=\"text-align: center;\">GPS :</p>\n<p style=\"text-align: center;\">Latitude : 43:12:00 N</p>\n<p style=\"text-align: center;\">Longitude : 2:21:12 E</p>\n</div>\n</body>\n</html>",
    "lat": 43.31168928024891,
    "lng": 3.36456298828125,
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
  res.send(tourisme);
})

app.get('/hotes/:id/tourisme/:idTourisme', function (req, res) {

  let tourisme_1 = {
    "id": "5811f11bb372dd0c66b62dde",
    "titre": "Nature & randonnée",
    "soustitre": "En pays Basque",
    "description": "Yummy yummy !",
    "lat": 43.31168928024891,
    "lng": 3.36456298828125,
    "tel": "+33 1 23 45 67 89",
    "url": "https://www.google.com/",
    "email": "toto@example.com",
    "documents": [
      {
        "label": "Politique conf",
        "url": "https://www.placealemploi.fr/divers/CGU.pdf"
      },
      {
        "label": "Autre chose",
        "url": "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
      }
    ],
    "images": [
      "https://coolncamp.s3.amazonaws.com/bonPlans/14775707718484kuBSpSfgLLGVwlh.jpg",
      "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-enfant-sunny.jpg",
      "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-saint-gilles-voilier.jpg",
      "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/escale-st-gilles-spa-camping-detente.jpg"
    ]
  };

  let tourisme_2 = {
    "id": "596c7fa1c0633ece232d195f",
    "titre": "Mont Saint Michel",
    "soustitre": "A 45 minutes du Camping",
    "description": "<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Cool'n Camp</title>\n    <link href=\"https:&#x2F;&#x2F;bo.coolncamp.com&#x2F;bootstrap/dist/css/bootstrap.min.css\" rel=\"stylesheet\" media=\"all\" />\n    <style>\n        html, body { background-color: transparent !important; }\n        body {\n           padding: 16px;\n        }\n    </style>\n</head>\n<body>\n<div id=\"container\">\n    <p style=\"text-align: center;\">Camping de la Cité **** NN<br />route de St Hilaire<br />11000 Carcassonne</p>\n<p style=\"text-align: center;\">Tél : +33 5 25 24 12 14 <br />Fax : +33 5 25 24 12 13</p>\n<p style=\"text-align: center;\">GPS :</p>\n<p style=\"text-align: center;\">Latitude : 43:12:00 N</p>\n<p style=\"text-align: center;\">Longitude : 2:21:12 E</p>\n</div>\n</body>\n</html>",
    "lat": 43.31168928024891,
    "lng": 3.36456298828125,
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
  
  let activites = [
  {
    "titre": "Mini Club / Kids Club",
    "date_debut_iso": "2017-10-26T10:00:00+02:00",
    "date_fin_iso": "2017-10-26T12:00:00+02:00",
    "date": "2017-10-26",
    "heure_debut": "10:00",
    "duree": "02:00",
    "meteo": "sunny",
    "id": "fqlrmrnpee7mahb36s18a6a51o_20171026T080000Z",
    "couleur": "#46b29d",
    "rappel": true,
    "avis": {
      "total": 23,
      "note": 3.5
    }
  },
  {
    "titre": "Atelier Peinture ",
    "date_debut_iso": "2017-10-26T10:30:00+02:00",
    "date_fin_iso": "2017-10-26T12:30:00+02:00",
    "date": "2017-10-26",
    "heure_debut": "10:30",
    "duree": "02:00",
    "meteo": "partlycloudy",
    "id": "tp0sv6684p9458jhcdrflf14s0_20171026T083000Z",
    "couleur": "#de4949",
    "rappel": false,
    "avis": {
      "total": 2,
      "note": 0
    }
  },
  {
    "titre": "Danses du village / Club dance",
    "date_debut_iso": "2017-10-26T12:10:00+02:00",
    "date_fin_iso": "2017-10-26T13:10:00+02:00",
    "date": "2017-10-26",
    "heure_debut": "12:10",
    "duree": "01:00",
    "meteo": "sunny",
    "id": "794ad4b9mlpg8k3antjio6veu4_20171026T101000Z",
    "couleur": "#f0ca4d",
    "rappel": false,
    "avis": {
      "total": 4,
      "note": 2
    }
  },
  {
    "titre": "Tir à l'Arc / Archery",
    "date_debut_iso": "2017-10-26T14:00:00+02:00",
    "date_fin_iso": "2017-10-26T16:00:00+02:00",
    "date": "2017-10-26",
    "heure_debut": "14:00",
    "duree": "02:00",
    "meteo": "clear",
    "id": "pgutl86br2lqb22u3ntqdu5eeg_20171026T120000Z",
    "couleur": "#324d5c",
    "rappel": true,
    "avis": {
      "total": 76,
      "note": 4
    }
  },
  {
    "titre": "Apéro Gourmand / English Apéro François",
    "date_debut_iso": "2017-10-26T18:00:00+02:00",
    "date_fin_iso": "2017-12-26T19:00:00+02:00",
    "date": "2017-10-26",
    "heure_debut": "18:00",
    "duree": "24:00",
    "meteo": "clear",
    "id": "34l5cfbof9135q1vvq85ld49ug_20171026T160000Z",
    "couleur": "#46b29d",
    "rappel": true,
    "avis": {
      "total": 0,
      "note": 0
    }
  },
  {
    "titre": "Soirée Burger Frites / Burger & chips",
    "date_debut_iso": "2018-10-26T18:30:00+02:00",
    "date_fin_iso": "2018-10-26T23:00:00+02:00",
    "date": "2018-10-26",
    "heure_debut": "18:30",
    "duree": "04:30",
    "meteo": "clear",
    "id": "s5kgpgug6gtsb3efc0j9jcs5nc_20171026T163000Z",
    "couleur": "#de4949",
    "rappel": false,
    "avis": {
      "total": 0,
      "note": 0
    }
  },
  {
    "titre": "Mini-disco / Mini Disco",
    "date_debut_iso": "2018-10-26T20:30:00+02:00",
    "date_fin_iso": "2018-10-26T21:30:00+02:00",
    "date": "2018-10-26",
    "heure_debut": "20:30",
    "duree": "01:00",
    "meteo": "clear",
    "id": "sa3i7l342pefapbgv10gv7j0i0_20171026T183000Z",
    "couleur": "#f0ca4d",
    "rappel": false,
    "avis": {
      "total": 0,
      "note": 0
    }
  },
  {
    "titre": "Step Aérobic",
    "date_debut_iso": "2018-10-27T10:30:00+02:00",
    "date_fin_iso": "2018-10-27T11:00:00+02:00",
    "date": "2018-10-27",
    "heure_debut": "10:30",
    "duree": "00:30",
    "meteo": "clear",
    "id": "k546kmgft4f2efhh1jkk5om400_20171027T083000Z",
    "couleur": "#324d5c",
    "rappel": false,
    "avis": {
      "total": 0,
      "note": 0
    }
  },
  {
    "titre": "Inauguration Terrain de PADEL",
    "date_debut_iso": "2018-10-27T10:30:00+02:00",
    "date_fin_iso": "2018-10-27T11:00:00+02:00",
    "date": "2018-10-27",
    "heure_debut": "10:30",
    "duree": "00:30",
    "meteo": "clear",
    "id": "k546kmgft4f2efhh1jkk5om400_20171027T083000Z",
    "couleur": "#324d5c",
    "rappel": false,
    "avis": {
      "total": 0,
      "note": 0
    }
  },
  {
    "titre": "Marché au Village",
    "date_debut_iso": "2018-10-27T10:30:00+02:00",
    "date_fin_iso": "2018-10-27T11:00:00+02:00",
    "date": "2018-10-27",
    "heure_debut": "10:30",
    "duree": "00:30",
    "meteo": "clear",
    "id": "k546kmgft4f2efhh1jkk5om400_20171027T083000Z",
    "couleur": "#324d5c",
    "rappel": false,
    "avis": {
      "total": 0,
      "note": 0
    }
  },
  {
    "titre": "Pot d'accueil & soirée dansante / Welcome drink & dance",
    "date_debut_iso": "2018-10-27T10:30:00+02:00",
    "date_fin_iso": "2018-10-27T11:00:00+02:00",
    "date": "2018-10-27",
    "heure_debut": "10:30",
    "duree": "00:30",
    "meteo": "clear",
    "id": "k546kmgft4f2efhh1jkk5om400_20171027T083000Z",
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

app.listen(3000, function () {
  console.log('Cool\'nCamp v2 (Mock) server listening on port 3000 !')
})
