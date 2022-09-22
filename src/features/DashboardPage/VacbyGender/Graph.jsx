import React from "react";
import Chart from "../../../common/components/Chart";

const Graph = () => {
  return (
    <div>
      <Chart
        graphtype={"Bar"}
        labels={[
          "Kandy",
          "Colombo",
          "NuwaraEliya",
          "Bandarawela",
          "Kurunegala",
          "Gampaha",
        ]}
        datasets={[
          {
            label: "#Male",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "#8fa0fd",
            //   barThickness: "70",
            borderWidth: "2",
          },
          {
            label: "#Female",
            data: [42, 39, 2, 15, 12, 13],
            backgroundColor: "#95eeff",
            //   barThickness: "70",
            borderWidth: "2",
          },
        ]}
      />
    </div>
  );
};

export default Graph;
