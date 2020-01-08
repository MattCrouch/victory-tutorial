import React, { useContext, useState } from "react";
import Heading from "../Heading";
import Uptime from "../Uptime";
import ResponseChart from "../ResponseChart";
import { ResponseTimesContext } from "../DataProvider";
import "./styles.css";

const App = () => {
  const responseTimes = useContext(ResponseTimesContext);
  const [currentEndpoint] = useState(Object.keys(responseTimes)[0]);

  return (
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
          <ResponseChart currentEndpoint={currentEndpoint} />
        </section>
      </div>
    </div>
  );
};

export default App;
