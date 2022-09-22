import React from "react";
import { Bar, Line } from "react-chartjs-2";

const Chart = ({ graphtype, labels, datasets, options = {} }) => {
  switch (graphtype) {
    case "Bar":
      return (
        <div>
          <Bar
            data={{
              labels: labels,
              datasets: datasets,
            }}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Total count',
                      fontSize: 20    
                    }
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: 'Vaccines',
                      fontSize: 20    
                    }
                  }
                ],
              },
            }}
          />
        </div>
      );
    case "Line":
      return (
        <div>
          <Line
            data={{
              labels: labels,
              datasets: datasets,
            }}
            height={500}
            width={600}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
              ...options
            }}
          />
        </div>
      );

    default:
      break;
  }
};

export default Chart;
