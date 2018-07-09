import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class DriveReview extends Component {
  state = { afterSubmit: false, reviewText: '' };

  onSubmit(trip, reviewText) {
    const updateData = { tripID: trip.tripNow._id, reviewText };
    this.props.submitReview(updateData);
  }

  render() {
    const { onSubmitReview } = this.props;

    if (this.state.afterSubmit) {
      return (
        <div className="row center">
          <div className="card-panel">
            <span className="blue-text text-darken-2">
              Your review was submitted.
            </span>
          </div>
          <div className="row center">
            <button
              onClick={() => {
                onSubmitReview();
              }}
              className="grey darken-3 btn"
            >
              OK
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="row center">
        <div className="card-panel">
          <span className="blue-text text-darken-2">
            Your Drive finished. Please give your review.
          </span>
        </div>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="textarea1"
                className="materialize-textarea"
                value={this.state.reviewText}
                onChange={event => {
                  this.setState({ reviewText: event.target.value });
                }}
              />
            </div>
          </div>
        </form>
        <div className="row center">
          <button
            onClick={() => {
              this.setState({ afterSubmit: true });
              this.onSubmit(this.props.trip, this.state.reviewText);
            }}
            className="indigo accent-2 btn"
          >
            Submit review
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { trip: state.trip };
}

export default connect(
  mapStateToProps,
  actions
)(DriveReview);
