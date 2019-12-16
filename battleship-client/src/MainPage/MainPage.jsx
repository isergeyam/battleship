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
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        console.log(width, height);
        return (
            <div className="main">
                <div className="row">
                    <div className="column-left">
                        <h1>{width}</h1>
                        <h1>{height}</h1>
                        <h2>Welcome!</h2>
                        <h3>This is battleship game.</h3>
                    </div>
                    <div className="column-right">
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
