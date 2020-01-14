import React, { useContext } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryLine } from "victory";
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

      {/* Colour in the area over 3s */}

      {/* Create the horizontal axis */}
      {/* Format labels to show as time */}

      {/* Create the vertical axis */}
      {/* Highlight any time over 3s as bad */}
      {/* Format labels to show as response time value in seconds */}

      {/* Draw data as a line */}
      {/* Tell Victory which values to use as its x and y values */}
    </div>
  );
};

ResponseChart.propTypes = {
  currentEndpoint: PropTypes.string.isRequired
};

export default ResponseChart;
