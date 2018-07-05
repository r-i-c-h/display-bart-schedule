import React, { Component } from 'react';
import ScheduleHeader from './ScheduleHeader';
import DataTable from './DataTable';

import updateFromBART from '../api/public-api-call';

export default class InfoDisplay extends Component {
  constructor(props){
    super(props);
// done << func() for app updateComplete to flip parent's shouldDataReload
// shouldDataReload Boolean ||  station 'code' ||  reqDate (number useless at the moment)
    this.state = {
      isLoading: true,
      lastUpdateAt: '',
      lastStationCode: '',
      lastStationDate: '',
      lastScheduleNumber: '',
      dataArr: [], // only { headStation, originTime }
      headOptionsArr: []
    }
    this.refreshSchedule = this.refreshSchedule.bind(this);
  }

  refreshSchedule(res) {
    // const timeNow =
    const timeNowStr = (new Date()).toString(); // weird issue w/passing props as object? This fixes it.
    this.setState(()=>({
      isLoading: false,
      lastUpdateAt: timeNowStr,
      lastStationCode: res.stationCode,
      lastStationDate: res.scheduleDate,
      lastScheduleNumber: res.scheduleNumber,
      dataArr: res.dataArr,
      headOptionsArr: res.headStationsArr,
    }));

    this.props.done();
  }

  componentDidMount() {
    updateFromBART({ stationCode:this.props.station, date:this.props.reqDate, cbFunc: this.refreshSchedule});
  }

  componentDidUpdate(prevProps, prevState){
    if ( (prevProps.shouldDataReload === false) && this.props.shouldDataReload ){
      this.setState({isLoading:true},()=>{
        updateFromBART({ stationCode:this.props.station, date:this.props.reqDate, cbFunc: this.refreshSchedule})
      })
    }
  }

  render() {
    if ( this.state.isLoading ){
      return (<div className="results"><hr /><img src="assets/loader.gif" alt="Now Loading..."/></div>);
    }
    return (
      <div className="results">
        <hr />
          <ScheduleHeader
            nameCode={this.state.lastStationCode}
            date={this.state.lastStationDate}
            scheduleNumber={this.state.lastScheduleNumber}
            updatedAt={this.state.lastUpdateAt}
          />
          <DataTable
            headsArr={ this.state.headOptionsArr }
            dataArr={ this.state.dataArr }
          />
      </div>
    )
  }
}