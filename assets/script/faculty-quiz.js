document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("addQuizModal");
  const addQuizBtn = document.getElementById("addQuizBtn");
  const addQuizItem = document.getElementById("addQuizItem");
  const noQuizHeader = document.querySelector(".no-quiz-header");
  const form = document.getElementById("addQuiz");
  const lessonDropdown = document.getElementById("lesson");
  const editLessonDropdown = document.getElementById("editLesson");
  const closeModal = document.getElementById("closeAddQuiz");
  let quizDisplayState = [];

  function getQuizIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("quiz_id");
  }

  function setQuizIdInURL(quizId) {
    const newUrl = `${window.location.pathname}?quiz_id=${quizId}`;
    history.replaceState(null, "", newUrl);
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

  const initialQuizId =
    getQuizIdFromURL() || pendingItems[0]?.getAttribute("data-quiz-id");
  if (initialQuizId) {
    displayQuizById(initialQuizId);
  } else if (pendingItems.length > 0) {
    displayQuizById(pendingItems[0].getAttribute("data-quiz-id"));
  }

  const addQuestionModal = document.getElementById("addQuestionModal");
  const addQuestionForm = document.getElementById("addQuestion");
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

  document.querySelectorAll(".quiz-settings").forEach((menuButton) => {
    menuButton.addEventListener("click", function (event) {
      const pendingItem = event.target.closest(".pending-item");
      const popupMenu = pendingItem.querySelector(".quiz-popup-menu");
      const quizId = this.getAttribute("data-quiz-id");

      const currentUrl = window.location.pathname;

      const newUrl = `${currentUrl}?quiz_id=${quizId}`;
      history.replaceState(null, "", newUrl);

      document.querySelectorAll(".quiz-popup-menu").forEach((menu) => {
        if (menu !== popupMenu) {
          menu.style.display = "none";
        }
      });

      popupMenu.style.display =
        popupMenu.style.display === "block" ? "none" : "block";

      const quizHeaders = document.querySelectorAll(".quiz-header");
      const quizItems = document.querySelectorAll(".quiz-item");

      quizHeaders.forEach((header) => (header.style.display = "none"));
      quizItems.forEach((item) => (item.style.display = "none"));

      displayQuizById(quizId);
      event.stopPropagation();
    });
  });

  document.addEventListener("click", function (event) {
    const isClickInsideMenu = event.target.closest(".quiz-popup-menu");
    const isClickOnMenuButton = event.target.closest(".quiz-menu");

    if (!isClickInsideMenu && !isClickOnMenuButton) {
      document.querySelectorAll(".quiz-popup-menu").forEach((menu) => {
        menu.style.display = "none";
      });
    }
  });

  document.querySelectorAll(".edit-quiz").forEach((editBtn) => {
    editBtn.addEventListener("click", function () {
      const quizId = this.getAttribute("data-quiz-id");

      // Update the URL without reloading the page
      const currentUrl = window.location.pathname;
      const newUrl = `${currentUrl}?quiz_id=${quizId}&edit=true`;
      history.pushState(null, "", newUrl);

      // Fetch quiz details via AJAX
      fetchQuizDetails(quizId);
    });
  });

  function fetchQuizDetails(quizId) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/SCES/backend/fetch-class.php`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    const requestBody = `quiz_id=${encodeURIComponent(
      quizId
    )}&submitType=getQuiz`;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const quizData = JSON.parse(xhr.responseText);

        document.getElementById("editQuizId").value = quizData.quiz_id;
        document.getElementById("editQuizTitle").value = quizData.title;
        document.getElementById("editQuizTitleHolder").value = quizData.title;
        document.getElementById("editQuizNumber").value = quizData.quiz_number;
        document.getElementById("editQuizNumberHolder").value =
          quizData.quiz_number;

        const subjectSelect = document.getElementById("editSubject");
        subjectSelect.value = quizData.subject_id;
        document.getElementById("editSubjectHolder").value =
          quizData.subject_id;

        const levelId =
          subjectSelect.options[subjectSelect.selectedIndex].getAttribute(
            "data-level-id"
          );
        const sectionId =
          subjectSelect.options[subjectSelect.selectedIndex].getAttribute(
            "data-section-id"
          );
        fetchLessons(levelId, quizData.subject_id, sectionId);
        document.getElementById("editLessonHolder").value = quizData.lesson_id;
        document.getElementById("editQuizModal").style.display = "flex";
      }
    };

    xhr.send(requestBody);
  }

  document.getElementById("closeEditQuiz").onclick = function () {
    const currentUrl = window.location.pathname;
    const quizId = document.getElementById("editQuizId").value;

    const newUrl = `${currentUrl}?quiz_id=${quizId}`;

    history.replaceState(null, "", newUrl);

    document.getElementById("editQuizModal").style.display = "none";
  };

  function fetchLessons(levelId, subjectId, sectionId) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/SCES/backend/faculty/fetch-lessons.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const editLessonDropdown = document.getElementById("editLesson");
        editLessonDropdown.innerHTML = xhr.responseText;
      }
    };

    xhr.send(
      `levelId=${levelId}&subjectId=${subjectId}&sectionId=${sectionId}`
    );
  }

  document
    .getElementById("editSubject")
    .addEventListener("change", function () {
      const selectedOption = this.options[this.selectedIndex];
      const levelId = selectedOption.getAttribute("data-level-id");
      const subjectId = selectedOption.value;
      const sectionId = selectedOption.getAttribute("data-section-id");

      fetchLessons(levelId, subjectId, sectionId);
    });

  function viewQuizDetails(quizId) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/SCES/backend/fetch-class.php`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    const requestBody = `quiz_id=${encodeURIComponent(
      quizId
    )}&submitType=viewQuiz`;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const quizData = JSON.parse(xhr.responseText);

        document.getElementById("viewQuizTitle").textContent = `Quiz ${quizData.quiz_number}: ${quizData.title}`;
        document.getElementById(
          "viewQuizSubject"
        ).textContent = `${quizData.subject} - ${quizData.section}`;
        document.getElementById(
          "viewQuizStudents"
        ).textContent = `${quizData.student_count} Students`;
        document.getElementById(
          "viewQuizItem"
        ).textContent = `${quizData.item_number} Items`;
        document.getElementById("viewQuizStatus").textContent = quizData.status;
        document.getElementById(
          "viewQuizDue"
        ).textContent = `Due at ${quizData.due_date}`;

        // Display the modal
        document.getElementById("viewQuizModal").style.display = "flex";
      }
    };

    xhr.send(requestBody);
  }

  document.querySelectorAll(".view-quiz").forEach((viewBtn) => {
    viewBtn.addEventListener("click", function () {
      const quizId = this.getAttribute("data-quiz-id");
      createDonutCharts();
      viewQuizDetails(quizId);
    });
  });

  document.getElementById("closeViewQuiz").onclick = function () {
    const currentUrl = window.location.pathname;
    const quizId = document.getElementById("editQuizId").value;

    const newUrl = `${currentUrl}?quiz_id=${quizId}`;
    history.replaceState(null, "", newUrl);

    document.getElementById("viewQuizModal").style.display = "none";
  };

  function createDonutCharts() {
    const ctx1 = document.getElementById("donutChart1").getContext("2d");
    const ctx2 = document.getElementById("donutChart2").getContext("2d");

    // Destroy previous charts if they exist
    if (ctx1.chart) ctx1.chart.destroy();
    if (ctx2.chart) ctx2.chart.destroy();

    const completedCount = 60; // Example number of completed students
    const passedCount = 80; // Example number of passed students

    // Define a custom plugin to add center labels
    const centerLabelPlugin = {
      id: "centerLabel",
      beforeDraw: function (chart) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea; // Get the chart area
        const width = chartArea.right - chartArea.left;
        const height = chartArea.bottom - chartArea.top;

        ctx.save(); // Save the current context state

        ctx.font = "3rem sans-serif"; // Adjust font size based on chart size if needed
        ctx.textAlign = "center"; // Center text horizontally
        ctx.textBaseline = "middle"; // Center text vertically
        ctx.fillStyle = "#000"; // Text color

        // Calculate the value from the dataset and position
        const number = chart.data.datasets[0].data[0]; // Value to be displayed
        const xCenter = chartArea.left + width / 2; // Horizontal center
        const yCenter = chartArea.top + height / 2; // Vertical center

        ctx.fillText(number, xCenter, yCenter); // Draw the number in the center
        ctx.restore(); // Restore the context state
      },
    };

    // Register the custom plugin
    Chart.register(centerLabelPlugin);

    // Chart 1: Completion Rate
    ctx1.chart = new Chart(ctx1, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Not Completed"],
        datasets: [
          {
            label: "Completion Rate",
            data: [completedCount, 100 - completedCount],
            backgroundColor: ["#59adf6", "#ffffff"],
            borderColor: ["#5694ca", "#BBBBBBFF"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom", // Position the legend below the chart
          },
          centerLabel: true, // Enable the center label plugin
        },
      },
    });

    // Chart 2: Passing Rate
    ctx2.chart = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: ["Passed", "Failed"],
        datasets: [
          {
            label: "Passing Rate",
            data: [passedCount, 100 - passedCount], // Sample data
            backgroundColor: ["#42d6a4", "#ff8080"],
            borderColor: ["#3baf88", "#ea7474"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom", // Position the legend below the chart
          },
          centerLabel: true, // Enable the center label plugin
        },
      },
    });
  }
});
