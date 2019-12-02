import React from 'react';
import './main_page.css'
import { userService } from '../_services';
import { connect } from 'react-redux';



class PlayersList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);
        const user_winrate = zip(this.props.users, this.props.winrate);
        console.log(user_winrate);
        const rows = user_winrate.map(user =>
            <tr>
                <td>{user[0]}</td>
                <td>{user[1]}</td>
            </tr>
        );
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Username</th>
                        <th>Win rate</th>
                    </tr>
                    {rows}
                </tbody>
            </table>
        )
    }
}

class TopPlayers extends React.Component {
    constructor(props) {
        super(props);
        const { users, winrate } = this.props.get_top_players();
        this.state = { users: users, winrate: winrate }
    }

    render() {
        return (
            <div>
                <PlayersList users={this.state.users} winrate={this.state.winrate} />
            </div>

        );
    }
}

function mapState(state) {
    return {};
}

const actionCreators = {
    get_top_players: userService.get_top_players,
};

const connectedTopPlayers = connect(mapState, actionCreators)(TopPlayers);
export { connectedTopPlayers as TopPlayers };

