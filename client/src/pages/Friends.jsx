import { useState } from "react";
import FriendsList from "../components/FriendsList";

export default function Friends() {
  return (
    <div className="container">
      <h2>Friend Page</h2>
      <FriendsList />
    </div>
  );
}
