document.addEventListener("DOMContentLoaded", function () {
  // Select all pending items
  const pendingItems = document.querySelectorAll(".pending-item");
  const headers = document.querySelectorAll(".quiz-header");
  const infoContainers = document.querySelectorAll(".quiz-info-container");
  const buttonContainers = document.querySelectorAll(".button-container");

  // Function to hide all headers, info-containers, and buttons
  function hideAllQuizzes() {
    headers.forEach((header) => (header.style.display = "none"));
    infoContainers.forEach((info) => (info.style.display = "none"));
    buttonContainers.forEach((button) => (button.style.display = "none"));
  }

  // Display the first quiz by default
  hideAllQuizzes();
  if (pendingItems.length > 0) {
    document.querySelector(".quiz-header").style.display = "block";
    document.querySelector(".quiz-info-container").style.display = "flex";
    document.querySelector(".button-container").style.display = "flex";
  }

  // Event listeners for toggling
  pendingItems.forEach((item) => {
    item.addEventListener("click", function () {
      const quizId = this.getAttribute("data-quiz-id");
      hideAllQuizzes();

      // Display the selected quiz's header, info-container, and button
      document.getElementById("header-quiz-" + quizId).style.display = "block";
      document.getElementById("quiz-" + quizId).style.display = "flex";
      document.getElementById("button-quiz-" + quizId).style.display = "flex";
    });
  });

  const quizModal = document.getElementById("quizModal");
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
        quizModal.style.display = "none";
        document.body.style.overflow = "auto";
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

      Swal.fire({
        title: "Do you want to take this quiz?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#4caf50",
        cancelButtonColor: "#f44336",
      }).then((result) => {
        if (result.isConfirmed) {
          quizModal.style.display = "block";
          document.body.style.overflow = "hidden";
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
    });
  });

  function promptQuiz(quizId) {
    fetch(`/SCES/backend/fetch-class.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `submitType=getQuizTitle=${quizId}`,
    }).then((response) => response.text());
  }
});
