import React from "react";
import PropTypes from "prop-types";
import { VictoryPie } from "victory";
import "./styles.css";

const Uptime = ({ value }) => {
  // Clamp uptime percentage between 0 and 1
  const percentage = Math.min(Math.max(value, 0), 1);

  return (
    <div className="uptime">
      <VictoryPie
        animate={{ duration: 500 }}
        data={[
          { x: "uptime", y: percentage },
          { x: "downtime", y: 1 - percentage }
        ]}
        innerRadius={150}
        labels={() => null}
        padding={0}
        style={{
          data: {
            fill: ({ datum }) => {
              const color =
                datum.y > 0.9 ? "var(--success-color)" : "var(--warning-color)";
              return datum.x === "uptime" ? color : "transparent";
            }
          }
        }}
      />
    </div>
  );
};

Uptime.propTypes = {
  value: PropTypes.number.isRequired
};

export default Uptime;
