$(document).ready(function () {
  var table = $("#studentTable").DataTable({
    ajax: {
      url: "/SCES/backend/admin/fetch-students.php",
      type: "GET",
      dataSrc: "",
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
      { data: "student_lname" },
      { data: "student_fname" },
      { data: "student_mname" },
      { data: "grade_level" },
      { data: "section" },
      {
        data: null,
        defaultContent:
          '<button class="student-menu"><i class="fa-solid fa-chevron-right"></i></button>',
      },
    ],
    responsive: true,
  });

  $("#studentTable tbody").on("click", "button.student-menu", function () {
    var data = table.row($(this).parents("tr")).data();
    showStudentModal(data);
  });
  var modal = document.getElementById("studentModal");
  var studentAvatar = $("#studentAvatar");
  var studentData = $("#studentData");
  function showStudentModal(data) {
    studentAvatar.html(
      '<img src="/SCES/storage/student/images/' +
        data.profile_image +
        '" alt="Profile Image">'
    );
    studentData.html(`
        <span>${data.student_fname} ${data.student_lname}</span>
        <p>${data.student_id}</p>
        <p>${data.grade_level} - ${data.section}</p>
    `);

    modal.style.display = "flex";
  }

  $(".close-btn").on("click", function () {
    modal.style.display = "none";
  });
});
