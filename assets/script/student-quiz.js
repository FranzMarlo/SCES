document.addEventListener("DOMContentLoaded", function () {
  const pendingItems = document.querySelectorAll(".pending-item, .pending"); // Select both pending-item and pending divs
  const headers = document.querySelectorAll(".quiz-header");
  const infoContainers = document.querySelectorAll(".quiz-info-container");
  const buttonContainers = document.querySelectorAll(".button-container");
  const noticeBoxes = document.querySelectorAll(".notice-box");
  const tabController = document.querySelectorAll(".tab"); // Tab controller for toggling between active and past
  const activeQuizContainer = document.getElementById("activeQuizContainer");
  const pastQuizContainer = document.getElementById("pastQuizContainer");
  const activeTab = document.getElementById("pending-tab");
  const pastTab = document.getElementById("past-tab");

  function hideAllQuizzes() {
    headers.forEach((header) => (header.style.display = "none"));
    infoContainers.forEach((info) => (info.style.display = "none"));
    buttonContainers.forEach((button) => (button.style.display = "none"));
    noticeBoxes.forEach((notice) => (notice.style.display = "none")); // Hide all notices
  }

  // Function to display the quiz by quiz_id
  function displayQuizById(quizId) {
    hideAllQuizzes();

    // Display the selected quiz's header, info-container, button, and notice
    document.getElementById("header-quiz-" + quizId).style.display = "block";
    document.getElementById("quiz-" + quizId).style.display = "flex";
    document.getElementById("button-quiz-" + quizId).style.display = "flex";
    document.getElementById("notice-quiz-" + quizId).style.display = "flex"; // Show the correct notice
  }

  // Function to update URL with the quiz_id and active state
  function updateURLWithQuizId(quizId, isActive) {
    const url = new URL(window.location.href);
    url.searchParams.set("quiz_id", quizId); // Set the quiz_id in URL
    url.searchParams.set("active", isActive); // Set the active state in URL
    window.history.pushState({}, "", url); // Update the URL without reloading
  }

  // Function to toggle between tabs
  function toggleTab(isActive) {
    if (isActive) {
      activeQuizContainer.style.display = "flex";
      pastQuizContainer.style.display = "none";
      activeTab.classList.add("active");
      pastTab.classList.remove("active");
    } else {
      activeQuizContainer.style.display = "none";
      pastQuizContainer.style.display = "flex";
      activeTab.classList.remove("active");
      pastTab.classList.add("active");
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const initialQuizId = urlParams.get("quiz_id");
  let isActiveTab = urlParams.get("active");

  // Default to `true` for active quizzes if `active` is null or missing
  if (isActiveTab === null) {
    isActiveTab = "true"; // Default to true when the parameter is not present
  }

  // Convert `isActiveTab` to a boolean value for use in the toggle function
  const isActiveTabBoolean = isActiveTab === "true";

  // Toggle tabs based on the active parameter
  toggleTab(isActiveTabBoolean);

  // Display the initial quiz based on URL or default to the first quiz
  if (initialQuizId) {
    displayQuizById(initialQuizId); // Display quiz based on the quiz_id in URL
  } else if (pendingItems.length > 0) {
    const firstQuizId = pendingItems[0].getAttribute("data-quiz-id");
    displayQuizById(firstQuizId); // Display the first quiz by default
    updateURLWithQuizId(firstQuizId, isActiveTab); // Update URL with the first quiz_id and active state
  }

  // Event listeners for toggling between quizzes
  pendingItems.forEach((item) => {
    item.addEventListener("click", function () {
      const quizId = this.getAttribute("data-quiz-id");

      displayQuizById(quizId); // Display the selected quiz
      updateURLWithQuizId(quizId, isActiveTabBoolean); // Update the URL with the selected quiz_id and active state
    });
  });

  // Event listeners for tab clicks
  tabController.forEach((tab) => {
    tab.addEventListener("click", function () {
      const isActive = this.id === "pending-tab"; // Determine if the active tab is clicked

      toggleTab(isActive); // Toggle between active and past quizzes
      const firstQuizId =
        pendingItems.length > 0
          ? pendingItems[0].getAttribute("data-quiz-id")
          : null;

      if (firstQuizId) {
        updateURLWithQuizId(firstQuizId, isActive); // Update the URL with the active state and quiz_id
      }
    });
  });

  const closeQuizModal = document.getElementById("closeQuizModal");

  closeQuizModal.addEventListener("click", function () {
    Swal.fire({
      title: "Do you want to quit taking this quiz?",
      text: "You are about to lose your progress",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#4caf50",
      cancelButtonColor: "#f44336",
    }).then((result) => {
      if (result.isConfirmed) {
        closeQuiz();
      } else {
        Swal.fire({
          title: "Quiz taking still on progress",
          icon: "info",
          text: "Remember to submit the form when you are done answering",
          confirmButtonText: "Ok",
          confirmButtonColor: "#4caf50",
        });
      }
    });
  });

  document.querySelectorAll(".take-quiz").forEach((button) => {
    button.addEventListener("click", function () {
      const quizId = this.id.split("-")[2];
      const attempts = this.getAttribute("data-attempts");
      if (attempts == 0) {
        Swal.fire({
          title: "Do you want to take this quiz?",
          icon: "question",
          text: "This will be your first attempt on taking this quiz",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          confirmButtonColor: "#4caf50",
          cancelButtonColor: "#f44336",
        }).then((result) => {
          if (result.isConfirmed) {
            promptQuiz(quizId);
          } else {
            Swal.fire({
              title: "Quiz Remains Pending",
              icon: "info",
              text: "Remember to take your quiz before due date",
              confirmButtonText: "Ok",
              confirmButtonColor: "#4caf50",
            });
          }
        });
      } else if (attempts == 1) {
        Swal.fire({
          title: "Do you want to retake this quiz?",
          icon: "question",
          text: "This will be your second attempt on taking this quiz",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          confirmButtonColor: "#4caf50",
          cancelButtonColor: "#f44336",
        }).then((result) => {
          if (result.isConfirmed) {
            rePromptQuiz(quizId);
          } else {
            Swal.fire({
              title: "Quiz Remains Pending",
              icon: "info",
              text: "You can still retake it before due date",
              confirmButtonText: "Ok",
              confirmButtonColor: "#4caf50",
            });
          }
        });
      } else if (attempts == 2) {
        Swal.fire({
          title: "Do you want to retake this quiz?",
          icon: "question",
          text: "This will be your third attempt on taking this quiz",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          confirmButtonColor: "#4caf50",
          cancelButtonColor: "#f44336",
        }).then((result) => {
          if (result.isConfirmed) {
            rePromptQuiz(quizId);
          } else {
            Swal.fire({
              title: "Quiz Remains Pending",
              icon: "info",
              text: "You can still retake it before due date",
              confirmButtonText: "Ok",
              confirmButtonColor: "#4caf50",
            });
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "You used up all of your remaining chances to retake this quiz",
          confirmButtonText: "Ok",
          confirmButtonColor: "#4caf50",
        });
      }
    });
  });

  function promptQuiz(quizId) {
    fetch(`/SCES/backend/fetch-class.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `submitType=getQuizContent&quiz_id=${quizId}`,
    })
      .then((response) => response.json())
      .then((data) => {
        // Set modal header and icon
        document.querySelector(
          ".modal-header-text h1"
        ).innerText = `Quiz ${data.quiz_number} - ${data.title}`;
        document.querySelector(
          ".modal-icon-container img"
        ).src = `/SCES/assets/images/${data.icon}`;

        const modalHeaderBg = document.querySelector(".modal-header-bg");
        modalHeaderBg.className = `modal-header-bg ${data.subject_code.toLowerCase()}`;

        const questionsContainer = document.querySelector(
          ".modal-quiz-content"
        );
        questionsContainer.innerHTML = "";

        // Iterate through questions
        data.questions.forEach((question, index) => {
          const quizItem = document.createElement("div");
          quizItem.classList.add("quiz-item");

          // Create question box with question_id as a data attribute
          const questionBox = document.createElement("div");
          questionBox.classList.add("question-box");
          questionBox.setAttribute("data-question-id", question.question_id); // Add question_id attribute
          questionBox.innerHTML = `<span><strong>${index + 1}.</strong> ${
            question.question
          }</span>`;
          quizItem.appendChild(questionBox);

          // Add choices for each question
          question.choices.forEach((choice, i) => {
            const choiceLetter = String.fromCharCode(65 + i);

            const choiceElement = document.createElement("label");
            choiceElement.classList.add("quiz-ans");
            choiceElement.innerHTML = `
                        <input type="radio" name="question-${index}" value="${choice.choice_id}" id="question-${index}-choice-${i}" style="display: none;">
                        <strong>${choiceLetter}.</strong>&nbsp;${choice.choice}
                    `;
            choiceElement.addEventListener("click", function () {
              const radioButton = this.querySelector('input[type="radio"]');
              if (radioButton) {
                document
                  .querySelectorAll(`input[name="question-${index}"]`)
                  .forEach((rb) => {
                    const label = rb.parentElement;
                    label.classList.remove(data.subject_code.toLowerCase());
                  });

                choiceElement.classList.add(data.subject_code.toLowerCase());
              }
            });
            quizItem.appendChild(choiceElement);
          });
          questionsContainer.appendChild(quizItem);
        });

        const submitButton = document.getElementById("submit-quiz");
        submitButton.setAttribute("data-quiz-id", quizId);

        submitButton.onclick = () => submitQuiz(quizId);

        const quizModal = document.getElementById("quizModal");
        quizModal.style.display = "block";
        document.body.style.overflow = "hidden";
      });
  }

  function rePromptQuiz(quizId) {
    fetch(`/SCES/backend/fetch-class.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `submitType=getQuizContent&quiz_id=${quizId}`,
    })
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(
          ".modal-header-text h1"
        ).innerText = `Quiz ${data.quiz_number} - ${data.title}`;
        document.querySelector(
          ".modal-icon-container img"
        ).src = `/SCES/assets/images/${data.icon}`;

        const modalHeaderBg = document.querySelector(".modal-header-bg");
        modalHeaderBg.className = `modal-header-bg ${data.subject_code.toLowerCase()}`;

        const questionsContainer = document.querySelector(
          ".modal-quiz-content"
        );
        questionsContainer.innerHTML = "";

        data.questions.forEach((question, index) => {
          const quizItem = document.createElement("div");
          quizItem.classList.add("quiz-item");

          const questionBox = document.createElement("div");
          questionBox.classList.add("question-box");
          questionBox.setAttribute("data-question-id", question.question_id);
          questionBox.innerHTML = `<span><strong>${index + 1}.</strong> ${
            question.question
          }</span>`;
          quizItem.appendChild(questionBox);

          question.choices.forEach((choice, i) => {
            const choiceLetter = String.fromCharCode(65 + i);

            const choiceElement = document.createElement("label");
            choiceElement.classList.add("quiz-ans");
            choiceElement.innerHTML = `
                        <input type="radio" name="question-${index}" value="${choice.choice_id}" id="question-${index}-choice-${i}" style="display: none;">
                        <strong>${choiceLetter}.</strong>&nbsp;${choice.choice}
                    `;
            choiceElement.addEventListener("click", function () {
              const radioButton = this.querySelector('input[type="radio"]');
              if (radioButton) {
                document
                  .querySelectorAll(`input[name="question-${index}"]`)
                  .forEach((rb) => {
                    const label = rb.parentElement;
                    label.classList.remove(data.subject_code.toLowerCase());
                  });

                choiceElement.classList.add(data.subject_code.toLowerCase());
              }
            });
            quizItem.appendChild(choiceElement);
          });
          questionsContainer.appendChild(quizItem);
        });

        const submitButton = document.getElementById("submit-quiz");
        submitButton.setAttribute("data-quiz-id", quizId);

        submitButton.onclick = () => resubmitQuiz(quizId);

        const quizModal = document.getElementById("quizModal");
        quizModal.style.display = "block";
        document.body.style.overflow = "hidden";
      });
  }

  function submitQuiz(quizId) {
    const selectedAnswers = [];
    let hasUnanswered = false;

    document.querySelectorAll(".quiz-item").forEach((quizItem, index) => {
      const questionId = quizItem
        .querySelector(".question-box")
        .getAttribute("data-question-id");

      const selectedOption = quizItem.querySelector(
        `input[name="question-${index}"]:checked`
      );

      if (selectedOption) {
        selectedAnswers.push({
          question_id: questionId,
          choice_id: selectedOption.value,
        });
      } else {
        hasUnanswered = true;
        selectedAnswers.push({
          question_id: questionId,
          choice_id: null,
        });
      }
    });

    if (hasUnanswered) {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Please answer all the questions of quiz",
        confirmButtonText: "Ok",
        confirmButtonColor: "#4caf50",
      });
      return;
    }

    Swal.fire({
      title: "Submit Quiz?",
      text: "Are you sure you want to submit the quiz?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#f44336",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = selectedAnswers
          .map(
            (answer, i) =>
              `answers[${i}][question_id]=${encodeURIComponent(
                answer.question_id
              )}&answers[${i}][choice_id]=${encodeURIComponent(
                answer.choice_id
              )}`
          )
          .join("&");

        const bodyData = `submitType=submitQuiz&quiz_id=${quizId}&${formData}`;

        fetch(`/SCES/backend/global.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: bodyData,
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.success) {
              closeQuiz();
              if (result.remarks == "Passed") {
                Swal.fire({
                  icon: "success",
                  title: "Well Done!",
                  text: `You passed with a score of ${result.score} out of ${result.totalQuestions}`,
                  confirmButtonColor: "#4CAF50",
                }).then((result) => {
                  if (result.value) {
                    window.location.reload();
                  }
                });
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Try Harder Next Time",
                  text: `Your score is ${result.score} out of ${result.totalQuestions}`,
                  confirmButtonColor: "#4CAF50",
                }).then((result) => {
                  if (result.value) {
                    window.location.reload();
                  }
                });
              }
            } else {
              Swal.fire({
                title: "Error",
                icon: "error",
                text: "Server Offline",
                confirmButtonText: "Ok",
                confirmButtonColor: "#4caf50",
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  }

  function resubmitQuiz(quizId) {
    const selectedAnswers = [];
    let hasUnanswered = false;

    document.querySelectorAll(".quiz-item").forEach((quizItem, index) => {
      const questionId = quizItem
        .querySelector(".question-box")
        .getAttribute("data-question-id");

      const selectedOption = quizItem.querySelector(
        `input[name="question-${index}"]:checked`
      );

      if (selectedOption) {
        selectedAnswers.push({
          question_id: questionId,
          choice_id: selectedOption.value,
        });
      } else {
        hasUnanswered = true;
        selectedAnswers.push({
          question_id: questionId,
          choice_id: null,
        });
      }
    });

    if (hasUnanswered) {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Please answer all the questions of quiz",
        confirmButtonText: "Ok",
        confirmButtonColor: "#4caf50",
      });
      return;
    }

    Swal.fire({
      title: "Submit Quiz?",
      text: "Are you sure you want to submit the quiz?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#f44336",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = selectedAnswers
          .map(
            (answer, i) =>
              `answers[${i}][question_id]=${encodeURIComponent(
                answer.question_id
              )}&answers[${i}][choice_id]=${encodeURIComponent(
                answer.choice_id
              )}`
          )
          .join("&");

        const bodyData = `submitType=resubmitQuiz&quiz_id=${quizId}&${formData}`;

        fetch(`/SCES/backend/global.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: bodyData,
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.success) {
              closeQuiz();
              if (result.remarks == "Passed") {
                Swal.fire({
                  icon: "success",
                  title: "Well Done!",
                  text: `You passed with a score of ${result.score} out of ${result.totalQuestions}`,
                  confirmButtonColor: "#4CAF50",
                }).then((result) => {
                  if (result.value) {
                    window.location.reload();
                  }
                });
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Try Harder Next Time",
                  text: `Your score is ${result.score} out of ${result.totalQuestions}`,
                  confirmButtonColor: "#4CAF50",
                }).then((result) => {
                  if (result.value) {
                    window.location.reload();
                  }
                });
              }
            } else {
              Swal.fire({
                title: "Error",
                icon: "error",
                text: "Server Offline",
                confirmButtonText: "Ok",
                confirmButtonColor: "#4caf50",
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  }

  function closeQuiz() {
    const quizModal = document.getElementById("quizModal");
    quizModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
