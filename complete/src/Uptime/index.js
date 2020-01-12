import React, { useContext } from "react";
import { VictoryLabel, VictoryPie } from "victory";
import { UptimeContext } from "../DataProvider";
import "./styles.css";

const Uptime = () => {
  const value = useContext(UptimeContext);

  // Clamp uptime percentage between 0 and 1
  const percentage = Math.min(Math.max(value, 0), 1);

  return (
    <div className="uptime">
      {/* <svg> required when `standalone` is false
      `standalone` required to place label on top of pie chart */}
      <svg
        width={400}
        height={400}
        role="img"
        viewBox="0 0 400 400"
        style={{ width: "100%", height: "auto" }}
      >
        {/* Create a pie component */}
        {/* Animate the changes in value */}
        {/* Create data array comparing uptime to downtime */}
        {/* Style pie to look like a circular line */}
        <VictoryPie
          animate={{ duration: 200 }}
          data={[
            { x: "uptime", y: percentage },
            { x: "downtime", y: 1 - percentage }
          ]}
          innerRadius={150}
          labels={() => null}
          padding={0}
          standalone={false}
          style={{
            data: {
              fill: ({ datum }) => {
                const color =
                  datum.y > 0.98
                    ? "var(--success-color)"
                    : "var(--warning-color)";
                return datum.x === "uptime" ? color : "transparent";
              }
            }
          }}
        />

        {/* Apply label to show percentage value */}
        <VictoryLabel
          style={{
            fontFamily: "Roboto Mono, Roboto, sans-serif",
            fontSize: "64px"
          }}
          text={`${Math.round(percentage * 100)}%`}
          textAnchor="middle"
          verticalAnchor="middle"
          x={200}
          y={200}
        />
      </svg>
    </div>
  );
};

export default Uptime;
