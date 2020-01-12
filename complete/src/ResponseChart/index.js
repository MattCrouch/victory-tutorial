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

// Show the response time for each endpoint in a line
const ResponseChart = ({ currentEndpoint }) => {
  // Connect to data context
  const responseTimes = useContext(ResponseTimesContext);

  return (
    <div className="responseChart">
      {/* Create a chart component */}
      {/* Use a Voronoi container to allow labels to be displayed */}
      {/* Pad out the rest of the chart component */}
      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => `${datum.length}s`}
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
        {/* Create the horizontal axis */}
        {/* Format labels to show as time */}
        <VictoryAxis
          tickFormat={tick => format(new Date(tick), "h:mma")}
          style={{
            tickLabels: {
              fontFamily: "Roboto Mono, Roboto, sans-serif",
              fontSize: 10
            }
          }}
        />

        {/* Create the vertical axis */}
        {/* Highlight any time over 3s as bad */}
        {/* Format labels to show as response time value in seconds */}
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

        {/* Draw data as a line */}
        {/* Tell Victory which values to use as its x and y values */}
        <VictoryLine
          data={responseTimes[currentEndpoint]}
          style={{
            data: { stroke: "var(--foreground-color)", strokeWidth: 5 }
          }}
          x="timestamp"
          y="length"
        />
      </VictoryChart>
    </div>
  );
};

ResponseChart.propTypes = {
  currentEndpoint: PropTypes.string.isRequired
};

export default ResponseChart;
