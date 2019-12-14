import {
  SELECT_SHIP,
  SET_ORIENTATION,
  SET_SHIP,
  CLEAR_SHIP
} from '../_helpers/action-types';
import { SHIP_LENGTHS } from '../_constants';

function initialState() {
  return {
    orientation: '',
    board: Array(10).fill(Array(10).fill("")),
    playerOne: {},
    playerTwo: {},
    selecting: true,
    shipSelected: '',
    shipLength: '',
  }
}

export const boardReducer = (state = initialState(), action) => {
  switch (action.type) {
    case SET_ORIENTATION:
      return {
        ...state,
        orientation: action.payload
      };
    case SELECT_SHIP:
      return {
        ...state,
        shipSelected: action.payload,
        shipLength: SHIP_LENGTHS[action.payload],
      };
    case SET_SHIP:
      return {
        ...state,
        [action.payload.player]: setShipsCoordinates(state[action.payload.player], action),
        shipSelected: '',
        shipLength: '',
      };
    case CLEAR_SHIP:
      return initialState()
    default:
      return state;
  }
};

const setShipsCoordinates = (state, action) => {
  switch (action.type) {
    case SET_SHIP:
      return { ...state, [action.payload.coordinates]: action.payload.shipName };
    default:
      return state;
  }
};
