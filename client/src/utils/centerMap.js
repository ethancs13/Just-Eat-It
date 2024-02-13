export function recenterMap(map, markers) {
  try {
    if (markers?.length === 0) {
      return; // No markers to recenter
    }

    let latSum = 0;
    let lngSum = 0;

    // Calculate the sum of latitude and longitude values
    markers.forEach((marker) => {
      const position = marker.getPosition();
      if (position) {
        latSum += position.lat();
        lngSum += position.lng();
      }
    });

    // Calculate the average latitude and longitude
    const avgLat = latSum / markers?.length;
    const avgLng = lngSum / markers?.length;

    // Create a new center point
    const newCenter = new google.maps.LatLng(avgLat, avgLng);

    // Set the map's center to the new center point
    map.setCenter(newCenter);
  } catch (error) {
    console.error("Error recentering map:", error);
  }
}
