var table = $("#studentTable").DataTable({
  ajax: {
    url: "/SCES/backend/admin/fetch-students.php",
    type: "GET",
    dataSrc: "",
  },
  columns: [
    {
      data: "student_id",
      createdCell: function (td, cellData, rowData, row, col) {
        $(td).attr("data-label", "Student ID");
      },
    },
    {
      data: null,
      render: function (data, type, row, meta) {
        let middleName =
          row.student_mname && row.student_mname !== "N/A"
            ? row.student_mname + " "
            : "";
        return row.student_fname + " " + middleName + row.student_lname;
      },
      createdCell: function (td, cellData, rowData, row, col) {
        $(td).attr("data-label", "Full Name");
      },
    },
    {
      data: "grade_level",
      createdCell: function (td, cellData, rowData, row, col) {
        $(td).attr("data-label", "Grade");
      },
    },
    {
      data: "section",
      createdCell: function (td, cellData, rowData, row, col) {
        $(td).attr("data-label", "Section");
      },
    },
    {
      data: null,
      defaultContent:
        '<button class="student-menu"><i class="fa-solid fa-chevron-right"></i></button>',
      createdCell: function (td, cellData, rowData, row, col) {
        $(td).attr("data-label", "More");
      },
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
