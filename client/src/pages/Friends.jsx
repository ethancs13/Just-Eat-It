import { useState } from "react";
import CurrentFriends from "../components/CurrentFriends";

export default function Friends() {

  const [friends, setFriends] = useState([])

  return (
    <div className="container">
      <h2>Friend Page</h2>
      <CurrentFriends friends={ friends }/>
    </div>
  );
}
