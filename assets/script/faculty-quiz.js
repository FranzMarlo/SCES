document.addEventListener("DOMContentLoaded", function () {
  const lessonDropdown = document.getElementById("lesson");
  const activeContainer = document.getElementById("activeContainer");
  const inactiveContainer = document.getElementById("inactiveContainer");
  const completedContainer = document.getElementById("completedContainer");
  const activeTab = document.getElementById("activeTab");
  const inactiveTab = document.getElementById("inactiveTab");
  const completedTab = document.getElementById("completedTab");

  let lastActiveQuizId = null;
  let lastInactiveQuizId = null;
  let lastCompletedQuizId = null;

  function getFirstQuizId(container) {
    const firstPendingItem = container.querySelector(".pending-item");
    return firstPendingItem
      ? firstPendingItem.getAttribute("data-quiz-id")
      : null;
  }

  function getQuizIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("quiz_id");
  }

  function getActiveFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("active")) || 1;
  }

  function setQuizIdInURL(quizId, activeValue) {
    const newUrl = `${window.location.pathname}?active=${activeValue}&quiz_id=${quizId}`;
    history.replaceState(null, "", newUrl);
  }

  function displayQuizById(quizId) {
    document
      .querySelectorAll(".quiz-header")
      .forEach((header) => (header.style.display = "none"));
    document
      .querySelectorAll(".quiz-item")
      .forEach((item) => (item.style.display = "none"));

    const quizHeader = document.querySelector(
      `.quiz-header[data-quiz-id="${quizId}"]`
    );
    const quizItemsToShow = document.querySelectorAll(
      `.quiz-item[data-quiz-id="${quizId}"]`
    );

    if (quizHeader) quizHeader.style.display = "block";
    quizItemsToShow.forEach((quizItem) => (quizItem.style.display = "block"));
  }

  function handleTabSwitch(container, lastQuizId, activeValue) {
    displayContainer(container, activeValue);

    const quizIdToShow = lastQuizId || getFirstQuizId(container);
    if (quizIdToShow) {
      setQuizIdInURL(quizIdToShow, activeValue);
      displayQuizById(quizIdToShow);
    }
  }

  activeTab.addEventListener("click", function () {
    handleTabSwitch(activeContainer, lastActiveQuizId, 1);
    activeTab.classList.add("active");
    inactiveTab.classList.remove("active");
    completedTab.classList.remove("active");
  });

  inactiveTab.addEventListener("click", function () {
    handleTabSwitch(inactiveContainer, lastInactiveQuizId, 2);
    activeTab.classList.remove("active");
    inactiveTab.classList.add("active");
    completedTab.classList.remove("active");
  });

  completedTab.addEventListener("click", function () {
    handleTabSwitch(completedContainer, lastCompletedQuizId, 3);
    activeTab.classList.remove("active");
    inactiveTab.classList.remove("active");
    completedTab.classList.add("active");
  });

  function displayContainer(containerToShow, activeValue) {
    activeContainer.style.display = "none";
    inactiveContainer.style.display = "none";
    completedContainer.style.display = "none";

    document.getElementById("activeDropdown").style.display = "none";
    document.getElementById("inactiveDropdown").style.display = "none";
    document.getElementById("completedDropdown").style.display = "none";

    containerToShow.style.display = "flex";

    switch (activeValue) {
      case 1:
        document.getElementById("activeDropdown").style.display = "flex";
        break;
      case 2:
        document.getElementById("inactiveDropdown").style.display = "flex";
        break;
      case 3:
        document.getElementById("completedDropdown").style.display = "flex";
        break;
      default:
        document.getElementById("activeDropdown").style.display = "flex";
    }
  }

  const activeTabValue = getActiveFromURL();
  const currentQuizId = getQuizIdFromURL();
  switch (activeTabValue) {
    case 1:
      lastActiveQuizId = currentQuizId;
      displayContainer(activeContainer, 1);
      displayQuizById(currentQuizId || getFirstQuizId(activeContainer));
      break;
    case 2:
      lastInactiveQuizId = currentQuizId;
      displayContainer(inactiveContainer, 2);
      displayQuizById(currentQuizId || getFirstQuizId(inactiveContainer));
      break;
    case 3:
      lastCompletedQuizId = currentQuizId;
      displayContainer(completedContainer, 3);
      displayQuizById(currentQuizId || getFirstQuizId(completedContainer));
      break;
    default:
      displayContainer(activeContainer, 1);
      displayQuizById(getFirstQuizId(activeContainer));
  }

  document.querySelectorAll(".pending-item").forEach((item) => {
    const quizId = item.getAttribute("data-quiz-id");
    item.href = `?quiz_id=${quizId}`;

    item.addEventListener("click", function (event) {
      event.preventDefault();
      const activeValue = getActiveFromURL();
      setQuizIdInURL(quizId, activeValue);
      displayQuizById(quizId);

      switch (activeValue) {
        case 1:
          lastActiveQuizId = quizId;
          break;
        case 2:
          lastInactiveQuizId = quizId;
          break;
        case 3:
          lastCompletedQuizId = quizId;
          break;
      }
    });
  });

  document.querySelectorAll(".pending").forEach((item) => {
    const quizId = item.getAttribute("data-quiz-id");
    item.href = `?quiz_id=${quizId}`;

    item.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      const activeValue = getActiveFromURL();
      setQuizIdInURL(quizId, activeValue);
      displayQuizById(quizId);

      switch (activeValue) {
        case 1:
          lastActiveQuizId = quizId;
          break;
        case 2:
          lastInactiveQuizId = quizId;
          break;
        case 3:
          lastCompletedQuizId = quizId;
          break;
      }
    });
  });

  const modal = document.getElementById("addQuizModal");
  const noQuizHeader = document.querySelector(".no-quiz-header");
  const form = document.getElementById("addQuiz");
  const closeModal = document.getElementById("closeAddQuiz");

  document.querySelectorAll(".add-pending-item").forEach((button) => {
    button.addEventListener("click", function () {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  document.querySelectorAll(".addQuizBtn").forEach((button) => {
    button.addEventListener("click", function (event) {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  closeModal.addEventListener("click", function () {
    form.reset();
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  if (noQuizHeader) {
    noQuizHeader.addEventListener("click", function () {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
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
      document.body.style.overflow = "hidden";
    });
  });

  closeAddQuestion.onclick = function () {
    addQuestionModal.style.display = "none";
    document.body.style.overflow = "auto";
    addQuestionForm.reset();
  };

  window.onclick = function (event) {
    if (event.target == addQuestionModal) {
      addQuestionModal.style.display = "none";
      addQuestionForm.reset();
      document.body.style.overflow = "auto";
    }
  };

  document.getElementById("subject").addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const levelId = selectedOption.getAttribute("data-level-id");
    const subjectId = selectedOption.value;
    const sectionId = selectedOption.getAttribute("data-section-id");
    if (subjectId) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/SCES/backend/fetch-class.php", true);
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
          sectionId +
          "&lessonId=?" +
          "&submitType=getLessons"
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
      document.body.style.overflow = "hidden";
    };
  });
  const editQuestionForm = document.getElementById("editQuestion");
  document.getElementById("closeEditQuestion").onclick = function () {
    document.getElementById("editQuestionModal").style.display = "none";
    editQuestionForm.reset();
    document.body.style.overflow = "auto";
  };

  window.onclick = function (event) {
    const editQuestionModal = document.getElementById("editQuestionModal");
    if (event.target == editQuestionModal) {
      editQuestionModal.style.display = "none";
      editQuestionForm.reset();
      document.body.style.overflow = "auto";
    }
  };

  document.querySelectorAll(".quiz-settings").forEach((menuButton) => {
    menuButton.addEventListener("click", function (event) {
      const pendingItem = event.target.closest(".pending-item");
      const popupMenu = pendingItem.querySelector(".quiz-popup-menu");
      const quizId = this.getAttribute("data-quiz-id");

      const currentUrl = new URL(window.location.href);
      const searchParams = new URLSearchParams(currentUrl.search);

      searchParams.set("quiz_id", quizId);

      const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`;
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

  document.querySelectorAll(".quiz-option").forEach((menuButton) => {
    menuButton.addEventListener("click", function (event) {
      const pendingButton = event.target.closest(".pending");
      const popupMenu = pendingButton.querySelector(
        ".quiz-dropdown-popup-menu"
      );
      const quizId = this.getAttribute("data-quiz-id");

      const currentUrl = new URL(window.location.href);
      const searchParams = new URLSearchParams(currentUrl.search);

      searchParams.set("quiz_id", quizId);

      const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`;
      history.replaceState(null, "", newUrl);

      document.querySelectorAll(".quiz-dropdown-popup-menu").forEach((menu) => {
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
    const isClickInsideMenu = event.target.closest(".quiz-dropdown-popup-menu");
    const isClickOnMenuButton = event.target.closest(".quiz-menu");

    if (!isClickInsideMenu && !isClickOnMenuButton) {
      document.querySelectorAll(".quiz-dropdown-popup-menu").forEach((menu) => {
        menu.style.display = "none";
      });
    }
  });

  document.querySelectorAll(".edit-quiz").forEach((editBtn) => {
    editBtn.addEventListener("click", function () {
      const quizId = this.getAttribute("data-quiz-id");

      const currentUrl = window.location.pathname;
      const newUrl = `${currentUrl}?active=2&quiz_id=${quizId}&edit=true`;
      history.pushState(null, "", newUrl);

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
        fetchLessons(
          levelId,
          quizData.subject_id,
          sectionId,
          quizData.lesson_id,
          "getLessons"
        );
        document.getElementById("editLessonHolder").value = quizData.lesson_id;
        document.getElementById("editQuizModal").style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    };

    xhr.send(requestBody);
  }

  document.getElementById("closeEditQuiz").onclick = function () {
    const quizId = document.getElementById("editQuizId").value;
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);

    searchParams.set("quiz_id", quizId);

    const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`;
    history.replaceState(null, "", newUrl);
    document.getElementById("editQuizModal").style.display = "none";
    document.body.style.overflow = "auto";
  };

  function fetchLessons(levelId, subjectId, sectionId, lessonId, submitType) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/SCES/backend/fetch-class.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const editLessonDropdown = document.getElementById("editLesson");
        editLessonDropdown.innerHTML = xhr.responseText;
      }
    };

    xhr.send(
      `levelId=${levelId}&subjectId=${subjectId}&sectionId=${sectionId}&lessonId=${lessonId}&submitType=${submitType}`
    );
  }

  document
    .getElementById("editSubject")
    .addEventListener("change", function () {
      const selectedOption = this.options[this.selectedIndex];
      const levelId = selectedOption.getAttribute("data-level-id");
      const subjectId = selectedOption.value;
      const sectionId = selectedOption.getAttribute("data-section-id");
      const lessonId = document.getElementById("editLessonHolder").value;

      fetchLessons(levelId, subjectId, sectionId, lessonId, "getLessons");
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
        const quizId = quizData.quiz_id;
        let dueDate;

        if (quizData.due_date == null) {
          dueDate = "Quiz hasn't been activated";
        } else {
          const dueDateObj = new Date(quizData.due_date);
          const currentDate = new Date();

          const daysInWeek = 7;
          const msInDay = 24 * 60 * 60 * 1000;

          const timeDiff = dueDateObj - currentDate;
          const isToday =
            currentDate.toDateString() === dueDateObj.toDateString();
          const isThisWeek =
            timeDiff < daysInWeek * msInDay && dueDateObj > currentDate;

          const timeOptions = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          };

          if (isToday) {
            const timeStr = dueDateObj.toLocaleString("en-US", timeOptions);
            dueDate = `Today at ${timeStr}`;
          } else if (isThisWeek) {
            const weekdayOptions = {
              weekday: "long",
              ...timeOptions,
            };
            const dayStr = dueDateObj.toLocaleString("en-US", weekdayOptions);
            dueDate = `Due ${dayStr}`;
          } else {
            const fullDateOptions = {
              month: "long",
              day: "numeric",
              year: "numeric",
              ...timeOptions,
            };
            const fullDateStr = dueDateObj.toLocaleString(
              "en-US",
              fullDateOptions
            );
            dueDate = `Due on ${fullDateStr}`;
          }
        }

        document.getElementById("viewQuizId").value = quizId;
        document.getElementById(
          "viewQuizTitle"
        ).textContent = `Quiz ${quizData.quiz_number}: ${quizData.title}`;
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
        document.getElementById("viewQuizDue").textContent = dueDate;
        document.getElementById(
          "studentViewSection"
        ).textContent = `${quizData.grade_level} - ${quizData.section}`;

        const optionButton = document.querySelector(".option-btn");
        optionButton.setAttribute("data-quiz-id", quizId);

        if (quizData.status === "Inactive") {
          optionButton.classList.remove("deactivate-btn");
          optionButton.classList.add("activate-btn");
          optionButton.textContent = "Activate Quiz";
        } else {
          optionButton.classList.remove("activate-btn");
          optionButton.classList.add("deactivate-btn");
          optionButton.textContent = "Deactivate Quiz";
        }

        document.getElementById("viewQuizModal").style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    };

    xhr.send(requestBody);
  }

  document.querySelectorAll(".view-quiz").forEach((viewBtn) => {
    viewBtn.addEventListener("click", function () {
      const quizId = this.getAttribute("data-quiz-id");
      Promise.all([
        fetchPassedStudents(quizId),
        fetchFailedStudents(quizId),
        fetchTotalStudents(quizId),
      ]).then(([passedStudentCount, failedStudentCount, totalStudentCount]) => {
        createDonutCharts(
          totalStudentCount,
          passedStudentCount,
          failedStudentCount
        );
      });

      viewQuizDetails(quizId);
    });
  });

  document.getElementById("closeViewQuiz").onclick = function () {
    if ((viewStudent.style.display = "flex")) {
      viewStudent.style.display = "none";
      quizToggle.classList.add("active");
      studentToggle.classList.remove("active");
    }
    viewQuiz.style.display = "flex";

    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);

    const quizId = document.getElementById("viewQuizId").value;
    searchParams.set("quiz_id", quizId);

    const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`;
    history.replaceState(null, "", newUrl);

    document.getElementById("viewQuizModal").style.display = "none";
    document.body.style.overflow = "auto";
  };

  const quizToggle = document.getElementById("quiz-toggle");
  const studentToggle = document.getElementById("student-toggle");
  const viewQuiz = document.getElementById("view-quiz");
  const viewStudent = document.getElementById("view-student");

  viewQuiz.style.display = "flex";
  viewStudent.style.display = "none";

  quizToggle.addEventListener("click", function () {
    viewQuiz.style.display = "flex";
    viewStudent.style.display = "none";
    quizToggle.classList.add("active");
    studentToggle.classList.remove("active");
  });

  studentToggle.addEventListener("click", function () {
    viewQuiz.style.display = "none";
    viewStudent.style.display = "flex";
    studentToggle.classList.add("active");
    quizToggle.classList.remove("active");
    const quizId = document.getElementById("viewQuizId").value;
    viewStudentDetails(quizId);
  });

  function viewStudentDetails(quizId) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/SCES/backend/fetch-class.php`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    const requestBody = `quiz_id=${encodeURIComponent(
      quizId
    )}&submitType=getStudentScores`;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const studentData = JSON.parse(xhr.responseText);
        const studentContainer = document.querySelector(
          ".student-score-container"
        );
        studentContainer.innerHTML = "";

        if (studentData.length > 1) {
          studentData.forEach((student) => {
            const studentScoreBox = document.createElement("div");
            studentScoreBox.classList.add("student-score-box");

            if (
              student.student_lname === null ||
              student.student_fname === null ||
              student.student_mname === null ||
              student.score === null
            ) {
              studentScoreBox.innerHTML = `
              <div class="box-data">
                <div class="box-part full-name">${
                  student.student_lname || "N/A"
                }, ${student.student_fname || "N/A"} ${
                student.student_mname
                  ? student.student_mname.charAt(0) + "."
                  : ""
              }</div>
              </div>
              <div class="box-data">
                <div class="box-part empty">Assessment Pending for Student</div>
              </div>
              `;
            } else {
              studentScoreBox.innerHTML = `
                <div class="box-data">
                <div class="box-part full-name">${student.student_lname}, ${
                student.student_fname
              } ${student.student_mname.charAt(0)}.</div>
                <div class="box-part score ${
                  student.remarks !== null
                    ? student.remarks
                      ? "good"
                      : "bad"
                    : ""
                }">${student.score}/${student.item_number}</div>
                </div>
                <div class="box-data">
                <div class="box-part remarks ${
                  student.remarks !== null
                    ? student.remarks
                      ? "passed"
                      : "failed"
                    : ""
                }">
                    ${
                      student.remarks !== null
                        ? student.remarks
                          ? "Passed"
                          : "Failed"
                        : "N/A"
                    }
                </div>
                <div class="box-part time">${
                  student.time ? student.time : "N/A"
                }</div>
                </div>
              `;
            }

            studentContainer.appendChild(studentScoreBox);
          });
        } else {
          studentContainer.innerHTML =
            "<p>No students enrolled in subject.</p>";
        }
      }
    };

    xhr.send(requestBody);
  }

  function fetchPassedStudents(quizId) {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `/SCES/backend/fetch-class.php`, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      const requestBody = `quiz_id=${encodeURIComponent(
        quizId
      )}&submitType=getPassedStudents`;

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          const quizData = JSON.parse(xhr.responseText);
          // Access the student count returned by PHP
          const passedStudentCount = quizData.student_count || 0;
          resolve(passedStudentCount); // Resolve the promise with the count
        }
      };

      xhr.send(requestBody);
    });
  }

  function fetchFailedStudents(quizId) {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `/SCES/backend/fetch-class.php`, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      const requestBody = `quiz_id=${encodeURIComponent(
        quizId
      )}&submitType=getFailedStudents`;

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          const quizData = JSON.parse(xhr.responseText);
          // Access the student count returned by PHP
          const failedStudentCount = quizData.student_count || 0;
          resolve(failedStudentCount); // Resolve the promise with the count
        }
      };

      xhr.send(requestBody);
    });
  }

  function fetchTotalStudents(quizId) {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `/SCES/backend/fetch-class.php`, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      const requestBody = `quiz_id=${encodeURIComponent(
        quizId
      )}&submitType=getTotalStudents`;

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          const quizData = JSON.parse(xhr.responseText);
          // Access the student count returned by PHP
          const totalStudentCount = quizData.student_count || 0;
          resolve(totalStudentCount); // Resolve the promise with the count
        }
      };

      xhr.send(requestBody);
    });
  }

  function createDonutCharts(
    totalStudentCount,
    totalPassedCount,
    totalFailedCount
  ) {
    const ctx1 = document.getElementById("donutChart1").getContext("2d");
    const ctx2 = document.getElementById("donutChart2").getContext("2d");

    if (ctx1.chart) ctx1.chart.destroy();
    if (ctx2.chart) ctx2.chart.destroy();

    var completedCount = totalFailedCount + totalPassedCount;
    var passedCount = totalPassedCount;
    var failedCount = totalFailedCount;
    var totalCount = totalStudentCount;

    var chart2Data, chart2BackgroundColor, chart2BorderColor;

    if (passedCount === 0 && failedCount === 0) {
      chart2Data = [passedCount, totalCount];
      chart2BackgroundColor = ["#ffffff", "#ffffff"];
      chart2BorderColor = ["#BBBBBBFF", "#BBBBBBFF"];
    } else {
      chart2Data = [passedCount, failedCount];
      chart2BackgroundColor = ["#42d6a4", "#ff8080"];
      chart2BorderColor = ["#3baf88", "#ea7474"];
    }

    const centerLabelPlugin = {
      id: "centerLabel",
      beforeDraw: function (chart) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const width = chartArea.right - chartArea.left;
        const height = chartArea.bottom - chartArea.top;

        ctx.save();

        ctx.font = "2.5rem sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";

        const number = chart.data.datasets[0].data[0];
        const xCenter = chartArea.left + width / 2;
        const yCenter = chartArea.top + height / 2;

        ctx.fillText(number, xCenter, yCenter);
        ctx.restore();
      },
    };

    Chart.register(centerLabelPlugin);

    ctx1.chart = new Chart(ctx1, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Not Completed"],
        datasets: [
          {
            label: "Students",
            data: [completedCount, totalCount - completedCount],
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
            position: "bottom",
          },
          centerLabel: true,
        },
      },
    });

    ctx2.chart = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels:
          passedCount === 0 && failedCount === 0
            ? ["Total Students"]
            : ["Passed", "Failed"],
        datasets: [
          {
            label: "Students",
            data: chart2Data,
            backgroundColor: chart2BackgroundColor,
            borderColor: chart2BorderColor,
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
            position: "bottom",
          },
          centerLabel: true,
        },
      },
    });
  }

  const enableQuizButtons = document.querySelectorAll(".enable-quiz");
  const dueDateModal = document.getElementById("dueDateModal");
  const dueDateForm = document.getElementById("dueDateForm");
  const closeDueDate = document.getElementById("closeDueDateModal");
  let selectedQuizId = null;

  dueDateForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const dueDate = document.getElementById("dueDate").value;
    const selectedDueDate = new Date(dueDate);
    const currentDateTime = new Date();

    if (!dueDate) {
      Swal.fire({
        icon: "warning",
        title: "Please Select a Due Date",
        confirmButtonColor: "#4CAF50",
      });
      return;
    }

    if (selectedDueDate <= currentDateTime) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Due Date",
        text: "Due date cannot be in the past. Please select a future date and time.",
        confirmButtonColor: "#4CAF50",
      });
      return;
    }

    dueDateModal.style.display = "none";

    enableQuiz(selectedQuizId, dueDate);
  });

  closeDueDate.addEventListener("click", function () {
    dueDateForm.reset();
    dueDateModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", function (event) {
    if (event.target == dueDateModal) {
      dueDateForm.reset();
      dueDateModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  enableQuizButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const quizId = this.getAttribute("data-quiz-id");

      fetch(`/SCES/backend/fetch-class.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `submitType=checkQuestionCount&quiz_id=${quizId}`,
      })
        .then((response) => response.text())
        .then((data) => {
          if (data >= 10) {
            Swal.fire({
              title: "Do You Want To Enable This Quiz?",
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Yes",
              cancelButtonText: "No",
              customClass: {
                confirmButton: "swal2-yes-button",
                cancelButton: "swal2-cancel-button",
              },
            }).then((result) => {
              if (result.isConfirmed) {
                selectedQuizId = quizId;
                dueDateModal.style.display = "flex";
                document.body.style.overflow = "hidden";
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                  title: "Quiz Remains Inactive",
                  icon: "info",
                  confirmButtonText: "Ok",
                  customClass: {
                    confirmButton: "swal2-yes-button",
                  },
                });
              }
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: "Invalid Number Of Questions",
              text: "Number of questions for the quiz must be at least 10",
              confirmButtonColor: "#4CAF50",
            });
          }
        });
    });
  });

  const disableQuizButtons = document.querySelectorAll(".disable-quiz");

  disableQuizButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const quizId = this.getAttribute("data-quiz-id");

      Swal.fire({
        title: "Do You Want To Disable This Quiz?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: {
          confirmButton: "swal2-yes-button",
          cancelButton: "swal2-cancel-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          disableQuiz(quizId);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Quiz Remains Active",
            text: "Students will still be able to take the assessment",
            icon: "info",
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "swal2-confirm-button-cancelled",
            },
          });
        }
      });
    });
  });

  const removeQuestionButtons = document.querySelectorAll(".remove-question");

  removeQuestionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const questionId = this.getAttribute("data-question-id");

      Swal.fire({
        title: "Do you want to remove this question from quiz?",
        text: "This operation is irreversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: {
          confirmButton: "swal2-yes-button",
          cancelButton: "swal2-cancel-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          removeQuestion(questionId);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Question Remains On Quiz",
            icon: "info",
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "swal2-confirm-button-cancelled",
            },
          });
        }
      });
    });
  });

  const quizOptionButton = document.querySelectorAll(".option-btn");

  quizOptionButton.forEach((button) => {
    button.addEventListener("click", function () {
      const quizId = this.getAttribute("data-quiz-id");

      if (button.classList.contains("activate-btn")) {
        fetch(`/SCES/backend/fetch-class.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `submitType=checkQuestionCount&quiz_id=${quizId}`,
        })
          .then((response) => response.text())
          .then((data) => {
            if (data >= 10) {
              Swal.fire({
                title: "Do You Want To Enable This Quiz?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                customClass: {
                  confirmButton: "swal2-yes-button",
                  cancelButton: "swal2-cancel-button",
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  selectedQuizId = quizId;
                  dueDateModal.style.display = "flex";
                  document.body.style.overflow = "hidden";
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal.fire({
                    title: "Quiz Remains Inactive",
                    icon: "info",
                    confirmButtonText: "Ok",
                    customClass: {
                      confirmButton: "swal2-yes-button",
                    },
                  });
                }
              });
            } else {
              Swal.fire({
                icon: "warning",
                title: "Invalid Number Of Questions",
                text: "Number of questions for the quiz must be at least 10",
                confirmButtonColor: "#4CAF50",
              });
            }
          });
      } else if (button.classList.contains("deactivate-btn")) {
        Swal.fire({
          title: "Do You Want To Disable This Quiz?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          customClass: {
            confirmButton: "swal2-yes-button",
            cancelButton: "swal2-cancel-button",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            disableQuiz(quizId);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: "Quiz Remains Active",
              icon: "info",
              confirmButtonText: "Ok",
              customClass: {
                confirmButton: "swal2-confirm-button-cancelled",
              },
            });
          }
        });
      }
    });
  });

  function enableQuiz(quizId, dueDate) {
    fetch(`/SCES/backend/global.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `submitType=enableQuiz&quiz_id=${quizId}&due_date=${dueDate}`,
    })
      .then((response) => response.text())
      .then((data) => {
        switch (data) {
          case "200":
            Swal.fire({
              icon: "success",
              title: "Quiz Activated Successfully",
              text: "Students can now take this assessment",
              confirmButtonColor: "#4CAF50",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = `?active=1&quiz_id=${quizId}`;
              }
            });
            break;
          case "482":
            Swal.fire({
              icon: "warning",
              title: "Invalid Request",
              text: "Quiz is already activated",
              confirmButtonColor: "#4CAF50",
            });
            break;
          default:
            Swal.fire({
              icon: "error",
              title: "Quiz Activation Failed",
              text: "Please try again",
              confirmButtonColor: "#4CAF50",
            });
            break;
        }
      });
  }

  function disableQuiz(quizId) {
    fetch(`/SCES/backend/global.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `submitType=disableQuiz&quiz_id=${quizId}`,
    })
      .then((response) => response.text())
      .then((data) => {
        switch (data) {
          case "200":
            Swal.fire({
              icon: "info",
              title: "Quiz Deactivated",
              text: "Students will now be unable to take the assessment",
              confirmButtonColor: "#4CAF50",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = `?active=2&quiz_id=${quizId}`;
              }
            });
            break;
          case "482":
            Swal.fire({
              icon: "warning",
              title: "Invalid Request",
              text: "Quiz is already deactivated",
              confirmButtonColor: "#4CAF50",
            });
            break;
          default:
            Swal.fire({
              icon: "error",
              title: "Quiz Deactivation Failed",
              text: "Please try again",
              confirmButtonColor: "#4CAF50",
            });
            break;
        }
      });
  }

  function removeQuestion(questionId) {
    fetch(`/SCES/backend/global.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `submitType=removeQuestion&question_id=${questionId}`,
    })
      .then((response) => response.text())
      .then((data) => {
        switch (data) {
          case "200":
            Swal.fire({
              icon: "info",
              title: "Question Removed",
              text: "Tip: Quizzes should have at least 10 question to be activated",
              confirmButtonColor: "#4CAF50",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
            break;
          case "481":
            Swal.fire({
              icon: "warning",
              title: "Invalid Request",
              text: "Choices for question is already deleted",
              confirmButtonColor: "#4CAF50",
            });
            break;
          default:
            Swal.fire({
              icon: "error",
              title: "Question Removal Failed",
              text: "Please try again",
              confirmButtonColor: "#4CAF50",
            });
            break;
        }
      });
  }

  const questionModal = document.getElementById("questionModal");
  const closeQuestionModal = document.getElementById("closeQuestionModal");
  document.querySelectorAll(".view-question").forEach((button) => {
    button.addEventListener("click", function () {
      const questionId = this.getAttribute("data-question-id");
      questionModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      fetchQuestionDetails(questionId);
    });
  });

  closeQuestionModal.addEventListener("click", function () {
    questionModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  function fetchQuestionDetails(questionId) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/SCES/backend/fetch-class.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    const requestBody = `question_id=${encodeURIComponent(
      questionId
    )}&submitType=questionAnalytics`;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const questionData = JSON.parse(xhr.responseText);

        // Display question title
        document.getElementById("questionTitle").innerText =
          questionData.question;
        const choicesContainer = document.getElementById("questionChoices");
        choicesContainer.innerHTML = ""; // Clear previous choices

        // Display choices
        questionData.choices.forEach((choice, index) => {
          const choiceElement = document.createElement("p");
          choiceElement.innerHTML = `${String.fromCharCode(65 + index)}. ${
            choice.text
          }`;
          choiceElement.classList.add("choice-text")
          if(choice.value == 1){
            choiceElement.classList.add("correct-choice")
          }
          choicesContainer.appendChild(choiceElement);
        });

        var correctCount = questionData.analytics.correct;
        var incorrectCount = questionData.analytics.incorrect;
        var totalResponses = parseInt(correctCount) + parseInt(incorrectCount);
        if(parseInt(correctCount) == 0){
          var accuracy = '0%';
        }
        var accuracy =  (parseInt(correctCount) / parseInt(totalResponses)) * 100 + '%';
        
        document.getElementById("totalResponses").innerText = totalResponses;
        document.getElementById("totalCorrect").innerText = correctCount;
        document.getElementById("totalIncorrect").innerText = incorrectCount;
        document.getElementById("accuracy").innerText = accuracy;
        

        renderPieChart(correctCount, incorrectCount);
      }
    };

    xhr.send(requestBody);
  }

  function renderPieChart(correctCount, incorrectCount) {
    const ctx = document.getElementById("analyticsChart").getContext("2d");

    if (window.analyticsChart instanceof Chart) {
      window.analyticsChart.destroy();
    }

    // Create a new chart instance
    window.analyticsChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            label: "Student Answers",
            data: [correctCount, incorrectCount],
            backgroundColor: ["#4caf50", "#f44336"], // Green for correct, red for incorrect
            borderWidth: 2,
            borderColor: ["#000"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
        },
      },
    });
  }
});
