function filterSubjects() {
  const searchTerm = document
    .getElementById("subjectSearch")
    .value.toLowerCase();
  const subjectItems = document.querySelectorAll(".subject-item");

  let anyVisibleSubject = false;
  let anyVisibleArchived = false;

  // Loop through all subject items and filter by search term
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

    // Check if the item matches the search term
    if (
      subjectName.includes(searchTerm) ||
      subjectYear.includes(searchTerm) ||
      subjectSection.includes(searchTerm) ||
      subjectLevel.includes(searchTerm)
    ) {
      // Show the item if it belongs to either the subject or archived container
      if (subjectItem.closest("#subjectContainer")) {
        subjectItem.style.display = "flex";
        anyVisibleSubject = true;
      } else if (subjectItem.closest("#archivedContainer")) {
        subjectItem.style.display = "flex";
        anyVisibleArchived = true;
      }
    } else {
      subjectItem.style.display = "none"; // Hide if it doesn't match the search term
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
    // Remove the no-data-box if subjects are visible
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
