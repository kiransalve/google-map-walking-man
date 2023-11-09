import React, { useEffect, useRef, useState } from "react";
import Direction from "./Direction";
import Animation from "./Animation";
import mapOption from "./mapOption";

function MyMap() {
  const [route, setRoute] = useState();
  const [map, setMap] = useState();
  const ref = useRef();

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, mapOption));
  }, []);

  return (
    <>
      <div ref={ref} id="map" style={{ width: "100%", height: "100vh" }} />
      {map && <Direction setRoute={setRoute} />}
      {map && route && <Animation map={map} route={route} />}
    </>
  );
}

export default MyMap;
