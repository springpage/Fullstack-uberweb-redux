import { TRIP_DATA } from '../actions/types';

const INITIAL_STATE = { tripNow: null };
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TRIP_DATA:
      return { tripNow: action.payload };
    default:
      return state;
  }
}
