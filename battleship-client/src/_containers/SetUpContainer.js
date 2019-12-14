import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    SubmitOnServer,
    setShip,
    clearShips
} from '../_actions';
import Board from '../_components/Board';
import Button from '../_components/Button';
import OptionsContainer from './OptionsContainer';
import ShipsContainer from './ShipsContainer';
import { Header } from '../MainPage/MainPage'


class SetUpContainer extends React.Component {
    componentDidUpdate() {
        const { playerShips } = this.props;

        this.displayPlayerShips(playerShips);
    };

    displayPlayerShips = (playerShips) => {
        const table = document.getElementsByTagName('table')[0];

        Object.keys(playerShips).forEach(shipCoordinates => {
            let coordinatesArr = shipCoordinates.split(',');
            table.rows[coordinatesArr[0]].cells[coordinatesArr[1]].classList.add('marker');
        });

        console.log('playerShip coordinates: ', Object.keys(playerShips));
    }

    validCoordinates = (row, col, orientation, shipLength) => {
        return (
            (orientation === 'horizontal' && (col + shipLength - 1) <= 9) ||
            (orientation === 'vertical' && (row + shipLength - 1) <= 9)
        )
    };

    validPlacement = (coordinates, playerShips) => {
        const shipCoordinates = Object.keys(playerShips);
        const intersection = coordinates.map(c => {
            return shipCoordinates.includes(c);
        });

        return !intersection.includes(true);
    };

    buttonClickHandler = () => {
        const {
            playerShips,
            playerToken,
            SubmitOnServer
        } = this.props;
        clearShips();
        SubmitOnServer(playerShips, playerToken);
    };

    clickHandler = (e) => {
        const {
            orientation,
            player,
            playerShips,
            setShip,
            shipLength,
            shipSelected,
        } = this.props;
        const row = e.target.parentNode.rowIndex;
        const col = e.target.cellIndex;
        const coordinates = [];

        if (this.validCoordinates(row, col, orientation, shipLength)) {
            console.log('Valid move - on board');
            if (orientation === 'horizontal') {
                for (let i = col; i <= (col + shipLength - 1); i++) {
                    coordinates.push(`${row},${i}`);
                };
            };

            if (orientation === 'vertical') {
                for (let i = row; i <= (row + shipLength - 1); i++) {
                    coordinates.push(`${i},${col}`);
                };
            };

            if (this.validPlacement(coordinates, playerShips)) {
                coordinates.forEach(c => {
                    setShip(player, shipSelected, c);
                });
                console.log('Valid placement');
            } else {
                console.log('Invalid placement');
            };
        } else {
            console.log('Invalid move - off board');
        };
    };

    mouseOverHandler = (e) => {
        const {
            orientation,
            shipLength
        } = this.props;
        console.log(shipLength)
        const table = document.getElementsByTagName('table')[0];
        const row = e.target.parentNode.rowIndex;
        const col = e.target.cellIndex;

        if (this.validCoordinates(row, col, orientation, shipLength)) {
            if (orientation === 'horizontal') {
                for (let i = col; i <= (col + shipLength - 1); i++) {
                    console.log('Toggle cell')
                    table.rows[row].cells[i].classList.toggle('highlight')
                }
            }

            if (orientation === 'vertical') {
                for (let i = row; i <= (row + shipLength - 1); i++) {
                    table.rows[i].cells[col].classList.toggle('highlight')
                }
            }
        }
    };

    render() {
        const {
            board,
            playerName,
            playerShips,
            sendingRequest
        } = this.props;

        return (
            <div className="col-md-7 col-md-offset-2">
                <Header />
                <div className='main'>
                    <div className='game-main'>
                        <h1>{playerName}</h1>
                        <ShipsContainer />
                        <OptionsContainer />

                        <p>3. Place your ship on the board.</p>
                        <Board
                            board={board}
                            clickHandler={this.clickHandler}
                            mouseOverHandler={this.mouseOverHandler}
                        />
                        {/*Object.keys(playerShips).length === 17 ?*/ <Button clickHandler={this.buttonClickHandler} /> /*: null*/}
                        {sendingRequest &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const player = 'playerOne';
    let user = JSON.parse(localStorage.getItem('user'));

    return {
        board: state.board.board,
        player,
        orientation: state.board.orientation,
        playerName: user.username,
        playerToken: user.token,
        playerShips: state.board[player],
        shipLength: state.board.shipLength,
        shipSelected: state.board.shipSelected,
        sendingRequest: state.game.sendingRequest
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        SubmitOnServer,
        setShip,
        clearShips,
    }, dispatch);
};

const connectedSetUpContainer = connect(mapStateToProps, mapDispatchToProps)(SetUpContainer);
export { connectedSetUpContainer as SetUpContainer }
