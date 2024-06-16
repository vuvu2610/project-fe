// src/webrtcService.js
import SimplePeer from 'simple-peer';

let peer = null;

export const createPeer = (initiator, stream, onSignal, onStream) => {
  peer = new SimplePeer({
    initiator,
    stream,
    trickle: false,
  });

  peer.on('signal', data => {
    onSignal(data);
  });

  peer.on('stream', stream => {
    onStream(stream);
  });

  return peer;
};

export const signalPeer = data => {
  peer.signal(data);
};
