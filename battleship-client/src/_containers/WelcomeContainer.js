import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setPlayerNames,
  startNewGame,
} from '../_actions';
import GameOver from '../_components/GameOver';
import Welcome from '../_components/Welcome';

class WelcomeContainer extends React.Component {
  render() {
    console.log("Rendering welcome container");
    const {
      gameOver,
      setPlayerNames,
      startNewGame,
      winner,
    } = this.props;

    return gameOver ?
      <GameOver
        clickHandler={startNewGame}
        winner={winner}
      /> :
      <Welcome submitHandler={setPlayerNames} />;
  }
};

const mapStateToProps = (state) => {
  return {
    gameOver: state.game.gameOver,
    winner: state.game.winner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setPlayerNames,
    startNewGame,
  }, dispatch);
};

const connectedWelcomeContaner = connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer);
export {connectedWelcomeContaner as WelcomeContainer}
