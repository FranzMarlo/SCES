<div id="quizModal" class="modal">
    <div class="modal-content">
        <div class="modal-head">
            <span id="closeQuizModal" class="close-btn">&times;</span>
        </div>
        <div class="modal-quiz-header">
            <div class="modal-header-bg <?php echo strtolower($quiz['subject_code']); ?>">
                <div class="modal-icon-container">
                    <img src="/SCES/assets/images/<?php echo htmlspecialchars($quiz['icon']); ?>"
                        alt="<?php echo htmlspecialchars($quiz['icon']); ?>">
                </div>
            </div>
            <div class="modal-header-text">
                <img src="/SCES/assets/images/quiz-1.png" alt="quiz-1.png">
                <h1>Quiz
                    <?php echo htmlspecialchars($quiz['quiz_number']) . ' - ' . htmlspecialchars($quiz['title']); ?>
                </h1>
            </div>
        </div>
        <div class="quiz-item">
            <div class="question-box">
                <span>What's Up?</span>
            </div>
            <div class="quiz-ans">
                <p>Hatdog</p>
            </div>
            <div class="quiz-ans">
                <p>Hatdog</p>
            </div>
            <div class="quiz-ans">
                <p>Hatdog</p>
            </div>
            <div class="quiz-ans">
                <p>Hatdog</p>
            </div>
        </div>
        <div class="quiz-item">
            <div class="question-box">
                <span>What's Up?</span>
            </div>
            <div class="quiz-ans">
                <p>Hatdog</p>
            </div>
            <div class="quiz-ans">
                <p>Hatdog</p>
            </div>
            <div class="quiz-ans">
                <p>Hatdog</p>
            </div>
            <div class="quiz-ans">
                <p>Hatdog</p>
            </div>
        </div>
        <div class="quiz-item">
            <div class="question-box">
                <span>What's Up?</span>
            </div>
            <div class="quiz-ans">
                <p>Hatdog</p>
            </div>
            <div class="quiz-ans">
                <p>Hatdog</p>
            </div>
            <div class="quiz-ans">
                <p>Hatdog</p>
            </div>
            <div class="quiz-ans">
                <p>Hatdog</p>
            </div>
        </div>
        <div class="modal-footer">
            <button id="submit-quiz" class="save-btn">Submit Quiz</button>
        </div>
    </div>
</div>