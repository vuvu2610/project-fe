// src/websocketService.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const SOCKET_URL = 'http://localhost:8080/ws';

const client = new Client({
  brokerURL: SOCKET_URL,
  connectHeaders: {},
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
  webSocketFactory: () => new SockJS(SOCKET_URL),
});

client.onConnect = () => {
  console.log('Connected');
  client.subscribe('/topic/messages', message => {
    console.log('Message received:', message.body);
  });
};

client.onStompError = frame => {
  console.error('Broker reported error: ' + frame.headers['message']);
  console.error('Additional details: ' + frame.body);
};

export const connect = () => {
  client.activate();
};

export const sendMessage = message => {
  client.publish({ destination: '/app/chat', body: message });
};
