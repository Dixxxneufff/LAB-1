/*
 *  Copyright (c) 2021 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

const startButton = document.getElementById('startButton');
const hangupButton = document.getElementById('hangupButton');
hangupButton.disabled = true;

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

localVideo.addEventListener('click', () => {
    // Intercambia las clases para cambiar el tamaño y la posición
    localVideo.classList.toggle('large');
    remoteVideo.classList.toggle('small');

    if (localVideo.classList.contains('large')) {
        localVideo.style.position = 'static';
        localVideo.style.width = '80%';
        localVideo.style.margin = '0 auto';
        localVideo.style.display = 'block';
        remoteVideo.style.position = 'absolute';
        remoteVideo.style.top = '20px';
        remoteVideo.style.right = '20px';
        remoteVideo.style.width = '25%';
        remoteVideo.style.margin = '0';

    } else {
        localVideo.style.position = 'absolute';
        localVideo.style.top = '20px';
        localVideo.style.right = '20px';
        localVideo.style.width = '25%';
        localVideo.style.margin = '0';
        remoteVideo.style.position = 'static';
        remoteVideo.style.width = '80%';
        remoteVideo.style.margin = '0 auto';
        remoteVideo.style.display = 'block';
    }
});


/* Parte del chat */
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

chatForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que se recargue la página
    const message = chatInput.value;
    if (message.trim() !== '') {
        signaling.postMessage({ type: 'chat', message: message });
        displayMessage('Tú: ' + message); // Muestra tu propio mensaje
        chatInput.value = ''; // Limpia el input
    }
});

/********* FIN CHAT ************/

let pc;
let localStream;
let callState = 'idle'; //para controlar el estado de la llamada

const signaling = new BroadcastChannel('webrtc');
signaling.onmessage = e => {
  if (!localStream) {
    console.log('not ready yet');
    return;
  }
  switch (e.data.type) {
    case 'offer':
        callState = 'Conectando...';
        updateCallStatus();
        handleOffer(e.data);
        break;
    case 'answer':
        callState = 'Llamada en curso';
        updateCallStatus();
        handleAnswer(e.data);
        break;
    case 'candidate':
      handleCandidate(e.data);
      break;
    case 'ready':
      // A second tab joined. This tab will initiate a call unless in a call already.
      if (pc) {
        console.log('already in call, ignoring');
        return;
      }
      makeCall();
      break;
    case 'bye':
      if (pc) {
		callState = 'Llamada finalizada';
        updateCallStatus();
        hangup();
      }
      break;
	case 'chat':
        displayMessage('Otro: ' + e.data.message);
        break;
    default:
      console.log('unhandled', e);
      break;
  }
};

startButton.onclick = async () => {
  try {
	localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
	localVideo.srcObject = localStream;


	startButton.disabled = true;
	hangupButton.disabled = false;
	
	signaling.postMessage({type: 'ready'});
   } catch (error) {
     callState = 'Error al acceder a la cámara/micrófono: ' + error.message; //Control de errores
     updateCallStatus();
	 console.error(error);
    }
};

hangupButton.onclick = async () => {
  hangup();
  signaling.postMessage({type: 'bye'});
};

async function hangup() {
  if (pc) {
    pc.close();
    pc = null;
  }
  localStream.getTracks().forEach(track => track.stop());
  localStream = null;
  startButton.disabled = false;
  hangupButton.disabled = true;
};

function createPeerConnection() {
  pc = new RTCPeerConnection();
  pc.onicecandidate = e => {
    const message = {
      type: 'candidate',
      candidate: null,
    };
    if (e.candidate) {
      message.candidate = e.candidate.candidate;
      message.sdpMid = e.candidate.sdpMid;
      message.sdpMLineIndex = e.candidate.sdpMLineIndex;
    }
    signaling.postMessage(message);
  };
  pc.ontrack = e => remoteVideo.srcObject = e.streams[0];
  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
}

async function makeCall() {
  await createPeerConnection();

  const offer = await pc.createOffer();
  signaling.postMessage({type: 'offer', sdp: offer.sdp});
  await pc.setLocalDescription(offer);
}

async function handleOffer(offer) {
  if (pc) {
    console.error('existing peerconnection');
    return;
  }
  await createPeerConnection();
  await pc.setRemoteDescription(offer);

  const answer = await pc.createAnswer();
  signaling.postMessage({type: 'answer', sdp: answer.sdp});
  await pc.setLocalDescription(answer);
}

async function handleAnswer(answer) {
  if (!pc) {
    console.error('no peerconnection');
    return;
  }
  await pc.setRemoteDescription(answer);
}

async function handleCandidate(candidate) {
  if (!pc) {
    console.error('no peerconnection');
    return;
  }
  if (!candidate.candidate) {
    await pc.addIceCandidate(null);
  } else {
    await pc.addIceCandidate(candidate);
  }
}

function displayMessage(message) {
    const li = document.createElement('li');
    li.textContent = message;
    chatMessages.appendChild(li);
}