<div id="addSectionModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Add Section</h2>
            <span class="close-btn" id="closeAddSectionModal">&times;</span>
        </div>
        <div class="modal-body">
            <form id="addSectionForm">
                <div class="form-group">
                    <label for="addSection">Section Name:</label>
                    <input type="text" id="addSection" name="addSection" placeholder="Enter Section Name">
                </div>
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
                    <?php $teacherOptions = $db->subjectTeacherOptions(); ?>
                    <label for="addTeacher">Select Adviser For Section:</label>
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
                    <button type="submit" class="save-btn">Add Section</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div id="editSectionModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Edit Section</h2>
            <span class="close-btn" id="closeEditSectionModal">&times;</span>
        </div>
        <div class="modal-body">
            <form id="editSectionForm">
                <input type="hidden" name="editSectionIdHolder" id="editSectionIdHolder">
                <input type="hidden" name="editSectionHolder" id="editSectionHolder">
                <input type="hidden" name="editLevelIdHolder" id="editLevelIdHolder">
                <input type="hidden" name="editTeacherIdHolder" id="editTeacherIdHolder">
                <div class="form-group">
                    <label for="editSection">Section Name:</label>
                    <input type="text" id="editSection" name="editSection" placeholder="Enter Section Name">
                </div>
                <div class="form-group">
                    <label for="editGradeLevel">Select Grade Level:</label>
                    <select name="editGradeLevel" id="editGradeLevel">
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
                    <?php $teacherOptions = $db->subjectTeacherOptions(); ?>
                    <label for="editTeacher">Select Adviser For Section:</label>
                    <select name="editTeacher" id="editTeacher">
                        <option value="" selected>Select Teacher</option>
                        <?php foreach ($teacherOptions as $option): ?>
                            <option value="<?php echo $option['teacher_id']; ?>">
                                <?php echo ($option['gender'] == 'Female' ? 'Ms. ' : 'Mr. ') . $option['full_name']; ?>
                            </option>

                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit" class="save-btn">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
</div>