document.addEventListener("DOMContentLoaded", function () {
  var bodyElement = document.querySelector("body");
  var section_id = bodyElement.getAttribute("data-section");
  var subject_id = bodyElement.getAttribute("data-subject");
  var subject_name = bodyElement.getAttribute("data-subject-name");
  var addLessonModal = document.getElementById("addLessonModal");
  var addLessonBtn = document.getElementById("addLesson");
  var closeBtn = document.getElementById("closeLessonModal");
  var addLessonForm = document.getElementById("facultyAddLesson");
  var addGradeBtn = document.getElementById("addGradeBtn");
  var addGradeModal = document.getElementById("addGradeModal");
  var addGradeForm = document.getElementById("addGradeForm");
  var closeGradeModal = document.getElementById("closeGradeModal");
  var editGradeModal = document.getElementById("editGradeModal");
  var closeEditGradeModal = document.getElementById("closeEditGradeModal");
  var editGradeForm = document.getElementById("editGradeForm");

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
    window.history.pushState({ activeTab, activeIndex }, "", newUrl);
  }

  function activateTabFromParams() {
    const params = new URLSearchParams(window.location.search);
    const activeTab = params.get("active") || "1"; // Default to '1' if no param

    switch (activeTab) {
      case "2":
        updateTabDisplay("studentTab", 2);
        initializeStudentsTable();
        setActiveClass("studentTab");
        break;
      case "3":
        updateTabDisplay("recordsTab", 3);
        initializeRecordsTable();
        setActiveClass("recordsTab");
        break;
      case "4":
        updateTabDisplay("analyticsTab", 4);
        populateSubjectPanelData();
        fetchSubjectPieChartData();
        initializeSubjectLineChart();
        initializeRankingTable();
        setActiveClass("analyticsTab");
        break;
      default:
        updateTabDisplay("lessonTab", 1);
        setActiveClass("lessonTab");
        break;
    }
  }

  function setActiveClass(activeId) {
    document.getElementById("lessonTab").classList.remove("active");
    document.getElementById("studentTab").classList.remove("active");
    document.getElementById("recordsTab").classList.remove("active");
    document.getElementById("analyticsTab").classList.remove("active");
    document.getElementById(activeId).classList.add("active");
  }

  // Event listeners for tabs
  document.getElementById("lessonTab").addEventListener("click", function () {
    updateTabDisplay("lessonTab", 1);
    setActiveClass("lessonTab");
  });

  document.getElementById("studentTab").addEventListener("click", function () {
    updateTabDisplay("studentTab", 2);
    initializeStudentsTable();
    setActiveClass("studentTab");
  });

  document.getElementById("recordsTab").addEventListener("click", function () {
    updateTabDisplay("recordsTab", 3);
    initializeRecordsTable();
    setActiveClass("recordsTab");
  });

  document
    .getElementById("analyticsTab")
    .addEventListener("click", function () {
      updateTabDisplay("analyticsTab", 4);
      populateSubjectPanelData();
      fetchSubjectPieChartData();
      initializeSubjectLineChart();
      initializeRankingTable();
      setActiveClass("analyticsTab");
    });

  document
    .getElementById("moduleLessons")
    .addEventListener("click", function () {
      updateTabDisplay("lessonTab", 1);
      setActiveClass("lessonTab");
    });

  document
    .getElementById("moduleStudents")
    .addEventListener("click", function () {
      updateTabDisplay("studentTab", 2);
      initializeStudentsTable();
      setActiveClass("studentTab");
    });

  document
    .getElementById("moduleRecords")
    .addEventListener("click", function () {
      updateTabDisplay("recordsTab", 3);
      initializeRecordsTable();
      setActiveClass("recordsTab");
    });

  document
    .getElementById("moduleAnalytics")
    .addEventListener("click", function () {
      updateTabDisplay("analyticsTab", 4);
      populateSubjectPanelData();
      fetchSubjectPieChartData();
      initializeSubjectLineChart();
      initializeRankingTable();
      setActiveClass("analyticsTab");
    });
  // Initialize the active tab on page load
  window.addEventListener("load", activateTabFromParams);

  // Listen for popstate to handle back and forward navigation
  window.addEventListener("popstate", (event) => {
    if (event.state) {
      updateTabDisplay(event.state.activeTab, event.state.activeIndex);
      setActiveClass(event.state.activeTab);
    } else {
      activateTabFromParams(); // Fallback to URL params if state is missing
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
            d.section_id = section_id;
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
          { data: "student_id", className: "text-center" },
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
            document.getElementById("studId").textContent = subject_name;
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
      initializeStudentFullBarChart(studentId);
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
        d.subject_id = subject_id;
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
            d.student_id = studentId;
            d.subject_id = subject_id;
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
          { data: "time" },
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
            showAlert("error", "Server Error", error);
          });
      }
    });

  function initializeGradesTable(studentId) {
    if ($.fn.dataTable.isDataTable("#gradesTable")) {
      var gradesTable = $("#gradesTable").DataTable();
      gradesTable.settings()[0].ajax.data = function (d) {
        d.submitType = "facultyGetGradesBySubject";
        d.subject_id = subject_id;
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
            d.subject_id = subject_id;
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
          {
            data: null,
            render: function (data, type, row) {
              return `<div class="center-image">
            <button class="more-btn" data-grade-id="${row.grade_id}"><i class="fa-solid fa-chevron-right"></i></button>
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
          gradesTable.draw();
        },
      });
    }
  }

  document
    .getElementById("gradesTable")
    .addEventListener("click", function (event) {
      if (event.target.closest(".more-btn")) {
        const btn = event.target.closest(".more-btn");
        const gradeId = btn.getAttribute("data-grade-id");

        fetch("/SCES/backend/fetch-class.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `submitType=fetchGradeDetails&grade_id=${gradeId}`,
        })
          .then((response) => response.json())
          .then((grade) => {
            if (!grade || Object.keys(grade).length === 0) {
              showAlert("error", "Server Error", "Grade Data Not Found");
              return;
            }

            Object.keys(grade).forEach((key) => {
              if (grade[key] === null || grade[key] === "") {
                grade[key] = "Not Set";
              }
            });

            const editGradeId = document.getElementById("editGradeId");
            const editStudentGradeId =
              document.getElementById("editStudentGradeId");
            const editSubjectGradeId =
              document.getElementById("editSubjectGradeId");
            const editQuarterHolder =
              document.getElementById("editQuarterHolder");
            const editGrade = document.getElementById("editGrade");
            const editGradeQuarter =
              document.getElementById("editGradeQuarter");

            editGradeId.value = grade.grade_id;
            editStudentGradeId.value = grade.student_id;
            editSubjectGradeId.value = grade.subject_id;
            editGrade.value = grade.grade;
            editQuarterHolder.value = grade.quarter;
            editGradeQuarter.value = grade.quarter;

            document.getElementById("studentModal").style.display = "none";
            editGradeModal.style.display = "flex";
          })
          .catch((error) => {
            showAlert("error", "Server Error", error);
          });
      }
    });

  closeEditGradeModal.onclick = function () {
    document.getElementById("studentModal").style.display = "flex";
    editGradeModal.style.display = "none";
    editGradeForm.reset();
  };
  window.onclick = function (event) {
    if (event.target == editGradeModal) {
      document.getElementById("studentModal").style.display = "flex";
      editGradeModal.style.display = "none";
      editGradeForm.reset();
    }
  };

  function populatePanelData(studentId) {
    const data = new FormData();
    data.append("submitType", "facultyGetPanelDataBySubject");
    data.append("student_id", studentId);
    data.append("section_id", section_id);
    data.append("subject_id", subject_id);

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
        subject_id: subject_id,
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

    if (Chart.getChart("lineChart")) {
      Chart.getChart("lineChart").destroy();
    }

    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: {
        submitType: "studentAverageScoreBySubject",
        student_id: studentId,
        subject_id: subject_id,
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
          d.subject_id = subject_id;
          d.section_id = section_id;
          return d;
        },
        dataSrc: "",
      },
      columns: [
        { data: "full_name", className: "text-center" },
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
            const closeViewQuizModal =
              document.getElementById("closeViewQuizModal");

            closeButton.onclick = () => {
              closeQuiz(viewQuizModal);
            };
            closeViewQuizModal.onclick = () => {
              closeQuiz(viewQuizModal);
            };
            viewQuizModal.style.display = "block";
            document.body.style.overflow = "hidden";
          })
          .catch((error) => {
            showAlert("error", "Server Error", error);
          });
      }
    });
  function closeQuiz(modal) {
    modal.scrollTop = 0;
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function populateSubjectPanelData() {
    const data = new FormData();
    data.append("submitType", "facultyGetSubjectPanelData");
    data.append("section_id", section_id);
    data.append("subject_id", subject_id);

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

  function initializeSubjectLineChart() {
    var ctxLine = document.getElementById("subjectLineChart").getContext("2d");

    // Destroy existing chart if it exists, regardless of page
    if (ctxLine.chart) {
      ctxLine.chart.destroy();
    }

    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: {
        submitType: "subjectAverageScore",
        subject_id: subject_id,
      },
      success: function (response) {
        const chartData = JSON.parse(response);
        const months = chartData.labels || [];
        const scores = chartData.lineData || [];

        if (scores.length === 0) {
          showAlert("info", "No Data Available For Subject");
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

  function fetchSubjectPieChartData() {
    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: {
        submitType: "subjectCompletion",
        subject_id: subject_id,
      },
      dataType: "json",
      success: function (response) {
        var totalCompleted = response.completed;
        var totalInactive = response.inactive;
        var totalActive = response.active;

        initializeSubjectPieChart(totalCompleted, totalInactive, totalActive);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data: " + error);
      },
    });
  }

  function initializeSubjectPieChart(
    totalCompleted,
    totalInactive,
    totalActive
  ) {
    var ctxPie = document.getElementById("subjectPieChart").getContext("2d");

    // Destroy existing chart if it exists
    if (ctxPie.chart) {
      ctxPie.chart.destroy();
    }

    // Handle case where there's no data
    if (totalCompleted == 0 && totalInactive == 0 && totalActive == 0) {
      showAlert("info", "No Data Available For Subject");
      return;
    }

    const pieChart = new Chart(ctxPie, {
      type: "pie", // Changed from 'doughnut' to 'pie'
      data: {
        labels: ["Completed", "Inactive", "Active"],
        datasets: [
          {
            data: [totalCompleted, totalInactive, totalActive],
            backgroundColor: ["#d2ebc4", "#fcfd95", "#c5e3ff"],
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
            text: "Quizzes By Status",
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
        },
      },
    });

    ctxPie.chart = pieChart; // Save chart instance to the context
  }

  function initializeRankingTable() {
    if ($.fn.dataTable.isDataTable("#rankingTable")) {
    } else {
      var studentsTable = $("#rankingTable").DataTable({
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
            d.submitType = "rankingStudentsBySubject";
            d.section_id = section_id;
            d.subject_id = subject_id;
            return d;
          },
          dataSrc: "",
        },
        columns: [
          { data: "rank", className: "text-center" },
          { data: "lrn", className: "text-center" },
          { data: "student_id", className: "text-center" },
          { data: "full_name", className: "text-center" },
          { data: "average_score", className: "text-center" },
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
            document.getElementById("studId").textContent = subject_name;
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

  function initializeStudentFullBarChart(studentId) {
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
        submitType: "studentSubjectFullBarChart",
        student_id: studentId,
        subject_id: subject_id, // Pass subject_id
      },
      success: function (data) {
        if (!data.labels.length || !data.barData.length) {
          $("#subjectInterpretation").text("No grades available to interpret.");
          return;
        }

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

        const baseColor =
          colorMapping[data.subjectCode?.toLowerCase()] || "#cccccc";

        const grades = data.barData;
        const labels = [...data.labels]; // Use existing labels

        // Send grades and labels to Flask for interpretation
        $.ajax({
          url: "http://127.0.0.1:5000/interpret-subject", // The Flask route
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            labels: labels,
            bar_data: grades,
            subject_name: subject_name, // Add subject_name here
          }),
          success: function (interpretationData) {
            if (interpretationData.error) {
              $("#subjectInterpretation").text(interpretationData.error);
              return;
            }

            const updatedGrades = interpretationData.grades;
            const updatedLabels = interpretationData.labels;

            const backgroundColor = Array(updatedGrades.length - 1).fill(
              baseColor
            );
            if (updatedGrades.length > grades.length) {
              backgroundColor.push("#999999");
            }

            new Chart(ctxBar, {
              type: "bar",
              data: {
                labels: updatedLabels,
                datasets: [
                  {
                    label: "Grade",
                    data: updatedGrades,
                    backgroundColor: backgroundColor,
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
                    text: "Grades by Quarter",
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
                    max: 100,
                  },
                },
              },
            });

            $("#subjectInterpretation").text(interpretationData.interpretation);
          },
          error: function (xhr, status, error) {
            console.error("Error fetching interpretation from Flask:", error);
            $("#subjectInterpretation").text(
              "Unable to load interpretation data."
            );
          },
        });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data for student full bar chart:", error);
        $("#subjectInterpretation").text(
          "Unable to load data for interpretation."
        );
      },
    });
  }

  addGradeBtn.onclick = function () {
    var studentId = document
      .getElementById("studentRecordsTab")
      .getAttribute("data-student-id");
    document.getElementById("gradeStudentId").value = studentId;
    document.getElementById("studentModal").style.display = "none";
    addGradeModal.style.display = "flex";
  };
  closeGradeModal.onclick = function () {
    document.getElementById("studentModal").style.display = "flex";
    addGradeModal.style.display = "none";
    addGradeForm.reset();
  };
  window.onclick = function (event) {
    if (event.target == addGradeModal) {
      document.getElementById("studentModal").style.display = "flex";
      addGradeModal.style.display = "none";
      addGradeForm.reset();
    }
  };
});
