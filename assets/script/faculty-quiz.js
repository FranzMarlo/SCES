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
    lessonDropdown.innerHTML =
      '<option value="" selected>Select Subject First</option>';
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

      xhr.send(
        "levelId=" +
          levelId +
          "&subjectId=" +
          subjectId +
          "&sectionId=" +
          sectionId
      );
    }
  });

  // New Functionality: Display quiz headers and questions
  var pendingItems = document.querySelectorAll(".pending-item");
  var quizHeaders = document.querySelectorAll(".quiz-header");
  var quizItems = document.querySelectorAll(".quiz-item");

  // Hide all quiz headers and questions initially
  quizHeaders.forEach(function (header) {
    header.style.display = "none";
  });
  quizItems.forEach(function (item) {
    item.style.display = "none";
  });

  // Event listeners for pending items
  pendingItems.forEach(function (item) {
    item.addEventListener("click", function () {
      // Get the index of the clicked pending item
      var index = item.getAttribute("data-quiz-index");

      // Hide all quiz headers and questions
      quizHeaders.forEach(function (header) {
        header.style.display = "none";
      });
      quizItems.forEach(function (item) {
        item.style.display = "none";
      });

      // Show the corresponding quiz header and questions
      if (quizHeaders[index]) {
        quizHeaders[index].style.display = "block";
        quizItems[index].style.display = "block";
      }
    });
  });

  // Logic for quiz dropdown buttons
  var quizButtons = document.querySelectorAll(
    ".quiz-dropdown-content button[data-quiz-index]"
  );

  quizButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var index = button.getAttribute("data-quiz-index");

      // Hide all quiz headers and items
      quizHeaders.forEach(function (header) {
        header.style.display = "none";
      });
      quizItems.forEach(function (item) {
        item.style.display = "none";
      });

      // Show the corresponding quiz header and item
      if (quizHeaders[index]) {
        quizHeaders[index].style.display = "block";
        quizItems[index].style.display = "block";
      }
    });
  });
  if (quizHeaders.length > 0 && quizItems.length > 0) {
    quizHeaders[0].style.display = "block";
    quizItems[0].style.display = "block";
  } else if (pendingItems.length > 0) {
    pendingItems[0].click(); // Simulate click on the first pending item
  }
});
