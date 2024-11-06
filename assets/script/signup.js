document.addEventListener("DOMContentLoaded", function () {
    const gradeLevel = document.getElementById("gradeLevel");
  
    gradeLevel.addEventListener("change", function () {
      const gradeLevelId = this.value;

      if (!gradeLevelId) {
        // Reset the Subject and Section dropdowns to default
        document.getElementById("editSubject").innerHTML =
          '<option value="" selected>Select Grade Level First</option>';
        document.getElementById("editSection").innerHTML =
          '<option value="" selected>Select Grade Level First</option>';
      } else {
        // Fetch options based on selected grade level
        fetchOptions(gradeLevelId, "section", "getSections", 'Section');
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
  });