document.addEventListener("DOMContentLoaded", function () {
  var bodyElement = document.querySelector("body");
  var section_id = bodyElement.getAttribute("data-section");

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

    activeTab.classList.add("active");
    activePanel.style.display = "flex";

    const url = new URL(window.location);
    url.searchParams.set("active", activeValue);
    window.history.pushState({}, "", url);
  }

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
  });

  window.addEventListener("load", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const active = urlParams.get("active") || 1;

    switch (active) {
      case "2":
        switchTab(sectionRecordsTab, sectionRecordsPanel, 2);
        initializeRecordsTable();
        break;
      case "3":
        switchTab(sectionAnalyticsTab, sectionAnalyticsPanel, 3);
        break;
      default:
        switchTab(sectionStudentsTab, sectionStudentsPanel, 1);
        initializeStudentsTable();
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

  document.querySelector(".close-btn").addEventListener("click", function () {
    document.getElementById("studentModal").style.display = "none";
    showTabContent("profileContainer");
    setActiveTab("profileTab");
    document.body.style.overflow = "auto";
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
    data.append("submitType", "facultyGetPanelData");
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
          console.log("No Data");
          return;
        }

        // Prepare data for the predictive analytics API
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
            // Handle the returned prediction data
            console.log(
              "Predicted Performance:",
              predictionData.predicted_performance
            );
            console.log(
              "Predicted Academic Success Rate:",
              predictionData.predicted_academic_success_rate
            );
            console.log("Predicted Remarks:", predictionData.predicted_remarks);
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

            closeButton.onclick = () => closeQuiz(viewQuizModal);

            viewQuizModal.style.display = "block";
            document.body.style.overflow = "hidden";
          })
          .catch((error) => {
            showAlert("error", "Server Error", error);
          });
      }
    });

  document
    .getElementById("closeViewQuizModal")
    .addEventListener("click", function () {
      document.getElementById("viewQuizModal").style.display = "none";
      document.body.style.overflow = "auto";
    });

  document.getElementById("close-quiz").addEventListener("click", function () {
    document.getElementById("viewQuizModal").style.display = "none";
    document.body.style.overflow = "auto";
  });

  function showAlert(icon, title, message) {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      confirmButtonColor: "#4CAF50",
    });
  }
});
