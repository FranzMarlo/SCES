<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-head.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/admin-quizzes.css" />
<script src="/SCES/assets/script/faculty-quiz.js"></script>
<title>Quizzes | SCES Online Learning Platform</title>
</head>

<body>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-popup.php';
    ?>
    <div class="container">
        <?php
        include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-sidebar.php';
        ?>
        <div class="content">
            <?php
            include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-header.php';
            ?>
            <div class="quiz-panel">
                <?php $quizzes = $db->facultyGetQuizzes($teacherId); ?>
                <div class="title-box">
                    <div class="text-box">
                        <img src="/SCES/assets/images/graduation-cap.png" alt="graduation-cap.png">
                        <h1>Quizzes</h1>
                    </div>
                    <div class="quiz-dropdown">
                        <div class="quiz-btn">
                            <i class="fa-solid fa-ellipsis-vertical icon"></i>
                        </div>
                        <div class="quiz-dropdown-content">
                            <div class="quiz-dropdown-title">
                                <img src="/SCES/assets/images/pending-quiz.png" alt="pending-quiz.png">
                                <h1>Pending Quiz</h1>
                            </div>
                            <button id="addQuizBtn">
                                <img src="/SCES/assets/images/add-quiz-icon.png" alt="add-quiz-icon.png">
                                Add Quiz
                            </button>
                            <?php if ($quizzes): ?>
                                <?php foreach ($quizzes as $quiz): ?>
                                    <?php if ($quiz['status'] == 'Active'): ?>
                                        <button class="<?php echo strtolower($quiz['subject_code']); ?>">
                                            <span><?php echo htmlspecialchars($quiz['title']); ?></span>
                                        </button>
                                    <?php endif; ?>
                                <?php endforeach; ?>

                            <?php else: ?>
                                <div class="no-data-item">
                                    <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                                    <h1>No Quiz Added.</h1>
                                    <h1>Add A Quiz By Clicking The Button Above.</h1>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
                <div class="quiz-container">
                    <div class="pending-container">
                        <div class="pending-title">
                            <img src="/SCES/assets/images/pending-quiz.png" alt="pending-quiz.png">
                            <h1>Pending Quiz</h1>
                        </div>
                        <div class="pending-item" id="addQuizItem">
                            <img src="/SCES/assets/images/add-quiz-icon.png" alt="add-quiz-icon.png">
                            <span>Add Quiz</span>
                        </div>

                        <?php if ($quizzes): ?>
                            <?php foreach ($quizzes as $quiz): ?>
                                <?php if ($quiz['status'] == 'Active'): ?>
                                    <div class="pending-item <?php echo strtolower($quiz['subject_code']); ?>">
                                        <span><?php echo htmlspecialchars($quiz['subject'])?> - Quiz <?php echo htmlspecialchars($quiz['quiz_number'])?></span>
                                    </div>
                                <?php endif; ?>
                            <?php endforeach; ?>

                        <?php else: ?>
                            <div class="no-data-item">
                                <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                                <h1>No Quiz Added.</h1>
                                <h1>Add A Quiz By Clicking The Button Above.</h1>
                            </div>
                        <?php endif; ?>
                    </div>

                    <div class="header-container">
                        <?php if ($quizzes): ?>
                            <?php foreach ($quizzes as $quiz): ?>
                                <div class="quiz-header">
                                    <div class="header-bg <?php echo strtolower($quiz['subject_code']); ?>">
                                        <div class="icon-container">
                                            <img src="/SCES/assets/images/<?php echo htmlspecialchars($quiz['icon']); ?>"
                                                alt="<?php echo htmlspecialchars($quiz['icon']); ?>">
                                        </div>
                                    </div>
                                    <div class="header-text">
                                        <img src="/SCES/assets/images/quiz-1.png" alt="quiz-1.png">
                                        <h1>Quiz <?php echo htmlspecialchars($quiz['quiz_number']) . ' - ' .htmlspecialchars($quiz['title']); ?></h1>
                                    </div>
                                </div>

                                <div class="quiz-item">
                                    <?php if (!empty($quiz['questions'])): ?>
                                        <?php foreach ($quiz['questions'] as $index => $question): ?>
                                            <div class="question-box">
                                                <span><?php echo ($index + 1) . '. ' . htmlspecialchars($question['question_text']); ?></span>
                                            </div>
                                            <div class="quiz-ans">
                                                <p>A. <?php echo htmlspecialchars($question['choice_a']); ?></p>
                                            </div>
                                            <div class="quiz-ans">
                                                <p>B. <?php echo htmlspecialchars($question['choice_b']); ?></p>
                                            </div>
                                            <div class="quiz-ans">
                                                <p>C. <?php echo htmlspecialchars($question['choice_c']); ?></p>
                                            </div>
                                            <div class="quiz-ans">
                                                <p>D. <?php echo htmlspecialchars($question['choice_d']); ?></p>
                                            </div>
                                        <?php endforeach; ?>
                                    <?php else: ?>
                                        <div class="question-box">
                                            <span>No questions available for this quiz.</span>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <div class="no-quiz-header">
                                <img src="/SCES/assets/images/info-icon.png" alt="info-icon.png">
                                <h1>Please Add A Quiz First</h1>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-add-quiz.php';
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-footer.php';
    ?>