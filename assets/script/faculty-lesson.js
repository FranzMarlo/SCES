document.addEventListener("DOMContentLoaded", function () {
  var addLessonModal = document.getElementById("addLessonModal");
  var addLessonBtn = document.getElementById("addLesson");
  var closeBtn = document.getElementById("closeLessonModal");
  var addLessonForm = document.getElementById("facultyAddLesson");

  addLessonBtn.onclick = function () {
    addLessonModal.style.display = "flex";
  };
  closeBtn.onclick = function () {
    addLessonModal.style.display = "none";
    resetModal();
  };
  window.onclick = function (event) {
    if (event.target == addLessonModal) {
      addLessonModal.style.display = "none";
      resetModal();
    }
  };
  document.getElementById("lessonFile").addEventListener("change", function () {
    var fileName = this.files[0] ? this.files[0].name : "No file chosen";
    document.getElementById("fileName").textContent = fileName;
  });
  function resetModal() {
    addLessonForm.reset();
    var fileInput = document.getElementById("lessonFile");
    fileInput.value = "";
  }
  // Function to update the displayed container and URL
  function updateTabDisplay(activeTab, activeIndex) {
    const containers = {
      lesson: document.getElementById("lessonContainer"),
      student: document.getElementById("studentContainer"),
      records: document.getElementById("recordsContainer"),
      analytics: document.getElementById("analyticsContainer"),
    };

    // Hide all containers
    for (const container in containers) {
      containers[container].style.display = "none";
    }

    // Show the active container
    if (activeTab === "lessonTab") {
      containers.lesson.style.display = "flex";
    } else if (activeTab === "studentTab") {
      containers.student.style.display = "flex";
    } else if (activeTab === "recordsTab") {
      containers.records.style.display = "flex";
    } else if (activeTab === "analyticsTab") {
      containers.analytics.style.display = "flex";
    }

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("active", activeIndex);

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState(null, "", newUrl);
  }

  document.getElementById("lessonTab").classList.add("active");
  document.getElementById("lessonTab").addEventListener("click", function () {
    updateTabDisplay("lessonTab", 1);
    document.getElementById("lessonTab").classList.add("active");
    document.getElementById("studentTab").classList.remove("active");
    document.getElementById("recordsTab").classList.remove("active");
    document.getElementById("analyticsTab").classList.remove("active");
  });

  document.getElementById("studentTab").addEventListener("click", function () {
    updateTabDisplay("studentTab", 2);
    initializeStudentsTable();
    document.getElementById("lessonTab").classList.remove("active");
    document.getElementById("studentTab").classList.add("active");
    document.getElementById("recordsTab").classList.remove("active");
    document.getElementById("analyticsTab").classList.remove("active");
  });

  document.getElementById("recordsTab").addEventListener("click", function () {
    updateTabDisplay("recordsTab", 3);
    initializeRecordsTable();
    document.getElementById("lessonTab").classList.remove("active");
    document.getElementById("studentTab").classList.remove("active");
    document.getElementById("recordsTab").classList.add("active");
    document.getElementById("analyticsTab").classList.remove("active");
  });

  document
    .getElementById("analyticsTab")
    .addEventListener("click", function () {
      updateTabDisplay("analyticsTab", 4);
      populateSubjectPanelData();
      document.getElementById("lessonTab").classList.remove("active");
      document.getElementById("studentTab").classList.remove("active");
      document.getElementById("recordsTab").classList.remove("active");
      document.getElementById("analyticsTab").classList.add("active");
    });

  // Default to lessonTab on page load
  window.addEventListener("load", function () {
    const params = new URLSearchParams(window.location.search);
    const activeTab = params.get("active") || "1"; // Default to '1' if no param

    switch (activeTab) {
      case "2":
        updateTabDisplay("studentTab", 2);
        initializeStudentsTable();
        document.getElementById("lessonTab").classList.remove("active");
        document.getElementById("studentTab").classList.add("active");
        document.getElementById("recordsTab").classList.remove("active");
        document.getElementById("analyticsTab").classList.remove("active");
        break;
      case "3":
        updateTabDisplay("recordsTab", 3);
        initializeRecordsTable();
        document.getElementById("lessonTab").classList.remove("active");
        document.getElementById("studentTab").classList.remove("active");
        document.getElementById("recordsTab").classList.add("active");
        document.getElementById("analyticsTab").classList.remove("active");
        break;
      case "4":
        updateTabDisplay("analyticsTab", 4);
        populateSubjectPanelData();
        document.getElementById("lessonTab").classList.remove("active");
        document.getElementById("studentTab").classList.remove("active");
        document.getElementById("recordsTab").classList.remove("active");
        document.getElementById("analyticsTab").classList.add("active");
        break;
      default:
        updateTabDisplay("lessonTab", 1);
        document.getElementById("lessonTab").classList.add("active");
        document.getElementById("studentTab").classList.remove("active");
        document.getElementById("recordsTab").classList.remove("active");
        document.getElementById("analyticsTab").classList.remove("active");
        break;
    }
  });

  function showAlert(icon, title, message) {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      confirmButtonColor: "#4CAF50",
    });
  }

  function initializeStudentsTable() {
    if ($.fn.dataTable.isDataTable("#studentsTable")) {
    } else {
      var studentsTable = $("#studentsTable").DataTable({
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
                      "<td><strong>" +
                      col.title +
                      ":" +
                      "</strong></td> " +
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
            d.submitType = "fetchStudentsDataTable";
            return d;
          },
          dataSrc: "",
        },
        columns: [
          {
            data: "profile_image",
            render: function (data, type, row) {
              return `<div class="center-image">
                    <img src="/SCES/storage/student/images/${data}" alt="Profile Image" onerror="this.onerror=null; this.src='/SCES/storage/student/images/default.jpg';">
                  </div>`;
            },
            orderable: false,
            searchable: false,
            className: "text-center",
          },
          { data: "lrn" },
          { data: "student_id" },
          { data: "student_lname" },
          { data: "student_fname" },
          { data: "student_mname" },
          { data: "age" },
          { data: "gender" },
          {
            data: null,
            render: function (data, type, row) {
              return `<div class="center-image">
          <button class="more-btn" data-student-id="${row.student_id}"><i class="fa-solid fa-chevron-right"></i></button>
          </div>`;
            },
            orderable: false,
            searchable: false,
            className: "text-center",
          },
        ],
        language: {
          emptyTable: "No data available in table",
        },
        initComplete: function () {
          studentsTable.draw();
        },
      });
    }
  }

  document
    .getElementById("studentsTable")
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
            const modalHeader = document.getElementById("studentHeader");
            const genderClass = student.gender === "Female" ? "female" : "male";
            const tabItemClass = student.gender === "Female" ? "pink" : "blue";
            const coloredRow = document.querySelectorAll(".colored-row");

            modalHeader.classList.remove("female", "male");
            coloredRow.forEach((row) => {
              row.classList.remove("female", "male");
            });

            const tabItems = document.querySelectorAll(".tab-item");
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
              .getElementById("studentRecordsTab")
              .setAttribute("data-student-id", student.student_id);
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
            document.getElementById("studentModal").style.display = "flex";
            populatePanelData(student.student_id);
          })
          .catch((error) => {
            showAlert("error", "Server Error", error);
          });
      }
    });

  document
    .getElementById("closeStudentModal")
    .addEventListener("click", function () {
      document.getElementById("studentModal").style.display = "none";
      document.body.style.overflow = "auto";
      showTabContent("studentProfileContainer");
      setActiveTab("studentProfileTab");
    });

  document
    .getElementById("studentProfileTab")
    .addEventListener("click", function () {
      showTabContent("studentProfileContainer");
      setActiveTab("studentProfileTab");
    });

  document
    .getElementById("studentRecordsTab")
    .addEventListener("click", function () {
      var studentId = document
        .getElementById("studentRecordsTab")
        .getAttribute("data-student-id");

      showTabContent("studentRecordsContainer");
      setActiveTab("studentRecordsTab");
      initializeQuizScoresTable(studentId);
      initializeGradesTable(studentId);
    });

  document
    .getElementById("studentAnalyticsTab")
    .addEventListener("click", function () {
      var studentId = document
        .getElementById("studentRecordsTab")
        .getAttribute("data-student-id");

      fetchDonutChartData(studentId);
      initializeLineChart(studentId);
      showTabContent("studentAnalyticsContainer");
      setActiveTab("studentAnalyticsTab");
    });

  showTabContent("studentProfileContainer");
  setActiveTab("studentProfileTab");

  function showTabContent(tabId) {
    const tabs = document.querySelectorAll(".modal-tab");
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
        d.submitType = "facultyGetQuizRecordsBySubject";
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
            d.submitType = "facultyGetQuizRecordsBySubject";
            d.student_id = studentId; // Pass the student ID here
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
                data === "Passed"
                  ? "passed"
                  : data === "Failed"
                  ? "failed"
                  : "";
              return `<span class="${className}">${data}</span>`;
            },
          },
          { data: "time" },
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
        d.submitType = "facultyGetGradesBySubject";
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
            d.submitType = "facultyGetGradesBySubject";
            d.student_id = studentId;
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
    data.append("submitType", "facultyGetPanelDataBySubject");
    data.append("student_id", studentId);

    fetch("/SCES/backend/fetch-class.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("totalCompletion").textContent =
          data.totalCompleted || 0;
        document.getElementById("totalQuizzes").textContent =
          data.totalPending || 0;
        document.getElementById("averageScore").textContent =
          data.averageScore || "N/A";
        document.getElementById("generalAverage").textContent =
          data.generalAverage || "N/A";
      })
      .catch((error) => {
        console.error("Error fetching panel data:", error);
      });
  }

  function fetchDonutChartData(studentId) {
    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: {
        submitType: "studentCompletionBySubject",
        student_id: studentId,
      },
      dataType: "json",
      success: function (response) {
        var totalCompleted = response.totalCompleted;
        var totalQuizzes = response.totalQuizzes;

        initializeDonutChart(totalCompleted, totalQuizzes);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data: " + error);
      },
    });
  }

  function initializeDonutChart(totalCompleted, totalQuizzes) {
    var ctxDonut = document.getElementById("pieChart").getContext("2d");

    if (ctxDonut.chart) {
      ctxDonut.chart.destroy();
    }

    if (totalCompleted == 0 && totalQuizzes == 0) {
      showAlert("info", "No Data Available For Student");
    }

    const centerLabelPlugin = {
      id: "centerLabel",
      beforeDraw: function (chart) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const width = chartArea.right - chartArea.left;
        const height = chartArea.bottom - chartArea.top;

        // Calculate a responsive font size based on the chart dimensions
        const fontSize = Math.min(width, height) / 6; // Adjust the divisor to control size

        ctx.save();

        ctx.font = `${fontSize.toFixed(0)}px sans-serif`; // Set the font size dynamically
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";

        // Check if totalCompleted and totalQuizzes are both zero
        let percentage = "0%";
        if (totalQuizzes !== 0) {
          percentage = ((totalCompleted / totalQuizzes) * 100).toFixed(0) + "%";
        }

        const xCenter = chartArea.left + width / 2;
        const yCenter = chartArea.top + height / 2;

        ctx.fillText(percentage, xCenter, yCenter);
        ctx.restore();
      },
    };

    // Only register the plugin locally for this chart
    const donutChart = new Chart(ctxDonut, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Pending"],
        datasets: [
          {
            data: [totalCompleted, totalQuizzes - totalCompleted],
            backgroundColor: ["#d2ebc4", "#fcfd95"],
            borderWidth: 2,
            borderColor: "#000",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Quiz Completion", // Chart title
            font: {
              size: 17,
              weight: "bold",
            },
            padding: {
              top: 5,
              bottom: 10,
            },
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return "Quizzes: " + tooltipItem.raw;
              },
            },
          },
          centerLabel: true, // Activate the center label plugin
        },
      },
      plugins: [centerLabelPlugin], // Register the plugin locally here
    });

    ctxDonut.chart = donutChart;
  }

  function initializeLineChart(studentId) {
    var ctxLine = document.getElementById("lineChart").getContext("2d");

    // Destroy existing chart if it exists
    if (Chart.getChart("lineChart")) {
      Chart.getChart("lineChart").destroy();
    }

    // AJAX call to fetch data
    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: {
        submitType: "studentAverageScoreBySubject",
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

  function initializeRecordsTable() {
    if ($.fn.dataTable.isDataTable("#recordsTable")) {
      return;
    }

    var recordsTable = $("#recordsTable").DataTable({
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
                    "<td><strong>" +
                    col.title +
                    ":</strong></td>" +
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
          d.submitType = "fetchStudentsRecordTable";
          return d;
        },
        dataSrc: "",
      },
      columns: [
        { data: "full_name" },
        {
          data: "quiz_number",
          className: "text-center",
          render: function (data, type, row) {
            return `<span>Quiz #${data}</span>`;
          },
        },
        {
          data: "quiz_score",
          className: "text-center",
          render: function (data, type, row) {
            var className =
              row.remarks === "Passed"
                ? "passed"
                : row.remarks === "Failed"
                ? "failed"
                : "";
            return `<span class="${className}">${data}</span>`;
          },
        },
        {
          data: "remarks",
          className: "text-center",
          render: function (data) {
            var className =
              data === "Passed" ? "passed" : data === "Failed" ? "failed" : "";
            return `<span class="${className}">${data}</span>`;
          },
        },
        {
          data: "time",
          className: "text-center",
          render: function (data) {
            var date = new Date(data);
            var options = {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            };
            var formattedDate = date.toLocaleString("en-US", options);
            return `<span>${formattedDate}</span>`;
          },
        },
        {
          data: null,
          render: function (data, type, row) {
            return `<div class="center-image">
          <button class="more-btn" data-student-id="${row.student_id}" data-quiz-id="${row.quiz_id}" data-quiz-taker="${row.full_name}"><i class="fa-solid fa-chevron-right"></i></button>
          </div>`;
          },
          orderable: false,
          searchable: false,
          className: "text-center",
        },
      ],
      order: [[1, "desc"]],
      language: {
        emptyTable: "No data available in table",
      },
      initComplete: function () {
        recordsTable.draw();
      },
    });
  }

  document
    .getElementById("recordsTable")
    .addEventListener("click", function (event) {
      if (event.target.closest(".more-btn")) {
        const btn = event.target.closest(".more-btn");
        const studentId = btn.getAttribute("data-student-id");
        const quizId = btn.getAttribute("data-quiz-id");
        const quizTaker = btn.getAttribute("data-quiz-taker");

        fetch("/SCES/backend/fetch-class.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `submitType=fetchStudentQuizHistory&student_id=${studentId}&quiz_id=${quizId}`,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              showAlert("error", "Student has not answered the quiz yet");
              return;
            }
            const quizTakerSpan = document.getElementById("quizTaker");
            quizTakerSpan.textContent = quizTaker;

            const viewQuizModal = document.getElementById("viewQuizModal");

            viewQuizModal.querySelector(
              ".modal-header-text h1"
            ).innerText = `Quiz ${data.quiz_number} - ${data.title}`;

            viewQuizModal.querySelector(
              ".modal-icon-container img"
            ).src = `/SCES/assets/images/${data.icon}`;

            const modalHeaderBg =
              viewQuizModal.querySelector(".modal-header-bg");
            modalHeaderBg.className = `modal-header-bg ${data.subject_code.toLowerCase()}`;

            const questionsContainer = viewQuizModal.querySelector(
              "#viewQuestionsContainer"
            );
            questionsContainer.innerHTML = "";

            data.questions.forEach((question, index) => {
              const quizItem = document.createElement("div");
              quizItem.classList.add("quiz-item");

              const questionBox = document.createElement("div");
              questionBox.classList.add("question-box");
              questionBox.setAttribute(
                "data-question-id",
                question.question_id
              );
              questionBox.innerHTML = `<span><strong>${index + 1}.</strong> ${
                question.question
              }</span>`;
              quizItem.appendChild(questionBox);

              question.choices.forEach((choice, i) => {
                const choiceLetter = String.fromCharCode(65 + i);
                const choiceElement = document.createElement("div");
                choiceElement.classList.add("quiz-ans-fixed");

                if (choice.is_correct === 1) {
                  choiceElement.classList.add("correct");
                } else {
                  choiceElement.classList.add("wrong");
                }

                if (choice.isSelected) {
                  choiceElement.classList.add(data.subject_code.toLowerCase());
                }

                choiceElement.innerHTML = `
              <strong>${choiceLetter}.</strong>&nbsp;${choice.choice}
            `;

                quizItem.appendChild(choiceElement);
              });

              questionsContainer.appendChild(quizItem);
            });
            const closeButton = document.getElementById("close-quiz");

            closeButton.onclick = () => closeQuiz(viewQuizModal);

            viewQuizModal.style.display = "block";
            document.body.style.overflow = "hidden";
          })
          .catch((error) => {
            showAlert("error", "Server Error", error);
          });
      }
    });

  const closeViewQuizModal = document.getElementById("closeViewQuizModal");
  const viewQuizModal = document.getElementById("viewQuizModal");
  closeViewQuizModal.addEventListener("click", function () {
    closeQuiz(viewQuizModal);
  });

  function closeQuiz(modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function populateSubjectPanelData() {
    const data = new FormData();
    data.append("submitType", "facultyGetSubjectPanelData");

    fetch("/SCES/backend/fetch-class.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("subjectTotalCompletion").textContent =
          data.totalCompleted || 0;
        document.getElementById("subjectTotalQuizzes").textContent =
          data.totalPending || 0;
        document.getElementById("subjectAverageScore").textContent =
          data.averageScore || "N/A";
        document.getElementById("subjectHighestAverage").textContent =
          data.highestAverage || "N/A";
      })
      .catch((error) => {
        console.error("Error fetching panel data:", error);
      });
  }


  
});
