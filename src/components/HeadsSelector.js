import React from 'react';
import stationsDictionary from '../api/stationsDictionaryObject';

const HeadsSelector = ({ heads, handleFilterChange }) => {
  const handleChange = (e) => {
    e.preventDefault();
    handleFilterChange(e.target.value);
  }

  return (
    <div className="heads-selector">
      <label htmlFor="headToDisplay">Choose @trainHeadStation to display:</label>
      <select id="headToDisplay" onChange={ handleChange }>
        <option value="all" defaultValue>-SHOW ALL TRAINS-</option>
        { 
          heads.slice().sort().map( trainHeadStr => 
            <option
              key={trainHeadStr} 
              value={trainHeadStr}
            >{ stationsDictionary[trainHeadStr][0] }
            </option>
          )
        }
        </select>
    </div>
  );
}

export default HeadsSelector;