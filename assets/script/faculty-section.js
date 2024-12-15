document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("yearSectionFilter")
    .addEventListener("change", facultyFilterSections);

  const sectionTab = document.getElementById("sectionTab");
  const archivedTab = document.getElementById("archivedTab");
  const sectionContainer = document.getElementById("sectionContainer");
  const archivedContainer = document.getElementById("archivedContainer");

  // Function to update URL parameter
  function updateURL(activeTab) {
    const url = new URL(window.location);
    url.searchParams.set("active", activeTab);
    window.history.pushState({ activeTab }, "", url);
  }

  // Function to set the active tab and container based on the active parameter
  function setActiveTab(active) {
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
    setActiveTab("1");
    updateURL("1");
  });

  archivedTab.addEventListener("click", () => {
    setActiveTab("2");
    updateURL("2");
  });

  // Initialize on page load
  window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const active = urlParams.get("active") || "1";
    setActiveTab(active);
  });

  // Handle back/forward navigation with popstate event
  window.addEventListener("popstate", (event) => {
    const activeTab = event.state?.activeTab || "1";
    setActiveTab(activeTab);
  });

  document
    .getElementById("sectionContainer")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("archive-btn")) {
        const sectionId = e.target.getAttribute("data-section-id");
        openPopupMenu.classList.remove("show");
        Swal.fire({
          title: "Do you want to archive this section?",
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
      }
    });

  document
    .getElementById("archivedContainer")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("not-archive-btn")) {
        const sectionId = e.target.getAttribute("data-section-id");
        openPopupMenu.classList.remove("show");
        Swal.fire({
          title: "Do you want to re-enable this section?",
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
      }
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
                updateSectionList();
                updateArchiveList();
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
                updateSectionList();
                updateArchiveList();
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

  function updateSectionList() {
    const searchInput = document.getElementById("sectionSearch");
    const searchTerm = searchInput.value.toLowerCase();
    const selectFilter = document.getElementById("yearSectionFilter");
    const yearValue = selectFilter.value;

    fetch("/SCES/backend/global.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "submitType=facultyRefreshSection",
    })
      .then((response) => response.text())
      .then((html) => {
        // Update the subject container with refreshed data
        const sectionContainer = document.getElementById("sectionContainer");
        sectionContainer.innerHTML = html;

        // Reapply the search filter
        if (searchTerm.trim() !== "") {
          facultyFilterSections();
        }
        if (yearValue !== "All") {
          facultyFilterSections();
        }
        updateSectionNoDataBox();
        updateArchivedNoDataBox();
      })
      .catch((error) => console.error("Error updating section list:", error));
  }

  function updateArchiveList() {
    // Retain the current search term
    const searchInput = document.getElementById("sectionSearch");
    const searchTerm = searchInput.value.toLowerCase();
    const selectFilter = document.getElementById("yearSectionFilter");
    const yearValue = selectFilter.value;

    // Fetch updated subjects
    fetch("/SCES/backend/global.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "submitType=facultyRefreshArchivedSection",
    })
      .then((response) => response.text())
      .then((html) => {
        const sectionContainer = document.getElementById("archivedContainer");
        sectionContainer.innerHTML = html;
        if (searchTerm.trim() !== "") {
          facultyFilterSections();
        }
        if (yearValue !== "All") {
          facultyFilterSections();
        }
        updateSectionNoDataBox();
        updateArchivedNoDataBox();
      })
      .catch((error) => console.error("Error updating subject list:", error));
  }
  function updateSectionNoDataBox() {
    const sectionContainer = document.getElementById("sectionContainer");
    const sectionItems = sectionContainer.querySelectorAll(".section-item");

    if (sectionItems.length === 0) {
      sectionContainer.classList.add("no-data-box-centered");
    } else {
      sectionContainer.classList.remove("no-data-box-centered");
    }
  }

  function updateArchivedNoDataBox() {
    const sectionContainer = document.getElementById("archivedContainer");
    const sectionItems = sectionContainer.querySelectorAll(".section-item");

    if (sectionItems.length === 0) {
      sectionContainer.classList.add("no-data-box-centered");
    } else {
      sectionContainer.classList.remove("no-data-box-centered");
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
