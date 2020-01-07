import React, { useEffect, useState } from "react";
import ENDPOINTS from "../Endpoints";

const RESPONSE_TIME_INTERVAL = 5000;
const MAX_RESPONSE_TIMES = 10;

export const UptimeContext = React.createContext();
export const ResponseTimesContext = React.createContext();

const generateNewResponseTime = (timestamp = Date.now()) => ({
  timestamp,
  length: Math.round(Math.random() * 5 * 100) / 100
});

export const DataProvider = ({ children }) => {
  const [uptime, setUptime] = useState(0.99);
  const [responseTimes, setResponseTimes] = useState(
    ENDPOINTS.reduce((accumulator, currentValue) => {
      const initialValues = [];

      // Generate some response times before the current time
      for (let i = 0; i < MAX_RESPONSE_TIMES; i++) {
        initialValues.push(
          generateNewResponseTime(
            Date.now() - (MAX_RESPONSE_TIMES - i) * RESPONSE_TIME_INTERVAL
          )
        );
      }

      return {
        ...accumulator,
        [currentValue.id]: initialValues
      };
    }, {})
  );

  console.log(responseTimes);

  // Update uptime every minute
  useEffect(() => {
    const interval = setInterval(() => {
      // An amount between 0% and 5%
      const amount = Math.round(Math.random() * 0.05 * 100) / 100;
      const positive = Math.random() >= 0.5;

      // Clamp uptime between 0 and 1
      setUptime(uptime =>
        Math.min(Math.max(uptime + (positive ? amount : -amount), 0), 1)
      );
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Update response times every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setResponseTimes(responseTimes =>
        Object.keys(responseTimes).reduce((accumulator, currentKey) => {
          const currentValue = responseTimes[currentKey];

          return {
            ...accumulator,
            [currentKey]: [
              ...currentValue.slice(-MAX_RESPONSE_TIMES + 1),
              generateNewResponseTime()
            ]
          };
        }, responseTimes)
      );
    }, RESPONSE_TIME_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <UptimeContext.Provider value={uptime}>
      <ResponseTimesContext.Provider value={responseTimes}>
        {children}
      </ResponseTimesContext.Provider>
    </UptimeContext.Provider>
  );
};

export default DataProvider;
