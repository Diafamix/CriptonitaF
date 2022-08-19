
/**var SockJS = require('sockjs-client');
var Stomp = require('stompjs');

var client = Stomp.overWS('ws://localhost:8080/wss');

console.log("connecting to things");
client.connect({connectCallback: () => {
    console.log('Connected');
    client.subscribe("/crypto/cardano", message => {
        console.log(message);
    })
}, errorCallback: () => {
    console.log('Error');
}});

setTimeout(() => {  
    client.subscribe("/crypto/cardano", message => {
        console.log(message.body);
    })
 }, 500);

console.log("should be connecting??"); **/

import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { useState, useEffect } from "react";

const WebSocketConsumer = () => {


    useEffect(() => {
        var client = Stomp.overWS('ws://localhost:8080/wss');

        client.connect({
            connectCallback: () => {
                console.log('Connected');
                client.subscribe("/crypto/cardano", message => {
                    console.log(message);
                })
            }, errorCallback: () => {
                console.log('Error');
            }
        });

        setTimeout(() => {
            client.subscribe("/crypto/all", message => {
                const event = new Event('onDialogClose');
                elem.dispatchEvent(event);
            })
        }, 500);

    }, [])


}

export default WebSocketConsumer;