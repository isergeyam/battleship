import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';

import { Stats } from './Stats';


class Header extends React.Component {
    render() {
        return (
            <div className="topnav">
                <Link to={"/"} class='active'>Home</Link>
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
        const { user } = this.props;
        return (
            <div>
                <div className="col-md-7 col-md-offset-2">

                    <Header />
                    <div className='home-main'>
                        <div className='home-row'>
                            <div className='home-left_column'>
                                <h1>Hi {user.username}!</h1>
                                <p>You're logged in with React!!</p>
                                <p className='link'>
                                    <Link to="/game/start">Start Game</Link>
                                </p>
                                <p className='link'>
                                    <Link to="/login">Logout</Link>
                                </p>
                                <p className='link'>
                                    <Link to="/ready/player">Resume Game</Link>
                                </p>
                            </div>
                            <div className='home-right_column'>
                                <Stats />
                            </div>
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