<div id="addQuizModal" class="modal">
    <div class="modal-content" style="max-width: 600px">
        <div class="modal-head">
            <h2>Add New Quiz</h2>
            <span class="close-btn" id="closeAddQuiz">&times;</span>
        </div>
        <form id="addQuiz">
            <label for="quizNumber">Quiz Number:</label>
            <input type="number" id="quizNumber" name="quizNumber" placeholder="Enter Quiz Number">

            <label for="quizTitle">Quiz Title:</label>
            <input type="text" id="quizTitle" name="quizTitle" placeholder="Enter Quiz Title">

            <label for="subject">Subject:</label>
            <?php $selectSubject = $db->getAdminSubjects(); ?>
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
        <div class="modal-head">
            <h2>Add Question</h2>
            <span class="close-btn" id="closeAddQuestion">&times;</span>
        </div>
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
        <div class="modal-head">
            <h2>Edit Question</h2>
            <span class="close-btn" id="closeEditQuestion">&times;</span>
        </div>
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
    <div class="modal-content" style="max-width: 600px">
        <div class="modal-head">
            <h2>Edit Quiz</h2>
            <span id="closeEditQuiz" class="close-btn">&times;</span>
        </div>
        <form id="editQuiz">
            <input type="hidden" id="editQuizId" value="">

            <label for="editQuizTitle">Title:</label>
            <input type="text" id="editQuizTitle" name="editQuizTitle">
            <input type="hidden" id="editQuizTitleHolder" value="">

            <label for="editQuizNumber">Quiz Number:</label>
            <input type="number" id="editQuizNumber" name="quiz_number">
            <input type="hidden" id="editQuizNumberHolder" value="">

            <label for="editSubject">Subject:</label>
            <?php $selectSubject = $db->getAdminSubjects(); ?>
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
                <h2 id="viewQuizTitle"></h2>
            </div>
            <div class="view-part">
                <div class="analytics-tab low-padding">
                    <div class="tab-item sized">
                        <img src="/SCES/assets/images/quiz-subject.png" alt="quiz-subject.png">
                        <div class="item-group">
                            <h4>Subject</h4>
                            <span class="not-bold" id="viewQuizSubject"></span>
                        </div>
                    </div>
                    <div class="tab-item sized">
                        <img src="/SCES/assets/images/quiz-grade-section.png" alt="quiz-grade-section.png">
                        <div class="item-group">
                            <h4>Total Students</h4>
                            <span class="not-bold" id="viewQuizStudents"></span>
                        </div>
                    </div>
                    <div class="tab-item sized">
                        <img src="/SCES/assets/images/quiz-question.png" alt="quiz-question.png">
                        <div class="item-group">
                            <h4>Total Questions</h4>
                            <span class="not-bold" id="viewQuizItem"></span>
                        </div>
                    </div>
                </div>
                <div class="analytics-tab low-padding">
                    <div class="tab-item sized">
                        <img src="/SCES/assets/images/quiz-1.png" alt="quiz-1.png" id="quiz-status">
                        <div class="item-group">
                            <h4>Quiz Status</h4>
                            <span class="not-bold" id="viewQuizStatus"></span>
                        </div>
                    </div>
                    <div class="tab-item sized">
                        <img src="/SCES/assets/images/quiz-due-date.png" alt="quiz-due-date.png">
                        <div class="item-group">
                            <h4>Due Date</h4>
                            <span class="not-bold" id="viewQuizDue"></span>
                        </div>
                    </div>
                    <div class="tab-item sized">
                        <img src="/SCES/assets/images/quiz-rate.png" alt="quiz-rate.png">
                        <div class="item-group">
                            <h4>Average Score</h4>
                            <span class="not-bold" id="viewQuizAve"></span>
                        </div>
                    </div>
                </div>
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
            <div class="button-container">
                <button class="option-btn" style="margin-top: 15px;"></button>
            </div>
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
    <div class="modal-content" style="max-width: 600px">
        <div class="modal-head">
            <h2>Set Due Date for Quiz</h2>
            <span id="closeDueDateModal" class="close-btn">&times;</span>
        </div>
        <form id="dueDateForm">
            <label for="dueDate">Due Date:</label>
            <input type="datetime-local" id="dueDate" name="dueDate">
            <button type="submit" class="save-btn">Set Due Date</button>
        </form>
    </div>
</div>

<div id="questionModal" class="modal">
    <div class="modal-content">
        <div class="modal-head">
            <h2>Analytics</h2>
            <span class="close-btn" id="closeQuestionModal">&times;</span>
        </div>
        <div class="analytics-tab">
            <div class="tab-item">
                <img src="/SCES/assets/images/quiz-grade-section.png" alt="quiz-grade-section.png">
                <div class="item-group">
                    <h3 id="totalResponses"></h3>
                    <span>Total Responses</span>
                </div>
            </div>
            <div class="tab-item">
                <img src="/SCES/assets/images/quiz-passed.png" alt="quiz-passed.png">
                <div class="item-group">
                    <h3 id="totalCorrect"></h3>
                    <span>Total Correct</span>
                </div>
            </div>
            <div class="tab-item">
                <img src="/SCES/assets/images/quiz-failed.png" alt="quiz-failed.png">
                <div class="item-group">
                    <h3 id="totalIncorrect"></h3>
                    <span>Total Incorrect</span>
                </div>
            </div>
            <div class="tab-item">
                <img src="/SCES/assets/images/quiz-rate.png" alt="quiz-rate.png">
                <div class="item-group">
                    <h3 id="accuracy"></h3>
                    <span>Accuracy</span>
                </div>
            </div>
        </div>
        <h4 id="questionTitle"></h4>
        <div id="questionChoices">
            <!-- Choices will be dynamically inserted here -->
        </div>
        <div class="graph-container">
            <div class="graph-full">
                <canvas id="analyticsChart"></canvas>
            </div>
        </div>
    </div>
</div>