import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import msgHTML from "./msghtml.js";
      
// collect chat current data
const urlParams = new URLSearchParams(window.location.search);
const msgto = urlParams.get('msgto');
const userDiv = document.getElementById('login-user');
const currentUser = userDiv ? userDiv.dataset.user : null;

// initiate socket connection
const socket = io();
const connection = io('ws://localhost:3000');

socket.on('connect', () => {

  // send to backend converation details
  socket.emit('join', { from: currentUser, to: msgto});

  // replace submit event and emit new message event to socket
  // -------------------------------------------------------------
  document.getElementById('chat-form').addEventListener("submit", function (event) {
    event.preventDefault();
    const message = document.getElementById('chat-message').value;
    socket.emit('onUpdate:client', { 
      from: currentUser, 
      to: msgto,
      message: message
    });
    document.getElementById('chat-message').value = "";
  });

  // on update messases own or from counterpart
  // -------------------------------------------------------------
  socket.on('onUpdate:server', function(payload) {
    // insert item to chat
    const userDiv = document.getElementById('login-user');
    const currentUser = userDiv ? userDiv.dataset.user : null;
    const isOwnMsg = (currentUser == payload.from) ? true : false;
    document.getElementById('chat-body').innerHTML += msgHTML(payload.from, payload.message, payload.date, isOwnMsg);
    // scroll chat to bottom with js
    const myDiv = document.getElementById("chat");
    myDiv.scrollTop = myDiv.scrollHeight;
  });

});

