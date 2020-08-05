const configuration = {
  // Path to EFA endpoint
  efaEndpoint: 'https://efa.avv-augsburg.de/avv2/',
  // List of stations with distance in minutes
  stationList: [{
    id: 2000101,
    bike: 5,
    run: 8,
    foot: 10,
  },{
    id: 2000664,
    bike: 5,
    run: 8,
    foot: 10,
  }],
}

module.exports = configuration;