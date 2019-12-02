import React from 'react';
import './main_page.css'
import { userService } from '../_services';


// class PlayersList extends React.Component {
//     render() {
//         const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);
//         const user_winrate = zip(this.props.users, this.props.winrate);
//         const rows = user_winrate.map(user =>
//             <tr>
//                 <td>{user[0]}</td>
//                 <td>{user[1]}</td>
//             </tr>
//         );
//         return (
//             <table>
//                 <tbody>
//                     <tr>
//                         <th>Username</th>
//                         <th>Win rate</th>
//                     </tr>
//                     {rows}
//                 </tbody>
//             </table>
//         )
//     }
// }

class TopPlayers extends React.Component {
    constructor(props) {
        super(props);
        // const response = this.props.get_top_players();
        // this.state = { users: response[0], winrate: response[1] }

        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const response = this.props.get_top_players();
        this.setState({users: response[0], winrate: response[1]});

    }

    render() {
        return (
            <div>
                {/* <form name="form" onSubmit={this.handleSubmit}> */}
                {/* <PlayersList users={this.state.users} winrate={this.state.winrate} /> */}
            {/* </form> */}
            </div>

        );
    }
}

// const actionCreators = {
//     get_top_players: userService.get_top_players,
// };

// const connectedTopPlayers = connect(mapState, actionCreators)(TopPlayers);
export { TopPlayers };

