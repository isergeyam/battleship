import React from 'react';
import './main_page.css'
import {
    Link
} from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <div class="topnav">
                <Link to={"/"}>Home</Link>
                <Link to={"/game"}>Game</Link>
            </div >
        );
    }
}

class Body extends React.Component {
    render() {
        return (
            <div class="main-main">
                <div class="main-row">
                    <div class="main-left_column">
                        <h2>Column 1</h2>
                        <p>Some text..</p>
                    </div>
                    <div class="main-right_column">
                        <h2>Column 2</h2>
                        <p>Some text..</p>
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
