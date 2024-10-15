document.addEventListener("DOMContentLoaded", function () {
  // Initialize DataTables for quiz scores
  var quizScoresTable = $("#quizScoresTable").DataTable({
    responsive: {
      details: {
        type: "inline", // Display hidden columns as inline below each row
        display: $.fn.dataTable.Responsive.display.childRowImmediate, // Immediately display child row on smaller screens
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
    responsive: {
      details: {
        type: "inline", // Display hidden columns as inline below each row
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
      { data: "subject" },
      { data: "grade" },
      { data: "remarks" },
      { data: "quarter" },
    ],
  });
});
