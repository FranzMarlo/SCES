document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("addQuizModal");
  var addQuizBtn = document.getElementById("addQuizBtn");
  var addQuizItem = document.getElementById("addQuizItem");
  var noQuizHeader = document.querySelector(".no-quiz-header");
  var form = document.getElementById("facultyAddQuiz");
  var lessonDropdown = document.getElementById("lesson");
  var closeModal = document.querySelector(".close-btn");

  if (modal && addQuizBtn && addQuizItem && closeModal) {
      addQuizBtn.onclick = function () {
          modal.style.display = "flex";
      };
      addQuizItem.onclick = function () {
          modal.style.display = "flex";
      };

      var noDataItems = document.querySelectorAll(".no-data-item");
      if (noDataItems.length) {
          noDataItems.forEach(function (item) {
              item.onclick = function () {
                  modal.style.display = "flex";
              };
          });
      }

      if (noQuizHeader) {
          noQuizHeader.onclick = function () {
              modal.style.display = "flex";
          };
      }

      closeModal.onclick = function () {
          modal.style.display = "none";
          form.reset();
          resetLessonDropdown();
      };

      window.onclick = function (event) {
          if (event.target == modal) {
              modal.style.display = "none";
              form.reset();
              resetLessonDropdown();
          }
      };
  }

  function resetLessonDropdown() {
      lessonDropdown.innerHTML = '<option value="" selected>Select Subject First</option>';
  }

  document.getElementById("subject").addEventListener("change", function () {
      var selectedOption = this.options[this.selectedIndex];

      var levelId = selectedOption.getAttribute("data-level-id");
      var subjectId = selectedOption.value;
      var sectionId = selectedOption.getAttribute("data-section-id");

      if (subjectId) {
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "/SCES/backend/faculty/fetch-lessons.php", true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

          xhr.onreadystatechange = function () {
              if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                  lessonDropdown.innerHTML = xhr.responseText;
              }
          };

          xhr.send("levelId=" + levelId + "&subjectId=" + subjectId + "&sectionId=" + sectionId);
      }
  });
});
