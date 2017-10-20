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
    }, {
      "label": "Google+",
      "url": "https://www.facebook.com/238129529603295"
    }],
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
      "video": {
        "image_thumbnail": "https://www.sunelia.com/campsite/lescale-st-gilles/903/423/54-pont-paillotte.jpg",
        "url": "https://www.youtube.com/watch?v\u003d-QIyAaw1JdA"
      }
    }
  }

  if (req.params.id === "hote_1") {
    res.send(hote_1);
  } else if (req.params.id === "hote_2") {
    res.send(hote_2);
  } else if (req.params.id === "hote_3") {
    res.send(hote_3);
  } else {
    res.sendStatus(404);
  }

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
      "sejournants": [
        {
          email: "clamri@ekito.fr",
          avatar: "https://openclipart.org/image/2400px/svg_to_png/247319/abstract-user-flat-3.png"
        }
      ],
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
      "sejournants": [
        {
          email: "lbaresse@ekito.fr",
          avatar: "https://openclipart.org/image/2400px/svg_to_png/247319/abstract-user-flat-3.png"
        }
      ],
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

  if (code === "test") {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
})


app.get('/moi/hotes-promos', function (req, res) {
  let promos = [{
    "id": "promo_1",
    "id_hote": "hote_3",
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

app.get('/hotes/:id/infos', function (req, res) {

  let infos = [{
      "image": "https://coolncamp.s3.amazonaws.com/infos/1500284099863zA8t7pJPNIwlBJlt.jpg",
      "titre": "Campsite Map"
    },
    {
      "image": "https://coolncamp.s3.amazonaws.com/infos/1483959679583oAXgfKTdfE7zWakL.jpg",
      "titre": "défibrillateur cardiaque"
    },
    {
      "image": "https://coolncamp.s3.amazonaws.com/infos/1483958591671DD1gtGWocVjvUqQw.jpg",
      "titre": "Point des rassemblement"
    },
    {
      "image": "https://coolncamp.s3.amazonaws.com/infos/1483968520899TORzlKQXoFk67KJu.jpg",
      "titre": "Numéros d'urgence"
    },
    {
      "image": "https://coolncamp.s3.amazonaws.com/infos/1483959400952iyogYqCcduIeeTkC.jpg",
      "titre": "Médecins"
    }
  ];

  res.send(infos);
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

app.listen(3000, function () {
  console.log('Cool\'nCamp v2 (Mock) server listening on port 3000 !')
})