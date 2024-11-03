document.addEventListener("DOMContentLoaded", function () {
  const addSubjectBtn = document.getElementById("addSubjectBtn");
  const addSubjectModal = document.getElementById("addSubjectModal");
  const addSubjectForm = document.getElementById("addSubjectForm");
  const closeAddSubjectModal = document.getElementById("closeAddSubjectModal");
  const editSubjectModal = document.getElementById("editSubjectModal");
  const editSubjectForm = document.getElementById("editSubjectForm");
  const closeEditSubjectModal = document.getElementById(
    "closeEditSubjectModal"
  );
  var popupMenu = document.querySelectorAll(".popup-menu");

  addSubjectBtn.addEventListener("click", function () {
    addSubjectModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  closeAddSubjectModal.addEventListener("click", function () {
    addSubjectForm.reset();
    document.getElementById("addSubject").innerHTML =
      '<option value="" selected>Select Grade Level First</option>';
    document.getElementById("addSection").innerHTML =
      '<option value="" selected>Select Grade Level First</option>';
    addSubjectModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", function (event) {
    if (event.target == addSubjectModal) {
      addSubjectForm.reset();
      document.getElementById("addSubject").innerHTML =
        '<option value="" selected>Select Grade Level First</option>';
      document.getElementById("addSection").innerHTML =
        '<option value="" selected>Select Grade Level First</option>';
      addSubjectModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  document.querySelectorAll(".edit-btn").forEach((editLink) => {
    editLink.addEventListener("click", function () {
      const subjectId = this.getAttribute("data-subject-id");
      openPopupMenu.classList.remove("show");
      editSubjectModal.style.display = "flex";
      document.body.style.overflow = "hidden";

      fetch("/SCES/backend/fetch-class.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `submitType=fetchSubjectDetails&subject_id=${subjectId}`,
      })
        .then((response) => response.json())
        .then((data) => {
          // Fetch options and set values after they are populated
          fetchOptions(data.level_id, "editSubject", "getSubjects");
          fetchOptions(data.level_id, "editSection", "getSections");

          // Wait for dropdowns to be populated before setting values
          setTimeout(() => {
            document.getElementById("editSubjectIdHolder").value =
              data.subject_id;
            document.getElementById("editSubjectHolder").value = data.subject;
            document.getElementById("editLevelIdHolder").value = data.level_id;
            document.getElementById("editSectionIdHolder").value =
              data.section_id;
            document.getElementById("editTeacherIdHolder").value =
              data.teacher_id;
            document.getElementById("editGradeLevel").value = data.level_id;
            document.getElementById("editSubject").value = data.subject;
            document.getElementById("editSection").value = data.section_id;
            document.getElementById("editTeacher").value = data.teacher_id;
          }, 50);
        })
        .catch((error) => console.error("Error fetching subject data:", error));
    });
  });

  closeEditSubjectModal.addEventListener("click", function () {
    editSubjectForm.reset();
    editSubjectModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", function (event) {
    if (event.target == editSubjectModal) {
      editSubjectForm.reset();
      editSubjectModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  function fetchOptions(levelId, targetElementId, submitType) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/SCES/backend/fetch-class.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const targetDropdown = document.getElementById(targetElementId);
        targetDropdown.innerHTML = xhr.responseText;
      }
    };

    xhr.send(`levelId=${levelId}&submitType=${submitType}`);
  }

  document
    .getElementById("editGradeLevel")
    .addEventListener("change", function () {
      const gradeLevelId = this.value;

      if (!gradeLevelId) {
        // Reset the Subject and Section dropdowns to default
        document.getElementById("editSubject").innerHTML =
          '<option value="" selected>Select Grade Level First</option>';
        document.getElementById("editSection").innerHTML =
          '<option value="" selected>Select Grade Level First</option>';
      } else {
        // Fetch options based on selected grade level
        fetchOptions(gradeLevelId, "editSubject", "getSubjects");
        fetchOptions(gradeLevelId, "editSection", "getSections");
      }
    });

  document
    .getElementById("addGradeLevel")
    .addEventListener("change", function () {
      const gradeLevelId = this.value;

      if (!gradeLevelId) {
        // Reset the Subject and Section dropdowns to default
        document.getElementById("addSubject").innerHTML =
          '<option value="" selected>Select Grade Level First</option>';
        document.getElementById("addSection").innerHTML =
          '<option value="" selected>Select Grade Level First</option>';
      } else {
        // Fetch options based on selected grade level
        fetchOptions(gradeLevelId, "addSubject", "getSubjects");
        fetchOptions(gradeLevelId, "addSection", "getSections");
      }
    });
});
