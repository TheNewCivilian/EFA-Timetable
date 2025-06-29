const loadNextStationDepartures = async () => {
  const dmResponse = await (await fetch(`/efa-agg`)).json();
  const nextDepartures = [];
  dmResponse.departureList.forEach((departure) => {
    nextDepartures.push({
      time:  parseInt(departure.countdown),
      line:  departure.servingLine.number,
      reach: departure.reach,
      destination: departure.servingLine.direction,
    });
  });
  return {
    departures: nextDepartures.sort((a,b) =>a.time > b.time),
    time: dmResponse.parameters.find((parameter) => parameter.name === 'serverTime').value,
    stationName:dmResponse.dm.input.input,
  };
}

const removeOldData = (element) => {
  if (element.rows.length > 1) {
    while(element.rows.length > 1){
      element.deleteRow(-1);
    }
  }
};

const renderDepartureData = () => {
  const departureBoard = document.getElementsByClassName("departureBoard")[0];
  loadNextStationDepartures().then((departureData) => {
    // Remove old data
    removeOldData(departureBoard.getElementsByTagName('table')[0]);

    // Set Board Header
    const stationNameElement = departureBoard.getElementsByClassName('stationName')[0];
    stationNameElement.innerHTML = departureData.stationName;
    const updateTimeElement = departureBoard.getElementsByClassName('timeStamp')[0];
    updateTimeElement.innerHTML = departureData.time.substring(0, 5);

    // Add all Departures
    departureData.departures.forEach((departureEntry, entryIndex) => {
      if (entryIndex <= 8) {
        const newRow =  departureBoard.getElementsByTagName('table')[0].insertRow(-1);
        newRow.classList.add("entry");

        const lineColumn = document.createElement("td");
        lineColumn.innerHTML = departureEntry.line;
        newRow.insertCell(0).appendChild(lineColumn);

        const destColumn = document.createElement("td");
        destColumn.innerHTML = departureEntry.destination;
        newRow.insertCell(1).appendChild(destColumn);

        const timeColumn = document.createElement("td");
        if (departureEntry.time > 0) {
          timeColumn.innerHTML = `${departureEntry.time}min`;
        } else {
          const departingImage = document.createElement("img");
          departingImage.src='/images/departing.gif';
          departingImage.classList.add('departing-image');
          timeColumn.appendChild(departingImage);
        }
        newRow.insertCell(2).appendChild(timeColumn);

        const reachColumn = document.createElement("td");

        const icon = document.createElement("i");
        icon.classList.add('mdi');
        icon.classList.add(departureEntry.reach);
        reachColumn.appendChild(icon);
        newRow.insertCell(3).appendChild(reachColumn);
      }
    });
  }).catch((e) =>  {
    console.error(e);
  })
}

updateLoop = () => {
  setTimeout(() => {
    renderDepartureData();
    updateLoop();
  }, 30000)
}

window.onload = () => {
  renderDepartureData();
  updateLoop();
};