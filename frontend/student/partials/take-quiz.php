<div id="quizModal" class="modal">
    <div class="modal-content">
        <div class="modal-head">
            <div class="student-info">
                <span><strong><?php echo htmlspecialchars($studentFname . ' ' . $middleInitial . ' ' . $studentLname); ?></strong></span>
                <span><?php echo htmlspecialchars($gradeLevel . ' - ' . $section); ?></span>
            </div>
            <span id="closeQuizModal" class="close-btn">&times;</span>
        </div>

        <div class="modal-quiz-header">
            <div class="modal-header-bg">
                <div class="modal-icon-container">
                    <img src="/SCES/assets/images/quiz-1.png" alt="quiz-icon">
                </div>
            </div>
            <div class="modal-header-text">
                <img src="/SCES/assets/images/quiz-1.png" alt="quiz-icon">
                <h1></h1>
            </div>
        </div>
        <div class="modal-direction">
            <span><strong>Direction:</strong> Select the correct answer that corresponds to the following
                questions.</span>
        </div>

        <div class="modal-quiz-content" id="questionsContainer"></div>

        <div class="modal-footer">
            <button id="submit-quiz" class="save-btn">Submit Quiz</button>
        </div>
    </div>
</div>

<div id="viewQuizModal" class="modal">
    <div class="modal-content">
        <div class="modal-head">
            <div class="student-info">
                <span><strong><?php echo htmlspecialchars($studentFname . ' ' . $middleInitial . ' ' . $studentLname); ?></strong></span>
                <span><?php echo htmlspecialchars($gradeLevel . ' - ' . $section); ?></span>
            </div>
            <span id="closeViewQuizModal" class="close-btn">&times;</span>
        </div>

        <div class="modal-quiz-header">
            <div class="modal-header-bg">
                <div class="modal-icon-container">
                    <img src="/SCES/assets/images/quiz-1.png" alt="quiz-icon">
                </div>
            </div>
            <div class="modal-header-text">
                <img src="/SCES/assets/images/quiz-1.png" alt="quiz-icon">
                <h1></h1>
            </div>
        </div>
        <div class="modal-direction">
            <span><strong>Direction:</strong>The green marked option is the correct answer, while the answers that are
                marked red. A question with a selection of subject theme color and without a green option indicates that
                you
                got the correct answer. Hence, a question with a theme color option with a green option indicates that
                you got the wrong answer.</span>
        </div>

        <div class="modal-quiz-content" id="viewQuestionsContainer"></div>

        <div class="modal-footer">
            <button id="close-quiz" class="save-btn">Close Window</button>
        </div>
    </div>
</div>