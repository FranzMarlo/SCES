document.addEventListener("DOMContentLoaded", function () {
  var bodyElement = document.querySelector("body");
  var section_id = bodyElement.getAttribute("data-section");

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

  const sectionStudentsTab = document.getElementById("sectionStudentsTab");
  const sectionRecordsTab = document.getElementById("sectionRecordsTab");
  const sectionAnalyticsTab = document.getElementById("sectionAnalyticsTab");

  const sectionStudentsPanel = document.getElementById("sectionStudentsPanel");
  const sectionRecordsPanel = document.getElementById("sectionRecordsPanel");
  const sectionAnalyticsPanel = document.getElementById(
    "sectionAnalyticsPanel"
  );

  function switchTab(activeTab, activePanel, activeValue) {
    // Remove 'active' class from all tabs
    sectionStudentsTab.classList.remove("active");
    sectionRecordsTab.classList.remove("active");
    sectionAnalyticsTab.classList.remove("active");

    // Hide all panels
    sectionStudentsPanel.style.display = "none";
    sectionRecordsPanel.style.display = "none";
    sectionAnalyticsPanel.style.display = "none";

    // Activate the selected tab and panel
    activeTab.classList.add("active");
    activePanel.style.display = "flex";

    // Update the URL without reloading the page
    const url = new URL(window.location);
    url.searchParams.set("active", activeValue);
    window.history.pushState({ activeValue }, "", url);
  }

  // Event listeners for tab clicks
  sectionStudentsTab.addEventListener("click", function () {
    switchTab(sectionStudentsTab, sectionStudentsPanel, 1);
    initializeStudentsTable();
  });

  sectionRecordsTab.addEventListener("click", function () {
    switchTab(sectionRecordsTab, sectionRecordsPanel, 2);
    initializeRecordsTable();
  });

  sectionAnalyticsTab.addEventListener("click", function () {
    switchTab(sectionAnalyticsTab, sectionAnalyticsPanel, 3);
    populateSectionPanelData();
    initializeSectionLineChart();
    initializeSectionFullBarChart();
    initializeRankingTable();
  });

  // Initialize the active tab based on URL parameter on page load
  window.addEventListener("load", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const active = urlParams.get("active") || "1";

    switch (active) {
      case "2":
        switchTab(sectionRecordsTab, sectionRecordsPanel, 2);
        initializeRecordsTable();
        break;
      case "3":
        switchTab(sectionAnalyticsTab, sectionAnalyticsPanel, 3);
        populateSectionPanelData();
        initializeSectionLineChart();
        initializeSectionFullBarChart();
        initializeRankingTable();
        break;
      default:
        switchTab(sectionStudentsTab, sectionStudentsPanel, 1);
        initializeStudentsTable();
        break;
    }
  });

  // Handle back/forward navigation with popstate event
  window.addEventListener("popstate", (event) => {
    const activeValue = event.state?.activeValue || "1";

    // Set the active tab based on the previous state
    switch (activeValue) {
      case "2":
        switchTab(sectionRecordsTab, sectionRecordsPanel, 2);
        initializeRecordsTable();
        break;
      case "3":
        switchTab(sectionAnalyticsTab, sectionAnalyticsPanel, 3);
        populateSectionPanelData();
        initializeSectionLineChart();
        initializeSectionFullBarChart();
        initializeRankingTable();
        break;
      default:
        switchTab(sectionStudentsTab, sectionStudentsPanel, 1);
        initializeStudentsTable();
        break;
    }
  });

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
          { data: "student_lname", className: "text-center" },
          { data: "student_fname", className: "text-center" },
          { data: "student_mname", className: "text-center" },
          { data: "age", className: "text-center" },
          { data: "gender", className: "text-center" },
          {
            data: null,
            render: function (data, type, row) {
              return `<div class="center-image">
          <button class="promote-btn" data-student-id="${row.student_id}" data-present-id="${row.present_id}" data-level-id="${row.level_id}"><i class="fa-solid fa-user-gear"></i></button>
          </div>`;
            },
            orderable: false,
            searchable: false,
            className: "text-center",
          },
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

  const promoteStudentModal = document.getElementById("promoteStudentModal");
  const promoteStudentForm = document.getElementById("promoteStudentForm");
  const closePromoteStudentModal = document.getElementById(
    "closePromoteStudentModal"
  );

  closePromoteStudentModal.addEventListener("click", function () {
    promoteStudentForm.reset();
    promoteStudentModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", function (event) {
    if (event.target == promoteStudentModal) {
      promoteStudentForm.reset();
      promoteStudentModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  const retainStudentModal = document.getElementById("retainStudentModal");
  const retainStudentForm = document.getElementById("retainStudentForm");
  const closeRetainStudentModal = document.getElementById(
    "closeRetainStudentModal"
  );

  closeRetainStudentModal.addEventListener("click", function () {
    retainStudentForm.reset();
    retainStudentModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", function (event) {
    if (event.target == retainStudentModal) {
      retainStudentForm.reset();
      retainStudentModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  document
    .getElementById("studentsTable")
    .addEventListener("click", function (event) {
      if (event.target.closest(".promote-btn")) {
        const btn = event.target.closest(".promote-btn");
        const studentId = btn.getAttribute("data-student-id");
        const levelId = btn.getAttribute("data-level-id");
        const presentId = btn.getAttribute("data-present-id");
        const newLevel = getNextLevelId(levelId);

        if (levelId != presentId) {
          showAlert(
            "error",
            "Operation Denied",
            "Student is already promoted to the next grade level"
          );
          return;
        }

        fetch("/SCES/backend/fetch-class.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `submitType=checkStudentGrades&student_id=${studentId}&section_id=${section_id}`,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.hasCompleteGrades == true) {
              const generalAverage = data.generalAverage;

              if (generalAverage >= 75) {
                Swal.fire({
                  icon: "question",
                  title: "Promote student to next grade level?",
                  text: "Student is eligible for promotion to next grade level",
                  showCancelButton: true,
                  confirmButtonText: "Yes",
                  confirmButtonColor: "#4CAF50",
                  cancelButtonColor: "#f44336",
                  allowOutsideClick: false,
                  cancelButtonText: "No",
                }).then((result) => {
                  if (result.isConfirmed) {
                    promoteStudent(studentId, newLevel);
                  }
                });
              } else {
                Swal.fire({
                  icon: "question",
                  title: "Retain student for the same grade level?",
                  text: "Student failed and needs to be retained",
                  showCancelButton: true,
                  confirmButtonText: "Yes",
                  confirmButtonColor: "#4CAF50",
                  cancelButtonColor: "#f44336",
                  allowOutsideClick: false,
                  cancelButtonText: "No",
                }).then((result) => {
                  if (result.isConfirmed) {
                    retainStudent(studentId, levelId);
                  }
                });
              }
            } else {
              showAlert(
                "error",
                "Operation Denied",
                "Student's Grade Is Incomplete"
              );
            }
          })
          .catch((error) => {
            showAlert("error", "Server Error", "Please Try Again Later");
          });
      }
    });

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
            const modal = document.getElementById("studentModal");
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
        d.submitType = "facultyGetQuizRecordsBySection";
        d.student_id = studentId;
        d.section_id = section_id;
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
            d.submitType = "facultyGetQuizRecordsBySection";
            d.student_id = studentId;
            d.section_id = section_id;
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
            showAlert("error", "Server Error", error);
          });
      }
    });

  function initializeGradesTable(studentId) {
    if ($.fn.dataTable.isDataTable("#gradesTable")) {
      var gradesTable = $("#gradesTable").DataTable();
      gradesTable.settings()[0].ajax.data = function (d) {
        d.submitType = "facultyGetGradesBySection";
        d.student_id = studentId;
        d.section_id = section_id;
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
            d.submitType = "facultyGetGradesBySection";
            d.student_id = studentId;
            d.section_id = section_id;
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
    data.append("submitType", "facultyGetPanelDataBySection");
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

  function populateSectionPanelData() {
    const data = new FormData();
    data.append("submitType", "facultyGetSectionPanelData");
    data.append("section_id", section_id);
    fetch("/SCES/backend/fetch-class.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("sectionCompletion").textContent =
          data.totalCompleted || 0;
        document.getElementById("sectionQuizzes").textContent =
          data.totalPending || 0;
        document.getElementById("sectionAverageScore").textContent =
          data.averageScore || "N/A";
        document.getElementById("sectionGeneralAverage").textContent =
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
          d.submitType = "fetchSectionRecordTable";
          d.section_id = section_id;
          return d;
        },
        dataSrc: "",
      },
      columns: [
        { data: "full_name", className: "text-center" },
        { data: "subject", className: "text-center" },
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
          <button class="more-btn" data-student-id="${row.student_id}" data-quiz-id="${row.quiz_id}" data-quiz-taker="${row.full_name}" data-quiz-subject="${row.subject}"><i class="fa-solid fa-chevron-right"></i></button>
          </div>`;
          },
          orderable: false,
          searchable: false,
          className: "text-center",
        },
      ],
      order: [[2, "desc"]],
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
              document.body.style.overflow = "auto";
            };

            closeViewQuizModal.onclick = () => {
              viewQuizModal.scrollTop = 0;
              viewQuizModal.style.display = "none";
              document.body.style.overflow = "auto";
            };

            viewQuizModal.style.display = "block";
            document.body.style.overflow = "hidden";
          })
          .catch((error) => {
            showAlert("error", "Server Error", error);
          });
      }
    });

  function initializeSectionLineChart() {
    var ctxLine = document.getElementById("sectionLineChart").getContext("2d");

    if (Chart.getChart("sectionLineChart")) {
      Chart.getChart("sectionLineChart").destroy();
    }

    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: {
        submitType: "sectionAverageScoreByMonth",
        section_id: section_id,
      },
      success: function (response) {
        const chartData = JSON.parse(response);
        const months = chartData.labels || [];
        const scores = chartData.lineData || [];

        if (scores.length === 0) {
          showAlert("info", "No Data Available For Section");
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

  function initializeSectionFullBarChart() {
    const ctxBar = document
      .getElementById("sectionFullBarChart")
      .getContext("2d");

    if (Chart.getChart("sectionFullBarChart")) {
      Chart.getChart("sectionFullBarChart").destroy();
    }

    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: "sectionFullBarChart",
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
            d.submitType = "rankingStudentsBySection";
            d.section_id = section_id;
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
            const modal = document.getElementById("studentModal");
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

  function getNextLevelId(level) {
    if (level === "G0001") {
      return "G0002";
    } else if (level === "G0002") {
      return "G0003";
    } else if (level === "G0003") {
      return "G0004";
    } else if (level === "G0004") {
      return "G0005";
    } else if (level === "G0005") {
      return "G0006";
    } else {
      return "G0007";
    }
  }

  function getNextGradeLevel(level) {
    if (level === "Grade 1") {
      return "Grade 2";
    } else if (level === "Grade 2") {
      return "Grade 3";
    } else if (level === "Grade 3") {
      return "Grade 4";
    } else if (level === "Grade 4") {
      return "Grade 5";
    } else if (level === "Grade 5") {
      return "Grade 6";
    } else {
      return "Grade 1";
    }
  }

  function fetchOptions(levelId, targetElementId, submitType, value) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/SCES/backend/fetch-class.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const targetDropdown = document.getElementById(targetElementId);

        targetDropdown.innerHTML =
          `<option value="">Select ${value}</option>` + xhr.responseText;
      }
    };

    xhr.send(`levelId=${levelId}&submitType=${submitType}`);
  }

  function promoteStudent(studentId, newLevel) {
    if (newLevel == "G0007") {
      showAlert(
        "error",
        "Student Already Reached The Highest Grade Level",
        "System only supports students from Grade 1 to Grade 6"
      );
      return;
    }
    fetch("/SCES/backend/fetch-class.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `submitType=fetchStudentLevelDetails&student_id=${studentId}`,
    })
      .then((response) => response.json())
      .then((student) => {
        if (!student || Object.keys(student).length === 0) {
          showAlert("error", "Server Error", "Student Data Not Found");
          return;
        }
        fetchOptions(newLevel, "promoteSection", "getSections", "Section");
        var nextGradeLevel = getNextGradeLevel(student.grade_level);
        const currentSection = document.getElementById("currentSection");
        const promoteSectionLabel = document.getElementById(
          "promoteSectionLabel"
        );
        const promoteStudentId = document.getElementById("promoteStudentId");
        const studentLRN = document.getElementById("studentLRN");
        const currentSectionId = document.getElementById("currentSectionId");
        const promoteLevel = document.getElementById("promoteLevel");

        promoteStudentId.value = studentId;
        currentSection.innerText = `${student.grade_level} - ${student.section}`;
        promoteSectionLabel.innerText = `Select ${nextGradeLevel} Section For Student`;
        studentLRN.value = student.lrn;
        currentSectionId.value = student.section_id;
        promoteLevel.value = newLevel;

        promoteStudentModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      })
      .catch((error) => {
        showAlert("error", "Server Error", "Please Try Again Later");
      });
  }

  function retainStudent(studentId, levelId) {
    fetch("/SCES/backend/fetch-class.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `submitType=fetchStudentLevelDetails&student_id=${studentId}`,
    })
      .then((response) => response.json())
      .then((student) => {
        if (!student || Object.keys(student).length === 0) {
          showAlert("error", "Server Error", "Student Data Not Found");
          return;
        }
        fetchOptions(levelId, "retainSection", "getSections", "Section");
        const retainedSection = document.getElementById("retainedSection");
        const retainSectionLabel =
          document.getElementById("retainSectionLabel");
        const retainStudentId = document.getElementById("retainStudentId");
        const retainedLRN = document.getElementById("retainedLRN");
        const retainSectionId = document.getElementById("retainSectionId");
        const retainLevel = document.getElementById("retainLevel");

        retainStudentId.value = studentId;
        retainedSection.innerText = `${student.grade_level} - ${student.section}`;
        retainSectionLabel.innerText = `Select New Section For Student`;
        retainedLRN.value = student.lrn;
        retainSectionId.value = student.section_id;
        retainLevel.value = levelId;

        retainStudentModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      })
      .catch((error) => {
        showAlert("error", "Server Error", "Please Try Again Later");
      });
  }
});
