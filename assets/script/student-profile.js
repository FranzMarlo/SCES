document.addEventListener("DOMContentLoaded", function () {
  const profileTab = document.getElementById("profileTab");
  const recordsTab = document.getElementById("recordsTab");
  const statsTab = document.getElementById("statsTab");

  const profileContainer = document.getElementById("profileContainer");
  const recordsContainer = document.getElementById("recordsContainer");
  const statsContainer = document.getElementById("statsContainer");

  function showContainer(tabIndex) {
    profileContainer.style.display = "none";
    recordsContainer.style.display = "none";
    statsContainer.style.display = "none";

    switch (tabIndex) {
      case 1:
        profileContainer.style.display = "flex";
        profileTab.classList.add("active");
        recordsTab.classList.remove("active");
        statsTab.classList.remove("active");
        break;
      case 2:
        recordsContainer.style.display = "flex";
        profileTab.classList.remove("active");
        recordsTab.classList.add("active");
        statsTab.classList.remove("active");
        break;
      case 3:
        statsContainer.style.display = "flex";
        profileTab.classList.remove("active");
        recordsTab.classList.remove("active");
        statsTab.classList.add("active");
        break;
      default:
        profileContainer.style.display = "flex";
        tabIndex = 1;
        profileTab.classList.add("active");
        recordsTab.classList.remove("active");
        statsTab.classList.remove("active");
        break;
    }

    const url = new URL(window.location);
    url.searchParams.set("active", tabIndex);
    window.history.pushState({}, "", url);
  }

  profileTab.addEventListener("click", function () {
    showContainer(1);
  });

  recordsTab.addEventListener("click", function () {
    showContainer(2);
  });

  statsTab.addEventListener("click", function () {
    showContainer(3);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = parseInt(urlParams.get("active")) || 1;

  showContainer(activeTab);

  var quizScoresTable = $("#quizScoresTable").DataTable({
    responsive: {
      details: {
        type: "inline",
        display: $.fn.dataTable.Responsive.display.childRowImmediate,
        renderer: function (api, rowIdx, columns) {
          var data = $.map(columns, function (col, i) {
            return col.hidden
              ? '<tr data-dt-row="' +
                  col.rowIdx +
                  '" data-dt-column="' +
                  col.columnIdx +
                  '">' +
                  "<td>" +
                  col.title +
                  ":" +
                  "</td> " +
                  "<td>" +
                  col.data +
                  "</td>" +
                  "</tr>"
              : "";
          }).join("");

          return data ? $("<table/>").append(data) : false;
        },
      },
    },
    ajax: {
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: function (d) {
        d.submitType = "getQuizRecords";
        return d;
      },
      dataSrc: "",
    },
    columns: [
      { data: "quiz_number" },
      { data: "subject" },
      { data: "title" },
      { data: "score" },
      { data: "item_number" },
      {
        data: "remarks",
        render: function (data) {
          var className =
            data === "Passed" ? "passed" : data === "Failed" ? "failed" : "";
          return `<span class="${className}">${data}</span>`;
        },
      },
      { data: "time" },
    ],
  });

  var gradesTable = $("#gradesTable").DataTable({
    responsive: {
      details: {
        type: "inline",
        display: $.fn.dataTable.Responsive.display.childRowImmediate,
        renderer: function (api, rowIdx, columns) {
          var data = $.map(columns, function (col, i) {
            return col.hidden
              ? '<tr data-dt-row="' +
                  col.rowIdx +
                  '" data-dt-column="' +
                  col.columnIdx +
                  '">' +
                  "<td>" +
                  col.title +
                  ":" +
                  "</td> " +
                  "<td>" +
                  col.data +
                  "</td>" +
                  "</tr>"
              : "";
          }).join("");

          return data ? $("<table/>").append(data) : false;
        },
      },
    },
    ajax: {
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: function (d) {
        d.submitType = "getGrades";
        return d;
      },
      dataSrc: "",
    },
    columns: [
      { data: "subject" },
      { data: "grade" },
      {
        data: "remarks",
        render: function (data) {
          var className = "";
          if (["Outstanding", "Very Good", "Good"].includes(data)) {
            className = "passed";
          } else if (data === "Fair") {
            className = "fair";
          } else if (data === "Failed") {
            className = "failed";
          }
          return `<span class="${className}">${data}</span>`;
        },
        width: "100px",
        className: "text-center",
      },
      { data: "quarter" },
    ],
  });
  $.ajax({
    url: "/SCES/backend/fetch-class.php",
    type: "POST",
    dataType: "json",
    data: {
      submitType: "fetchLineChartData",
    },
    success: function (data) {
      console.log(data);

      if (data && data.labels && data.lineData) {
        var ctxLine = document.getElementById("lineChart").getContext("2d");
        var lineChart = new Chart(ctxLine, {
          type: "line",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "Average Score",
                data: data.lineData,
                backgroundColor: "#ddd1ff",
                borderColor: "#c4adfe",
                borderWidth: 3,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Average Quiz Scores Per Month",
                font: {
                  size: 18,
                },
                padding: {
                  top: 10,
                  bottom: 10,
                },
              },
              legend: {
                display: true,
                position: "bottom",
                padding: 20,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      } else {
        console.log("No data received or data is in an unexpected format.");
      }
    },
    error: function (xhr, status, error) {
      console.error("Error in AJAX request:", status, error);
    },
  });

  $.ajax({
    url: "/SCES/backend/fetch-class.php",
    type: "POST",
    dataType: "json",
    data: {
      submitType: "fetchBarChartData",
    },
    success: function (data) {
      var ctxBar = document.getElementById("barChart").getContext("2d");

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
});
