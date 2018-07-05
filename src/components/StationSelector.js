import React from 'react';
import stationsDictionary from '../api/stationsDictionaryObject';

const StationSelector = ({ changeStations }) => {
  const handleChange = (e) => {
    e.preventDefault();
    changeStations(e.target.value);
  }

  return (
    <div className="select-station">
      <label htmlFor="departureStation">Choose Departure Station:</label>
      <select id="departureStation" onChange={ handleChange }>
        <option value="none" defaultValue>--SELECT STATION--</option>
        { 
          Object.keys(stationsDictionary).sort().map( stationID => 
            <option
              key={stationID} 
              value={stationID}
            >{ stationsDictionary[stationID][0] }
            </option>
          )
        }
        </select>
    </div>
  );
}
export default StationSelector;