import React from 'react';
import stationsDictionary from '../api/stationsDictionaryObject';

const ScheduleHeader = ({updatedAt, nameCode, date, scheduleNumber}) => (
  <div className="schedule-title">
    { stationsDictionary[nameCode] &&
      <h2> Departures from <span className="schedule-title-station_name">{ stationsDictionary[nameCode][0] }</span></h2>
    }
    <h3> Schedule for { date }</h3>
    <p><code>(Data Updated { updatedAt.replace(/\sGMT.*$/,'') })</code></p>
  </div>
);

export default ScheduleHeader;