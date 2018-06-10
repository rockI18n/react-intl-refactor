import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import intl from './intl';
import { loadIntlResources } from './utils';

class App extends Component {
    constructor() {
        super();
        this.state = { initDone: false };
    }

    componentDidMount() {
        loadIntlResources(_ => this.setState({ initDone: true }));
    }

    render() {
        return (this.state.initDone && 
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                    <h2 className="">{intl.get('dashboard')}</h2>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
