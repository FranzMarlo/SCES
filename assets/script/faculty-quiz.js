document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("addQuizModal");
  const addQuizBtn = document.getElementById("addQuizBtn");
  const addQuizItem = document.getElementById("addQuizItem");
  const noQuizHeader = document.querySelector(".no-quiz-header");
  const form = document.getElementById("facultyAddQuiz");
  const lessonDropdown = document.getElementById("lesson");
  const closeModal = document.getElementById("closeAddQuiz");
  let quizDisplayState = [];

  function openModal() {
    modal.style.display = "flex";
    storeQuizDisplayState();
  }

  if (modal && addQuizBtn && addQuizItem && closeModal) {
    addQuizBtn.onclick = openModal;
    addQuizItem.onclick = openModal;

    document.querySelectorAll(".no-data-item").forEach((item) => {
      item.onclick = openModal;
    });

    if (noQuizHeader) {
      noQuizHeader.onclick = openModal;
    }

    closeModal.onclick = function () {
      modal.style.display = "none";
      form.reset();
      resetLessonDropdown();
      restoreQuizContent(); // Restore the quiz content when the modal closes
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        form.reset();
        resetLessonDropdown();
        restoreQuizContent(); // Restore the quiz content when the modal closes
      }
    };
  }

  function resetLessonDropdown() {
    lessonDropdown.innerHTML =
      '<option value="" selected>Select Subject First</option>';
  }

  function storeQuizDisplayState() {
    quizDisplayState = [];
    document.querySelectorAll(".quiz-header").forEach((header, index) => {
      quizDisplayState.push({
        headerVisible: header.style.display !== "none",
        itemVisible:
          document.querySelectorAll(".quiz-item")[index]?.style.display !==
          "none",
      });
    });
  }

  // Remove hideQuizContent function as it hides content you may want visible

  function restoreQuizContent() {
    const quizHeaders = document.querySelectorAll(".quiz-header");
    const quizItems = document.querySelectorAll(".quiz-item");

    quizDisplayState.forEach((state, index) => {
      if (quizHeaders[index]) {
        quizHeaders[index].style.display = state.headerVisible
          ? "block"
          : "none";
      }
      if (quizItems[index]) {
        quizItems[index].style.display = state.itemVisible ? "block" : "none";
      }
    });
  }

  const pendingItems = document.querySelectorAll(".pending-item");
  const quizHeaders = document.querySelectorAll(".quiz-header");
  const quizItems = document.querySelectorAll(".quiz-item");

  // Keep quiz headers and items visible unless manually hidden by another event
  pendingItems.forEach((item) => {
    item.addEventListener("click", function () {
      const index = item.getAttribute("data-quiz-index");

      // Hide all headers and items except the one clicked
      quizHeaders.forEach((header) => (header.style.display = "none"));
      quizItems.forEach((item) => (item.style.display = "none"));

      // Show the clicked quiz header and items
      if (quizHeaders[index]) {
        quizHeaders[index].style.display = "block";
      }

      quizItems.forEach((quizItem) => {
        if (quizItem.getAttribute("data-quiz-index") === index) {
          quizItem.style.display = "block";
        }
      });
    });
  });

  const addQuestionModal = document.getElementById("addQuestionModal");
  const addQuestionForm = document.getElementById("facultyAddQuestion");
  const quizIdInput = document.getElementById("quizId");
  const closeAddQuestion = document.getElementById("closeAddQuestion");

  document.querySelectorAll(".add-question").forEach((button) => {
    button.addEventListener("click", function () {
      const quizIndex = button.getAttribute("data-quiz-index");
      const quizId = button.getAttribute("data-quiz-id");

      quizIdInput.value = quizId;
      addQuestionModal.style.display = "flex";
    });
  });

  // Close the modal
  closeAddQuestion.onclick = function () {
    addQuestionModal.style.display = "none";
    addQuestionForm.reset();
  };

  window.onclick = function (event) {
    if (event.target == addQuestionModal) {
      addQuestionModal.style.display = "none";
      addQuestionForm.reset();
    }
  };

  // Show the first quiz on page load without opening the modal
  if (pendingItems.length > 0) {
    const firstIndex = pendingItems[0].getAttribute("data-quiz-index");

    // Hide all headers and items
    quizHeaders.forEach((header) => (header.style.display = "none"));
    quizItems.forEach((item) => (item.style.display = "none"));

    // Show the first quiz header
    if (quizHeaders[firstIndex]) {
      quizHeaders[firstIndex].style.display = "block"; // Show the header
    }

    // Show all questions corresponding to the first quiz
    quizItems.forEach((quizItem) => {
      if (quizItem.getAttribute("data-quiz-index") === firstIndex) {
        quizItem.style.display = "block"; // Show related quiz items
      }
    });
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
  document.querySelectorAll(".question-menu").forEach((menuButton) => {
    menuButton.addEventListener("click", function (event) {
        const quizItem = event.target.closest(".quiz-item");
        const popupMenu = quizItem.querySelector(".question-popup-menu");

        // Hide all other question-popup menus
        document.querySelectorAll(".question-popup-menu").forEach((menu) => {
            if (menu !== popupMenu) {
                menu.style.display = "none";
            }
        });

        // Toggle the visibility of the current menu
        popupMenu.style.display =
            popupMenu.style.display === "block" ? "none" : "block";

        // Stop event propagation so clicking the menu button doesn't count as clicking outside
        event.stopPropagation();
    });
});

// Hide the pop-up menu when clicking outside of it or its corresponding question-menu button
document.addEventListener("click", function (event) {
    const isClickInsideMenu = event.target.closest(".question-popup-menu");
    const isClickOnMenuButton = event.target.closest(".question-menu");

    if (!isClickInsideMenu && !isClickOnMenuButton) {
        document.querySelectorAll(".question-popup-menu").forEach((menu) => {
            menu.style.display = "none";
        });
    }
});

// Handle Edit and Remove actions
document.querySelectorAll(".edit-question").forEach((editBtn) => {
    editBtn.addEventListener("click", function (event) {
        const questionId = event.target.getAttribute("data-question-id");
        // Implement your logic to edit the question
        console.log("Edit question with ID:", questionId);
    });
});

document.querySelectorAll(".remove-question").forEach((removeBtn) => {
    removeBtn.addEventListener("click", function (event) {
        const questionId = event.target.getAttribute("data-question-id");
        // Implement your logic to remove the question
        console.log("Remove question with ID:", questionId);

        // Optionally, you can send an AJAX request to remove the question from the server
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/SCES/backend/faculty/remove-question.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                // Handle successful deletion (e.g., remove the question element)
                event.target.closest(".quiz-item").remove();
            }
        };
        xhr.send("questionId=" + questionId);
    });
});

});
