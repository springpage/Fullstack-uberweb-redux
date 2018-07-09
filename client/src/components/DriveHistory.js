import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class DriveHistory extends Component {
  componentDidMount() {
    this.props.getTrips();
    console.log(this.props);
  }
  renderTrips() {
    return this.props.history.trips.map(trip => {
      return(
        <div className="card darken-1" key={trip._id}>
          <div className="card-content">
            <span className="card-title">Drived with {trip.driverName}</span>
            <p>

            </p>
            <p className="right">
              On date: {new Date(trip.driveDate).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            Review: {trip.review}
          </div>
        </div>

      )
    });
  }
  render() {
    return(
      <div>
        {this.renderTrips()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { history: state.history };
}

export default connect(
  mapStateToProps,
  actions
)(DriveHistory);
