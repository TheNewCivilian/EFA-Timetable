var express = require('express');
var app = express();
const url = require('url');
const fetch = require('node-fetch');
const path = require('path');
const config = require('./config.js');

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.use(express.static('static'));

// Endpoint to deliver timetable page
app.get('/', (req, res) => {
  res.render('timetable', {
    title: 'Timetable',
    stations: config.stationList,
  });
});

// Endpoint for proxy efa data to avoid issues with CORS
app.get('/efa', async (req, res) => {
  const queryParameter = url.parse(req.url,true).query;
  const stationId = queryParameter.stationid;
  let sessionCallResponse = await fetch(`${config.efaEndpoint}/XML_DM_REQUEST?sessionID=0&outputFormat=JSON&name_dm=${stationId}&itdDateTimeArr=dep&type_dm=any`);
  sessionCallResponse = await sessionCallResponse.json();
  const sessionId = sessionCallResponse.parameters.find((parameter) => parameter.name === 'sessionID').value;
  let data = await fetch(`${config.efaEndpoint}/XML_DM_REQUEST?sessionID=${sessionId}&requestID=1&dmLineSelection=4:x`);
  data = await data.json();
  res.send(data);
});

const server = app.listen(8080, () => {
   var host = server.address().address
   var port = server.address().port
   console.log('Timetable accessible at http://%s:%s', host, port)
})