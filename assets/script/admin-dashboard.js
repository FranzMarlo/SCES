const donutLabelPlugin = {
  id: "doughnutlabel",
  afterDatasetDraw(chart) {
    if (chart.config.type === "doughnut") {
      const {
        ctx,
        chartArea: { top, bottom, left, right },
      } = chart;
      const { datasets } = chart.data;

      const data = datasets[0].data;
      const total = data.reduce((acc, val) => acc + val, 0);

      if (data.length === 0 || total === 0) {
        return;
      }
      ctx.save();
      const fontSize = (bottom - top) / 4;
      ctx.font = `${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#273b4a";

      const textX = (left + right) / 2;
      const textY = (top + bottom) / 2;

      const accomplishedCount = data[0];

      const accomplishedPercentage = Math.round(
        (accomplishedCount / total) * 100
      );

      // Display percentage only
      const text = `${accomplishedPercentage}%`;
      ctx.fillText(text, textX, textY);

      ctx.restore();
    }
  },
};

function initializeDonutChart(data) {
  const donutCtx = document.getElementById("myDonutChart").getContext("2d");
  new Chart(donutCtx, {
    type: "doughnut",
    data: {
      labels: ["Accomplished", "Pending"],
      datasets: [
        {
          data: data,
          backgroundColor: ["#59ADF6", "#ffffff"],
          borderColor: ["#ccc", "#ccc"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        title: {
          display: true,
          text: "Quizzes Completion",
          font: {
            size: 20,
          },
        },
        legend: {
          display: true,
          position: "bottom",
        },
      },
    },
    plugins: [donutLabelPlugin],
  });
}

$.ajax({
  url: "/SCES/backend/fetch-class.php",
  type: "POST",
  dataType: "json",
  data: {
    submitType: "mainDashboardDonutChartData",
  },
  success: function (data) {
    if (data && data.accomplished !== undefined && data.pending !== undefined) {
      // Pass raw counts to initialize the chart
      initializeDonutChart([data.accomplished, data.pending]);
    } else {
      console.log("Data format error or empty data received.");
    }
  },
  error: function (xhr, status, error) {
    console.error("Error fetching data for doughnut chart:", error);
  },
});

function initializeBarChart(labels, counts) {
  const barCtx = document.getElementById("myBarChart").getContext("2d");

  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          data: counts,
          backgroundColor: "#59ADF6",
          borderColor: "#ccc",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Students By Grade Level",
          font: {
            size: 18,
          },
        },
        legend: {
          display: false,
        },
      },
    },
  });
}

$.ajax({
  url: "/SCES/backend/fetch-class.php",
  type: "POST",
  dataType: "json",
  data: {
    submitType: "mainDashboardBarChartData",
  },
  success: function (data) {
    if (data && Array.isArray(data.labels) && Array.isArray(data.counts)) {
      initializeBarChart(data.labels, data.counts);
    } else {
      console.log("Data format error or empty data received.");
    }
  },
  error: function (xhr, status, error) {
    console.error("Error fetching data for bar chart:", error);
  },
});

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
}

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

function updateDateTime() {
  const now = new Date();
  document.getElementById("current-date").innerText = formatDate(now);
  document.getElementById("current-time").innerText = formatTime(now);
}

window.onload = function () {
  updateDateTime(); // Initial call
  setInterval(updateDateTime, 60000);
};
