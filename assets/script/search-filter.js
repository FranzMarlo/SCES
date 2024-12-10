function filterSubjects() {
  const searchTerm = document
    .getElementById("subjectSearch")
    .value.toLowerCase();
  const selectedYear = document
    .getElementById("yearFilterDropdown")
    .value.toLowerCase();
  const subjectItems = document.querySelectorAll(".subject-item");

  let anyVisibleSubject = false;
  let anyVisibleArchived = false;

  // Loop through all subject items and filter by search term and year
  subjectItems.forEach(function (subjectItem) {
    const subjectName = subjectItem
      .getAttribute("data-subject-name")
      .toLowerCase();
    const subjectYear = subjectItem
      .getAttribute("data-subject-year")
      .toLowerCase();
    const subjectSection = subjectItem
      .getAttribute("data-subject-section")
      .toLowerCase();
    const subjectLevel = subjectItem
      .getAttribute("data-subject-level")
      .toLowerCase();

    // Check if the item matches the search term and the selected year
    const matchesSearchTerm =
      subjectName.includes(searchTerm) ||
      subjectSection.includes(searchTerm) ||
      subjectLevel.includes(searchTerm);

    const matchesYear = selectedYear === "all" || subjectYear === selectedYear;

    if (matchesSearchTerm && matchesYear) {
      // Show the item if it belongs to either the subject or archived container
      if (subjectItem.closest("#subjectContainer")) {
        subjectItem.style.display = "flex";
        anyVisibleSubject = true;
      } else if (subjectItem.closest("#archivedContainer")) {
        subjectItem.style.display = "flex";
        anyVisibleArchived = true;
      }
    } else {
      subjectItem.style.display = "none"; // Hide if it doesn't match the criteria
    }
  });

  // Manage "No subject found" message for subjectContainer
  let noDataBoxSubject = document
    .getElementById("subjectContainer")
    .querySelector(".no-data-box");
  if (!anyVisibleSubject) {
    if (!noDataBoxSubject) {
      noDataBoxSubject = document.createElement("div");
      noDataBoxSubject.classList.add("no-data-box");
      noDataBoxSubject.innerHTML = `
                <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                <h1>No subject found.</h1>
            `;
      document
        .getElementById("subjectContainer")
        .classList.add("no-data-box-centered");
      document.getElementById("subjectContainer").appendChild(noDataBoxSubject);
    }
  } else if (noDataBoxSubject) {
    document
      .getElementById("subjectContainer")
      .classList.remove("no-data-box-centered");
    document.getElementById("subjectContainer").removeChild(noDataBoxSubject);
  }

  // Manage "No subject found" message for archivedContainer
  let noDataBoxArchived = document
    .getElementById("archivedContainer")
    .querySelector(".no-data-box");
  if (!anyVisibleArchived) {
    if (!noDataBoxArchived) {
      noDataBoxArchived = document.createElement("div");
      noDataBoxArchived.classList.add("no-data-box");
      noDataBoxArchived.innerHTML = `
                <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                <h1>No archived subject found.</h1>
            `;
      document
        .getElementById("archivedContainer")
        .classList.add("no-data-box-centered");
      document
        .getElementById("archivedContainer")
        .appendChild(noDataBoxArchived);
    }
  } else if (noDataBoxArchived) {
    document
      .getElementById("archivedContainer")
      .classList.remove("no-data-box-centered");
    document.getElementById("archivedContainer").removeChild(noDataBoxArchived);
  }
}

function filterSections() {
  const searchTerm = document
    .getElementById("sectionSearch")
    .value.toLowerCase();
  const yearFilter = document
    .getElementById("yearSectionFilter")
    .value.toLowerCase(); // Get selected year from the dropdown
  const sectionItems = document.querySelectorAll(".section-item");

  let anyVisibleSection = false;
  let anyVisibleArchived = false;

  // Loop through all section items and filter by search term and selected year
  sectionItems.forEach(function (sectionItem) {
    const adviserName = sectionItem
      .getAttribute("data-section-adviser")
      .toLowerCase();
    const sectionYear = sectionItem
      .getAttribute("data-section-year")
      .toLowerCase();
    const sectionSection = sectionItem
      .getAttribute("data-section-section")
      .toLowerCase();
    const sectionLevel = sectionItem
      .getAttribute("data-section-level")
      .toLowerCase();

    // Check if the item matches both the search term and selected year
    if (
      (adviserName.includes(searchTerm) ||
        sectionYear.includes(searchTerm) ||
        sectionSection.includes(searchTerm) ||
        sectionLevel.includes(searchTerm)) &&
      (yearFilter === "all" || sectionYear === yearFilter)
    ) {
      // Show the item if it belongs to either the section or archived container
      if (sectionItem.closest("#sectionContainer")) {
        sectionItem.style.display = "flex";
        anyVisibleSection = true;
      } else if (sectionItem.closest("#archivedContainer")) {
        sectionItem.style.display = "flex";
        anyVisibleArchived = true;
      }
    } else {
      sectionItem.style.display = "none"; // Hide if it doesn't match the search term or selected year
    }
  });

  // Manage "No section found" message for sectionContainer
  let noDataBoxSection = document
    .getElementById("sectionContainer")
    .querySelector(".no-data-box");
  if (!anyVisibleSection) {
    if (!noDataBoxSection) {
      noDataBoxSection = document.createElement("div");
      noDataBoxSection.classList.add("no-data-box");
      noDataBoxSection.innerHTML = `
                  <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                  <h1>No section found.</h1>
              `;
      document
        .getElementById("sectionContainer")
        .classList.add("no-data-box-centered");
      document.getElementById("sectionContainer").appendChild(noDataBoxSection);
    }
  } else if (noDataBoxSection) {
    // Remove the no-data-box if sections are visible
    document
      .getElementById("sectionContainer")
      .classList.remove("no-data-box-centered");
    document.getElementById("sectionContainer").removeChild(noDataBoxSection);
  }

  // Manage "No section found" message for archivedContainer
  let noDataBoxArchived = document
    .getElementById("archivedContainer")
    .querySelector(".no-data-box");
  if (!anyVisibleArchived) {
    if (!noDataBoxArchived) {
      noDataBoxArchived = document.createElement("div");
      noDataBoxArchived.classList.add("no-data-box");
      noDataBoxArchived.innerHTML = `
                  <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                  <h1>No archived section found.</h1>
              `;
      document
        .getElementById("archivedContainer")
        .classList.add("no-data-box-centered");
      document
        .getElementById("archivedContainer")
        .appendChild(noDataBoxArchived);
    }
  } else if (noDataBoxArchived) {
    document
      .getElementById("archivedContainer")
      .classList.remove("no-data-box-centered");
    document.getElementById("archivedContainer").removeChild(noDataBoxArchived);
  }
}

function facultyFilterSections() {
  const searchTerm = document
    .getElementById("sectionSearch")
    .value.toLowerCase();
  const yearFilter = document
    .getElementById("yearSectionFilter")
    .value.toLowerCase(); // Get the selected year from the dropdown
  const sectionItems = document.querySelectorAll(".section-item");

  let anyVisibleSection = false;
  let anyVisibleArchived = false;

  // Loop through all section items and filter by search term and selected year
  sectionItems.forEach(function (sectionItem) {
    const sectionYear = sectionItem
      .getAttribute("data-section-year")
      .toLowerCase();
    const sectionSection = sectionItem
      .getAttribute("data-section-section")
      .toLowerCase();
    const sectionLevel = sectionItem
      .getAttribute("data-section-level")
      .toLowerCase();

    // Check if the item matches both the search term and the selected year
    if (
      (sectionYear.includes(searchTerm) ||
        sectionSection.includes(searchTerm) ||
        sectionLevel.includes(searchTerm)) &&
      (yearFilter === "all" || sectionYear === yearFilter)
    ) {
      // Show the item if it belongs to either the section or archived container
      if (sectionItem.closest("#sectionContainer")) {
        sectionItem.style.display = "flex";
        anyVisibleSection = true;
      } else if (sectionItem.closest("#archivedContainer")) {
        sectionItem.style.display = "flex";
        anyVisibleArchived = true;
      }
    } else {
      sectionItem.style.display = "none"; // Hide if it doesn't match the search term or selected year
    }
  });

  // Manage "No section found" message for sectionContainer
  let noDataBoxSection = document
    .getElementById("sectionContainer")
    .querySelector(".no-data-box");
  if (!anyVisibleSection) {
    if (!noDataBoxSection) {
      noDataBoxSection = document.createElement("div");
      noDataBoxSection.classList.add("no-data-box");
      noDataBoxSection.innerHTML = `
                <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                <h1>No section found.</h1>
            `;
      document
        .getElementById("sectionContainer")
        .classList.add("no-data-box-centered");
      document.getElementById("sectionContainer").appendChild(noDataBoxSection);
    }
  } else if (noDataBoxSection) {
    // Remove the no-data-box if sections are visible
    document
      .getElementById("sectionContainer")
      .classList.remove("no-data-box-centered");
    document.getElementById("sectionContainer").removeChild(noDataBoxSection);
  }

  // Manage "No section found" message for archivedContainer
  let noDataBoxArchived = document
    .getElementById("archivedContainer")
    .querySelector(".no-data-box");
  if (!anyVisibleArchived) {
    if (!noDataBoxArchived) {
      noDataBoxArchived = document.createElement("div");
      noDataBoxArchived.classList.add("no-data-box");
      noDataBoxArchived.innerHTML = `
                <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                <h1>No archived section found.</h1>
            `;
      document
        .getElementById("archivedContainer")
        .classList.add("no-data-box-centered");
      document
        .getElementById("archivedContainer")
        .appendChild(noDataBoxArchived);
    }
  } else if (noDataBoxArchived) {
    document
      .getElementById("archivedContainer")
      .classList.remove("no-data-box-centered");
    document.getElementById("archivedContainer").removeChild(noDataBoxArchived);
  }
}

