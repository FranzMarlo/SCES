document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("addQuizModal");
  var addQuizBtn = document.getElementById("addQuizBtn");
  var addQuizItem = document.getElementById("addQuizItem");
  var noQuizHeader = document.querySelector(".no-quiz-header");
  var form = document.getElementById("facultyAddQuiz");
  var lessonDropdown = document.getElementById("lesson");
  var closeModal = document.querySelector(".close-btn");
  var lastOpenedIndex = null; // Keep track of the last opened quiz index

  if (modal && addQuizBtn && addQuizItem && closeModal) {
    addQuizBtn.onclick = function () {
      modal.style.display = "flex";
      hideQuizContent(); // Hide quiz headers and content when modal is opened
    };
    addQuizItem.onclick = function () {
      modal.style.display = "flex";
      hideQuizContent(); // Hide quiz headers and content when modal is opened
    };

    var noDataItems = document.querySelectorAll(".no-data-item");
    if (noDataItems.length) {
      noDataItems.forEach(function (item) {
        item.onclick = function () {
          modal.style.display = "flex";
          hideQuizContent(); // Hide quiz headers and content when modal is opened
        };
      });
    }

    if (noQuizHeader) {
      noQuizHeader.onclick = function () {
        modal.style.display = "flex";
        hideQuizContent(); // Hide quiz headers and content when modal is opened
      };
    }

    closeModal.onclick = function () {
      modal.style.display = "none";
      form.reset();
      resetLessonDropdown();
      restoreQuizContent(); // Show quiz headers and content when modal is closed
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        form.reset();
        resetLessonDropdown();
        restoreQuizContent(); // Show quiz headers and content when modal is closed
      }
    };
  }

  function resetLessonDropdown() {
    lessonDropdown.innerHTML =
      '<option value="" selected>Select Subject First</option>';
  }

  function hideQuizContent() {
    // Hide all quiz headers and quiz items
    var quizHeaders = document.querySelectorAll(".quiz-header");
    var quizItems = document.querySelectorAll(".quiz-item");

    quizHeaders.forEach(function (header) {
      header.style.display = "none";
    });
    quizItems.forEach(function (item) {
      item.style.display = "none";
    });
  }

  function restoreQuizContent() {
    if (lastOpenedIndex !== null) {
      // Restore the last opened quiz header and content
      var quizHeader = document.querySelector(`.quiz-header[data-quiz-index="${lastOpenedIndex}"]`);
      var quizItem = document.querySelector(`.quiz-item[data-quiz-index="${lastOpenedIndex}"]`);

      if (quizHeader && quizItem) {
        quizHeader.style.display = "block";
        quizItem.style.display = "block";
      }
    }
  }

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
        lastOpenedIndex = index; // Keep track of the last opened quiz
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
        lastOpenedIndex = index; // Keep track of the last opened quiz
      }
    });
  });

  if (quizHeaders.length > 0 && quizItems.length > 0) {
    quizHeaders[0].style.display = "block";
    quizItems[0].style.display = "block";
    lastOpenedIndex = 0; // Initialize lastOpenedIndex with the first quiz
  } else if (pendingItems.length > 0) {
    pendingItems[0].click(); // Simulate click on the first pending item
  }
});
