document.addEventListener("DOMContentLoaded", function () {
  var bodyElement = document.querySelector("body");
  var section_id = bodyElement.getAttribute("data-section");
  var subject_id = bodyElement.getAttribute("data-subject");
  var studentId = bodyElement.getAttribute("data-student");

  function updateTabDisplay(activeTab, activeIndex) {
    const containers = {
      lesson: document.getElementById("lessonContainer"),
      records: document.getElementById("recordsContainer"),
    };

    // Hide all containers first
    for (const container in containers) {
      containers[container].style.display = "none";
    }

    // Show the active container
    if (activeTab === "lessonTab") {
      containers.lesson.style.display = "flex";
    } else if (activeTab === "recordsTab") {
      containers.records.style.display = "flex";
    }

    // Update the URL with the active tab index
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("active", activeIndex);

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState({ activeTab, activeIndex }, "", newUrl);
  }

  function activateTabFromParams() {
    const params = new URLSearchParams(window.location.search);
    const activeTab = params.get("active") || "1"; // Default to '1' if no param

    if (activeTab === "2") {
      updateTabDisplay("recordsTab", 2);
      initializeQuizScoresTable();
      initializeGradesTable();
      setActiveClass("recordsTab");
    } else {
      updateTabDisplay("lessonTab", 1);
      setActiveClass("lessonTab");
    }
  }

  function setActiveClass(activeId) {
    document.getElementById("lessonTab").classList.remove("active");
    document.getElementById("recordsTab").classList.remove("active");
    document.getElementById(activeId).classList.add("active");
  }

  // Event listeners for tab clicks
  document.getElementById("lessonTab").addEventListener("click", function () {
    updateTabDisplay("lessonTab", 1);
    setActiveClass("lessonTab");
  });

  document.getElementById("recordsTab").addEventListener("click", function () {
    updateTabDisplay("recordsTab", 2);
    initializeQuizScoresTable();
    initializeGradesTable();
    setActiveClass("recordsTab");
  });

  document
    .getElementById("moduleLessons")
    .addEventListener("click", function () {
      updateTabDisplay("lessonTab", 1);
      setActiveClass("lessonTab");
    });

  document
    .getElementById("moduleRecords")
    .addEventListener("click", function () {
      updateTabDisplay("recordsTab", 2);
      initializeQuizScoresTable();
      initializeGradesTable();
      setActiveClass("recordsTab");
    });

  // Load the correct tab based on URL params on page load
  window.addEventListener("load", activateTabFromParams);

  // Update display based on browser navigation
  window.addEventListener("popstate", (event) => {
    if (event.state) {
      updateTabDisplay(event.state.activeTab, event.state.activeIndex);
      setActiveClass(event.state.activeTab);
    } else {
      activateTabFromParams();
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

  function initializeQuizScoresTable() {
    if ($.fn.dataTable.isDataTable("#quizScoresTable")) {
      var quizScoresTable = $("#quizScoresTable").DataTable();
      quizScoresTable.settings()[0].ajax.data = function (d) {
        d.submitType = "studentGetQuizRecordsBySubject";
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
            d.submitType = "studentGetQuizRecordsBySubject";
            d.student_id = studentId;
            d.subject_id = subject_id;
            return d;
          },
          dataSrc: "",
        },
        columns: [
          { data: "quiz_number", className: "text-center" },
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
              return `<div class="center-image"><span class="${className}">${data}</span></div>`;
            },
          },
          { data: "time", className: "text-center" },
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
          body: `submitType=viewQuizHistory&student_id=${studentId}&quiz_id=${quizId}`,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              showAlert("error", "Student has not answered the quiz yet");
              return;
            }

            if (data.status !== 'Completed'){
              showAlert("warning", "Quiz cannot be viewed", "Active quizzes cannot be viewed and will only be available for viewing when its mark as completed by instructor");
              return;
            }
            
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

  function initializeGradesTable() {
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
          { data: "quarter", className: "text-center" },
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
              return `<div class="center-image"><span class="${className}">${data}</span></div>`;
            },
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
});
