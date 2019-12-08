
import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { boardReducer } from './boardReducer';
import { gameReducer } from './gameReducer';
import { shipsReducer } from './shipsReducer';
import { userStatsReducer } from './user.reducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  authentication,
  registration,
  users: users,
  alert,
  board: boardReducer,
  game: gameReducer,
  ships: shipsReducer,
  route: routerReducer,
  user_stats: userStatsReducer,
});

export default rootReducer;