document.addEventListener("DOMContentLoaded", function () {
    const sectionTab = document.getElementById("sectionTab");
    const archivedTab = document.getElementById("archivedTab");
    const sectionContainer = document.getElementById("sectionContainer");
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
        sectionTab.classList.add("active");
        archivedTab.classList.remove("active");
        sectionContainer.style.display = "flex";
        archivedContainer.style.display = "none";
      } else {
        archivedTab.classList.add("active");
        sectionTab.classList.remove("active");
        archivedContainer.style.display = "flex";
        sectionContainer.style.display = "none";
      }
    }
  
    // Event listeners for tab clicks
    sectionTab.addEventListener("click", () => {
      sectionTab.classList.add("active");
      archivedTab.classList.remove("active");
      sectionContainer.style.display = "flex";
      archivedContainer.style.display = "none";
      updateURL("1");
    });
  
    archivedTab.addEventListener("click", () => {
      archivedTab.classList.add("active");
      sectionTab.classList.remove("active");
      archivedContainer.style.display = "flex";
      sectionContainer.style.display = "none";
      updateURL("2");
    });
  
    // Initialize on page load
    setActiveTab();
  
    const addSectionBtn = document.getElementById("addSectionBtn");
    const addSectionModal = document.getElementById("addSectionModal");
    const addSectionForm = document.getElementById("addSectionForm");
    const closeAddSectionModal = document.getElementById("closeAddSectionModal");
    const editSectionModal = document.getElementById("editSectionModal");
    const editSectionForm = document.getElementById("editSectionForm");
    const closeEditSectionModal = document.getElementById(
      "closeEditSectionModal"
    );
  
    addSectionBtn.addEventListener("click", function () {
      addSectionModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  
    closeAddSectionModal.addEventListener("click", function () {
      addSectionForm.reset();
      addSectionModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  
    window.addEventListener("click", function (event) {
      if (event.target == addSectionModal) {
        addSectionForm.reset();
        addSectionModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  
    document.querySelectorAll(".edit-btn").forEach((editLink) => {
      editLink.addEventListener("click", function () {
        const sectionId = this.getAttribute("data-section-id");
        openPopupSection.classList.remove("show");
        editSectionModal.style.display = "flex";
        document.body.style.overflow = "hidden";
  
        fetch("/SCES/backend/fetch-class.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `submitType=fetchSectionDetails&section_id=${sectionId}`,
        })
          .then((response) => response.json())
          .then((data) => {
              document.getElementById("editSectionIdHolder").value =
                data.section_id;
              document.getElementById("editSectionHolder").value = data.section;
              document.getElementById("editLevelIdHolder").value = data.level_id;
              document.getElementById("editTeacherIdHolder").value =
                data.teacher_id;
              document.getElementById("editGradeLevel").value = data.level_id;
              document.getElementById("editSection").value = data.section;
              if(data.teacher_id == null){
                document.getElementById("editTeacher").value = '';
              }
              else{
              document.getElementById("editTeacher").value = data.teacher_id;
              }
          }).catch((error) => console.error("Error fetching section data:", error));
      });
    });
  
    closeEditSectionModal.addEventListener("click", function () {
      editSectionForm.reset();
      editSectionModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  
    window.addEventListener("click", function (event) {
      if (event.target == editSectionModal) {
        editSectionForm.reset();
        editSectionModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  
    document.querySelectorAll(".archive-btn").forEach((editLink) => {
      editLink.addEventListener("click", function () {
        const sectionId = this.getAttribute("data-section-id");
        openPopupSection.classList.remove("show");
        Swal.fire({
          title: "Do you want to archive this section?",
          text: "Archived section won't be visible to instructors",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          confirmButtonColor: "#4caf50",
          cancelButtonColor: "#f44336",
        }).then((result) => {
          if (result.isConfirmed) {
            archiveSection(sectionId);
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
        const sectionId = this.getAttribute("data-section-id");
        openPopupSection.classList.remove("show");
        Swal.fire({
          title: "Do you want to re-enable this section?",
          text: "Archived sections are not visible to instructors",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          confirmButtonColor: "#4caf50",
          cancelButtonColor: "#f44336",
        }).then((result) => {
          if (result.isConfirmed) {
            toggleArchivedSection(sectionId);
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
    function archiveSection(sectionId) {
      fetch("/SCES/backend/global.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `submitType=archiveSection&section_id=${sectionId}`,
      })
        .then((response) => response.text())
        .then((data) => {
          switch (data) {
            case "200":
              Swal.fire({
                icon: "info",
                title: "Section Archived",
                text: "Teachers will not be able to access the section",
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
                text: "Section is already archived",
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
        .catch((error) => console.error("Error fetching section data:", error));
    }
    function toggleArchivedSection(sectionId) {
      fetch("/SCES/backend/global.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `submitType=toggleArchivedSection&section_id=${sectionId}`,
      })
        .then((response) => response.text())
        .then((data) => {
          switch (data) {
            case "200":
              Swal.fire({
                icon: "info",
                title: "Section Removed From Archived",
                text: "Teachers and Students will now be able to access the section",
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
                text: "Section is already removed from archived",
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
        .catch((error) => console.error("Error fetching section data:", error));
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
  