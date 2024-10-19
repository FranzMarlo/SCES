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
    document.getElementById("lessonTab").classList.remove("active");
    document.getElementById("studentTab").classList.remove("active");
    document.getElementById("recordsTab").classList.add("active");
    document.getElementById("analyticsTab").classList.remove("active");
  });

  document
    .getElementById("analyticsTab")
    .addEventListener("click", function () {
      updateTabDisplay("analyticsTab", 4);
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
        initializeStudentsTable();
        updateTabDisplay("studentTab", 2);
        document.getElementById("lessonTab").classList.remove("active");
        document.getElementById("studentTab").classList.add("active");
        document.getElementById("recordsTab").classList.remove("active");
        document.getElementById("analyticsTab").classList.remove("active");
        break;
      case "3":
        updateTabDisplay("recordsTab", 3);
        document.getElementById("lessonTab").classList.remove("active");
        document.getElementById("studentTab").classList.remove("active");
        document.getElementById("recordsTab").classList.add("active");
        document.getElementById("analyticsTab").classList.remove("active");
        break;
      case "4":
        updateTabDisplay("analyticsTab", 4);
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
      $("#quizScoresTable").DataTable().destroy();
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
    data.append("submitType", "facultyGetPanelData");
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
});
