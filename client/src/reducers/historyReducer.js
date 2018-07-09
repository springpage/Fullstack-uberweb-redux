import { HISTORY_DATA } from '../actions/types';

const INITIAL_STATE = { trips: [] };
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HISTORY_DATA:
      return { trips: action.payload };
    default:
      return state;
  }
}
