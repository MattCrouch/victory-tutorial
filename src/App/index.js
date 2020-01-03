import React from "react";
import Heading from "../Heading";
import "./styles.css";

const App = () => (
  <div className="app">
    <div className="app__sections">
      <section className="app__uptime">
        <Heading>Uptime (last 24 hours) Uptime (last 24 hours)</Heading>
      </section>
      <section className="app__response">
        <Heading>Response times</Heading>
      </section>
      <section className="app__graph">
        <Heading>Last half hour</Heading>
      </section>
    </div>
  </div>
);

export default App;
