import React, { useContext } from "react";
import { VictoryContainer, VictoryLabel, VictoryPie } from "victory";
import { UptimeContext } from "../DataProvider";
import "./styles.css";

const Uptime = () => {
  // Connect to data context
  const value = useContext(UptimeContext);

  // Clamp uptime percentage between 0 and 1
  const percentage = Math.min(Math.max(value, 0), 1);

  return (
    <div className="uptime">
      {/* Container required when `standalone` is false
      `standalone` required to place label on top of pie chart */}

      {/* Create a pie component */}
      {/* Animate the changes in value */}
      {/* Create data array comparing uptime to downtime */}
      {/* Style pie to look like a circular line */}

      {/* Apply label to show percentage value */}
    </div>
  );
};

export default Uptime;
