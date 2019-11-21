import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectShip } from '../_actions';
import Ships from '../_components/Ships';

class ShipsContainer extends React.Component {
  render() {
    const {
      playerShips,
      selectShip,
    } = this.props;

    return (
      <Ships
        clickHandler={selectShip}
        playerShips={playerShips}
      />
    );
  }
};

const mapStateToProps = (state) => {
  const player = 'playerOne'

  return {
    playerShips: state.board[player],
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectShip,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipsContainer);
