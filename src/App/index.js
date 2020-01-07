import React from "react";
import Heading from "../Heading";
import Uptime from "../Uptime";
import ResponseChart from "../ResponseChart";
import DataProvider from "../DataProvider";
import "./styles.css";

const App = () => (
  <DataProvider>
    <div className="app">
      <div className="app__sections">
        <section className="app__uptime">
          <Heading>Uptime</Heading>
          <Uptime />
        </section>
        <section className="app__response">
          <Heading>Response times</Heading>
        </section>
        <section className="app__graph">
          <Heading>Last hour</Heading>
          <ResponseChart />
        </section>
      </div>
    </div>
  </DataProvider>
);

export default App;
