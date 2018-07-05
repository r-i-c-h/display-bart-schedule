import React, {Component} from 'react';
import stationsDictionary from '../api/stationsDictionaryObject';
import HeadsSelector from './HeadsSelector';
// headsArr string codes, 
// dataArr items have { headStation, originTime }

export default class DataTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      showAll: true,
      filterValue: ''
    }
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(filterVal){
    if (filterVal==="all"){
      this.setState(()=>({ showAll: true }));
    } else {
      this.setState(()=>({ showAll: false, filterValue:filterVal}));
    }
  }

  render(){
    let dataToDisplay 
    if (this.state.showAll === true){ 
      dataToDisplay = this.props.dataArr 
    } else {
      dataToDisplay = this.props.dataArr.filter( entry => entry.headStation === this.state.filterValue );
    }
    return (<div>
      <HeadsSelector heads={this.props.headsArr} handleFilterChange={this.handleFilterChange} />
      <div>
        <ul className="infoList">
        { 
          dataToDisplay.map(trainData => {
            return (
              <li className="train-info-li" key={(trainData.originTime+trainData.headStation)}>
                Time: { trainData.originTime } --- TrainHeadStation: { stationsDictionary[trainData.headStation][0] }
              </li>
            );
          })
        }
        </ul>
      </div>
    </div> );
  }
};