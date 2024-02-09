import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../../utils/queries";

const FriendPreferences = ( friendsArr ) => {

const { loading, error, data } = useQuery(QUERY_ALL_USERS);
console.log('All users query data:', data);

console.log('Friends Array:', friendsArr);

    return (
        <div>
            <h3>My friends like to eat:</h3>
        </div>
    )
}

export default FriendPreferences;