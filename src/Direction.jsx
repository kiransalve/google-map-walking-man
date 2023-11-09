import React, { useEffect, useState } from "react";
import fetchDirections from "./fetchDirections";

function Direction({ setRoute }) {
  const [origin] = useState("Kalyan Station India");
  const [destination] = useState("Kala Talao Kalyan India");

  useEffect(() => {
    fetchDirections(origin, destination, setRoute);
  }, [origin, destination]);
  return (
    <>
      <div className="direction">
        <h2>Directions</h2>
        <h2>Origin</h2>
        <h3>{origin}</h3>
        <br />
        <h2>Destination</h2>
        <h3>{destination}</h3>
      </div>
    </>
  );
}

export default Direction;
