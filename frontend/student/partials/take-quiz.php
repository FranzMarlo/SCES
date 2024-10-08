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
            <span><strong>Direction:</strong> Select the correct answer that corresponds to the following questions.</span>
        </div>

        <div class="modal-quiz-content" id="questionsContainer"></div>

        <div class="modal-footer">
            <button id="submit-quiz" class="save-btn">Submit Quiz</button>
        </div>
    </div>
</div>