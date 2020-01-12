import React, { useContext } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  VictoryArea,
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
  const data = responseTimes[currentEndpoint];

  return (
    <div className="responseChart">
      {/* Create a chart component */}
      {/* Use a Voronoi container to allow labels to be displayed */}
      {/* Pad out the rest of the chart component */}
      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => `${datum.length}s`}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: "white" }}
              />
            }
            voronoiBlacklist={["danger-area"]}
            voronoiDimension="x"
          />
        }
        domain={{ y: [0, 5] }}
      >
        {/* Colour in the area over 3s */}
        <VictoryArea
          data={[
            {
              x: data[0].timestamp,
              y0: 3,
              y: 5
            },
            {
              x: data.slice(-1)[0].timestamp,
              y0: 3,
              y: 5
            }
          ]}
          name="danger-area"
          style={{
            data: {
              fill: "var(--warning-background-color)"
            }
          }}
        />

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
          data={data}
          style={{
            data: { stroke: "var(--foreground-color)", strokeWidth: 4 }
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
