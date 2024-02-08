import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


const FriendCard = ({ friend, add }) => {


  return (
    <Card key={friend._id}>
      <Card.Body>
        <Card.Title>{friend.username}</Card.Title>
      </Card.Body>
      <Button onClick={() => add(friend)}>Add</Button>
    </Card>
  );
};
export default FriendCard;
