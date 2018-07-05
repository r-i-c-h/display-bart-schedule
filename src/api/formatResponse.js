const formatResponse = (data, cbFunc) => {
  let uniqHeadsHashObj = {};
  let newFormat = {
    scheduleDate: data.date, 
    scheduleNumber: data.sched_num,
    stationCode: data.station.abbr.toLowerCase(),
    dataArr: [],
    headStationsArr: []
  }

  // map AND get uniq @trainHeadStations
  data.station.item.forEach( eachTrain => {
    uniqHeadsHashObj[ eachTrain['@trainHeadStation'].toLowerCase() ] = 1;
    let newTrainObj = {
      headStation: eachTrain['@trainHeadStation'].toLowerCase(),
      originTime: eachTrain['@origTime']
    }
    newFormat.dataArr.push(newTrainObj);
  }) 
  newFormat.headStationsArr = Object.keys(uniqHeadsHashObj);

  cbFunc(newFormat);
};

export default formatResponse