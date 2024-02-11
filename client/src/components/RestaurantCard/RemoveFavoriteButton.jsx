import { useMutation } from "@apollo/client";
import { REMOVE_FAVORITE } from "../../utils/mutations";
import Button from "react-bootstrap/Button";

const RemoveFavoriteButton = ({ restaurant, onUpdate }) => {
  const [removeFavorite] = useMutation(REMOVE_FAVORITE);

  const bothId = restaurant.id || restaurant.businessId;

  const handleRemoveFavorite = async () => {
    await removeFavorite({ variables: { businessId: bothId } });
    onUpdate();
  };

  return (
    <Button className="favoriteBtn" onClick={handleRemoveFavorite}>
      Remove Favorite
    </Button>
  );
};

export default RemoveFavoriteButton;
