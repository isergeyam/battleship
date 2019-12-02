import React from 'react';
import './main_page.css'
import {
    Link
} from "react-router-dom";
import { TopPlayers } from './TopPlayers';


class Header extends React.Component {
    render() {
        return (
            <div className="topnav">
                <Link to={"/"}>Home</Link>
                <Link to={"/game"}>Game</Link>
            </div >
        );
    }
}

class Body extends React.Component {
    render() {
        return (
            <div className="main-main">
                <div className="main-row">
                    <div className="main-left_column">
                        <h2>Column 1</h2>
                        <p>Some text..</p>
                    </div>
                    <div className="main-right_column">
                        <TopPlayers />
                        1
                    </div>
                </div>
            </div>
        );
    }
}

class MainPage extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Body />
            </div>
        );
    }
}

export { MainPage }
