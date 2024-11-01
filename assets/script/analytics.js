document.addEventListener("DOMContentLoaded", function () {
  const yearFilter = document.getElementById("yearFilterDropdown");
  const gradeFilter = document.getElementById("gradeFilterDropdown");

  function initializeData() {
    const year = yearFilter.value;
    const grade = gradeFilter.value;

    initializeLineChart(year, grade);
    initializeBarChart(year, grade);
    initializeFullBarChart(year, grade);
    initializeRankingTable(year, grade);
    populateAnalyticsData(year, grade);
  }

  yearFilter.addEventListener("change", initializeData);
  gradeFilter.addEventListener("change", initializeData);

  initializeData();

  const performanceImg = document.getElementById(
    "studentPredictedPerformanceIcon"
  );
  const studentPerformance = document.getElementById(
    "studentPredictedPerformance"
  );
  const studentSuccess = document.getElementById("studentPredictedSuccess");
  const remarksImg = document.getElementById("studentPredictedRemarksIcon");
  const studentRemarks = document.getElementById("studentPredictedRemarks");
  const studentGWA = document.getElementById("studentPredictedGWA");

  function populateAnalyticsData(year, grade) {
    const data = new FormData();
    data.append("submitType", "analyticsPanelData");
    data.append("year", year);
    data.append("gradeLevel", grade);

    fetch("/SCES/backend/fetch-class.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("totalStudents").textContent =
          data.totalStudents || 0;
        document.getElementById("totalTeachers").textContent =
          data.totalTeachers || 0;
        document.getElementById("totalLessons").textContent =
          data.totalLessons || "N/A";
        document.getElementById("totalQuizzes").textContent =
          data.totalQuizzes || "N/A";
      })
      .catch((error) => {
        console.error("Error fetching panel data:", error);
      });
  }

  function initializeLineChart(year, grade) {
    var ctxLine = document.getElementById("lineChart").getContext("2d");

    if (Chart.getChart("lineChart")) {
      Chart.getChart("lineChart").destroy();
    }

    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: {
        submitType: "analyticsAverageScoreByMonthWithFilter",
        year: year,
        gradeLevel: grade,
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

  function initializeBarChart(year, grade) {
    var ctxBar = document.getElementById("barChart").getContext("2d");

    if (Chart.getChart("barChart")) {
      Chart.getChart("barChart").destroy();
    }

    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: "analyticsAverageScoreByGradeLevelWithFilter",
        year: year,
        gradeLevel: grade,
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

  function initializeFullBarChart(year, grade) {
    var ctxBar = document.getElementById("fullBarChart").getContext("2d");

    if (Chart.getChart("fullBarChart")) {
      Chart.getChart("fullBarChart").destroy();
    }
    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: "analyticsFullBarChartWithFilter",
        year: year,
        gradeLevel: grade,
      },
      success: function (data) {
        var ctxBar = document.getElementById("fullBarChart").getContext("2d");

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
                text: "Average GWA by Grade Level",
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

  function initializeRankingTable(year, grade) {
    const tableHead = document.querySelector("#rankingTable thead tr");
    const tableBody = document.getElementById("rankingTableBody");

    // Clear existing table head and body content
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";

    // Define headers based on filter conditions
    const headers =
      year !== "All" && year <= 2023
        ? ["Full Name", "GWA", "Grade & Section"]
        : ["Full Name", "Average Score", "Grade & Section", "View Student"];

    // Generate table head dynamically
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.className = "text-center";
      th.textContent = headerText;
      tableHead.appendChild(th);
    });

    // Fetch data from the server
    const ajaxSubmitType =
      year !== "All" && year <= 2023
        ? "gwaRankingStudentsByYearWithFilter"
        : "rankingStudentsByYearWithFilter";

    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: ajaxSubmitType,
        year: year,
        gradeLevel: grade,
      },
      success: function (data) {
        // Populate table body based on filter conditions
        data.forEach((row) => {
          const tr = document.createElement("tr");

          if (year !== "All" && year <= 2023) {
            tr.innerHTML = `
                        <td class="text-center" data-label="Full Name">${row.full_name}</td>
                        <td class="text-center" data-label="GWA">${row.gwa}</td>
                        <td class="text-center" data-label="Grade & Section">${row.grade_level} - ${row.section}</td>
                    `;
          } else {
            tr.innerHTML = `
                        <td class="text-center" data-label="Full Name">${row.full_name}</td>
                        <td class="text-center" data-label="Average Score">${row.average_score}</td>
                        <td class="text-center" data-label="Grade & Section">${row.grade_level} - ${row.section}</td>
                        <td class="text-center" data-label="View Student">
                            <div class="center-image">
                                <button class="more-btn" data-student-id="${row.student_id}">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </td>
                    `;
          }

          tableBody.appendChild(tr);
        });

        // Display a message if no data is available
        if (data.length === 0) {
          const tr = document.createElement("tr");
          tr.innerHTML = `<td colspan="${headers.length}" class="text-center">No data available in table</td>`;
          tableBody.appendChild(tr);
        }
      },
      error: function () {
        console.error("Failed to fetch data.");
      },
    });
  }

  document
    .getElementById("rankingTable")
    .addEventListener("click", function (event) {
      if (event.target.closest(".more-btn")) {
        const btn = event.target.closest(".more-btn");
        const studentId = btn.getAttribute("data-student-id");

        fetch("/SCES/backend/fetch-class.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `submitType=fetchStudentDetails&student_id=${studentId}`,
        })
          .then((response) => response.json())
          .then((student) => {
            if (!student || Object.keys(student).length === 0) {
              showAlert("error", "Server Error", "Student Data Not Found");
              return;
            }

            Object.keys(student).forEach((key) => {
              if (student[key] === null || student[key] === "") {
                student[key] = "Not Set";
              }
            });
            const modal = document.getElementById("studentModal");
            modal.setAttribute("data-section", student.section_id);
            const modalHeader = document.getElementById("studentHeader");
            const genderClass = student.gender === "Female" ? "female" : "male";
            const tabItemClass = student.gender === "Female" ? "pink" : "blue";
            const coloredRow = document.querySelectorAll(".colored-row");

            modalHeader.classList.remove("female", "male");
            coloredRow.forEach((row) => {
              row.classList.remove("female", "male");
            });

            const tabItems = modal.querySelectorAll(".tab-item");
            tabItems.forEach((tab) => {
              tab.classList.remove("pink", "blue");
            });

            modalHeader.classList.add(genderClass);
            coloredRow.forEach((row) => {
              row.classList.add(genderClass);
            });
            tabItems.forEach((tab) => {
              tab.classList.add(tabItemClass);
            });

            const imageElement = document.getElementById("profileImage");
            imageElement.src = `/SCES/storage/student/images/${student.profile_image}`;
            imageElement.onerror = function () {
              this.src = "/SCES/storage/student/images/default-profile.png";
            };
            document.getElementById("studId").textContent = student.student_id;
            document
              .getElementById("recordsTab")
              .setAttribute("data-student-id", student.student_id);
            document
              .getElementById("analyticsTab")
              .setAttribute("data-lrn", student.lrn);
            document.getElementById("fullName").textContent =
              student.student_fname + " " + student.student_lname;
            document.getElementById("gradeSection").textContent =
              student.grade_level + " - " + student.section;
            document.getElementById("lastName").textContent =
              student.student_lname;
            document.getElementById("firstName").textContent =
              student.student_fname;
            document.getElementById("middleName").textContent =
              student.student_mname;
            document.getElementById("lastName").textContent =
              student.student_lname;
            document.getElementById("gender").textContent = student.gender;
            document.getElementById("age").textContent = student.age;
            document.getElementById("lrn").textContent = student.lrn;
            document.getElementById("studentId").textContent =
              student.student_id;
            document.getElementById("gradeLevel").textContent =
              student.grade_level;
            document.getElementById("section").textContent = student.section;
            document.getElementById("email").textContent = student.email;
            document.getElementById("city").textContent = student.city;
            document.getElementById("barangay").textContent = student.barangay;
            document.getElementById("street").textContent = student.street;
            document.getElementById("guardian").textContent =
              student.guardian_name;
            document.getElementById("contact").textContent =
              student.guardian_contact;

            document.body.style.overflow = "hidden";
            modal.style.display = "flex";
            populatePanelData(student.student_id);
            getStudentGWA(student.student_id);
          })
          .catch((error) => {
            showAlert("error", "Server Error", "Please Try Again Later");
          });
      }
    });

  document
    .getElementById("closeStudentModal")
    .addEventListener("click", function () {
      document.getElementById("studentModal").style.display = "none";
      document.body.style.overflow = "auto";
      showTabContent("profileContainer");
      setActiveTab("profileTab");
    });

  document.getElementById("profileTab").addEventListener("click", function () {
    showTabContent("profileContainer");
    setActiveTab("profileTab");
  });

  document.getElementById("recordsTab").addEventListener("click", function () {
    var studentId = document
      .getElementById("recordsTab")
      .getAttribute("data-student-id");

    showTabContent("recordsContainer");
    setActiveTab("recordsTab");
    initializeQuizScoresTable(studentId);
    initializeGradesTable(studentId);
  });

  document
    .getElementById("analyticsTab")
    .addEventListener("click", function () {
      var studentId = document
        .getElementById("recordsTab")
        .getAttribute("data-student-id");
      var lrn = document
        .getElementById("analyticsTab")
        .getAttribute("data-lrn");

      populatePanelData(studentId);
      getStudentGWA(studentId);
      initializeStudentLineChart(studentId);
      initializeStudentBarChart(lrn);
      initializeStudentFullBarChart(studentId);
      showTabContent("analyticsContainer");
      setActiveTab("analyticsTab");
    });

  showTabContent("profileContainer");
  setActiveTab("profileTab");

  function showTabContent(tabId) {
    const tabs = document.querySelectorAll(".tab-container");
    tabs.forEach((tab) => {
      tab.style.display = "none";
    });

    document.getElementById(tabId).style.display = "flex";
  }

  function setActiveTab(tabId) {
    const tabs = document.querySelectorAll(".tab-item");
    tabs.forEach((tab) => {
      tab.classList.remove("active"); // Remove 'active' from all tabs
    });
    document.getElementById(tabId).classList.add("active"); // Add 'active' to the selected tab
  }

  function initializeQuizScoresTable(studentId) {
    if ($.fn.dataTable.isDataTable("#quizScoresTable")) {
      var quizScoresTable = $("#quizScoresTable").DataTable();
      quizScoresTable.settings()[0].ajax.data = function (d) {
        d.submitType = "facultyGetQuizRecords";
        d.student_id = studentId;
        return d;
      };

      quizScoresTable.ajax.reload();
    } else {
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
            d.submitType = "facultyGetQuizRecords";
            d.student_id = studentId; // Pass the student ID here
            return d;
          },
          dataSrc: "",
        },
        columns: [
          { data: "quiz_number", className: "text-center" },
          { data: "subject", className: "text-center" },
          { data: "title", className: "text-center" },
          { data: "score", className: "text-center" },
          { data: "item_number", className: "text-center" },
          {
            data: "remarks",
            render: function (data) {
              var className =
                data === "Passed"
                  ? "passed"
                  : data === "Failed"
                  ? "failed"
                  : "";
              return `<span class="${className}">${data}</span>`;
            },
          },
          { data: "time", className: "text-center" },
        ],
        language: {
          emptyTable: "No data available in table",
        },
        initComplete: function () {
          quizScoresTable.draw();
        },
      });
    }
  }

  function initializeGradesTable(studentId) {
    if ($.fn.dataTable.isDataTable("#gradesTable")) {
      var gradesTable = $("#gradesTable").DataTable();
      gradesTable.settings()[0].ajax.data = function (d) {
        d.submitType = "facultyGetGrades";
        d.student_id = studentId;
        return d;
      };

      gradesTable.ajax.reload();
    } else {
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
            d.submitType = "facultyGetGrades";
            d.student_id = studentId;
            return d;
          },
          dataSrc: "",
        },
        columns: [
          { data: "subject", className: "text-center" },
          { data: "grade", className: "text-center" },
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
          { data: "quarter", className: "text-center" },
        ],
        language: {
          emptyTable: "No data available in table",
        },
        initComplete: function () {
          gradesTable.draw();
        },
      });
    }
  }

  function populatePanelData(studentId) {
    var section_id = document
      .getElementById("studentModal")
      .getAttribute("data-section");
    const data = new FormData();
    data.append("submitType", "facultyGetPanelData");
    data.append("student_id", studentId);
    data.append("section_id", section_id);

    fetch("/SCES/backend/fetch-class.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("studentCompletion").textContent =
          data.totalCompleted || 0;
        document.getElementById("studentQuizzes").textContent =
          data.totalPending || 0;
        document.getElementById("studentAverageScore").textContent =
          data.averageScore || "N/A";
        document.getElementById("studentGeneralAverage").textContent =
          data.generalAverage || "N/A";
      })
      .catch((error) => {
        console.error("Error fetching panel data:", error);
      });
  }
  function getStudentGWA(studentId) {
    const data = new FormData();
    data.append("submitType", "facultyGetGWA");
    data.append("student_id", studentId);

    fetch("/SCES/backend/fetch-class.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((studentData) => {
        // Check if studentData contains N/A values
        const hasNoData = studentData.some(
          (record) =>
            record.gwa === "N/A" &&
            record.grade_section === "N/A" &&
            record.remarks === "N/A"
        );

        if (hasNoData) {
          studentPerformance.innerText = "No Data";
          studentSuccess.innerText = "No Data";
          studentRemarks.innerText = "No Data";
          studentGWA.innerText = "No Data";

          remarksImg.src = "/SCES/assets/images/not-found.png";
          performanceImg.src = "/SCES/assets/images/not-found.png";
          return;
        }

        const predictiveData = {
          gwa_records: studentData, // Send the entire studentData array
        };

        // Send the predictive data to Python API
        fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(predictiveData),
        })
          .then((response) => response.json())
          .then((predictionData) => {
            const remarks = predictionData.predicted_remarks;
            const performance = predictionData.predicted_performance;

            studentPerformance.innerText = predictionData.predicted_performance;
            studentSuccess.innerText =
              predictionData.predicted_academic_success_rate;
            studentRemarks.innerText = predictionData.predicted_remarks;
            studentGWA.innerText = predictionData.predicted_next_gwa;

            remarksImg.src = getRemarksIcon(remarks);
            performanceImg.src = getPerformanceIcon(performance);
          })
          .catch((error) => {
            console.error("Error fetching predictions:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }

  function initializeStudentBarChart(lrn) {
    var ctxBar = document.getElementById("studentBarChart").getContext("2d");

    if (Chart.getChart("studentBarChart")) {
      Chart.getChart("studentBarChart").destroy();
    }
    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: "studentBarChartGWA",
        lrn: lrn,
      },
      success: function (data) {
        var ctxBar = document
          .getElementById("studentBarChart")
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

  function initializeStudentLineChart(studentId) {
    var ctxLine = document.getElementById("studentLineChart").getContext("2d");

    if (Chart.getChart("studentLineChart")) {
      Chart.getChart("studentLineChart").destroy();
    }

    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: {
        submitType: "studentAverageScoreByMonth",
        student_id: studentId,
      },
      success: function (response) {
        const chartData = JSON.parse(response);
        const months = chartData.labels || [];
        const scores = chartData.lineData || [];

        if (scores.length === 0) {
          showAlert("info", "No Data Available For Student");
          ctxLine.chart = new Chart(ctxLine, {
            type: "line",
            data: {
              labels: ["No Data"],
              datasets: [
                {
                  data: [0], // No data
                  borderColor: "#ccc",
                  backgroundColor: "rgba(200, 200, 200, 0.5)",
                  fill: true,
                  tension: 0.4,
                },
              ],
            },
            options: {
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: false, // Disable the legend
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: false, // Remove title for y-axis
                },
                x: {
                  title: false, // Remove title for x-axis
                },
              },
            },
          });
        } else {
          ctxLine.chart = new Chart(ctxLine, {
            type: "line",
            data: {
              labels: months,
              datasets: [
                {
                  label: "", // Remove label from the dataset
                  data: scores,
                  borderColor: "#ddd1ff", // Use #ddd1ff color for the line
                  backgroundColor: "rgba(221, 209, 255, 0.5)",
                  fill: true,
                  tension: 0.4, // Curve the line
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
                legend: false, // Disable the legend
                title: {
                  display: true,
                  text: "Average Score Per Month", // Add chart title
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
                y: {
                  beginAtZero: true,
                  title: false, // Remove title for y-axis
                },
                x: {
                  title: false, // Remove title for x-axis
                },
              },
            },
          });
        }
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data: ", error);
      },
    });
  }

  function initializeStudentFullBarChart(studentId) {
    var section_id = document
      .getElementById("studentModal")
      .getAttribute("data-section");
    const ctxBar = document
      .getElementById("studentFullBarChart")
      .getContext("2d");

    // Destroy previous instance if it exists
    if (Chart.getChart("studentFullBarChart")) {
      Chart.getChart("studentFullBarChart").destroy();
    }

    // AJAX request to fetch data
    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: "studentFullBarChart",
        student_id: studentId,
        section_id: section_id,
      },
      success: function (data) {
        // Define color mapping for subject codes
        const colorMapping = {
          fil: "#ff8080",
          eng: "#ffb480",
          math: "#e1e149",
          sci: "#42d6a4",
          esp: "#08cad1",
          mt: "#59adf6",
          ap: "#f0bad1",
          mapeh: "#a3adff",
          epp: "#d9ae9d",
        };

        // Map background colors based on subject codes
        const backgroundColors = data.subjectCodes.map(
          (code) => colorMapping[code] || "#cccccc" // Default color if code is missing
        );

        new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "Average Score",
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
                text: "Average Score Per Subject",
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
        console.error("Error fetching data for student full bar chart:", error);
      },
    });
  }

  function getRemarksIcon(remarks) {
    if (remarks === "Outstanding") {
      return "/SCES/assets/images/outstanding.png";
    } else if (remarks === "Very Good") {
      return "/SCES/assets/images/very-good.png";
    } else if (remarks === "Good") {
      return "/SCES/assets/images/good.png";
    } else if (remarks === "Fair") {
      return "/SCES/assets/images/fair.png";
    } else {
      return "/SCES/assets/images/at-risk.png";
    }
  }

  function getPerformanceIcon(performance) {
    if (performance == "Passed") {
      return "/SCES/assets/images/passed.png";
    } else {
      return "/SCES/assets/images/at-risk.png";
    }
  }

  function showAlert(icon, title, message) {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      confirmButtonColor: "#4CAF50",
    });
  }
});
