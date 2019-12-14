import { history } from '../_helpers';
import { userService } from '../_services';
import { push } from 'react-router-redux';

import {
  ATTACK_SHIP,
  END_GAME,
  PLAYER_ONE_ATTACK,
  PLAYER_TWO_ATTACK,
  SELECT_SHIP,
  SET_IS_PLAYING,
  SET_ORIENTATION,
  SET_PLAYER_NAMES,
  SET_SHIP,
  START_NEW_GAME,
  TOGGLE_TURN,
  UPDATE_MESSAGE,
  PROCESS_TURN,
  PROCESS_ENEMY_TURN,
  SENDING_REQUEST,
  CLEAR_GAME,
  CLEAR_SHIP
} from '../_helpers/action-types';
import axios from '../_helpers/axios';
import { alertActions } from './alert.actions';
import { LOADING_IMG } from '../_constants';

export function attackShip(enemy, enemyShip) {
  return {
    type: ATTACK_SHIP,
    payload: {
      enemy,
      enemyShip
    }
  };
};

export function endGame(player) {
  return (dispatch) => {
    dispatch({
      type: END_GAME,
      payload: player
    });
    dispatch(push('/'));
  };
};

export function setIsPlaying(isPlaying) {
  return { type: SET_IS_PLAYING, payload: isPlaying };
};

export function playerOneAttack(coordinates) {
  return (dispatch) => {
    dispatch({
      type: PLAYER_ONE_ATTACK,
      payload: coordinates
    });
    dispatch(setIsPlaying(false));
  };
};

export function playerTwoAttack(coordinates) {
  return (dispatch) => {
    dispatch({
      type: PLAYER_TWO_ATTACK,
      payload: coordinates
    });
    dispatch(setIsPlaying(false));
  };
};

export function SubmitOnServer(ships, token) {
  return (dispatch) => {
    let requestData = {};

    requestData['playWithAI'] = false;
    requestData.token = token;

    let ships_dict = new Proxy({}, {
      get: (target, name) => {
        if (!(name in target)) {
          target[name] = {
            coords: []
          }
        }
        return target[name];
      }
    });

    for (const [coords, name] of Object.entries(ships)) {
      let coords_num = coords.split(',').map(Number);
      ships_dict[name].coords.push(coords_num);
      ships_dict[name].name = name
    }
    let ships_arr = Object.values(ships_dict);
    requestData.ships = ships_arr;

    console.log(requestData);

    console.log("Sending request!!!");
    dispatch(setSendingRequest(true));
    axios.post('/game/start', requestData)
      .then(userService.handleResponse)
      .catch(error => {
        console.log("SAME PLAYERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
        dispatch(alertActions.error(error.response.data.message));
        return Promise.reject();
      })
      .then(response => {
        dispatch(setSendingRequest(false));
        console.log("Got response: ", response);
        if (response == "start") {
          dispatch(setIsPlaying(true));
        }
        else if (response == "wait") {
          dispatch(setIsPlaying(false));
        }
        history.push("/ready/player");
      })
  };
};

export function clearShipsPayload() {
  return { type: CLEAR_SHIP }
}

export function clearShips() {
  dispatch => {
    dispatch(clearShipsPayload());
  }
}

export function setSendingRequest(value) {
  return { type: SENDING_REQUEST, payload: { value } };
}

export function submitTurnOnServer(turn_x, turn_y, token, waitTurn) {
  return (dispatch) => {
    let turn_data = {}
    turn_data['turn_x'] = turn_x
    turn_data['turn_y'] = turn_y
    turn_data['token'] = token
    axios.post('/game/turn', turn_data)
      .then(userService.handleResponse)
      .catch(error => handleResponse(error.response))
      .then(response => {
        console.log('Turn response: ', response);
        dispatch(setIsPlaying(false));
        if (response == "win") {
          dispatch(updateMessage('YOU WIN!!!'));
          dispatch(clearGame());
          return;
        }
        dispatch(renderTurn(response['hit'], response['sunk'], turn_x, turn_y));
        waitTurn(token);
      })
  }
}

export function waitTurn(token) {
  return (dispatch) => {
    console.log('Waiting for enemy turn...');
    axios.post('/game/wait', { token: token, another_field: "" })
      .then(userService.handleResponse)
      .catch(error => handleResponse(error.response))
      .then(response => {
        console.log('Wait for turn response: ', response);
        if (response == "lose") {
          dispatch(updateMessage("YOU LOSE!!!"));
          dispatch(clearGame());
          return;
        }
        const { hit, sunk, coords } = response;
        dispatch(renderEnemyTurn(hit, sunk, coords.first, coords.second));
        dispatch(setIsPlaying(true));
      })
  }
}

export function renderTurn(hit, sunk, turn_x, turn_y) {
  return { type: PROCESS_TURN, payload: { hit, sunk, turn_x, turn_y } };
}

export function renderEnemyTurn(hit, sunk, turn_x, turn_y) {
  return { type: PROCESS_ENEMY_TURN, payload: { hit, sunk, turn_x, turn_y } }
}

export function clearGame() {
  return { type: CLEAR_GAME }
}

export function setPlayerNames(playerOne, playerTwo) {
  return (dispatch) => {
    dispatch({
      type: SET_PLAYER_NAMES,
      payload: {
        playerOne,
        playerTwo
      }
    });
    history.push('/player-one')
  }
};

export function selectShip(ship) {
  return { type: SELECT_SHIP, payload: ship };
};

export function setShip(player, shipName, coordinates) {
  return {
    type: SET_SHIP,
    payload: {
      player,
      shipName,
      coordinates,
    }
  };
};

export function setOrientation(orientation) {
  return { type: SET_ORIENTATION, payload: orientation };
};

export function startNewGame() {
  return { type: START_NEW_GAME };
};

export function toggleTurn(player) {
  const pathname = player === 'playerOne' ? '/ready/player-one' : '/ready/player-two';
  return (dispatch) => {
    dispatch({
      type: TOGGLE_TURN,
      payload: player
    });
    dispatch(setIsPlaying(true));
    dispatch(push(pathname));
  };
};

export function updateMessage(message) {
  return { type: UPDATE_MESSAGE, payload: message };
};
