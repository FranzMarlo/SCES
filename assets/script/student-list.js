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
  function showStudentModal(studentId) {
    $.ajax({
      url: "/SCES/backend/admin/fetch-class.php",
      type: "POST",
      data: { student_id: studentId, fetchType: "getStudentDetails" },
      success: function (response) {
        console.log("Raw response from server:", response); // Log raw response for debugging

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
