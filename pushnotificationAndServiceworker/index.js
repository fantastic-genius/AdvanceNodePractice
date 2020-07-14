const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');
const path = require('path');

const app = express();

//Setup static path
app.use(express.static(path.join(__dirname, "client")))

app.use(bodyParser.json());

const publicVapidKey = 'BLWiRT2mq01j4pe7bjmXqKQs2hkpJ0Mzgo1leVbCnCzostTGGRPIK11wioydw5nVbSslYAFrdf32t64ZaLVRjXo';
const privateVapidKey = 'W2ONoBuE2Y-JeQ8Jt5bYFnpde52PmnzE5tOUnHGE9wY';

webPush.setVapidDetails(
  'mailto:test@example.com',
  publicVapidKey,
  privateVapidKey
);

//Subscribe route
app.post('/subscribe', (req, res) => {
  //Get push subscription object
  const subscription = req.body;

  //Send 201 - resource created
  res.status(201).json({});

  //create Payload
  const payload = JSON.stringify({ title: 'Push Test'});

  //Pass object into sendNotification
  webPush.sendNotification(subscription, payload).catch(err => console.error(err))
})

const port = 8000;

app.listen(port, () => console.log(`listening on port ${port}`))
