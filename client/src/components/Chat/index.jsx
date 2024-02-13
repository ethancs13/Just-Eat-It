import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

const Chat = ({ user }) => {
  const [socket, setSocket] = useState(null);

  function connect() {
    const name = user.data.username;

    const newSocket = new WebSocket(
      "wss://just-eat-it-test-a5e86dcbbf47.herokuapp.com/"
    );

    newSocket.addEventListener("open", function (event) {
      newSocket.send(JSON.stringify({ name }));
    });

    newSocket.addEventListener("message", function (event) {
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

    let chatWindow = document.getElementById("messages");
    chatWindow.insertBefore(container, chatWindow.firstChild);
  }

  function sendMessage() {
    if (socket) {
      let messageInput = document.getElementById("message");
      let message = messageInput.value;
      socket.send(JSON.stringify({ message }));

      addMessageToPage(`Me: ${message}`);

      messageInput.value = "";
    } else {
      console.error("Socket connection is not established.");
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  const styles = {
    name: {
      padding: "10px",
    },
    message: {},
    chatWrapper: {
      overflowY: "auto",
      width: "auto",
      borderRadius: "8px",
      maxHeight: "300px",
    },
  };

  return (
    <div className="chat-container">
      <h2>Global Chat</h2>

      <section>
        <div style={styles.name}>
          {!socket ? (
            <Button onClick={connect}>Connect</Button>
          ) : (
            <Button onClick={disconnect}>Disconnect</Button>
          )}
        </div>
        <Form.Group as={Row} className="mb-3">
          <Col sm={10}>
            <Form.Control
              id="message"
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            />
          </Col>
          <Col sm={2}>
            <Button onClick={sendMessage}>Send</Button>
          </Col>
        </Form.Group>
      </section>

      <div className="chatBox-wrapper">
        <section className="chat-wrapper" style={styles.chatWrapper}>
          <Card>
            <Card.Body id="messages">
              {/* Messages will be added here */}
            </Card.Body>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Chat;
