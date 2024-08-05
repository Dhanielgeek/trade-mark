"use client";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Spline = () => {
  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2024-05-19T00:00:00.000Z",
        "2024-05-19T01:30:00.000Z",
        "2024-05-19T02:30:00.000Z",
        "2024-05-19T03:30:00.000Z",
        "2024-05-19T04:30:00.000Z",
        "2024-05-19T05:30:00.000Z",
        "2024-05-19T06:30:00.000Z",
        "2024-05-19T07:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  const series = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  return (
    <div>
      <div
        id="chart"
        className="bg-transparent text-black p-2 lg:w-fit flex items-center justify-center rounded-md"
      >
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          width={350}
          height={300}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Spline;
