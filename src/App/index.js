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
          <ResponseChart
            domainPadding={{ x: [100, -100], y: 50 }}
            data={[
              { x: 1578247217946, y: 2 },
              { x: 1578247517946, y: 3 },
              { x: 1578247817946, y: 5 },
              { x: 1578248117946, y: 4 },
              { x: 1578248417946, y: 0 },
              { x: 1578248717946, y: 2 },
              { x: 1578249017946, y: 3 },
              { x: 1578249317946, y: 5 },
              { x: 1578249617946, y: 4 },
              { x: 1578249917946, y: 0 },
              { x: 1578250217946, y: 2 },
              { x: 1578250517946, y: 3 }
            ]}
          />
        </section>
      </div>
    </div>
  </DataProvider>
);

export default App;
