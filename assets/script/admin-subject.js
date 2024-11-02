document.addEventListener("DOMContentLoaded", function () {
  const addSubjectBtn = document.getElementById("addSubjectBtn");
  const addSubjectModal = document.getElementById("addSubjectModal");
  const addSubjectForm = document.getElementById("addSubjectForm");
  const closeAddSubjectModal = document.getElementById("closeAddSubjectModal");

  addSubjectBtn.addEventListener("click", function () {
    addSubjectModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  closeAddSubjectModal.addEventListener("click", function () {
    addSubjectForm.reset();
    addSubjectModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", function (event) {
    if (event.target == addSubjectModal) {
      addSubjectForm.reset();
      addSubjectModal.style.display = "none";
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
