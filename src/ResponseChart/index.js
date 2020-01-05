import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { VictoryAxis, VictoryChart, VictoryLine } from "victory";
import "./styles.css";

const ResponseChart = ({ data }) => {
  return (
    <div className="responseChart">
      <VictoryChart domainPadding={5}>
        <VictoryAxis
          // tickCount={3}
          tickFormat={tick => format(new Date(tick), "h:mma")}
          style={{
            tickLabels: {
              fontFamily: "Roboto Mono, Roboto, sans-serif",
              fontSize: 10
            }
          }}
        />
        <VictoryAxis
          dependentAxis={true}
          style={{
            grid: {
              stroke: ({ tick }) =>
                tick >= 3 ? "var(--warning-color)" : "var(--foreground-color)",
              strokeWidth: 1
            },
            tickLabels: {
              fontFamily: "Roboto Mono, Roboto, sans-serif",
              fontSize: 10
            }
          }}
          tickFormat={tick => `${Number(tick).toFixed(2)}s`}
        />
        <VictoryLine
          style={{
            data: { stroke: "var(--foreground-color)", strokeWidth: 5 }
          }}
          data={data}
        />
      </VictoryChart>
    </div>
  );
};

ResponseChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  ).isRequired
};

export default ResponseChart;
