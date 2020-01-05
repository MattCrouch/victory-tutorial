import React from "react";
import PropTypes from "prop-types";
import { VictoryLabel, VictoryPie } from "victory";
import "./styles.css";

const Uptime = ({ value }) => {
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
                  datum.y > 0.9
                    ? "var(--success-color)"
                    : "var(--warning-color)";
                return datum.x === "uptime" ? color : "transparent";
              }
            }
          }}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={200}
          y={200}
          style={{
            fontFamily: "Roboto Mono, Roboto, sans-serif",
            fontSize: "64px"
          }}
          text={`${Math.round(percentage * 100)}%`}
        />
      </svg>
    </div>
  );
};

Uptime.propTypes = {
  value: PropTypes.number.isRequired
};

export default Uptime;
