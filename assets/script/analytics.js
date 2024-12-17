document.addEventListener("DOMContentLoaded", function () {
  const yearFilter = document.getElementById("yearFilterDropdown");
  const gradeFilter = document.getElementById("gradeFilterDropdown");

  function initializeData() {
    const year = yearFilter.value;
    const grade = gradeFilter.value;

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
        document.getElementById("totalHonors").textContent =
          data.totalHonors || 0;
        document.getElementById("totalPassed").textContent =
          data.totalPassed || 0;
      })
      .catch((error) => {
        console.error("Error fetching panel data:", error);
      });
  }

  function initializeBarChart(year, grade) {
    var ctxBar = document.getElementById("barChart").getContext("2d");

    // Destroy existing chart instance if it exists
    if (Chart.getChart("barChart")) {
      Chart.getChart("barChart").destroy();
    }

    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: "analyticsBarChartWithFilter",
        year: year,
        gradeLevel: grade,
      },
      success: function (data) {
        const labels = data.labels || ["No Data"];
        const maxGrades = data.maxGrades || [0];
        const minGrades = data.minGrades || [0];
        const maxSubjects = data.maxSubjects || [];
        const minSubjects = data.minSubjects || [];

        new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Highest Grade",
                data: maxGrades,
                backgroundColor: "#8CD47E",
                borderColor: "#ccc",
                borderWidth: 2,
              },
              {
                label: "Lowest Grade",
                data: minGrades,
                backgroundColor: "#FF6961",
                borderColor: "#ccc",
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
                text: "Highest and Lowest Grades",
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
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    const datasetIndex = tooltipItem.datasetIndex; // 0: Highest Grade, 1: Lowest Grade
                    const value = tooltipItem.raw; // Grade value
                    const gradeType =
                      datasetIndex === 0 ? "Highest Grade" : "Lowest Grade";

                    let tooltipText = `${gradeType}: ${value}`;

                    if (grade === "All") {
                      const maxSubject = maxSubjects[tooltipItem.dataIndex];
                      const minSubject = minSubjects[tooltipItem.dataIndex];

                      if (datasetIndex === 0 && maxSubject) {
                        tooltipText += `, Subject: ${maxSubject}`;
                      } else if (datasetIndex === 1 && minSubject) {
                        tooltipText += `, Subject: ${minSubject}`;
                      }
                    }

                    return tooltipText;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
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

    // Destroy the existing chart if it exists
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
        const barColors = data.barData.map((gwa) =>
          gwa < 80 ? "#FF6961" : "#8CD47E"
        );

        var barChart = new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "GWA",
                data: data.barData,
                backgroundColor: barColors, // Assign conditional colors
                borderColor: "#ccc",
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
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const gwa = context.raw; // GWA value
                    const students = data.studentCounts[context.dataIndex]; // Number of students
                    return `GWA: ${gwa}, Students: ${students}`;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
              },
            },
          },
        });

        // Fetch interpretation from Flask
        $.ajax({
          url: "http://127.0.0.1:5000/interpret-gwa",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            year: year,
            gradeLevel: grade,
            labels: data.labels,
            barData: data.barData,
            studentCounts: data.studentCounts,
          }),
          success: function (interpretationResponse) {
            const interpretationSpan =
              document.getElementById("lvlInterpretation");
            interpretationSpan.innerHTML = "";

            const hasWarning = interpretationResponse.warning === 0;

            const legendHtml = `
              <legend style="color: ${hasWarning ? "red" : "green"};">
                ${
                  hasWarning
                    ? `<img src="/SCES/assets/images/at-risk.png" alt="Warning"> Action Required`
                    : `<img src="/SCES/assets/images/quiz-passed.png" alt="Check"> No Warnings Found`
                }
              </legend>
            `;
            const interpretation = interpretationResponse.interpretation
              ? `<p><strong>${interpretationResponse.interpretation}</strong></p>`
              : "";

            let insightsHtml = "";

            if (grade === "All" && year === "All") {
              if (
                interpretationResponse.trends &&
                interpretationResponse.trends.length > 0
              ) {
                const trendsList = interpretationResponse.trends
                .map((trend) => {
                    iconHtml = `<i class="fas fa-arrow-down" style="color: red;"></i>`;
                  return `<li>${trend} ${iconHtml}</li>`;
                })
                .join("");
                insightsHtml = `
                  <p><strong>Highest Average GWA: </strong>${interpretationResponse.highest} <i class="fas fa-arrow-up" style="color: green;"></i></p>
                  <p><strong>${interpretationResponse.initial}</strong></p>
                  <ul>${trendsList}</ul>
                  `;
              } else {
                let iconHtml = "";
                insightsHtml = `
                <p><strong>Highest Average GWA: </strong>${interpretationResponse.highest} <i class="fas fa-arrow-up" style="color: green;"></i></p>
                <p><strong>Lowest Average GWA:  </strong>${interpretationResponse.lowest} <i class="fas fa-arrow-down" style="color: red;"></i></p>
                `;
              }
            }
            if (grade === "All" && year !== "All") {
              if (
                interpretationResponse.trends &&
                interpretationResponse.trends.length > 0
              ) {
                const trendsList = interpretationResponse.trends
                .map((trend) => {
                    iconHtml = `<i class="fas fa-arrow-down" style="color: red;"></i>`;
                  return `<li>${trend} ${iconHtml}</li>`;
                })
                .join("");
                insightsHtml = `
                  <p><strong>Highest Average GWA: </strong>${interpretationResponse.highest} <i class="fas fa-arrow-up" style="color: green;"></i></p>
                  <p><strong>${interpretationResponse.initial}</strong></p>
                  <ul>${trendsList}</ul>
                  `;
              } else {
                let iconHtml = "";
                insightsHtml = `
                <p><strong>Highest Average GWA: </strong>${interpretationResponse.highest} <i class="fas fa-arrow-up" style="color: green;"></i></p>
                <p><strong>Lowest Average GWA: </strong>${interpretationResponse.lowest} <i class="fas fa-arrow-down" style="color: red;"></i></p>
                `;
              }
            }
            if (grade !== "All" && year === "All") {
              const trendsList = interpretationResponse.trends
                .map((trend) => {
                  let iconHtml = "";
                  if (trend.includes("Improvement")) {
                    iconHtml = `<i class="fas fa-arrow-up" style="color: green;"></i>`;
                  } else if (trend.includes("Decline")) {
                    iconHtml = `<i class="fas fa-arrow-down" style="color: red;"></i>`;
                  } else if (trend.includes("No significant")) {
                    iconHtml = `<i class="fas fa-minus" style="color: goldenrod;"></i>`;
                  }
                  return `<li>${trend} ${iconHtml}</li>`;
                })
                .join("");

              insightsHtml = `
                <p><strong>${interpretationResponse.initial}</strong></p>
                <ul>${trendsList}</ul>
              `;
            }

            const recommendation = interpretationResponse.recommendation
              ? `<p><strong>Recommendation: </strong>${interpretationResponse.recommendation}</p>`
              : "";

            // Combine everything into a single HTML block
            interpretationSpan.innerHTML = `
              ${legendHtml}
              ${interpretation}
              ${insightsHtml}
              ${recommendation}
            `;
          },
          error: function () {
            document.getElementById("lvlInterpretation").textContent =
              "Error fetching interpretation.";
          },
        });
      },
    });
  }

  function initializeRankingTable(year, grade) {
    const tableHead = document.querySelector("#rankingTable thead tr");
    const tableBody = document.getElementById("rankingTableBody");

    tableHead.innerHTML = "";
    tableBody.innerHTML = "";

    const headers =
      year !== "All" && year <= 2023
        ? ["Full Name", "GWA", "Grade & Section"]
        : ["Full Name", "Average Grade", "Grade & Section", "View Student"];

    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.className = "text-center";
      th.textContent = headerText;
      tableHead.appendChild(th);
    });

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
                          <td class="text-center" data-label="Average Score">${row.average_grade}</td>
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
      $("#subjectFilterDropdown").val("All");
      $("#quarterFilterDropdown").val("All");
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
      var sectionId = document
        .getElementById("studentModal")
        .getAttribute("data-section");
      populatePanelData(studentId);
      getStudentGWA(studentId);
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
    const data = new FormData();
    data.append("submitType", "facultyGetPanelData");
    data.append("student_id", studentId);

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
        fetch("https://predictive-model-sces-1.onrender.com/predict", {
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

    // Destroy existing chart instance if it exists
    if (Chart.getChart("studentBarChart")) {
      Chart.getChart("studentBarChart").destroy();
    }

    // Fetch GWA records for the bar chart
    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: "studentBarChartGWA",
        lrn: lrn,
      },
      success: function (data) {
        var barChart = new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "GWA",
                data: data.barData,
                backgroundColor: "#59ADF6",
                borderColor: "#ccc",
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
                font: { size: 18 },
                padding: { top: 10, bottom: 10 },
              },
              legend: { display: false },
            },
            scales: {
              y: { beginAtZero: true, max: 100 },
            },
          },
        });

        const interpretationElement = document.getElementById("interpretation");

        const gwaRecords = data.labels.map((label, index) => ({
          grade_level: label,
          gwa: data.barData[index],
        }));

        fetch("http://127.0.0.1:5000/interpret", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gwa_records: gwaRecords }),
        })
          .then((response) => response.json())
          .then((interpretationData) => {
            if (interpretationData.error) {
              interpretationElement.innerHTML = `<p style="color: red;">${interpretationData.error}</p>`;
              return;
            }

            const hasWarning = interpretationData.warning === 0;

            const legendHtml = `
              <legend style="color: ${hasWarning ? "red" : "green"};">
                ${
                  hasWarning
                    ? `<img src="/SCES/assets/images/at-risk.png" alt="Warning"> Action Required`
                    : `<img src="/SCES/assets/images/quiz-passed.png" alt="Check"> No Warnings Found`
                }
              </legend>
            `;
            const overallMessage = interpretationData.overall_message
              ? `<p><strong>${interpretationData.overall_message}</strong></p>`
              : "";
            let insightsHtml = "";
            if (
              interpretationData.insights &&
              interpretationData.insights.length > 0
            ) {
              const insightsList = interpretationData.insights
                .map((insight) => {
                  let iconHtml = "";
                  if (insight.includes("Improvement in GWA")) {
                    iconHtml = `<i class="fas fa-arrow-up" style="color: green;"></i>`;
                  } else if (insight.includes("Decline in GWA")) {
                    iconHtml = `<i class="fas fa-arrow-down" style="color: red;"></i>`;
                  } else if (insight.includes("No changes in GWA")) {
                    iconHtml = `<i class="fas fa-minus" style="color: goldenrod;"></i>`;
                  }
                  return `<li>${insight} ${iconHtml}</li>`;
                })
                .join("");

              insightsHtml = `
                <p><strong>Student's GWA across grade level:</strong></p>
                <ul>${insightsList}</ul>
              `;
            } else {
              insightsHtml = `<p>No insights available for this student.</p>`;
            }
            const recommendation = interpretationData.recommendation
              ? `<p><strong>Recommendation: </strong>${interpretationData.recommendation}</p>`
              : "";

            // Combine everything into a single HTML block
            interpretationElement.innerHTML = `
              ${legendHtml}
              ${overallMessage}
              ${insightsHtml}
              ${recommendation}
            `;
          })
          .catch(() => {
            interpretationElement.innerHTML = `<p style="color: red;">Failed to fetch interpretation data.</p>`;
          });
      },
      error: function () {
        document.getElementById(
          "interpretation"
        ).innerHTML = `<p style="color: red;">Failed to fetch GWA data.</p>`;
      },
    });
  }

  $("#subjectFilterDropdown, #quarterFilterDropdown").on("change", function () {
    var studentId = document
      .getElementById("recordsTab")
      .getAttribute("data-student-id");
    initializeStudentFullBarChart(studentId);
  });

  function initializeStudentFullBarChart(studentId) {
    const subjectFilter = $("#subjectFilterDropdown").val();
    const quarterFilter = $("#quarterFilterDropdown").val();

    const ctxBar = document
      .getElementById("studentFullBarChart")
      .getContext("2d");

    if (Chart.getChart("studentFullBarChart")) {
      Chart.getChart("studentFullBarChart").destroy();
    }

    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: "studentFullBarChart",
        student_id: studentId,
        subject: subjectFilter,
        quarter: quarterFilter,
      },
      success: function (data) {
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

        const backgroundColors = data.subjectCodes.map((code) => {
          const normalizedCode = code.toLowerCase();
          return colorMapping[normalizedCode] || "#cccccc";
        });

        new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "Grade",
                data: data.barData,
                backgroundColor: backgroundColors,
                borderColor: "#ccc",
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
                text: "Grade Per Subject",
                font: { size: 18 },
                padding: { top: 10, bottom: 10 },
              },
              legend: { display: false },
            },
            scales: {
              y: { beginAtZero: true, max: 100 },
            },
          },
        });

        const subjectTitles =
          subjectFilter === "All"
            ? data.labels.map(getSubjectTitle)
            : data.labels;

        $.ajax({
          url: "http://127.0.0.1:5000/interpret-grades",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            subject_filter: subjectFilter,
            quarter_filter: quarterFilter,
            labels: subjectTitles,
            bar_data: data.barData,
          }),
          success: function (interpretationResponse) {
            const interpretationSpan = document.getElementById(
              "subjectInterpretation"
            );
            interpretationSpan.innerHTML = ""; // Clear previous content

            const hasWarning = interpretationResponse.warning === 0;

            const legendHtml = `
              <legend style="color: ${hasWarning ? "red" : "green"};">
                ${
                  hasWarning
                    ? `<img src="/SCES/assets/images/at-risk.png" alt="Warning"> Action Required`
                    : `<img src="/SCES/assets/images/quiz-passed.png" alt="Check"> No Warnings Found`
                }
              </legend>
            `;

            const interpretation = interpretationResponse.interpretation
              ? `<p><strong>${interpretationResponse.interpretation}</strong></p>`
              : "";

            let insightsHtml = "";
            if (
              interpretationResponse.trends &&
              interpretationResponse.trends.length > 0
            ) {
              const trendsList = interpretationResponse.trends
                .map((trend) => {
                  let iconHtml = "";
                  if (trend.includes("Improvement")) {
                    iconHtml = `<i class="fas fa-arrow-up" style="color: green;"></i>`;
                  } else if (trend.includes("Decline")) {
                    iconHtml = `<i class="fas fa-arrow-down" style="color: red;"></i>`;
                  } else if (trend.includes("No changes")) {
                    iconHtml = `<i class="fas fa-minus" style="color: goldenrod;"></i>`;
                  }
                  return `<li>${trend} ${iconHtml}</li>`;
                })
                .join("");

              insightsHtml = `
                <p><strong>${interpretationResponse.initial}</strong></p>
                <ul>${trendsList}</ul>
              `;
            } else {
              if (
                interpretationResponse.strength &&
                interpretationResponse.weakness
              ) {
                let iconHtml = "";
                insightsHtml = `
              <p><strong>Excels In: </strong>${interpretationResponse.strength} <i class="fas fa-arrow-up" style="color: green;"></i></p>
              <p><strong>Difficulties In: </strong>${interpretationResponse.weakness} <i class="fas fa-arrow-down" style="color: red;"></i></p>
              `;
              } else {
                insightsHtml = "";
              }
            }

            const recommendation = interpretationResponse.recommendation
              ? `<p><strong>Recommendation: </strong>${interpretationResponse.recommendation}</p>`
              : "";

            // Combine everything into a single HTML block
            interpretationSpan.innerHTML = `
              ${legendHtml}
              ${interpretation}
              ${insightsHtml}
              ${recommendation}
            `;
          },
          error: function (xhr, status, error) {
            const interpretationSpan = document.getElementById(
              "subjectInterpretation"
            );
            interpretationSpan.innerHTML = `<p style="color: red;">Failed to fetch interpretation data.</p>`;
          },
        });
      },
      error: function (xhr, status, error) {
        const interpretationSpan = document.getElementById(
          "subjectInterpretation"
        );
        interpretationSpan.innerHTML = `<p style="color: red;">Error fetching data for student full bar chart</p>`;
      },
    });
  }

  function getSubjectTitle(subject) {
    switch (subject) {
      case "AP":
        return "Araling Panlipunan";
      case "ENG":
        return "English";
      case "ESP":
        return "ESP";
      case "FIL":
        return "Filipino";
      case "MAPEH":
        return "MAPEH";
      case "MATH":
        return "Mathematics";
      case "MT":
        return "Mother Tongue";
      case "EPP":
        return "EPP";
      case "SCI":
        return "Science";
      default:
        return "Unknown Subject";
    }
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
