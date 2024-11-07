document.addEventListener("DOMContentLoaded", function () {
  const subjectTab = document.getElementById("subjectTab");
  const archivedTab = document.getElementById("archivedTab");
  const subjectContainer = document.getElementById("subjectContainer");
  const archivedContainer = document.getElementById("archivedContainer");

  // Function to update URL parameter
  function updateURL(activeTab) {
    const url = new URL(window.location);
    url.searchParams.set("active", activeTab);
    window.history.pushState({}, "", url);
  }

  // Function to set the active tab and container based on the active parameter
  function setActiveTab() {
    const urlParams = new URLSearchParams(window.location.search);
    const active = urlParams.get("active") || "1";

    // Set the initial active tab and container
    if (active === "1") {
      subjectTab.classList.add("active");
      archivedTab.classList.remove("active");
      subjectContainer.style.display = "flex";
      archivedContainer.style.display = "none";
    } else {
      archivedTab.classList.add("active");
      subjectTab.classList.remove("active");
      archivedContainer.style.display = "flex";
      subjectContainer.style.display = "none";
    }
  }

  // Event listeners for tab clicks
  subjectTab.addEventListener("click", () => {
    subjectTab.classList.add("active");
    archivedTab.classList.remove("active");
    subjectContainer.style.display = "flex";
    archivedContainer.style.display = "none";
    updateURL("1");
  });

  archivedTab.addEventListener("click", () => {
    archivedTab.classList.add("active");
    subjectTab.classList.remove("active");
    archivedContainer.style.display = "flex";
    subjectContainer.style.display = "none";
    updateURL("2");
  });

  // Initialize on page load
  setActiveTab();

  window.addEventListener("load", () => {
    document.getElementById("subjectSearch").value = "";
  });
  
  const addSubjectBtn = document.getElementById("addSubjectBtn");
  const addSubjectModal = document.getElementById("addSubjectModal");
  const addSubjectForm = document.getElementById("addSubjectForm");
  const closeAddSubjectModal = document.getElementById("closeAddSubjectModal");
  const editSubjectModal = document.getElementById("editSubjectModal");
  const editSubjectForm = document.getElementById("editSubjectForm");
  const closeEditSubjectModal = document.getElementById(
    "closeEditSubjectModal"
  );

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
          fetchOptions(data.level_id, "editSubject", "getSubjects", "Subject");
          fetchOptions(data.level_id, "editSection", "getSections", "Section");

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

  function fetchOptions(levelId, targetElementId, submitType, value) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/SCES/backend/fetch-class.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const targetDropdown = document.getElementById(targetElementId);

        targetDropdown.innerHTML =
          `<option value="">Select ${value}</option>` + xhr.responseText;
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
        fetchOptions(gradeLevelId, "editSubject", "getSubjects", "Subject");
        fetchOptions(gradeLevelId, "editSection", "getSections", "Section");
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
        fetchOptions(gradeLevelId, "addSubject", "getSubjects", "Subject");
        fetchOptions(gradeLevelId, "addSection", "getSections", "Section");
      }
    });

  document.querySelectorAll(".archive-btn").forEach((editLink) => {
    editLink.addEventListener("click", function () {
      const subjectId = this.getAttribute("data-subject-id");
      openPopupMenu.classList.remove("show");
      Swal.fire({
        title: "Do you want to archive this subject?",
        text: "Archived subjects won't be visible to instructors and students",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#4caf50",
        cancelButtonColor: "#f44336",
      }).then((result) => {
        if (result.isConfirmed) {
          archiveSubject(subjectId);
        } else {
          Swal.fire({
            title: "Operation Cancelled",
            icon: "info",
            confirmButtonText: "Ok",
            confirmButtonColor: "#4caf50",
          });
        }
      });
    });
  });

  document.querySelectorAll(".not-archive-btn").forEach((editLink) => {
    editLink.addEventListener("click", function () {
      const subjectId = this.getAttribute("data-subject-id");
      openPopupMenu.classList.remove("show");
      Swal.fire({
        title: "Do you want to re-enable this subject?",
        text: "Archived subjects are not visible to instructors and students",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#4caf50",
        cancelButtonColor: "#f44336",
      }).then((result) => {
        if (result.isConfirmed) {
          toggleArchivedSubject(subjectId);
        } else {
          Swal.fire({
            title: "Operation Cancelled",
            icon: "info",
            confirmButtonText: "Ok",
            confirmButtonColor: "#4caf50",
          });
        }
      });
    });
  });
  function archiveSubject(subjectId) {
    fetch("/SCES/backend/global.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `submitType=archiveSubject&subject_id=${subjectId}`,
    })
      .then((response) => response.text())
      .then((data) => {
        switch (data) {
          case "200":
            Swal.fire({
              icon: "info",
              title: "Subject Archived",
              text: "Teachers and Students will not be able to access the subject",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
            break;
          case "482":
            Swal.fire({
              icon: "warning",
              title: "Invalid Request",
              text: "Subject is already archived",
              confirmButtonColor: "#4CAF50",
            });
            break;
          default:
            Swal.fire({
              icon: "error",
              title: "Operation Failed",
              text: "Please try again",
              confirmButtonColor: "#4CAF50",
            });
            break;
        }
      })
      .catch((error) => console.error("Error fetching subject data:", error));
  }
  function toggleArchivedSubject(subjectId) {
    fetch("/SCES/backend/global.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `submitType=toggleArchivedSubject&subject_id=${subjectId}`,
    })
      .then((response) => response.text())
      .then((data) => {
        switch (data) {
          case "200":
            Swal.fire({
              icon: "info",
              title: "Subject Removed From Archived",
              text: "Teachers and Students will now be able to access the subject",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
            break;
          case "482":
            Swal.fire({
              icon: "warning",
              title: "Invalid Request",
              text: "Subject is already removed from archived",
              confirmButtonColor: "#4CAF50",
            });
            break;
          default:
            Swal.fire({
              icon: "error",
              title: "Operation Failed",
              text: "Please try again",
              confirmButtonColor: "#4CAF50",
            });
            break;
        }
      })
      .catch((error) => console.error("Error fetching subject data:", error));
  }
});

function showAlert(icon, title, message) {
  Swal.fire({
    icon: icon,
    title: title,
    text: message,
    confirmButtonColor: "#4CAF50",
  });
}
