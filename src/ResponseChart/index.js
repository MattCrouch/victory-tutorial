import React, { useContext } from "react";
import { format } from "date-fns";
import { VictoryAxis, VictoryChart, VictoryLine } from "victory";
import { ResponseTimesContext } from "../DataProvider";
import "./styles.css";

const ResponseChart = () => {
  const responseTimes = useContext(ResponseTimesContext);

  // TODO: Remove hard-coding of GET_PRODUCTS
  const data = responseTimes.GET_PRODUCTS.map(datum => ({
    x: datum.timestamp,
    y: datum.length
  }));

  return (
    <div className="responseChart">
      <VictoryChart domain={{ y: [0, 5] }} domainPadding={5}>
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

export default ResponseChart;
