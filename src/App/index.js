import React, { useContext, useState } from "react";
import EndpointButton from "../EndpointButton";
import Heading from "../Heading";
import Uptime from "../Uptime";
import ResponseChart from "../ResponseChart";
import { ResponseTimesContext } from "../DataProvider";
import ENDPOINTS from "../Endpoints";
import "./styles.css";

const App = () => {
  const responseTimes = useContext(ResponseTimesContext);
  const [currentEndpointKey, setCurrentEndpointKey] = useState(
    Object.keys(responseTimes)[0]
  );

  return (
    <div className="app">
      <div className="app__sections">
        <section className="app__uptime">
          <Heading>Uptime</Heading>
          <Uptime />
        </section>
        <section className="app__endpoints">
          <Heading>Endpoints</Heading>
          <ul className="app__endpoints-list">
            {Object.keys(responseTimes).map(endpointId => {
              const endpointData = ENDPOINTS.find(
                endpoint => endpoint.id === endpointId
              );

              return (
                <li className="app__endpoints-list-item" key={endpointId}>
                  <EndpointButton
                    endpoint={endpointData}
                    responseTime={responseTimes[endpointId].slice(-1)[0].length}
                    onClick={() => setCurrentEndpointKey(endpointId)}
                  />
                </li>
              );
            })}
          </ul>
        </section>
        <section className="app__response">
          <Heading>Response time</Heading>
          <ResponseChart currentEndpoint={currentEndpointKey} />
        </section>
      </div>
    </div>
  );
};

export default App;
