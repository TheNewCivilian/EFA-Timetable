const configuration = {
  // Path to EFA endpoint
  efaEndpoint: 'https://www.wienerlinien.at/ogd_realtime',//'https://efa.avv-augsburg.de/avv2/',
  mode: 'wl', // efa or wl for wiener linien
  // Wiener Linien Dok:
  // https://data.wien.gv.at/pdf/wienerlinien-echtzeitdaten-dokumentation.pdf
  // https://till.mabe.at/rbl/?line=136&station=22572
  // List of stations with distance in minutes
  stationList: [{
    id: 3431,
    bike: 100,
    run: 3,
    foot: 5,
  },{
    id: 1659,
    bike: 4,
    run: 8,
    foot: 10,
  },{
    id: 4103,
    bike: 100,
    run: 8,
    foot: 10,
  }],
}

module.exports = configuration;