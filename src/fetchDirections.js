import { getGeocode, getLatLng } from "use-places-autocomplete";

const fetchDirections = async (origin, destination, setRoute) => {
  const [originResults, destinationResult] = await Promise.all([
    getGeocode({ address: origin }),
    getGeocode({ address: destination }),
  ]);
  const [originLocation, destinationLocation] = await Promise.all([
    getLatLng(originResults[0]),
    getLatLng(destinationResult[0]),
  ]);
  const service = new google.maps.DirectionsService();
  service.route(
    {
      origin: originLocation,
      destination: destinationLocation,
      travelMode: google.maps.TravelMode.WALKING,
    },
    (result, status) => {
      if (status === "OK" && result) {
        const route = result.routes[0].overview_path.map((path) => ({
          lat: path.lat(),
          lng: path.lng(),
        }));
        setRoute(route);
      }
    }
  );
};

export default fetchDirections;
