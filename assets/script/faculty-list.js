document.addEventListener("DOMContentLoaded", function () {
  const addTeacherBtn = document.getElementById("addTeacherBtn");
  const addTeacherModal = document.getElementById("addTeacherModal");
  const addTeacherForm = document.getElementById("addTeacherForm");
  const closeAddTeacherModal = document.getElementById("closeAddTeacherModal");

  addTeacherBtn.addEventListener("click", function () {
    addTeacherModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  closeAddTeacherModal.addEventListener("click", function () {
    addTeacherForm.reset();
    addTeacherModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", function (event) {
    if (event.target == addTeacherModal) {
      addTeacherForm.reset();
      addTeacherModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  initializeFacultyTable();

  function initializeFacultyTable() {
    if ($.fn.dataTable.isDataTable("#facultyTable")) {
    } else {
      var facultyTable = $("#facultyTable").DataTable({
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
            d.submitType = "fetchAllFacultyDataTable";
            return d;
          },
          dataSrc: "",
        },
        columns: [
          {
            data: "image_profile",
            render: function (data, type, row) {
              const imagePath =
                row.role === "Admin"
                  ? `/SCES/storage/admin/images/${data}`
                  : `/SCES/storage/faculty/images/${data}`;

              return `<div class="center-image">
                            <img src="${imagePath}" alt="Profile Image" onerror="this.onerror=null; this.src='/SCES/storage/faculty/images/default.jpg';">
                          </div>`;
            },
            orderable: false,
            searchable: false,
            className: "text-center",
          },

          { data: "trn", className: "text-center" },
          { data: "teacher_lname", className: "text-center" },
          { data: "teacher_fname", className: "text-center" },
          { data: "role", className: "text-center" },
          {
            data: null,
            render: function (data, type, row) {
              return `<div class="center-image">
              <button class="more-btn" data-teacher-id="${row.teacher_id}" data-role="${row.role}"><i class="fa-solid fa-chevron-right"></i></button>
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
          facultyTable.draw();
        },
      });
    }
  }

  document
    .getElementById("facultyTable")
    .addEventListener("click", function (event) {
      if (event.target.closest(".more-btn")) {
        const btn = event.target.closest(".more-btn");
        const teacherId = btn.getAttribute("data-teacher-id");
        const role = btn.getAttribute("data-role");
        if (teacherId == "null") {
          showAlert(
            "error",
            "Selected Teacher is not registered in the platform"
          );
          return;
        } else {
          if (role == "Faculty") {
            fetch("/SCES/backend/fetch-class.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `submitType=fetchFacultyDetails&teacher_id=${teacherId}`,
            })
              .then((response) => response.json())
              .then((data) => {
                if (!data || Object.keys(data).length === 0) {
                  showAlert("error", "Server Error", "Teacher Data Not Found");
                  return;
                }

                Object.keys(data).forEach((key) => {
                  if (data[key] === null || data[key] === "") {
                    data[key] = "Not Set";
                  }
                });
                const modal = document.getElementById("facultyModal");
                const modalHeader = document.getElementById("facultyHeader");
                const genderClass =
                  data.gender === "Female" ? "female" : "male";
                const tabItemClass = data.gender === "Female" ? "pink" : "blue";
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

                const toggleAccountStatus = document.getElementById(
                  "toggleAccountStatus"
                );
                if (data.disabled == "False") {
                  toggleAccountStatus.classList.remove("enable-btn");
                  toggleAccountStatus.classList.add("disable-btn");
                  toggleAccountStatus.innerHTML = `<i class="fa-solid fa-user-gear"></i><span>Disable Account</span>`;
                } else {
                  toggleAccountStatus.classList.remove("disable-btn");
                  toggleAccountStatus.classList.add("enable-btn");
                  toggleAccountStatus.innerHTML = `<i class="fa-solid fa-user-gear"></i><span>Enable Account</span>`;
                }
                toggleAccountStatus.setAttribute(
                  "data-account-status",
                  data.disabled
                );
                toggleAccountStatus.setAttribute(
                  "data-teacher-role",
                  data.role
                );

                const imageElement = document.getElementById("profileImage");
                imageElement.src = `/SCES/storage/faculty/images/${data.image_profile}`;
                imageElement.onerror = function () {
                  this.src = "/SCES/storage/faculty/images/default-profile.png";
                };
                document.getElementById("teachId").textContent =
                  data.teacher_id;
                document
                  .getElementById("profileTab")
                  .setAttribute("data-teacher-id", data.teacher_id);
                document.getElementById("fullName").textContent =
                  data.teacher_fname + " " + data.teacher_lname;
                document.getElementById("roleSpan").textContent =
                  "SCES " + data.role;
                document.getElementById("lastName").textContent =
                  data.teacher_lname;
                document.getElementById("firstName").textContent =
                  data.teacher_fname;
                document.getElementById("middleName").textContent =
                  data.teacher_mname;
                document.getElementById("lastName").textContent =
                  data.teacher_lname;
                document.getElementById("gender").textContent = data.gender;
                document.getElementById("age").textContent = data.age;
                document.getElementById("trn").textContent = data.trn;
                document.getElementById("teacherId").textContent =
                  data.teacher_id;
                document.getElementById("role").textContent = data.role;
                document.getElementById("email").textContent = data.email;
                document.getElementById("city").textContent = data.city;
                document.getElementById("barangay").textContent = data.barangay;
                document.getElementById("street").textContent = data.street;
                document.getElementById("contact").textContent =
                  data.contact_number;

                document.body.style.overflow = "hidden";
                modal.style.display = "flex";
              })
              .catch((error) => {
                showAlert("error", "Server Error", error);
              });
          } else {
            fetch("/SCES/backend/fetch-class.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `submitType=fetchAdminDetails&teacher_id=${teacherId}`,
            })
              .then((response) => response.json())
              .then((data) => {
                if (!data || Object.keys(data).length === 0) {
                  showAlert("error", "Server Error", "Teacher Data Not Found");
                  return;
                }

                Object.keys(data).forEach((key) => {
                  if (data[key] === null || data[key] === "") {
                    data[key] = "Not Set";
                  }
                });
                const modal = document.getElementById("facultyModal");
                const modalHeader = document.getElementById("facultyHeader");
                const genderClass =
                  data.gender === "Female" ? "female" : "male";
                const tabItemClass = data.gender === "Female" ? "pink" : "blue";
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

                const toggleAccountStatus = document.getElementById(
                  "toggleAccountStatus"
                );
                if (data.disabled == "False") {
                  toggleAccountStatus.classList.remove("enable-btn");
                  toggleAccountStatus.classList.add("disable-btn");
                  toggleAccountStatus.innerHTML = `<i class="fa-solid fa-user-gear"></i><span>Disable Account</span>`;
                } else {
                  toggleAccountStatus.classList.remove("disable-btn");
                  toggleAccountStatus.classList.add("enable-btn");
                  toggleAccountStatus.innerHTML = `<i class="fa-solid fa-user-gear"></i><span>Enable Account</span>`;
                }
                toggleAccountStatus.setAttribute(
                  "data-account-status",
                  data.disabled
                );
                toggleAccountStatus.setAttribute(
                  "data-teacher-role",
                  data.role
                );

                const imageElement = document.getElementById("profileImage");
                imageElement.src = `/SCES/storage/admin/images/${data.image_profile}`;
                imageElement.onerror = function () {
                  this.src = "/SCES/storage/admin/images/default-profile.png";
                };
                document.getElementById("teachId").textContent =
                  data.teacher_id;
                document
                  .getElementById("profileTab")
                  .setAttribute("data-teacher-id", data.teacher_id);
                document.getElementById("fullName").textContent =
                  data.teacher_fname + " " + data.teacher_lname;
                document.getElementById("roleSpan").textContent =
                  "SCES " + data.role;
                document.getElementById("lastName").textContent =
                  data.teacher_lname;
                document.getElementById("firstName").textContent =
                  data.teacher_fname;
                document.getElementById("middleName").textContent =
                  data.teacher_mname;
                document.getElementById("lastName").textContent =
                  data.teacher_lname;
                document.getElementById("gender").textContent = data.gender;
                document.getElementById("age").textContent = data.age;
                document.getElementById("trn").textContent = data.trn;
                document.getElementById("teacherId").textContent =
                  data.teacher_id;
                document.getElementById("role").textContent = data.role;
                document.getElementById("email").textContent = data.email;
                document.getElementById("city").textContent = data.city;
                document.getElementById("barangay").textContent = data.barangay;
                document.getElementById("street").textContent = data.street;
                document.getElementById("contact").textContent =
                  data.contact_number;

                document.body.style.overflow = "hidden";
                modal.style.display = "flex";
              })
              .catch((error) => {
                showAlert("error", "Server Error", error);
              });
          }
        }
      }
    });

  document
    .getElementById("toggleAccountStatus")
    .addEventListener("click", function () {
      var role = this.getAttribute("data-teacher-role");
      var status = this.getAttribute("data-account-status");
      var teacherId = document
        .getElementById("profileTab")
        .getAttribute("data-teacher-id");
      if (role == "Admin") {
        if (status == "False") {
          Swal.fire({
            icon: "question",
            title: "Disable Admin Account?",
            text: "Disabling the admin account would make them unable to login to their account.",
            showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#f44336",
            allowOutsideClick: false,
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              disableAdminAccount(teacherId);
            }
          });
        } else {
          Swal.fire({
            icon: "question",
            title: "Enable Admin Account?",
            text: "Enabling the admin account would make them able to login to their account again.",
            showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#f44336",
            allowOutsideClick: false,
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              enableAdminAccount(teacherId);
            }
          });
        }
      } else {
        if (status == "False") {
          Swal.fire({
            icon: "question",
            title: "Disable Faculty Account?",
            text: "Disabling the faculty account would make them unable to login to their account.",
            showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#f44336",
            allowOutsideClick: false,
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              disableFacultyAccount(teacherId);
            }
          });
        } else {
          Swal.fire({
            icon: "question",
            title: "Enable Faculty Account?",
            text: "Enabling the faculty account would make them able to login to their account again.",
            showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#f44336",
            allowOutsideClick: false,
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              enableFacultyAccount(teacherId);
            }
          });
        }
      }
    });

  document
    .getElementById("closeFacultyModal")
    .addEventListener("click", function () {
      document.getElementById("facultyModal").style.display = "none";
      document.body.style.overflow = "auto";
      showTabContent("profileContainer");
      setActiveTab("profileTab");
    });

  document.getElementById("profileTab").addEventListener("click", function () {
    showTabContent("profileContainer");
    setActiveTab("profileTab");
  });

  document
    .getElementById("analyticsTab")
    .addEventListener("click", function () {
      var teacherId = document
        .getElementById("profileTab")
        .getAttribute("data-teacher-id");

      populatePanelData(teacherId);
      initializeFacultyLineChart(teacherId);
      initializeFacultyBarChart(teacherId);
      initializeQuizPieChart(teacherId);
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

  function disableAdminAccount(teacherId) {
    const data = new FormData();
    data.append("submitType", "disableAdminAccount");
    data.append("teacher_id", teacherId);

    fetch("/SCES/backend/global.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.text()) // Get the response as plain text
      .then((statusCode) => {
        if (statusCode === "200") {
          Swal.fire({
            icon: "info",
            title: "Admin Account Disabled",
            text: "The Admin will now be unable to login to their account.",
            confirmButtonColor: "#4CAF50",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } else {
          showAlert("error", "System Error", "Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error fetching panel data:", error);
      });
  }

  function enableAdminAccount(teacherId) {
    const data = new FormData();
    data.append("submitType", "enableAdminAccount");
    data.append("teacher_id", teacherId);

    fetch("/SCES/backend/global.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.text()) // Get the response as plain text
      .then((statusCode) => {
        if (statusCode === "200") {
          Swal.fire({
            icon: "success",
            title: "Admin Account Enabled",
            text: "The Admin will now be able to login to their account.",
            confirmButtonColor: "#4CAF50",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } else {
          showAlert("error", "System Error", "Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error fetching panel data:", error);
      });
  }

  function disableFacultyAccount(teacherId) {
    const data = new FormData();
    data.append("submitType", "disableFacultyAccount");
    data.append("teacher_id", teacherId);

    fetch("/SCES/backend/global.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.text()) // Get the response as plain text
      .then((statusCode) => {
        if (statusCode === "200") {
          Swal.fire({
            icon: "info",
            title: "Faculty Account Disabled",
            text: "The Faculty will now be unable to login to their account.",
            confirmButtonColor: "#4CAF50",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } else {
          showAlert("error", "System Error", "Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error fetching panel data:", error);
      });
  }

  function enableFacultyAccount(teacherId) {
    const data = new FormData();
    data.append("submitType", "enableFacultyAccount");
    data.append("teacher_id", teacherId);

    fetch("/SCES/backend/global.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.text()) // Get the response as plain text
      .then((statusCode) => {
        if (statusCode === "200") {
          Swal.fire({
            icon: "success",
            title: "Faculty Account Enabled",
            text: "The Faculty will now be able to login to their account.",
            confirmButtonColor: "#4CAF50",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } else {
          showAlert("error", "System Error", "Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error fetching panel data:", error);
      });
  }

  function populatePanelData(teacherId) {
    const data = new FormData();
    data.append("submitType", "adminFetchPanelData");
    data.append("teacher_id", teacherId);

    fetch("/SCES/backend/fetch-class.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("totalLessons").textContent =
          data.totalLessons || 0;
        document.getElementById("totalStudents").textContent =
          data.totalStudents || 0;
        document.getElementById("totalCompleted").textContent =
          data.totalCompleted || 0;
        document.getElementById("totalPending").textContent =
          data.totalPending || 0;
      })
      .catch((error) => {
        console.error("Error fetching panel data:", error);
      });
  }

  function initializeFacultyLineChart(teacherId) {
    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: "adminFetchLineChartData",
        teacher_id: teacherId,
      },
      success: function (data) {
        var ctxLine = document.getElementById("lineChart").getContext("2d");

        if (Chart.getChart("lineChart")) {
          Chart.getChart("lineChart").destroy();
        }

        if (data && data.labels && data.lineData && data.lineData.length > 0) {
          new Chart(ctxLine, {
            type: "line",
            data: {
              labels: data.labels,
              datasets: [
                {
                  label: "Lessons Upload",
                  data: data.lineData,
                  backgroundColor: "rgba(221, 209, 255, 0.5)", // Light purple fill
                  borderColor: "#ddd1ff",
                  borderWidth: 3,
                  fill: true,
                  tension: 0.4,
                  pointBackgroundColor: "#fff",
                  pointBorderColor: "#ddd1ff",
                  pointHoverRadius: 5,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: "Lessons Upload Per Month",
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
          new Chart(ctxLine, {
            type: "line",
            data: {
              labels: ["No Data"], // Placeholder label
              datasets: [
                {
                  label: "Average Score",
                  data: [0], // Placeholder data
                  backgroundColor: "rgba(200, 200, 200, 0.5)", // Gray fill
                  borderColor: "#ccc", // Gray line
                  borderWidth: 1,
                  fill: true,
                  tension: 0.4,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: "No Data Available",
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
                x: {
                  display: false,
                },
              },
            },
          });
        }
      },
      error: function (xhr, status, error) {
        console.error("Error in AJAX request:", status, error);
      },
    });
  }

  function initializeFacultyBarChart(teacherId) {
    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: "adminFetchBarChart",
        teacher_id: teacherId,
      },
      success: function (data) {
        if (data && data.labels && data.barData && data.subjectCodes) {
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

          const backgroundColors = data.subjectCodes.map(
            (code) => colorMapping[code] || "#cccccc"
          );

          // Get the canvas context and check if the chart already exists
          const ctxBar = document.getElementById("barChart").getContext("2d");
          if (Chart.getChart("barChart")) {
            Chart.getChart("barChart").destroy();
          }

          // Initialize the bar chart
          new Chart(ctxBar, {
            type: "bar",
            data: {
              labels: data.labels,
              datasets: [
                {
                  label: "Total Lessons",
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
                  text: "Total Lesson Per Subject",
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
        } else {
          console.log("No data received or data is in an unexpected format.");
        }
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data for bar chart:", status, error);
      },
    });
  }

  function initializeQuizPieChart(teacherId) {
    $.ajax({
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: {
        submitType: "adminQuizCompletion",
        teacher_id: teacherId,
      },
      dataType: "json",
      success: function (response) {
        const totalCompleted = response.completed;
        const totalInactive = response.inactive;
        const totalActive = response.active;

        var ctxPie = document.getElementById("pieChart").getContext("2d");

        // Destroy existing chart if it exists
        if (ctxPie.chart) {
          ctxPie.chart.destroy();
        }

        // Handle case where there's no data
        if (totalCompleted === 0 && totalInactive === 0 && totalActive === 0) {
          showAlert("info", "No Data Available For Subject");
          return;
        }

        // Initialize the pie chart
        const pieChart = new Chart(ctxPie, {
          type: "pie",
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
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data: " + error);
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
});
