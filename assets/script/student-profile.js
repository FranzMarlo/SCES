document.addEventListener("DOMContentLoaded", function () {
  // Initialize DataTables for quiz scores
  var quizScoresTable = $("#quizScoresTable").DataTable({
    responsive: true, // Enable responsive feature
    ajax: {
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: function (d) {
        d.submitType = "getQuizRecords"; // Only submitType is passed
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
      { data: "time" },
    ],
  });

  // Initialize DataTables for grades
  var gradesTable = $("#gradesTable").DataTable({
    responsive: true, // Enable responsive feature
    ajax: {
      url: "/SCES/backend/fetch-class.php",
      type: "POST",
      data: function (d) {
        d.submitType = "getGrades"; // Only submitType is passed
        return d;
      },
      dataSrc: "",
    },
    columns: [
      { data: "subject" },
      { data: "grade" },
      { data: "remarks" },
      { data: "quarter" },
    ],
  });
});
