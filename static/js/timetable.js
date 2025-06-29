const loadNextStationDepartures = async (stationId) => {
  const dmResponse = await (await fetch(`/efa?stationid=${stationId}`)).json();
  const nextDepartures = [];
  dmResponse.departureList.forEach((departure) => {
    nextDepartures.push({
      time:  parseInt(departure.countdown),
      line:  departure.servingLine.number,
      destination: departure.servingLine.direction,
    });
  });
  return {
    departures: nextDepartures.sort((a,b) =>a.time > b.time),
    time: dmResponse.parameters.find((parameter) => parameter.name === 'serverTime').value,
    stationName:dmResponse.dm.input.input,
  };
}

const calculateReachElement = (countdown, bike, run, foot) => {
  const icon = document.createElement("i");
  icon.classList.add('mdi');
  if (countdown >= foot) {
    icon.classList.add('mdi-walk');
    return icon;
  }
  if (countdown < bike) {
    icon.classList.add('mdi-cancel');
    return icon;
  }
  if (countdown < run) {
    icon.classList.add('mdi-bike');
    return icon;
  }
  if (countdown < foot) {
    icon.classList.add('mdi-run-fast');
    return icon;
  }
}

const removeOldData = (element) => {
  if (element.rows.length > 1) {
    while(element.rows.length > 1){
      element.deleteRow(-1);
    }
  }
};

const renderDepartureData = () => {
  const departureBoardList = Array.prototype.slice.call(document.getElementsByClassName("departureBoard"));
  const selectedStations = departureBoardList.map((board) => board.getAttribute("station"));
  console.log(selectedStations);
  selectedStations.forEach((stationId, index) => {
    loadNextStationDepartures(stationId).then((departureData) => {
      // Remove old data
      removeOldData(departureBoardList[index].getElementsByTagName('table')[0]);

      // Set Board Header
      const stationNameElement = departureBoardList[index].getElementsByClassName('stationName')[0];
      stationNameElement.innerHTML = departureData.stationName;
      const updateTimeElement = departureBoardList[index].getElementsByClassName('timeStamp')[0];
      updateTimeElement.innerHTML = departureData.time;

      // Add all Departures
      departureData.departures.forEach((departureEntry, entryIndex) => {
        if (entryIndex <= 8) {
          const newRow =  departureBoardList[index].getElementsByTagName('table')[0].insertRow(-1);
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
          reachColumn.appendChild(calculateReachElement(
            parseInt(departureEntry.time),
            parseFloat(departureBoardList[index].getAttribute("bike")),
            parseFloat(departureBoardList[index].getAttribute("run")),
            parseFloat(departureBoardList[index].getAttribute("foot")),
          ));
          newRow.insertCell(3).appendChild(reachColumn);
        }
      });
    }).catch((e) =>  {
      console.error(e);
    })
  });
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