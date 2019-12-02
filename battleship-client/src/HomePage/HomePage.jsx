import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';

import { userActions } from '../_actions';

class Header extends React.Component {
    render() {
        return (
            <div class="topnav">
                <Link to={"/"}>Home</Link>
                <Link to={"/login"}>Logout</Link>
            </div >
        );
    }
}

class HomePage extends React.Component {
    componentDidMount() {
        // this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <Header />
                <div className='home-main'>
                    <div className='home-row'>
                        <div className='home-left_column'>
                            <h1>Hi {user.username}!</h1>
                            <p>You're logged in with React!!</p>
                            <p>
                                <Link to="/game/start">Start Game</Link>
                            </p>
                            <p>
                                <Link to="/login">Logout</Link>
                            </p>
                            <p>
                                <Link to="/ready/player">Resume Game</Link>
                            </p>
                        </div>
                        <div className='home-right_column'>
                            right_column
                </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };