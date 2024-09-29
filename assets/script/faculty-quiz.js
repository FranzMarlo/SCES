document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("addQuizModal");
  const addQuizBtn = document.getElementById("addQuizBtn");
  const addQuizItem = document.getElementById("addQuizItem");
  const noQuizHeader = document.querySelector(".no-quiz-header");
  const form = document.getElementById("facultyAddQuiz");
  const lessonDropdown = document.getElementById("lesson");
  const closeModal = document.querySelector(".close-btn");
  let quizDisplayState = [];

  // Helper function to handle modal display
  function openModal() {
    modal.style.display = "flex";
    storeQuizDisplayState();
    hideQuizContent();
  }

  // Check if necessary elements exist before attaching event listeners
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
      restoreQuizContent();
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        form.reset();
        resetLessonDropdown();
        restoreQuizContent();
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

  function hideQuizContent() {
    document
      .querySelectorAll(".quiz-header")
      .forEach((header) => (header.style.display = "none"));
    document
      .querySelectorAll(".quiz-item")
      .forEach((item) => (item.style.display = "none"));
  }

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

  // Logic for quiz dropdown buttons
  const pendingItems = document.querySelectorAll(".pending-item");
  const quizHeaders = document.querySelectorAll(".quiz-header");
  const quizItems = document.querySelectorAll(".quiz-item");

  // Hide all quiz headers and questions initially
  quizHeaders.forEach(header => header.style.display = "none");
  quizItems.forEach(item => item.style.display = "none");

  // Event listeners for pending items
  pendingItems.forEach(item => {
    item.addEventListener("click", function () {
      const index = item.getAttribute("data-quiz-index");

      // Hide all headers and items
      quizHeaders.forEach(header => header.style.display = "none");
      quizItems.forEach(item => item.style.display = "none");

      // Show the clicked quiz header and its corresponding questions
      if (quizHeaders[index]) {
        quizHeaders[index].style.display = "block"; // Show the header
      }

      // Show all questions corresponding to the selected quiz
      quizItems.forEach((quizItem, quizIndex) => {
        // Assuming that quiz items are grouped by quizIndex.
        if (quizItem.getAttribute("data-quiz-index") === index) {
          quizItem.style.display = "block"; // Show related quiz items
        }
      });
    });
  });

  // Show the first quiz on page load without opening the modal
  if (pendingItems.length > 0) {
    const firstIndex = pendingItems[1].getAttribute("data-quiz-index");

    // Hide all headers and items
    quizHeaders.forEach(header => header.style.display = "none");
    quizItems.forEach(item => item.style.display = "none");

    // Show the first quiz header
    if (quizHeaders[firstIndex]) {
      quizHeaders[firstIndex].style.display = "block"; // Show the header
    }

    // Show all questions corresponding to the first quiz
    quizItems.forEach((quizItem, quizIndex) => {
      if (quizItem.getAttribute("data-quiz-index") === firstIndex) {
        quizItem.style.display = "block"; // Show related quiz items
      }
    });
  }
});
