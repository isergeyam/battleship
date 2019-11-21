import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { boardReducer } from './boardReducer';
import { gameReducer } from './gameReducer';
import { shipsReducer } from './shipsReducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  board: boardReducer,
  game: gameReducer,
  ships: shipsReducer,
});

export default rootReducer;