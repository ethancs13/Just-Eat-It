import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_FRIEND } from "../../utils/mutations";
import FriendsSearchAdd from "./FriendsSearchAdd";
import { Card, CardBody, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsX } from "react-icons/bs";

const FriendsSection = () => {
  const { loading, error, data, refetch } = useQuery(QUERY_ME);
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (data) {
      setFriends(data.me.friends || []);
    }
  }, [data]);

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend({
        variables: {
          friendId: friendId,
        },
      });
      // Refetch user data to update the friends list
      refetch();
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const styles = {
    removeIcon: {
      height: "2.5em",
      width: "2.5em",
      color: "#f02b61",
    },

    mainHeader: {
      color: "#5fb1f0",
    },
    btn: {
      marginTop: "10px",
    },
    resultsHeader: {
      paddingTop: "20px",
      color: "#fe9553",
      textShadow: "0 0 5px #ff663d",
      textAlign: "left",
    },
    results: {
      color: "#f02b61",
      listStyleType: "none",
      fontSize: "18px",
    },
    cardFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };

  return (
    <div>
      <div>
        <FriendsSearchAdd />
      </div>
      <div>
        <Card>
          <CardBody>
            <Card.Title>Friends</Card.Title>
            <ListGroup>
              {friends.map((friend) => (
                <ListGroupItem key={friend._id}>
                  {friend.username}
                  <BsX
                    style={styles.removeIcon}
                    onClick={() => handleRemoveFriend(friend._id)}
                  />
                </ListGroupItem>
              ))}
            </ListGroup>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default FriendsSection;
