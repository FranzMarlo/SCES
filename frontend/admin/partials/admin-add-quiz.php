<div id="addQuizModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" id="closeAddQuiz">&times;</span>
        <h2>Add New Quiz</h2>
        <form id="addQuiz">
            <label for="quizNumber">Quiz Number:</label>
            <input type="number" id="quizNumber" name="quizNumber" placeholder="Enter Quiz Number">

            <label for="quizTitle">Quiz Title:</label>
            <input type="text" id="quizTitle" name="quizTitle" placeholder="Enter Quiz Title">

            <label for="subject">Subject:</label>
            <?php $selectSubject = $db->getAdminSubjects($teacherId); ?>
            <select id="subject" name="subject">
                <option value="" selected>Select Subject</option>
                <?php if ($selectSubject): ?>
                    <?php foreach ($selectSubject as $facultySubject): ?>
                        <option value="<?php echo $facultySubject['subject_id']; ?>"
                            data-level-id="<?php echo $facultySubject['level_id']; ?>"
                            data-section-id="<?php echo $facultySubject['section_id']; ?>">
                            <?php echo $facultySubject['subject'] . ' - ' . $facultySubject['section']; ?>
                        </option>
                    <?php endforeach; ?>
                <?php endif; ?>
            </select>

            <label for="lesson">Lesson:</label>
            <select id="lesson" name="lesson">
                <option value="" selected>Select Subject First</option>
            </select>
            <button type="submit" class="save-btn">Add Quiz</button>
        </form>
    </div>
</div>

<div id="addQuestionModal" class="modal">
    <div class="modal-content padded">
        <span class="close-btn" id="closeAddQuestion">&times;</span>
        <h2>Add Question</h2>
        <form id="addQuestion">
            <input type="hidden" id="quizId" name="quizId" value="" />

            <label for="question">Question:</label>
            <textarea class="long-input" rows="5" id="question" name="question" placeholder="Enter Question"></textarea>

            <label for="choice1">Choice 1:</label>
            <input type="text" id="choice1" name="choice1" placeholder="Enter Choice 1" />

            <label for="choice2">Choice 2:</label>
            <input type="text" id="choice2" name="choice2" placeholder="Enter Choice 2" />

            <label for="choice3">Choice 3:</label>
            <input type="text" id="choice3" name="choice3" placeholder="Enter Choice 3" />

            <label for="choice4">Choice 4:</label>
            <input type="text" id="choice4" name="choice4" placeholder="Enter Choice 4" />

            <label for="correctAnswer">Correct Answer:</label>
            <select id="correctAnswer" name="correctAnswer">
                <option value="" selected>Select Correct Answer</option>
                <option value="choice1">Choice 1</option>
                <option value="choice2">Choice 2</option>
                <option value="choice3">Choice 3</option>
                <option value="choice4">Choice 4</option>
            </select>

            <button type="submit" class="save-btn">Add Question</button>
        </form>
    </div>
</div>

<div id="editQuestionModal" class="modal">
    <div class="modal-content padded">
        <span class="close-btn" id="closeEditQuestion">&times;</span>
        <h2>Edit Question</h2>

        <form id="editQuestion">
            <input type="hidden" id="editQuestionId" name="question_id" />
            <label for="editQuestionText">Question:</label>
            <textarea id="editQuestionText" name="question_text" class="long-input" rows="5"></textarea>

            <div id="editChoicesContainer">
                <label for="choice1_update">Choice 1:</label>
                <input type="hidden" id="choice1_id" name="choice_ids[]" />
                <input type="text" id="choice1_update" name="choice1_update" placeholder="Enter Answer Choice" />
                <input type="hidden" id="choice1_value" />

                <label for="choice2_update">Choice 2:</label>
                <input type="hidden" id="choice2_id" name="choice_ids[]" />
                <input type="text" id="choice2_update" name="choice2_update" placeholder="Enter Answer Choice" />
                <input type="hidden" id="choice2_value" />

                <label for="choice3_update">Choice 3:</label>
                <input type="hidden" id="choice3_id" name="choice_ids[]" />
                <input type="text" id="choice3_update" name="choice3_update" placeholder="Enter Answer Choice" />
                <input type="hidden" id="choice3_value" />

                <label for="choice4_update">Choice 4:</label>
                <input type="hidden" id="choice4_id" name="choice_ids[]" />
                <input type="text" id="choice4_update" name="choice4_update" placeholder="Enter Answer Choice" />
                <input type="hidden" id="choice4_value" />

                <input type="hidden" id="correct_value" />
                <label for="correctChoice">Select Correct Answer:</label>
                <select id="correctChoice" name="correctChoice">
                    <option value="">Select Correct Answer</option>
                    <option value="choice1">Choice 1</option>
                    <option value="choice2">Choice 2</option>
                    <option value="choice3">Choice 3</option>
                    <option value="choice4">Choice 4</option>
                </select>
            </div>

            <button type="submit" class="save-btn">Save Changes</button>
        </form>
    </div>
</div>

<div id="editQuizModal" class="modal">
    <div class="modal-content">
        <span id="closeEditQuiz" class="close-btn">&times;</span>
        <h2>Edit Quiz</h2>
        <form id="editQuiz">
            <input type="hidden" id="editQuizId" value="">

            <label for="editQuizTitle">Title:</label>
            <input type="text" id="editQuizTitle" name="editQuizTitle">
            <input type="hidden" id="editQuizTitleHolder" value="">

            <label for="editQuizNumber">Quiz Number:</label>
            <input type="number" id="editQuizNumber" name="quiz_number">
            <input type="hidden" id="editQuizNumberHolder" value="">

            <label for="editSubject">Subject:</label>
            <?php $selectSubject = $db->getAdminSubjects($teacherId); ?>
            <select id="editSubject" name="editSubject">
                <option value="">Select Subject</option>
                <?php if ($selectSubject): ?>
                    <?php foreach ($selectSubject as $editSubject): ?>
                        <option value="<?php echo $editSubject['subject_id']; ?>"
                            data-level-id="<?php echo $editSubject['level_id']; ?>"
                            data-section-id="<?php echo $editSubject['section_id']; ?>">
                            <?php echo $editSubject['subject'] . ' - ' . $editSubject['section']; ?>
                        </option>
                    <?php endforeach; ?>
                <?php endif; ?>
            </select>
            <input type="hidden" id="editSubjectHolder" value="">

            <label for="editLesson">Lesson:</label>
            <select id="editLesson" name="editLesson">
                <option value="">Select Subject First</option>
            </select>
            <input type="hidden" id="editLessonHolder" value="">

            <button type="submit" class="save-btn">Save Changes</button>
        </form>
    </div>
</div>

<div id="viewQuizModal" class="modal">
    <div class="modal-content stretched">
        <div class="view-controller">
            <button class="controller active" id="quiz-toggle">Quiz Details</button>
            <button class="controller" id="student-toggle">Student List</button>
            <span id="closeViewQuiz" class="close-btn">&times;</span>
        </div>
        <div class="view-container" id="view-quiz">
            <input type="hidden" id="viewQuizId">
            <div class="view-modal-row">
                <h3 id="viewQuizTitle"></h3>
            </div>
            <div class="view-modal-row">
                <i class="fa-solid fa-book"></i>
                <span id="viewQuizSubject"></span>
            </div>
            <div class="view-modal-row">
                <i class="fa-solid fa-graduation-cap"></i>
                <span id="viewQuizStudents"></span>
            </div>
            <div class="view-modal-row">
                <i class="fa-solid fa-list-ol"></i>
                <span id="viewQuizItem"></span>
            </div>
            <div class="view-modal-row">
                <i class="fa-solid fa-square-check"></i>
                <span id="viewQuizStatus"></span>
            </div>
            <div class="view-modal-row">
                <i class="fa-solid fa-clock"></i>
                <span id="viewQuizDue"></span>
            </div>
            <div class="graph-container">
                <div class="graph">
                    <p>Students Completed</p>
                    <canvas id="donutChart1"></canvas>
                </div>
                <div class="graph">
                    <p>Students Passed</p>
                    <canvas id="donutChart2"></canvas>
                </div>
            </div>
            <br>
            <button class="option-btn" style="margin-top: 15px;"></button>
        </div>
        <div class="view-container" id="view-student">
            <div class="view-modal-row">
                <h3 id="studentViewSection"></h3>
            </div>
            <div class="student-score-container">

            </div>
        </div>
    </div>
</div>

<div id="dueDateModal" class="modal">
    <div class="modal-content">
        <span id="closeDueDateModal" class="close-btn">&times;</span>
        <h2>Set Due Date for Quiz</h2>
        <form id="dueDateForm">
            <label for="dueDate">Due Date:</label>
            <input type="datetime-local" id="dueDate" name="dueDate">
            <button type="submit" class="save-btn">Set Due Date</button>
        </form>
    </div>
</div>