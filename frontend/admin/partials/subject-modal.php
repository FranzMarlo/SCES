<div id="addSubjectModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Add Subject</h2>
            <span class="close-btn" id="closeAddSubjectModal">&times;</span>
        </div>
        <div class="modal-body">
            <form id="addSubjectForm">
                <div class="form-group">
                    <label for="addGradeLevel">Select Grade Level:</label>
                    <select name="addGradeLevel" id="addGradeLevel">
                        <option value="" selected>Select Grade Level</option>
                        <option value="G0001">Grade 1</option>
                        <option value="G0002">Grade 2</option>
                        <option value="G0003">Grade 3</option>
                        <option value="G0004">Grade 4</option>
                        <option value="G0005">Grade 5</option>
                        <option value="G0006">Grade 6</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="addSubject">Select Subject:</label>
                    <select name="addSubject" id="addSubject">
                        <option value="" selected>Select Grade Level First</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="addSection">Select Section:</label>
                    <select name="addSection" id="addSection">
                        <option value="" selected>Select Grade Level First</option>
                    </select>
                </div>
                <div class="form-group">
                    <?php $teacherOptions = $db->subjectTeacherOptions(); ?>
                    <label for="addTeacher">Select Teacher For Subject:</label>
                    <select name="addTeacher" id="addTeacher">
                        <option value="" selected>Select Teacher</option>
                        <?php foreach ($teacherOptions as $option): ?>
                            <option value="<?php echo $option['teacher_id']; ?>">
                                <?php echo ($option['gender'] == 'Female' ? 'Ms. ' : 'Mr. ') . $option['full_name']; ?>
                            </option>

                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit" class="save-btn">Add Lesson</button>
                </div>
            </form>
        </div>
    </div>
</div>