import React, { Component } from 'react';
import StationSelector from './components/StationSelector';
import QueryButton from './components/QueryButton';
import InfoDisplay from './components/InfoDisplay';
import './styles/App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasMadeFirstRequest: false,
      reqStationCode: null,
      reqDeparture: null,
      shouldDataReload: false
    }
    this.handleStationChange = this.handleStationChange.bind(this);
    this.triggerUpdate = this.triggerUpdate.bind(this);
    this.updateComplete = this.updateComplete.bind(this);
  }

  handleStationChange( newStation ){
    this.setState(()=>({ reqStationCode: newStation }));
  }

  triggerUpdate(){
    if ( this.state.reqStationCode && this.state.shouldDataReload===false ) {
/** TODO: **/
/* Make departureDate dynamic based on implementing a Date picker */
      this.setState(()=>({
        hasMadeFirstRequest: true,
        shouldDataReload: true,
        reqDeparture: Date.now()
      }));
    }
  }

  updateComplete() {
    if (this.state.shouldDataReload === true) {
      this.setState(()=>({ shouldDataReload: false }) )
    }
    return null;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">BART Schedule Lookup</h1>
        </header>
        <StationSelector changeStations={this.handleStationChange}/>
        <QueryButton handleClick={this.triggerUpdate}/>
        {
          this.state.hasMadeFirstRequest &&
          <InfoDisplay
            shouldDataReload={ this.state.shouldDataReload }
            station={ this.state.reqStationCode }
            reqDate={ this.state.reqDeparture }
            done={ this.updateComplete }
          />
        }

      </div>
    );
  }
}

export default App;

