document.addEventListener("DOMContentLoaded", function () {
    const gradeLevel = document.getElementById("gradeLevel");
    const section = document.getElementById("section");
  
    const sectionOptions = {
      G0001: [
        { value: "G1-001", text: "Narra" },
        { value: "G1-001", text: "Acacia" },
      ],
      G0002: [
        { value: "G1-001", text: "Mango" },
        { value: "G1-001", text: "Pine" },
      ],
      G0003: [
        { value: "G1-001", text: "Cedar" },
        { value: "G1-001", text: "Maple" },
      ],
      G0004: [
        { value: "G1-001", text: "Mahogany" },
        { value: "G1-001", text: "Cherry" },
      ],
      G0005: [
        { value: "G1-001", text: "Bamboo" },
        { value: "G1-001", text: "Oak" },
      ],
      G0006: [
        { value: "G1-001", text: "Willow" },
        { value: "G1-001", text: "Aspen" },
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