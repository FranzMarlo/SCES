<div id="addLessonModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h2>Add Lesson</h2>
      <span class="close-btn" id="closeLessonModal">&times;</span>
    </div>
    <div class="modal-body">
      <form id="facultyAddLesson">
        <div class="form-group">
          <label for="lessonNumber">Lesson Number:</label>
          <input type="number" id="lessonNumber" name="lessonNumber" placeholder="Enter Lesson Number">
        </div>
        <div class="form-group">
          <label for="lessonTitle">Lesson Title:</label>
          <input type="text" id="lessonTitle" name="lessonTitle" placeholder="Enter Lesson Title">
        </div>
        <div class="form-group">
          <label for="quarter">Quarter:</label>
            <select name="quarter" id="quarter">
              <option value="Not Set" selected>Select Quarter</option>
              <option value="1st">1st Quarter</option>
              <option value="2nd">2nd Quarter</option>
              <option value="3rd">3rd Quarter</option>
              <option value="4th">4th Quarter</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="lessonFile" class="custom-file-label" id="pdfLabel">Upload PDF</label>
          <input type="file" id="lessonFile" name="lessonFile" accept=".pdf" placeholder="">
        </div>
        <span id="fileName"></span>
        <div class="form-group">
          <button type="submit" class="save-btn">Add Lesson</button>
        </div>
      </form>
    </div>
  </div>
</div>