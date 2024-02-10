import React, { useState } from "react";

const Chat = () => {
  const [socket, setSocket] = useState(null);

  function connect() {
    const name = document.getElementById("name").value;

    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.addEventListener("open", function (event) {
      newSocket.send(JSON.stringify({ name }));
    });

    newSocket.addEventListener("message", function (event) {
      console.log(event.data);
      let jsonData = JSON.parse(event.data);

      if (jsonData.message) {
        addMessageToPage(
          `${jsonData.name}: ${jsonData.message}`,
          `${jsonData.name}`
        );
      } else {
        addMessageToPage(`${jsonData.announcement}`, `test`);
      }
    });

    setSocket(newSocket);
  }

  function sendMessage() {
    let messagesContainer = document.querySelector("#messages");

    let message = document.getElementById("message").value;

    socket.send(JSON.stringify({ message }));

    addMessageToPage(`Me: ${message}`);
  }

  function addMessageToPage(message, name) {
    let container = document.createElement("div");
    if (name) {
      container.classList.add("left");
    } else {
      container.classList.add("right");
    }

    let textMessage = document.createElement("p");
    textMessage.appendChild(document.createTextNode(message));

    container.appendChild(textMessage);

    document.getElementById("messages").appendChild(container);
  }

  return (
    <div>
      <h1>Chati</h1>

      {/* <div className="textBox">
        <p>test</p>
        <img
          src="https://www.freeiconspng.com/uploads/text-box-png-27.png"
          width="100"
          alt="Clipart PNG Text Box"
        />
      </div> */}

      <section className="wrapper">
        <div>
          <input id="name"></input>
          <button onClick={connect}>Connect</button>
        </div>
        <div>
          <input id="message"></input>
          <button onClick={sendMessage}>Send Message</button>
        </div>
      </section>

      <div className="chatBox-wrapper">
        <section className="chat-wrapper">
          <span id="messages"></span>
        </section>
      </div>
    </div>
  );
};

export default Chat;