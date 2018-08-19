import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const startCordova = () => {
    //this.receivedEvent('deviceready');
    console.log("deviceready");
    // OPTIONAL, better request permissions on your own.
    // Request needed location and notification permissions.
    window.beaconinsideRequestAuthorization();
    window.initBeaconinsideSDK("Lw5LyzyZGDtH5DyDebq7");
    startApp({withBeacons: true});
}

const startApp = (options) => {
    ReactDOM.render(<App {...options} />, document.getElementById('root'));
    registerServiceWorker();    
}

if(!window.cordova) {
    startApp({withBeacons: false})
} else {
    document.addEventListener('deviceready', startCordova, false)
}
