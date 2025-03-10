document.addEventListener("DOMContentLoaded", function () {
  document
  .getElementById("yearFilterDropdown")
  .addEventListener("change", filterSubjects);
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
    document
    .getElementById("subjectContainer")
    .addEventListener("click", function (e) {
      // Check if the clicked element is the archive button
      if (e.target.classList.contains("archive-btn")) {
        const subjectId = e.target.getAttribute("data-subject-id");
        openPopupMenu?.classList.remove("show"); // Close the popup menu
        Swal.fire({
          title: "Do you want to archive this subject?",
          text: "Archived subjects won't be visible to students",
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
      }
    });
    document
    .getElementById("archivedContainer")
    .addEventListener("click", function (e) {
      
      if (e.target.classList.contains("not-archive-btn")) {
        const subjectId = e.target.getAttribute("data-subject-id");
        openPopupMenu.classList.remove("show");
        Swal.fire({
          title: "Do you want to re-enable this subject?",
          text: "Archived subjects are not visible to students",
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
      }
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
                text: "Students will not be able to access the subject",
                confirmButtonColor: "#4CAF50",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  updateSubjectList();
                  updateArchiveList();
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
                text: "Students will now be able to access the subject",
                confirmButtonColor: "#4CAF50",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  updateSubjectList();
                  updateArchiveList();
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
    function updateSubjectList() {
      // Retain the current search term
      const searchInput = document.getElementById("subjectSearch");
      const searchTerm = searchInput.value.toLowerCase();
      const selectFilter = document.getElementById("yearFilterDropdown");
      const yearValue = selectFilter.value;

      // Fetch updated subjects
      fetch("/SCES/backend/global.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "submitType=facultyRefreshSubject",
      })
        .then((response) => response.text())
        .then((html) => {
          const subjectContainer = document.getElementById("subjectContainer");
          subjectContainer.innerHTML = html;
  
          // Reapply the search filter
          if (searchTerm.trim() !== "") {
            filterSubjects();
          }
          if (yearValue !== 'All'){
            filterSubjects();
          }
          updateSubjectNoDataBox();
          updateArchivedNoDataBox();
        })
        .catch((error) => console.error("Error updating subject list:", error));
    }
    
    function updateArchiveList() {
      // Retain the current search term
      const searchInput = document.getElementById("subjectSearch");
      const searchTerm = searchInput.value.toLowerCase();
      const selectFilter = document.getElementById("yearFilterDropdown");
      const yearValue = selectFilter.value;
      // Fetch updated subjects
      fetch("/SCES/backend/global.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "submitType=facultyRefreshArchived",
      })
        .then((response) => response.text())
        .then((html) => {
          const subjectContainer = document.getElementById("archivedContainer");
          subjectContainer.innerHTML = html;
  
          // Reapply the search filter
          if (searchTerm.trim() !== "") {
            filterSubjects();
          }
          if (yearValue !== 'All'){
            filterSubjects();
          }
          updateSubjectNoDataBox();
          updateArchivedNoDataBox();
        })
        .catch((error) => console.error("Error updating subject list:", error));
    }
    function updateSubjectNoDataBox() {
      const subjectContainer = document.getElementById("subjectContainer");
      const subjectItems = subjectContainer.querySelectorAll(".subject-item");

      if (subjectItems.length === 0) {
        subjectContainer.classList.add("no-data-box-centered");
    } else {
        subjectContainer.classList.remove("no-data-box-centered");
    }
    }

    function updateArchivedNoDataBox() {
      const subjectContainer = document.getElementById("archivedContainer");
      const subjectItems = subjectContainer.querySelectorAll(".subject-item");

      if (subjectItems.length === 0) {
          subjectContainer.classList.add("no-data-box-centered");
      } else {
          subjectContainer.classList.remove("no-data-box-centered");
      }
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
  