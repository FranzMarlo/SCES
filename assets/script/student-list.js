$(document).ready(function () {
  var table = $("#studentTable").DataTable({
    ajax: {
      url: "/SCES/backend/admin/fetch-class.php",
      type: "POST",
      dataSrc: "",
      data: {
        fetchType: "adminGetStudents",
      },
    },
    columns: [
      {
        data: "profile_image",
        render: function (data, type, row, meta) {
          return (
            '<img class="student-img" src="/SCES/storage/student/images/' +
            data +
            '" alt="Profile Image">'
          );
        },
      },
      { data: "student_id" },
      {
        data: null,
        render: function (data, type, row, meta) {
          let middleName =
            row.student_mname && row.student_mname !== "N/A"
              ? row.student_mname + " "
              : "";
          return row.student_fname + " " + middleName + row.student_lname;
        },
      },
      { data: "grade_level" },
      { data: "section" },
      {
        data: null,
        defaultContent:
          '<button class="student-menu"><i class="fa-solid fa-chevron-right"></i></button>',
      },
    ],
    responsive: true,
    columnDefs: [
      {
        targets: [3, 4, 5],
        responsivePriority: 3,
      },
      {
        targets: [0, 1, 2],
        responsivePriority: 1,
      },
    ],
    autoWidth: false,
    scrollX: true,
  });

  $("#studentTable tbody").on("click", "button.student-menu", function () {
    var data = table.row($(this).parents("tr")).data();
    var studentId = data.student_id;
    showStudentModal(studentId);
  });
  var modal = document.getElementById("studentModal");
  var studentAvatar = $("#studentAvatar");
  var studentData = $("#studentData");
  var namePart = $("#namePart");
  var profilePart = $("#profilePart");
  var addressPart = $("#addressPart");
  function showStudentModal(studentId) {
    $.ajax({
      url: "/SCES/backend/admin/fetch-class.php",
      type: "POST",
      data: { student_id: studentId, fetchType: "getStudentDetails" },
      success: function (response) {
        console.log("Raw response from server:", response);

        var student;
        if (typeof response === "object") {
          student = response;
        } else {
          try {
            student = JSON.parse(response);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            console.log("Invalid JSON response:", response);
            return;
          }
        }
        studentAvatar.html(
          '<img src="/SCES/storage/student/images/' +
            student.profile_image +
            '" alt="Profile Image">'
        );
        studentData.html(`
    <span>${student.student_fname} ${student.student_lname}</span>
    <p>${student.student_id}</p>
    <p>${student.grade_level} - ${student.section}</p>
  `);
        namePart.html(`
              <div class="data-part">
                        <div class="data">
                            <span>First Name</span>
                            <p>${student.student_fname}</p>
                        </div>
                        <div class="data">
                            <span>Middle Name</span>
                            <p>${student.student_mname}</p>
                        </div>
              </div>
                <div class="data-part">
                        <div class="data">
                            <span>Last Name</span>
                            <p>${student.student_lname}</p>
                        </div>
                </div>
    `);
        profilePart.html(`
              <div class="data-part">
                        <div class="data">
                            <span>Age</span>
                            <p>${student.age}</p>
                        </div>
                        <div class="data">
                            <span>Gender</span>
                            <p>${student.gender}</p>
                        </div>
              </div>
                    <div class="data-part">
                        <div class="data">
                            <span>Guardian</span>
                            <p>${student.guardian_name}</p>
                        </div>
                        <div class="data">
                            <span>Contact Number</span>
                            <p>${student.guardian_contact}</p>
                        </div>
                </div>
      `);
        addressPart.html(`
              <div class="data-part">
                        <div class="data">
                            <span>City</span>
                            <p>${student.city}</p>
                        </div>
                        <div class="data">
                            <span>Barangay</span>
                            <p>${student.barangay}</p>
                        </div>
                    </div>
                    <div class="data-part">
                        <div class="data">
                            <span>Street</span>
                            <p>${student.street}</p>
                        </div>
              </div>
        `);

        // Show the modal
        modal.style.display = "flex";
      },
    });
  }

  // Close modal
  $(".close-btn").on("click", function () {
    modal.style.display = "none";
  });
});
