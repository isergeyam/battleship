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
                <div class="home-main">
                    <div class="main-row">
                        <div class="main-left_column">
                            <h2>Hi {user.username}!</h2>
                            <p>You're logged in with React!!</p>
                            <p>
                                <Link to="/game/start">Start Game</Link>
                            </p>
                        </div>
                        <div class="main-right_column">
                            <h2>Column 2</h2>
                            <p>Some text..</p>
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