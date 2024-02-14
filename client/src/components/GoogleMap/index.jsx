import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { recenterMap } from "../../utils/centerMap";
import axios from "axios";

// import icons
import asian from "./food-icons/asian.png";
import italian from "./food-icons/italian.png";
import mexican from "./food-icons/mexican.png";
import japanese from "./food-icons/japanese.png";
import indian from "./food-icons/indian.png";
import thai from "./food-icons/thai.png";
import vietnamese from "./food-icons/vietnamese.png";
import chinese from "./food-icons/chinese.png";
import vegetarian from "./food-icons/vegetarian.png";
import seafood from "./food-icons/seafood.png";
import breakfast from "./food-icons/breakfast.png";
import mediterranean from "./food-icons/mediterranean.png";
import coffeeshops from "./food-icons/coffee.png";
import steakhouse from "./food-icons/steak.png";
import desserts from "./food-icons/dessert.png";
import fastfood from "./food-icons/fastfood.png";
import defaultIcon from "./food-icons/defaultIcon.png";

const GoogleMap = ({ locations, showMap }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const loadMap = async () => {
      if (!showMap || !locations || locations?.length === 0) {
        return;
      }

      // custom icons with custom sizing
      const cuisineIcons = {
        asian: { icon: asian, size: 50 },
        mexican: { icon: mexican, size: 50 },
        italian: { icon: italian, size: 50 },
        japanese: { icon: japanese, size: 50 },
        indian: { icon: indian, size: 50 },
        thai: { icon: thai, size: 50 },
        vietnamese: { icon: vietnamese, size: 50 },
        chinese: { icon: chinese, size: 50 },
        vegetarian: { icon: vegetarian, size: 50 },
        seafood: { icon: seafood, size: 50 },
        breakfast: { icon: breakfast, size: 50 },
        mediterranean: { icon: mediterranean, size: 50 },
        fastfood: { icon: fastfood, size: 50 },
        desserts: { icon: desserts, size: 50 },
        coffeeshops: { icon: coffeeshops, size: 50 },
        steakhouse: { icon: steakhouse, size: 50 },
      };

      const apiKeyResponse = await axios.get(
        "https://just-eat-it-bi4x.onrender.com/api/key"
      );
      console.log(apiKeyResponse);
      const apiKey = apiKeyResponse.data.key;

      const loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
      });

      loader.load().then(async () => {
        const { Map } = await google.maps.importLibrary("maps");

        const map = new Map(document.getElementById("map"), {
          center: { lat: 37.7749, lng: -122.4194 }, // Default center coordinates (San Francisco)
          zoom: 12,
        });

        const newMarkers = locations.map((location) => {
          let cuisineType = "";
          if (location.categories && location.categories.length > 0) {
            cuisineType = location.categories[0].title.toLowerCase();
          }

          const iconInfo = cuisineIcons[cuisineType] || {
            icon: defaultIcon,
            size: 30,
          }; // Use default icon if icon is not available

          const customMarkerIcon = {
            url: iconInfo.icon,
            // Set the size of the icon
            scaledSize: new google.maps.Size(iconInfo.size, iconInfo.size),
          };

          const marker = new google.maps.Marker({
            position: {
              lat: location.coordinates.latitude,
              lng: location.coordinates.longitude,
            },
            map,
            title: location.name,
            // custom icon
            icon: customMarkerIcon,
          });

          // info modal on hover
          const infoWindow = new google.maps.InfoWindow({
            content: `<div><h3>${location.name}</h3><div class="map_hover"}><h5>Rating ${location.rating}</h5><h5>Price ${location.price}</h5></div></div>`,
          });

          // event listeners for info modal
          marker.addListener("mouseover", () => {
            infoWindow.open(map, marker);
          });
          marker.addListener("mouseout", () => {
            infoWindow.close();
          });

          marker.addListener("click", () => {
            window.open(location.url, "_blank"); //to open new page
          });

          return marker;
        });

        // set markers
        setMarkers(newMarkers);
        // center map around new markers
        recenterMap(map, newMarkers);
      });
    };

    loadMap();
  }, [locations, showMap]);

  return (
    <div>
      {showMap && (
        <div className="map-container">
          <div id="map" style={{ height: "400px", width: "95%" }}></div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
