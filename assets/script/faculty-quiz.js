document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("addQuizModal");
  const addQuizBtn = document.getElementById("addQuizBtn");
  const addQuizItem = document.getElementById("addQuizItem");
  const noQuizHeader = document.querySelector(".no-quiz-header");
  const form = document.getElementById("facultyAddQuiz");
  const lessonDropdown = document.getElementById("lesson");
  const closeModal = document.getElementById("closeAddQuiz");
  let quizDisplayState = [];

  // Extract quiz_id from URL or set to first pending_item by default
  function getQuizIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("quiz_id");
  }

  function setQuizIdInURL(quizId) {
    const newUrl = `${window.location.pathname}?quiz_id=${quizId}`;
    history.replaceState(null, "", newUrl); // Replace URL without reloading
  }

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
  const pendingButton = document.querySelectorAll(".pending");
  const quizHeaders = document.querySelectorAll(".quiz-header");
  const quizItems = document.querySelectorAll(".quiz-item");

  // Initially hide all quiz headers and items
  quizHeaders.forEach((header) => (header.style.display = "none"));
  quizItems.forEach((item) => (item.style.display = "none"));

  pendingItems.forEach((item) => {
    const quizId = item.getAttribute("data-quiz-id");
    item.href = `?quiz_id=${quizId}`;

    item.addEventListener("click", function (event) {
      event.preventDefault();
      setQuizIdInURL(quizId); // Update URL with quiz_id

      // Hide all quiz headers and items
      quizHeaders.forEach((header) => (header.style.display = "none"));
      quizItems.forEach((item) => (item.style.display = "none"));

      // Display the selected quiz by quiz_id
      displayQuizById(quizId);
    });
  });

  pendingButton.forEach((item) => {
    const quizId = item.getAttribute("data-quiz-id");
    item.href = `?quiz_id=${quizId}`;

    item.addEventListener("click", function (event) {
      event.preventDefault();
      setQuizIdInURL(quizId); // Update URL with quiz_id

      // Hide all quiz headers and items
      quizHeaders.forEach((header) => (header.style.display = "none"));
      quizItems.forEach((item) => (item.style.display = "none"));

      // Display the selected quiz by quiz_id
      displayQuizById(quizId);
    });
  });

  function displayQuizById(quizId) {
    const quizHeader = document.querySelector(
      `.quiz-header[data-quiz-id="${quizId}"]`
    );
    const quizItemsToShow = document.querySelectorAll(
      `.quiz-item[data-quiz-id="${quizId}"]`
    );

    if (quizHeader) {
      quizHeader.style.display = "block";
    }

    quizItemsToShow.forEach((quizItem) => {
      quizItem.style.display = "block";
    });
  }

  // Display the first pending item or quiz by URL on page load
  const initialQuizId =
    getQuizIdFromURL() || pendingItems[0]?.getAttribute("data-quiz-id");
  if (initialQuizId) {
    displayQuizById(initialQuizId);
  } else if (pendingItems.length > 0) {
    // If there's no initial quizId, display the first pending item's quiz
    displayQuizById(pendingItems[0].getAttribute("data-quiz-id"));
  }

  const addQuestionModal = document.getElementById("addQuestionModal");
  const addQuestionForm = document.getElementById("facultyAddQuestion");
  const quizIdInput = document.getElementById("quizId");
  const closeAddQuestion = document.getElementById("closeAddQuestion");

  document.querySelectorAll(".add-question").forEach((button) => {
    button.addEventListener("click", function () {
      const quizId = button.getAttribute("data-quiz-id");
      quizIdInput.value = quizId;
      addQuestionModal.style.display = "flex";
    });
  });

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

  document.getElementById("subject").addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const levelId = selectedOption.getAttribute("data-level-id");
    const subjectId = selectedOption.value;
    const sectionId = selectedOption.getAttribute("data-section-id");

    if (subjectId) {
      const xhr = new XMLHttpRequest();
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

      document.querySelectorAll(".question-popup-menu").forEach((menu) => {
        if (menu !== popupMenu) {
          menu.style.display = "none";
        }
      });

      popupMenu.style.display =
        popupMenu.style.display === "block" ? "none" : "block";

      event.stopPropagation();
    });
  });

  document.addEventListener("click", function (event) {
    const isClickInsideMenu = event.target.closest(".question-popup-menu");
    const isClickOnMenuButton = event.target.closest(".question-menu");

    if (!isClickInsideMenu && !isClickOnMenuButton) {
      document.querySelectorAll(".question-popup-menu").forEach((menu) => {
        menu.style.display = "none";
      });
    }
  });

  document.querySelectorAll(".edit-question").forEach((editBtn) => {
    editBtn.onclick = function () {
      const questionId = this.getAttribute("data-question-id");
      document.getElementById("editQuestionId").value = questionId;

      const questionTextElement =
        this.closest(".quiz-item").querySelector(
          ".question-box span"
        ).innerText;
      const questionText = questionTextElement.replace(/^\d+\.\s*/, "");
      document.getElementById("editQuestionText").value = questionText;

      const choicesElements =
        this.closest(".quiz-item").querySelectorAll(".quiz-ans");

      choicesElements.forEach((choiceElement, index) => {
        const choiceText = choiceElement.innerText.replace(/^[A-Z]\.\s*/, "");
        const choiceId = choiceElement.getAttribute("data-choice-id");
        const isCorrect = choiceElement.classList.contains("correct");

        document.getElementById(`choice${index + 1}_update`).value = choiceText;
        document.getElementById(`choice${index + 1}_value`).value = choiceText;
        document.getElementById(`choice${index + 1}_id`).value = choiceId;

        if (isCorrect) {
          document.getElementById("correct_value").value = `choice${index + 1}`;
          document.getElementById("correctChoice").value = `choice${index + 1}`;
        }
      });
      const editQuestionModal = document.getElementById("editQuestionModal");
      editQuestionModal.style.display = "flex";
    };
  });
  const editQuestionForm = document.getElementById("editQuestion");
  document.getElementById("closeEditQuestion").onclick = function () {
    document.getElementById("editQuestionModal").style.display = "none";
    editQuestionForm.reset();
  };

  window.onclick = function (event) {
    const editQuestionModal = document.getElementById("editQuestionModal");
    if (event.target == editQuestionModal) {
      editQuestionModal.style.display = "none";
      editQuestionForm.reset();
    }
  };
});
