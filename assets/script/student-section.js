document.addEventListener("DOMContentLoaded", function () {
  var studentsTable = $("#studentsTable").DataTable({
    responsive: {
      details: {
        type: "inline",
        display: $.fn.dataTable.Responsive.display.childRowImmediate,
        renderer: function (api, rowIdx, columns) {
          var data = $.map(columns, function (col, i) {
            return col.hidden
              ? '<tr class="bold-text" data-dt-row="' +
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

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("more-btn")) {
      const studentId = event.target.getAttribute("data-student-id");

      fetch("/SCES/backend/fetch-class.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: studentId,
          submitType: "fetchStudentDetails",
        }),
      })
        .then((response) => response.json())
        .then((student) => {
          if (!student || Object.keys(student).length === 0) {
            showAlert("error", "Server Error", "Student Data Not Found");
            return;
          }


          document.getElementById("studId").textContent = student.student_id;
          document.getElementById("fullName").textContent =
            student.student_fname + " " + student.student_lname;

          document.getElementById("studentModal").style.display = "flex";
        })
        .catch((error) => {
          showAlert("error", "Server Error", "Please Try Again Later");
        });
    }
  });

  document.querySelector(".close-btn").addEventListener("click", function () {
    document.getElementById("studentModal").style.display = "none"; // Hide modal
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
