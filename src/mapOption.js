export const api_key = process.env.REACT_APP_MAP_API_KEY;
export const map_id = process.env.REACT_APP_MAP_ID;

const mapOption = {
  mapId: map_id,
  center: {
    lat: 19.21833,
    lng: 72.978088,
  },
  zoom: 19,
  disableDefaultUI: true,
  heading: 25,
  tilt: 67,
};

export default mapOption;
