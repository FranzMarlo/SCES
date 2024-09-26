document.addEventListener("DOMContentLoaded", function () {
  var addLessonModal = document.getElementById("addLessonModal");
  var addLessonBtn = document.getElementById("addLesson");
  var closeBtn = document.querySelector(".close-btn");
  var addLessonForm = document.getElementById("adminAddLesson");

  addLessonBtn.onclick = function () {
    addLessonModal.style.display = "flex";
  };
  closeBtn.onclick = function () {
    addLessonModal.style.display = "none";
    resetModal();
  };
  window.onclick = function (event) {
    if (event.target == addLessonModal) {
      addLessonModal.style.display = "none";
      resetModal();
    }
  };
  document.getElementById("lessonFile").addEventListener("change", function () {
    var fileName = this.files[0] ? this.files[0].name : "No file chosen";
    document.getElementById("fileName").textContent = fileName;
  });
  function resetModal() {
    addLessonForm.reset();
    var fileInput = document.getElementById("lessonFile");
    fileInput.value = "";
  }
});
