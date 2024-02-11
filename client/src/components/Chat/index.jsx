import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries"

const Chat = ({ user }) => {

  const [socket, setSocket] = useState(null);

  function connect() {
    const name = user.data.username;
    console.log(name)

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

  function disconnect() {
    if (socket) {
      socket.close();
      setSocket(null);
    }
  }

  function sendMessage() {
    // let messagesContainer = document.querySelector("#messages");

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


  const styles = {
    name: {
      padding: "10px",
    },
    message: {
          
    },
    wrapper: {
      marginLeft: "50px"
    }
  }

  return (
    <div style={styles.wrapper}>
      <h2>Global Chat</h2>

      <section>
        <div style={styles.name}>
          {!socket ? (
            <button onClick={connect}>Connect</button>
          ) : (
            <button onClick={disconnect}>Disconnect</button>
          )}
        </div>
        <div>style
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