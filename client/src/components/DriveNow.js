/* global google*/

import _ from 'lodash';
import React, { Component } from 'react';
import DrivingWith from './DrivingWith';
import DriveReview from './DriveReview';
import * as actions from '../actions';
import { connect } from 'react-redux';
import carIcon from '../assets/car-icon.png';

class DriveNow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showListDriver: false,
      showDriving: false,
      showReview: false,
      showButton: true,
      drivingDriver: null
    };
    this.map = null;
  }

  findNearByDriver() {
    const pos = this.map.getCenter();
    const position = { lat: pos.lat(), lon: pos.lng() };
    this.props.findDrivers(position);
    this.setState({ showListDriver: true });
  }

  setMyPosition() {
    navigator.geolocation.getCurrentPosition(Position => {
      const p = Position.coords;
      this.map.setCenter({ lat: p.latitude, lng: p.longitude });
    });
  }

  renderReview() {
    if (this.state.showReview) {
      return (
        <DriveReview
          onSubmitReview={this.onSubmitReview.bind(this)}
          drivingDriver={this.state.drivingDriver}
        />
      );
    }
  }

  renderDriving() {
    if (this.state.showDriving) {
      return <DrivingWith drivingDriver={this.state.drivingDriver} />;
    }
  }

  drivingWith(driver) {
    this.setState({
      showListDriver: false,
      showDriving: true,
      showButton: false,
      drivingDriver: driver
    });
    console.log(this.props);
    this.props.saveTrips(driver);
    setTimeout(() => {
      this.setState({ showDriving: false, showReview: true });
    }, 3000);
  }

  onSubmitReview() {
    this.setState({ showReview: false, showButton: true });
  }

  renderDriverList() {
    const { drivers } = this.props.mapData;

    if (this.state.showListDriver) {
      return (
        <div className="row">
          <ul className="collection">
            {_.map(drivers, driver => {
              return (
                <li
                  className="collection-item"
                  key={driver._id}
                  style={{ height: 60 }}
                >
                  <div>
                    {driver.name}
                    <button
                      onClick={() => this.drivingWith(driver)}
                      className="btn grey darken-3 right"
                    >
                      <i className="material-icons">send</i>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }

  renderButton() {
    if (this.state.showButton) {
      return (
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div class="col s6 right-align">
            <button
              onClick={this.setMyPosition.bind(this)}
              className="grey darken-3 btn z-depth-2"
            >
              Set my position
            </button>
          </div>

          <div class="col s6 align-left">
            <button
              onClick={this.findNearByDriver.bind(this)}
              className="grey darken-3 btn z-depth-2"
            >
              Find driver here
            </button>
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: { lat: 47, lng: 2.2976143 }
    });
  }
  renderMarker() {
    const { mapData } = this.props;
    let marker = new google.maps.Marker({
      position: { lat: mapData.lat, lng: mapData.lon },
      map: this.map
    });
    mapData.drivers.map(driver => {
      let pos = driver.geometry.coordinates;
      let driverPosition = { lat: pos[1], lng: pos[0] };

      let marker = new google.maps.Marker({
        position: driverPosition,
        icon: carIcon
      });
      marker.setMap(this.map);
      google.maps.event.addListener(marker, 'click', function() {
        let infowindow = new google.maps.InfoWindow({
          content: driver.name
        });
        infowindow.open(this.map, marker);
      });
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div ref="map" style={{ height: 400 }} />
        </div>

        {this.renderMarker()}
        {this.renderButton()}
        {this.renderDriverList()}
        {this.renderDriving()}
        {this.renderReview()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state.map);
  return { mapData: state.map };
}

export default connect(
  mapStateToProps,
  actions
)(DriveNow);
