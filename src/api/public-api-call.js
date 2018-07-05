import stationsDictionary from './stationsDictionaryObject';
import formatResponse from './formatResponse';

const updateFromBART = ({ stationCode, date, cbFunc }) => {
  date = fixDate(date);
  if (isBadDateStr(date)) {
    console.error(`BAD DATE VALUE ${date} - Changing to TODAY`);
    date = 'today'; // <~~ Weird bit of their API. can be 'now' or 'today'
  }

  if (isBadStation(stationCode)) {
    console.error(`BAD STATION VALUE ${stationCode}- Changing to NORTH BERKELEY`);
    stationCode = 'nbrk';
  }
  
  const queryURL = `https://api.bart.gov/api/sched.aspx?cmd=stnsched&date=${date}&orig=${stationCode}&key=MW9S-E7SL-26DU-VV8V&json=y&l=1`

  fetch(queryURL).then(resp => {
    if(resp.ok){ return resp.json(); }
    throw new Error(`The fetch network response did not return .ok`);
  })
  .then( jsonData => {
    formatResponse(jsonData.root, cbFunc);
  })
  .catch(err => {
    console.log('Problem with fetch()-ing: ', err.message);
  })
};

const isBadStation = (code) => { return stationsDictionary[code] === undefined; }
const isBadDateStr = (dateArg) => {
  return !( /\d{2}\/\d{2}\/\d{4}/.test(dateArg) ); // A very very quick / not at all robust regexp test. 
}
const fixDate = (dateNumber) => {
  const dtObj = new Date(dateNumber);
  const mm = String(dtObj.getMonth() + 1).padStart(2,'0');
  const dd = String(dtObj.getDate()).padStart(2,'0');
  const yyyy = String(dtObj.getFullYear());
  return `${mm}/${dd}/${yyyy}`
}

export default updateFromBART;