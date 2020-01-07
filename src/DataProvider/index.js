import React, { useEffect, useState } from "react";

export const UptimeContext = React.createContext();
export const ResponseTimesContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [uptime, setUptime] = useState(0.99);
  const [responseTimes] = useState({});

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

  return (
    <UptimeContext.Provider value={uptime}>
      <ResponseTimesContext.Provider value={responseTimes}>
        {children}
      </ResponseTimesContext.Provider>
    </UptimeContext.Provider>
  );
};

export default DataProvider;
