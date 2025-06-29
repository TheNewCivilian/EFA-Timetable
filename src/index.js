var express = require('express');
var app = express();
const url = require('url');
const fetch = require('node-fetch');
const path = require('path');
const config = require('./config.js');
const configuration = require('./config.js');

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

// Endpoint to deliver timetable page
app.get('/agg', (req, res) => {
  res.render('timetable-agg', {
    title: 'Timetable',
    stations: config.stationList,
  });
});


// Endpoint for proxy efa data to avoid issues with CORS
app.get('/efa', async (req, res) => {
  const queryParameter = url.parse(req.url,true).query;
  const stationId = queryParameter.stationid;

  if (configuration.mode == "efa") {
    let sessionCallResponse = await fetch(`${config.efaEndpoint}/XML_DM_REQUEST?sessionID=0&outputFormat=JSON&name_dm=${stationId}&itdDateTimeArr=dep&type_dm=any`);
    sessionCallResponse = await sessionCallResponse.json();
    const sessionId = sessionCallResponse.parameters.find((parameter) => parameter.name === 'sessionID').value;
    let data = await fetch(`${config.efaEndpoint}/XML_DM_REQUEST?sessionID=${sessionId}&requestID=1&dmLineSelection=4:x`);
    data = await data.json();
    res.send(data);
  } else if (configuration.mode == "wl") {
    let sessionCallResponse = await fetch(`${config.efaEndpoint}/monitor?rbl=${stationId}`);
    const {data, message} = await sessionCallResponse.json();

    const departureList = []
    data.monitors[0]?.lines.forEach((line) => {
      line.departures.departure.forEach((departure) => {
        departureList.push({
          countdown: departure.departureTime.countdown,
          servingLine: {
            number: departure.vehicle?.name,
            direction: departure.vehicle?.towards,
          }
        })
      })

    });
    
    res.send({
      departureList,
      parameters: [
        ...Object.entries(message).map((entry) => ({name: entry[0],
          value: entry[1]}))
      ],
      dm: {
        input: {
          input: data.monitors[0]?.locationStop.properties.title,
        }
      }
    });
  }
});

// Endpoint for proxy efa data to avoid issues with CORS
app.get('/efa-agg', async (req, res) => {


  const calculateReach = (countdown, foot, bike, run) => {
     if (countdown >= foot) {
      return 'mdi-walk';
    }
    if (countdown < bike) {
      return 'mdi-cancel'
    }
    if (countdown < run) {
      return 'mdi-bike';
    }
    if (countdown < foot) {
      return 'mdi-run-fast';
    }
  }

  const departureList = []
  await Promise.all(configuration.stationList.map(async (station) => {
    const stationId = station.id;
    if (configuration.mode == "efa") {
      let sessionCallResponse = await fetch(`${config.efaEndpoint}/XML_DM_REQUEST?sessionID=0&outputFormat=JSON&name_dm=${stationId}&itdDateTimeArr=dep&type_dm=any`);
      sessionCallResponse = await sessionCallResponse.json();
      const sessionId = sessionCallResponse.parameters.find((parameter) => parameter.name === 'sessionID').value;
      let data = await fetch(`${config.efaEndpoint}/XML_DM_REQUEST?sessionID=${sessionId}&requestID=1&dmLineSelection=4:x`);
      data = await data.json();
      data.departureList.forEach((entry) => {
        departureList.push({
            ...entry, 
            reach: calculateReach(entry.departureTime.countdown, station.foot, station.bike, station.run)
          });
      });
    } else if (configuration.mode == "wl") {
      let sessionCallResponse = await fetch(`${config.efaEndpoint}/monitor?rbl=${stationId}`);
      const {data, message} = await sessionCallResponse.json();

      data?.monitors[0]?.lines.forEach((line) => {
        line.departures.departure.forEach((departure) => {
          departureList.push({
            countdown: departure.departureTime.countdown,
            reach: calculateReach(departure.departureTime.countdown, station.foot, station.bike, station.run),
            servingLine: {
              number: departure.vehicle?.name,
              direction: departure.vehicle?.towards,
            }
          })
        })

      });
  }
  }));

  departureList.sort((a, b) => a.countdown - b.countdown);

  res.send({
    departureList,
    parameters: [
      {
        "name": "serverTime",
        "value": new Date(Date.now()).toLocaleTimeString([], { 
          hour: '2-digit',
          minute: '2-digit' 
        })
      }
    ],
    dm: {
      input: {
        input: "Abfahrten",
      }
    }
});
});

const server = app.listen(8080, () => {
   var host = server.address().address
   var port = server.address().port
   console.log('Timetable accessible at http://%s:%s', host, port)
})