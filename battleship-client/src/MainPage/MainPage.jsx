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
                <Link to={"/"} class='active'>Home</Link>
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
                    </div>
                </div>
            </div>
        );
    }
}

class MainPage extends React.Component {
    render() {
        return (
            <div className="col-md-7 col-md-offset-2">

                <Header />
                <Body />
            </div>
        );
    }
}

export { MainPage, Header }
