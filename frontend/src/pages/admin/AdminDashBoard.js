import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

function AdminDashboard() {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (chart) {
      chart.destroy();
    }

    const chartData = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Sales",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          data: [65, 59, 80, 81, 56],
        },
      ],
    };

    const ctx = document.getElementById("myChart").getContext("2d");
    const newChart = new Chart(ctx, {
      type: "bar",
      data: chartData,
    });

    setChart(newChart);

    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, []);

  return (
    
     <div className="p-4 bg-white rounded shadow-md">
     <h1 className="text-4xl font-bold text-gray-800">Sales Chart</h1>
      <div className="w-2/3 h-64">
        {/* Adjust the width and height values to change the chart size */}
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
}

export default AdminDashboard;
