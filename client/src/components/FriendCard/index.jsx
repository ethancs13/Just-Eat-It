import Card from 'react-bootstrap/Card';

const FriendCard = ({ friend }) => (
  <Card key={friend._id}>
    <Card.Body>
      <Card.Title>hi</Card.Title>
    </Card.Body>
  </Card>
);

export default FriendCard;
