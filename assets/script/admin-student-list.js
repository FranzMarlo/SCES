document.addEventListener("DOMContentLoaded", function () {
    const addStudentBtn = document.getElementById("addStudentBtn");
    const addStudentModal = document.getElementById("addStudentModal");
    const addStudentForm = document.getElementById("addStudentForm");
    const closeAddStudentModal = document.getElementById("closeAddStudentModal");
  
    addStudentBtn.addEventListener("click", function () {
      addStudentModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  
    closeAddStudentModal.addEventListener("click", function () {
      addStudentForm.reset();
      addStudentModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  
    window.addEventListener("click", function (event) {
      if (event.target == addStudentModal) {
        addStudentForm.reset();
        addStudentModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  
  
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
  
    initializeStudentsTable();
  
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
              d.submitType = "fetchAllStudentsDataTable";
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
            { data: "lrn", className: "text-center" },
            { data: "student_lname", className: "text-center" },
            { data: "student_fname", className: "text-center" },
            { data: "student_mname", className: "text-center" },
            { data: "age", className: "text-center" },
            { data: "gender", className: "text-center" },
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
          if (studentId == "null") {
            showAlert("error", "Student is not registered in the platform");
            return;
          } else {
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
                const modalHeader = document.getElementById("studentHeader");
                const genderClass =
                  student.gender === "Female" ? "female" : "male";
                const tabItemClass =
                  student.gender === "Female" ? "pink" : "blue";
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
                document.getElementById("studId").textContent =
                  student.student_id;
                document
                  .getElementById("recordsTab")
                  .setAttribute("data-student-id", student.student_id);
                document
                  .getElementById("recordsTab")
                  .setAttribute("data-section-id", student.section_id);
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
                document.getElementById("barangay").textContent =
                  student.barangay;
                document.getElementById("street").textContent = student.street;
                document.getElementById("guardian").textContent =
                  student.guardian_name;
                document.getElementById("contact").textContent =
                  student.guardian_contact;
  
                document.body.style.overflow = "hidden";
                modal.style.display = "flex";
                populatePanelData(student.student_id, student.section_id);
                getStudentGWA(student.student_id);
              })
              .catch((error) => {
                showAlert("error", "Server Error", error);
              });
          }
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
        var sectionId = document
          .getElementById("recordsTab")
          .getAttribute("data-section-id");
        var lrn = document
          .getElementById("analyticsTab")
          .getAttribute("data-lrn");
  
        populatePanelData(studentId, sectionId);
        getStudentGWA(studentId);
        initializeStudentLineChart(studentId, sectionId);
        initializeStudentBarChart(lrn);
        initializeStudentFullBarChart(studentId, sectionId);
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
            {
              data: null,
              render: function (data, type, row) {
                return `<div class="center-image">
              <button class="more-btn" data-student-id="${row.student_id}" data-quiz-id="${row.quiz_id}" data-quiz-taker="${row.full_name}" data-quiz-subject="${row.subject}"><i class="fa-solid fa-chevron-right"></i></button>
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
            quizScoresTable.draw();
          },
        });
      }
    }
  
    document
      .getElementById("quizScoresTable")
      .addEventListener("click", function (event) {
        if (event.target.closest(".more-btn")) {
          const btn = event.target.closest(".more-btn");
          const studentId = btn.getAttribute("data-student-id");
          const quizId = btn.getAttribute("data-quiz-id");
          const quizTaker = btn.getAttribute("data-quiz-taker");
          const quizSubject = btn.getAttribute("data-quiz-subject");
  
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
              const quizSubjectSpan = document.getElementById("quizSubject");
              quizTakerSpan.textContent = quizTaker;
              quizSubjectSpan.textContent = `${quizSubject} - Quiz ${data.quiz_number}`;
  
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
              const closeViewQuizModal =
                document.getElementById("closeViewQuizModal");
  
              closeButton.onclick = () => {
                viewQuizModal.scrollTop = 0;
                viewQuizModal.style.display = "none";
                document.getElementById("studentModal").style.display = "flex";
              };
  
              closeViewQuizModal.onclick = () => {
                viewQuizModal.scrollTop = 0;
                viewQuizModal.style.display = "none";
                document.getElementById("studentModal").style.display = "flex";
              };
  
              document.getElementById("studentModal").style.display = "none";
              viewQuizModal.style.display = "block";
            })
            .catch((error) => {
              showAlert("error", "Server Error", "Error fetching student data");
            });
        }
      });
  
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
  
    function populatePanelData(studentId, section_id) {
      const data = new FormData();
      data.append("submitType", "masterlistPanelData");
      data.append("student_id", studentId);
      data.append("section_id", section_id);
  
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
  
    function initializeStudentFullBarChart(studentId, section_id) {
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
  
    function showAlert(icon, title, message) {
      Swal.fire({
        icon: icon,
        title: title,
        text: message,
        confirmButtonColor: "#4CAF50",
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
  });
  