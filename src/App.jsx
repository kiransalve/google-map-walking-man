import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import "./App.css";
import MyMap from "./MyMap";
import { api_key } from "./mapOption";

function App() {
  return (
    <Wrapper apiKey={api_key}>
      <MyMap />
    </Wrapper>
  );
}

export default App;
