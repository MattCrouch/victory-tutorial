/*
  Mocked response time data generated in this file.
  It is then exposed through individual contexts to connect to in any component that needs it.
*/

import React, { useEffect, useState } from "react";
import ENDPOINTS from "../Endpoints";

// Mocked data fetching rate
const RESPONSE_TIME_INTERVAL = 5000;

// How many response time values should be stored at a time
const MAX_RESPONSE_TIMES = 10;

// Create new contexts to hold data
export const UptimeContext = React.createContext();
export const ResponseTimesContext = React.createContext();

// Create a new random data point
const generateNewResponseTime = (timestamp = Date.now()) => ({
  timestamp,
  length: Math.round(Math.random() * 5 * 100) / 100
});

export const DataProvider = ({ children }) => {
  // Set up state with an initial value
  const [uptime, setUptime] = useState(0.99);
  // Set up state structure for endpoint response times
  const [responseTimes, setResponseTimes] = useState(
    // Create some initial historical values for each endpoint
    ENDPOINTS.reduce((accumulator, currentValue) => {
      const initialValues = [];

      // Generate some response times before the current time
      for (let i = 0; i < MAX_RESPONSE_TIMES; i++) {
        // Backdate timestamps to just before now
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

  // Update uptime
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

  // Update response times
  useEffect(() => {
    const interval = setInterval(() => {
      setResponseTimes(responseTimes =>
        Object.keys(responseTimes).reduce((accumulator, currentKey) => {
          // Get current endpoint data
          const currentValue = responseTimes[currentKey];

          // Append new data and clear out oldest one
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

  // Provide this data to the rest of the application
  return (
    <UptimeContext.Provider value={uptime}>
      <ResponseTimesContext.Provider value={responseTimes}>
        {children}
      </ResponseTimesContext.Provider>
    </UptimeContext.Provider>
  );
};

export default DataProvider;
