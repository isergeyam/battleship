import {
  END_GAME,
  PLAYER_ONE_ATTACK,
  PLAYER_TWO_ATTACK,
  SET_IS_PLAYING,
  SET_PLAYER_NAMES,
  TOGGLE_TURN,
  UPDATE_MESSAGE,
  PROCESS_TURN,
  PROCESS_ENEMY_TURN,
  SENDING_REQUEST
} from '../_helpers';

export const gameReducer = (state = {
  gameOver: false,
  isPlaying: true,
  message: '',
  playerOneName: '',
  playerOne: [],
  playerTwoName: '',
  playerTwo: [],
  playerTurn: 'playerOne',
  attacks: [],
  enemyAttacks: [],
  sendingRequest: false
}, action) => {
  switch (action.type) {
    case END_GAME:
      return {
        ...state,
        gameOver: true,
        winner: action.payload
      };
    case PLAYER_ONE_ATTACK:
      return {
        ...state,
        playerOne: [
          ...state.playerOne,
          action.payload
        ]
      };
    case PLAYER_TWO_ATTACK:
      return {
        ...state,
        playerTwo: [
          ...state.playerTwo,
          action.payload
        ]
      };
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload
      };
    case SET_PLAYER_NAMES:
      return {
        ...state,
        playerOneName: action.payload.playerOne,
        playerTwoName: action.payload.playerTwo
      };
    case TOGGLE_TURN:
      return {
        ...state,
        message: '',
        playerTurn: action.payload,
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case PROCESS_TURN: {
      const newState = JSON.parse(JSON.stringify(state))
      const {
        hit, sunk, turn_x, turn_y
      } = action.payload;
      UpdateAttacks(newState.attacks, turn_x, turn_y, hit, sunk);
      return newState;
    }
    case PROCESS_ENEMY_TURN: {
      const newState = JSON.parse(JSON.stringify(state))
      const {
        hit, sunk, turn_x, turn_y
      } = action.payload;
      UpdateAttacks(newState.enemyAttacks, turn_x, turn_y, hit, sunk);
      return newState;
    }
    case SENDING_REQUEST: {
      let { value } = action.payload;
      return { ...state, sendingRequest: value }
    }
    default:
      return state;
  }
};

function UpdateAttacks(attacks, turn_x, turn_y, hit, sunk) {
  if (sunk) {
    hit = "sunk";
  }

  attacks.push([turn_x, turn_y, hit]);
  if (!sunk) {
    return;
  }

  for (let turn = turn_y - 1; ; --turn) {
    const index = attacks.findIndex(obj => obj[0] === turn_x && obj[1] === turn && obj[2]);
    console.log(index, turn_x, turn);
    if (index === -1) {
      break;
    }
    attacks[index][2] = "sunk";
  }

  for (let turn = turn_y + 1; ; ++turn) {
    const index = attacks.findIndex(obj => obj[0] === turn_x && obj[1] === turn && obj[2]);
    console.log(index);
    if (index === -1) {
      break;
    }
    attacks[index][2] = "sunk";
  }

  for (let turn = turn_x + 1; ; ++turn) {
    const index = attacks.findIndex(obj => obj[0] === turn && obj[1] === turn_y && obj[2]);
    console.log(index);
    if (index === -1) {
      break;
    }
    attacks[index][2] = "sunk";
  }

  for (let turn = turn_x - 1; ; --turn) {
    const index = attacks.findIndex(obj => obj[0] === turn && obj[1] === turn_y && obj[2]);
    console.log(index);
    if (index === -1) {
      break;
    }
    attacks[index][2] = "sunk";
  }
}
