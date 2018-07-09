import axios from 'axios';
import {
  FETCH_USER,
  MAP_DATA,
  TRIP_DATA,
  HISTORY_DATA,
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const findDrivers = position => async dispatch => {
  axios.post('/api/findDrivers', position).then(res => {
    dispatch({
      type: MAP_DATA,
      payload: { ...position, drivers: res.data }
    });
  });
};

export const saveTrips = tripData => async dispatch => {
  const res = await axios.post('/api/saveTrip', tripData);
  dispatch({ type: TRIP_DATA, payload: res.data });
};

export const submitReview = updateData => async dispatch => {
  const res = await axios.post('/api/updateTrip', updateData);
};

export const getTrips = () => async dispatch => {
  const res = await axios.get('/api/getTrips');
  dispatch({ type: HISTORY_DATA, payload: res.data });
};
