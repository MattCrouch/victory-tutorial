import React, { useContext } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer
} from "victory";
import { ResponseTimesContext } from "../DataProvider";
import "./styles.css";

const ResponseChart = ({ currentEndpoint }) => {
  const responseTimes = useContext(ResponseTimesContext);

  const data = responseTimes[currentEndpoint].map(datum => ({
    x: datum.timestamp,
    y: datum.length
  }));

  return (
    <div className="responseChart">
      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => `y: ${datum.y}`}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: "white" }}
              />
            }
          />
        }
        domain={{ y: [0, 5] }}
        domainPadding={5}
      >
        <VictoryAxis
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
  currentEndpoint: PropTypes.string.isRequired
};

export default ResponseChart;
