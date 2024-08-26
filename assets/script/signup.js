document.addEventListener("DOMContentLoaded", function () {
    const gradeLevel = document.getElementById("gradeLevel");
    const section = document.getElementById("section");
  
    const sectionOptions = {
      G0001: [
        { value: "S0001", text: "Narra" },
        { value: "S0002", text: "Acacia" },
      ],
      G0002: [
        { value: "S0003", text: "Mango" },
        { value: "S0004", text: "Pine" },
      ],
      G0003: [
        { value: "S0005", text: "Cedar" },
        { value: "S0006", text: "Maple" },
      ],
      G0004: [
        { value: "S0007", text: "Mahogany" },
        { value: "S0008", text: "Cherry" },
      ],
      G0005: [
        { value: "S0009", text: "Bamboo" },
        { value: "S0010", text: "Oak" },
      ],
      G0006: [
        { value: "S0011", text: "Willow" },
        { value: "S0012", text: "Aspen" },
      ],
    };
  
    gradeLevel.addEventListener("change", function () {
      section.innerHTML =
        '<option value="" disabled selected>Select Section</option>';
  
      const selectedGrade = gradeLevel.value;
      if (selectedGrade && sectionOptions[selectedGrade]) {
        sectionOptions[selectedGrade].forEach((option) => {
          const opt = document.createElement("option");
          opt.value = option.value;
          opt.textContent = option.text;
          section.appendChild(opt);
        });
      }
    });
  });