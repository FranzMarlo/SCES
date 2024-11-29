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
        initializeQuizScoresTable();
        initializeGradesTable();
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
    initializeQuizScoresTable();
    initializeGradesTable();
  });

  statsTab.addEventListener("click", function () {
    showContainer(3);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = parseInt(urlParams.get("active")) || 1;

  showContainer(activeTab);

  function initializeQuizScoresTable() {
    if ($.fn.dataTable.isDataTable("#quizScoresTable")) {
      var quizScoresTable = $("#quizScoresTable").DataTable();
      quizScoresTable.settings()[0].ajax.data = function (d) {
        d.submitType = "getQuizRecords";
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
            d.submitType = "getQuizRecords";
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
              return `<div class="center-image"><span class="${className}">${data}</span></div>`;
            },
          },
          { data: "time" },
          {
            data: null,
            render: function (data, type, row) {
              return `<div class="center-image">
        <button class="more-btn" data-quiz-id="${row.quiz_id}"><i class="fa-solid fa-chevron-right"></i></button>
        </div>`;
            },
            orderable: false,
            searchable: false,
            className: "text-center",
          },
        ],
        language: {
          emptyTable: "No data available in table", // Message when there's no data
        },
        initComplete: function () {
          quizScoresTable.draw(); // Force a redraw to apply styles properly
        },
      });
    }
  }

  document
    .getElementById("quizScoresTable")
    .addEventListener("click", function (event) {
      if (event.target.closest(".more-btn")) {
        const btn = event.target.closest(".more-btn");
        const quizId = btn.getAttribute("data-quiz-id");
        fetch("/SCES/backend/fetch-class.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `submitType=viewQuizHistory&quiz_id=${quizId}`,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              showAlert("error", "Student has not answered the quiz yet");
              return;
            }
            if (data.status !== "Completed") {
              showAlert(
                "warning",
                "Quiz cannot be viewed",
                "Active quizzes cannot be viewed and will only be available for viewing when its mark as completed by instructor"
              );
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
        d.submitType = "getGrades";
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
            d.submitType = "getGrades";
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
              return `<div class="center-image"><span class="${className}">${data}</span></div>`;
            },
            className: "text-center",
          },
          { data: "quarter", className: "text-center" },
        ],
        language: {
          emptyTable: "No data available in table", // Message when there's no data
        },
        initComplete: function () {
          gradesTable.draw(); // Force a redraw to apply styles properly
        },
      });
    }
  }

  $.ajax({
    url: "/SCES/backend/fetch-class.php",
    type: "POST",
    dataType: "json",
    data: {
      submitType: "fetchLineChartData",
    },
    success: function (data) {
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
                backgroundColor: "#c5e3ff",
                borderColor: "#9BC0E4FF",
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


      var barChart = new Chart(ctxBar, {
        type: "bar",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "GWA",
              data: data.barData,
              backgroundColor: "#8FC9FFFF",
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

function showAlert(icon, title, message) {
  Swal.fire({
    icon: icon,
    title: title,
    text: message,
    confirmButtonColor: "#4CAF50",
  });
}
