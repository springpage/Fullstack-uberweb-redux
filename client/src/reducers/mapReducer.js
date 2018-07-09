import { MAP_DATA } from '../actions/types';

const INITIAL_STATE = { lat: 47, lon: 2.2976143, drivers: []};
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MAP_DATA:
      let { lat, lon, drivers } = action.payload;
      return { lat, lon, drivers };
    default:
      return state;
  }
}
