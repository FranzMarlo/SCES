<div id="addQuizModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" id="closeAddQuiz">&times;</span>
        <h2>Add New Quiz</h2>
        <form id="facultyAddQuiz">
            <label for="quizNumber">Quiz Number</label>
            <input type="number" id="quizNumber" name="quizNumber" placeholder="Enter Quiz Number">

            <label for="quizTitle">Quiz Title</label>
            <input type="text" id="quizTitle" name="quizTitle" placeholder="Enter Quiz Title">

            <label for="subject">Subject</label>
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

            <label for="lesson">Lesson</label>
            <select id="lesson" name="lesson">
                <option value="" selected>Select Subject First</option>
            </select>
            <button type="submit" class="save-btn">Add Quiz</button>
        </form>
    </div>
</div>

<div id="addQuestionModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" id="closeAddQuestion">&times;</span>
        <h2>Add Question</h2>
        <form id="facultyAddQuestion">
            <input type="hidden" id="quizId" name="quizId" value="" />

            <label for="question">Question:</label>
            <input type="text" id="question" name="question" placeholder="Enter Question" />

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
