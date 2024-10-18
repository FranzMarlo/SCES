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
           
            document.getElementById("studId").textContent = student.student_id;
            document.getElementById("fullName").textContent =
              student.student_fname + " " + student.student_lname;
              document.getElementById("gradeSection").textContent = student.grade_level + ' - ' + student.section;
              document.getElementById("lastName").textContent = student.student_lname;
              document.getElementById("firstName").textContent = student.student_fname;
              document.getElementById("middleName").textContent = student.student_mname;
              document.getElementById("lastName").textContent = student.student_lname;
              document.getElementById("gender").textContent = student.gender;
              document.getElementById("age").textContent = student.age;
              document.getElementById("lrn").textContent = student.lrn;
              document.getElementById("studentId").textContent = student.student_id;
              document.getElementById("gradeLevel").textContent = student.grade_level;
              document.getElementById("section").textContent = student.section;
              document.getElementById("email").textContent = student.email;
              document.getElementById("city").textContent = student.city;
              document.getElementById("barangay").textContent = student.barangay;
              document.getElementById("street").textContent = student.street;
              document.getElementById("guardian").textContent = student.guardian_name;
              document.getElementById("contact").textContent = student.guardian_contact;

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
