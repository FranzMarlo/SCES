document.addEventListener("DOMContentLoaded", function () {
  initializeLineChart();
  initializeBarChart();
  initializeFullBarChart();

  function initializeLineChart() {
    var ctxLine = document.getElementById("lineChart").getContext("2d");

    if (Chart.getChart("lineChart")) {
      Chart.getChart("lineChart").destroy();
    }

    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: {
        submitType: "analyticsAverageScoreByMonth",
      },
      success: function (response) {
        const chartData = JSON.parse(response);
        const months = chartData.labels || [];
        const scores = chartData.lineData || [];

        new Chart(ctxLine, {
          type: "line",
          data: {
            labels: months.length ? months : ["No Data"],
            datasets: [
              {
                label: "", // Omit label in the legend
                data: scores.length ? scores : [0],
                borderColor: "#ddd1ff",
                backgroundColor: "rgba(221, 209, 255, 0.5)",
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "#fff",
                pointBorderColor: "#ddd1ff",
                pointHoverRadius: 5,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: false,
              title: {
                display: true,
                text: "Average Score Per Month",
                font: {
                  size: 17,
                  weight: "bold",
                },
                padding: {
                  top: 5,
                  bottom: 10,
                },
              },
            },
            scales: {
              y: { beginAtZero: true },
              x: {},
            },
          },
        });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data: ", error);
      },
    });
  }

  function initializeBarChart() {
    var ctxBar = document.getElementById("barChart").getContext("2d");

    if (Chart.getChart("barChart")) {
      Chart.getChart("barChart").destroy();
    }

    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: "analyticsAverageScoreByGradeLevel",
      },
      success: function (data) {
        const colors = [
          "#ffd6e6",
          "#d2ebc4",
          "#fcfd95",
          "#c5e3ff",
          "#ddd1ff",
          "#fec590",
        ];
        const backgroundColors = data.labels.map(
          (_, index) => colors[index % colors.length]
        );

        new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: data.labels || ["No Data"],
            datasets: [
              {
                label: "Average Score",
                data: data.barData || [0],
                backgroundColor: backgroundColors,
                borderColor: "#000",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Average Score by Grade Level",
                font: {
                  size: 18,
                },
                padding: {
                  top: 10,
                  bottom: 10,
                },
              },
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching bar chart data: ", error);
      },
    });
  }

  function initializeFullBarChart() {
    var ctxBar = document.getElementById("fullBarChart").getContext("2d");

    if (Chart.getChart("fullBarChart")) {
      Chart.getChart("fullBarChart").destroy();
    }
    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: "analyticsFullBarChart",
      },
      success: function (data) {
        var ctxBar = document
          .getElementById("fullBarChart")
          .getContext("2d");

        var colors = [
          "#ffd6e6",
          "#d2ebc4",
          "#fcfd95",
          "#c5e3ff",
          "#ddd1ff",
          "#fec590",
        ];

        var backgroundColors = data.labels.map((label, index) => {
          return colors[index % colors.length];
        });

        var barChart = new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "GWA",
                data: data.barData,
                backgroundColor: backgroundColors,
                borderColor: "#000",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "GWA by Grade Level",
                font: {
                  size: 18,
                },
                padding: {
                  top: 10,
                  bottom: 10,
                },
              },
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
    });
  }

});
