<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/admin-quizzes.css" />
<script src="/SCES/assets/script/faculty-quiz.js"></script>
<title>Quizzes | SCES Online Learning Platform</title>
</head>

<body>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-popup.php';
    ?>
    <div class="container">
        <?php
        include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-sidebar.php';
        ?>
        <div class="content">
            <?php
            include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-header.php';
            ?>
            <div class="quiz-panel">
                <?php $activeQuizzes = $db->adminGetQuizzes('Active'); ?>
                <?php $inactiveQuizzes = $db->adminGetQuizzes('Inactive'); ?>
                <?php $completedQuizzes = $db->adminGetQuizzes('Completed'); ?>
                <div class="title-box">
                    <div class="text-box">
                        <img src="/SCES/assets/images/graduation-cap.png" alt="graduation-cap.png">
                        <h1>Quizzes</h1>
                    </div>
                    <div class="quiz-dropdown" id="activeDropdown">
                        <div class="quiz-btn">
                            <i class="fa-solid fa-ellipsis-vertical icon"></i>
                        </div>
                        <div class="quiz-dropdown-content">
                            <div class="quiz-dropdown-title">
                                <img src="/SCES/assets/images/status-active.png" alt="status-active.png">
                                <h1>Active Quizzes</h1>
                            </div>
                            <button class="addQuizBtn">
                                <img src="/SCES/assets/images/add-quiz-icon.png" alt="add-quiz-icon.png">
                                <span>Add Quiz</span>
                            </button>
                            <?php if ($activeQuizzes): ?>
                                <?php foreach ($activeQuizzes as $index => $quiz): ?>
                                    <div class="pending <?php echo strtolower($quiz['subject_code']); ?>"
                                        data-quiz-index="<?php echo $index; ?>"
                                        data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                        <span><?php echo htmlspecialchars($quiz['subject']) ?> - Quiz
                                            <?php echo htmlspecialchars($quiz['quiz_number']) ?></span>
                                        <button class="quiz-option"
                                            data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <div class="quiz-dropdown-popup-menu">
                                            <ul>
                                                <li class="view-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">View Info
                                                </li>
                                                <li class="disable-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">Disable
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <div class="no-data-item">
                                    <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                                    <h1>No active quiz found</h1>
                                    <h1>Add a quiz by clicking the button above</h1>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>

                    <div class="quiz-dropdown" id="inactiveDropdown">
                        <div class="quiz-btn">
                            <i class="fa-solid fa-ellipsis-vertical icon"></i>
                        </div>
                        <div class="quiz-dropdown-content">
                            <div class="quiz-dropdown-title">
                                <img src="/SCES/assets/images/status-inactive.png" alt="status-inactive.png">
                                <h1>Inactive Quizzes</h1>
                            </div>
                            <button class="addQuizBtn">
                                <img src="/SCES/assets/images/add-quiz-icon.png" alt="add-quiz-icon.png">
                                <span>Add Quiz</span>
                            </button>
                            <?php if ($inactiveQuizzes): ?>
                                <?php foreach ($inactiveQuizzes as $index => $quiz): ?>
                                    <div class="pending <?php echo strtolower($quiz['subject_code']); ?>"
                                        data-quiz-index="<?php echo $index; ?>"
                                        data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                        <span><?php echo htmlspecialchars($quiz['subject']) ?> - Quiz
                                            <?php echo htmlspecialchars($quiz['quiz_number']) ?></span>
                                        <button class="quiz-option"
                                            data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <div class="quiz-dropdown-popup-menu">
                                            <ul>
                                                <li class="edit-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">Edit</li>
                                                <li class="view-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">View Info
                                                </li>
                                                <li class="enable-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">Enable
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <div class="no-data-item">
                                    <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                                    <h1>No quiz added</h1>
                                    <h1>Add a quiz by clicking the button above</h1>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>

                    <div class="quiz-dropdown" id="completedDropdown">
                        <div class="quiz-btn">
                            <i class="fa-solid fa-ellipsis-vertical icon"></i>
                        </div>
                        <div class="quiz-dropdown-content">
                            <div class="quiz-dropdown-title">
                                <img src="/SCES/assets/images/quiz-past.png" alt="quiz-past.png">
                                <h1>Completed Quizzes</h1>
                            </div>
                            <button class="addQuizBtn">
                                <img src="/SCES/assets/images/add-quiz-icon.png" alt="add-quiz-icon.png">
                                <span>Add Quiz</span>
                            </button>
                            <?php if ($completedQuizzes): ?>
                                <?php foreach ($completedQuizzes as $index => $quiz): ?>
                                    <div class="pending <?php echo strtolower($quiz['subject_code']); ?>"
                                        data-quiz-index="<?php echo $index; ?>"
                                        data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                        <span><?php echo htmlspecialchars($quiz['subject']) ?> - Quiz
                                            <?php echo htmlspecialchars($quiz['quiz_number']) ?></span>
                                        <button class="quiz-option"
                                            data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <div class="quiz-dropdown-popup-menu">
                                            <ul>
                                                <li class="edit-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">Edit</li>
                                                <li class="view-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">View Info
                                                </li>
                                                <li class="enable-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">Enable
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <div class="no-data-item">
                                    <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                                    <h1>No completed quiz found</h1>
                                    <h1>Add a quiz by clicking the button above</h1>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>

                </div>

                <div class="quiz-container">
                    <div class="tab-controller">
                        <div class="tab" id="activeTab">Active Quizzes</div>
                        <div class="tab" id="inactiveTab">Inactive Quizzes</div>
                        <div class="tab" id="completedTab">Completed Quizzes</div>
                    </div>
                    <div class="sub-container" id="activeContainer">
                        <div class="pending-container">
                            <div class="pending-title">
                                <img src="/SCES/assets/images/status-active.png" alt="pending-quiz.png">
                                <h1>Active Quizzes</h1>
                            </div>
                            <div class="add-pending-item" id="activeAddQuizItem">
                                <img src="/SCES/assets/images/add-quiz-icon.png" alt="add-quiz-icon.png">
                                <span>Add Quiz</span>
                            </div>

                            <?php if ($activeQuizzes): ?>
                                <?php foreach ($activeQuizzes as $index => $quiz): ?>
                                    <div class="pending-item <?php echo strtolower($quiz['subject_code']); ?>"
                                        data-quiz-index="<?php echo $index; ?>"
                                        data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                        <span><?php echo htmlspecialchars($quiz['subject']) ?> - Quiz
                                            <?php echo htmlspecialchars($quiz['quiz_number']) ?></span>
                                        <button class="quiz-settings"
                                            data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <div class="quiz-popup-menu">
                                            <ul>
                                                <li class="view-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">View Info
                                                </li>
                                                <li class="disable-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">Disable
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <div class="no-data-item">
                                    <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                                    <h1>No Activated Quiz.</h1>
                                    <h1>Add A Quiz By Clicking The Button Above.</h1>
                                </div>
                            <?php endif; ?>
                        </div>

                        <div class="header-container">
                            <?php if ($activeQuizzes): ?>
                                <?php foreach ($activeQuizzes as $index => $quiz): ?>
                                    <div class="quiz-header" data-quiz-index="<?php echo $index; ?>"
                                        data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                        <div class="header-bg <?php echo strtolower($quiz['subject_code']); ?>">
                                            <div class="icon-container">
                                                <img src="/SCES/assets/images/<?php echo htmlspecialchars($quiz['icon']); ?>"
                                                    alt="<?php echo htmlspecialchars($quiz['icon']); ?>">
                                            </div>
                                        </div>
                                        <div class="header-text">
                                            <img src="/SCES/assets/images/quiz-1.png" alt="quiz-1.png">
                                            <h1>Quiz
                                                <?php echo htmlspecialchars($quiz['quiz_number']) . ' - ' . htmlspecialchars($quiz['title']); ?>
                                            </h1>
                                        </div>
                                    </div>

                                    <?php $facultyGetQuestions = $db->getQuestions($quiz['quiz_id']); ?>
                                    <div class="quiz-questions">
                                        <?php if (!empty($facultyGetQuestions)): ?>
                                            <?php foreach ($facultyGetQuestions as $qIndex => $question): ?>
                                                <div class="quiz-item" data-quiz-index="<?php echo $index; ?>"
                                                    data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                                    <button class="question-menu">
                                                        <i class="fa-solid fa-ellipsis"></i>
                                                    </button>
                                                    <div class="question-popup-menu">
                                                        <ul>
                                                            <li class="view-question"
                                                                data-question-id="<?php echo $question['question_id']; ?>">Analytics
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="question-box">
                                                        <span><?php echo ($qIndex + 1) . '. ' . htmlspecialchars($question['question']); ?></span>
                                                    </div>
                                                    <?php $facultyGetChoices = $db->getChoices($question['question_id'], $question['quiz_id']); ?>
                                                    <?php foreach ($facultyGetChoices as $ansIndex => $answer): ?>
                                                        <div class="quiz-ans <?php echo $answer['value'] == 1 ? 'correct' : ($answer['value'] == 0 ? 'wrong' : ''); ?>"
                                                            data-choice-id="<?php echo $answer['choice_id']; ?>">
                                                            <p><?php echo chr(65 + $ansIndex) . '. ' . htmlspecialchars($answer['choice']); ?>
                                                            </p>
                                                        </div>
                                                    <?php endforeach; ?>
                                                </div>
                                            <?php endforeach; ?>
                                        <?php else: ?>

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

                    <div class="sub-container" id="inactiveContainer">
                        <div class="pending-container">
                            <div class="pending-title">
                                <img src="/SCES/assets/images/status-inactive.png" alt="pending-quiz.png">
                                <h1>Inactive Quizzes</h1>
                            </div>
                            <div class="add-pending-item" id="addQuizItem">
                                <img src="/SCES/assets/images/add-quiz-icon.png" alt="add-quiz-icon.png">
                                <span>Add Quiz</span>
                            </div>

                            <?php if ($inactiveQuizzes): ?>
                                <?php foreach ($inactiveQuizzes as $index => $quiz): ?>
                                    <div class="pending-item <?php echo strtolower($quiz['subject_code']); ?>"
                                        data-quiz-index="<?php echo $index; ?>"
                                        data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                        <span><?php echo htmlspecialchars($quiz['subject']) ?> - Quiz
                                            <?php echo htmlspecialchars($quiz['quiz_number']) ?></span>
                                        <button class="quiz-settings"
                                            data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <div class="quiz-popup-menu">
                                            <ul>
                                                <li class="edit-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">Edit</li>
                                                <li class="view-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">View Info
                                                </li>
                                                <li class="enable-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">Enable
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
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
                            <?php if ($inactiveQuizzes): ?>
                                <?php foreach ($inactiveQuizzes as $index => $quiz): ?>
                                    <div class="quiz-header" data-quiz-index="<?php echo $index; ?>"
                                        data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                        <div class="header-bg <?php echo strtolower($quiz['subject_code']); ?>">
                                            <div class="icon-container">
                                                <img src="/SCES/assets/images/<?php echo htmlspecialchars($quiz['icon']); ?>"
                                                    alt="<?php echo htmlspecialchars($quiz['icon']); ?>">
                                            </div>
                                        </div>
                                        <div class="header-text">
                                            <img src="/SCES/assets/images/quiz-1.png" alt="quiz-1.png">
                                            <h1>Quiz
                                                <?php echo htmlspecialchars($quiz['quiz_number']) . ' - ' . htmlspecialchars($quiz['title']); ?>
                                            </h1>
                                        </div>
                                    </div>

                                    <?php $facultyGetQuestions = $db->getQuestions($quiz['quiz_id']); ?>
                                    <div class="quiz-questions">
                                        <div class="quiz-item add-question" data-quiz-index="<?php echo $index; ?>"
                                            data-quiz-id="<?php echo $quiz['quiz_id']; ?>">
                                            <div class="no-data-box">
                                                <i class="fa-solid fa-circle-plus"></i>
                                                <span>Add Question Here</span>
                                            </div>
                                        </div>
                                        <?php if (!empty($facultyGetQuestions)): ?>
                                            <?php foreach ($facultyGetQuestions as $qIndex => $question): ?>
                                                <div class="quiz-item" data-quiz-index="<?php echo $index; ?>"
                                                    data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                                    <button class="question-menu">
                                                        <i class="fa-solid fa-ellipsis"></i>
                                                    </button>
                                                    <div class="question-popup-menu">
                                                        <ul>
                                                            <li class="edit-question"
                                                                data-question-id="<?php echo $question['question_id']; ?>">Edit</li>
                                                            <li class="remove-question"
                                                                data-question-id="<?php echo $question['question_id']; ?>">Remove</li>
                                                        </ul>
                                                    </div>
                                                    <div class="question-box">
                                                        <span><?php echo ($qIndex + 1) . '. ' . htmlspecialchars($question['question']); ?></span>
                                                    </div>
                                                    <?php $facultyGetChoices = $db->getChoices($question['question_id'], $question['quiz_id']); ?>
                                                    <?php foreach ($facultyGetChoices as $ansIndex => $answer): ?>
                                                        <div class="quiz-ans <?php echo $answer['value'] == 1 ? 'correct' : ($answer['value'] == 0 ? 'wrong' : ''); ?>"
                                                            data-choice-id="<?php echo $answer['choice_id']; ?>">
                                                            <p><?php echo chr(65 + $ansIndex) . '. ' . htmlspecialchars($answer['choice']); ?>
                                                            </p>
                                                        </div>
                                                    <?php endforeach; ?>
                                                </div>
                                            <?php endforeach; ?>
                                        <?php else: ?>

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

                    <div class="sub-container" id="completedContainer">
                        <div class="pending-container">
                            <div class="pending-title">
                                <img src="/SCES/assets/images/quiz-past.png" alt="quiz-past.png">
                                <h1>Completed Quizzes</h1>
                            </div>
                            <div class="add-pending-item" id="completedAddQuizItem">
                                <img src="/SCES/assets/images/add-quiz-icon.png" alt="add-quiz-icon.png">
                                <span>Add Quiz</span>
                            </div>

                            <?php if ($completedQuizzes): ?>
                                <?php foreach ($completedQuizzes as $index => $quiz): ?>
                                    <div class="pending-item <?php echo strtolower($quiz['subject_code']); ?>"
                                        data-quiz-index="<?php echo $index; ?>"
                                        data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                        <span><?php echo htmlspecialchars($quiz['subject']) ?> - Quiz
                                            <?php echo htmlspecialchars($quiz['quiz_number']) ?></span>
                                        <button class="quiz-settings"
                                            data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <div class="quiz-popup-menu">
                                            <ul>
                                                <li class="view-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">View Info
                                                </li>
                                                <li class="enable-quiz" data-quiz-id="<?php echo $quiz['quiz_id']; ?>">Re-enable
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <div class="no-data-item">
                                    <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                                    <h1>No Activated Quiz.</h1>
                                    <h1>Add A Quiz By Clicking The Button Above.</h1>
                                </div>
                            <?php endif; ?>
                        </div>

                        <div class="header-container">
                            <?php if ($completedQuizzes): ?>
                                <?php foreach ($completedQuizzes as $index => $quiz): ?>
                                    <div class="quiz-header" data-quiz-index="<?php echo $index; ?>"
                                        data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                        <div class="header-bg <?php echo strtolower($quiz['subject_code']); ?>">
                                            <div class="icon-container">
                                                <img src="/SCES/assets/images/<?php echo htmlspecialchars($quiz['icon']); ?>"
                                                    alt="<?php echo htmlspecialchars($quiz['icon']); ?>">
                                            </div>
                                        </div>
                                        <div class="header-text">
                                            <img src="/SCES/assets/images/quiz-1.png" alt="quiz-1.png">
                                            <h1>Quiz
                                                <?php echo htmlspecialchars($quiz['quiz_number']) . ' - ' . htmlspecialchars($quiz['title']); ?>
                                            </h1>
                                        </div>
                                    </div>

                                    <?php $facultyGetQuestions = $db->getQuestions($quiz['quiz_id']); ?>
                                    <div class="quiz-questions">
                                        <?php if (!empty($facultyGetQuestions)): ?>
                                            <?php foreach ($facultyGetQuestions as $qIndex => $question): ?>
                                                <div class="quiz-item" data-quiz-index="<?php echo $index; ?>"
                                                    data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                                                    <button class="question-menu">
                                                        <i class="fa-solid fa-ellipsis"></i>
                                                    </button>
                                                    <div class="question-popup-menu">
                                                        <ul>
                                                            <li class="view-question"
                                                                data-question-id="<?php echo $question['question_id']; ?>">Analytics
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="question-box">
                                                        <span><?php echo ($qIndex + 1) . '. ' . htmlspecialchars($question['question']); ?></span>
                                                    </div>
                                                    <?php $facultyGetChoices = $db->getChoices($question['question_id'], $question['quiz_id']); ?>
                                                    <?php foreach ($facultyGetChoices as $ansIndex => $answer): ?>
                                                        <div class="quiz-ans <?php echo $answer['value'] == 1 ? 'correct' : ($answer['value'] == 0 ? 'wrong' : ''); ?>"
                                                            data-choice-id="<?php echo $answer['choice_id']; ?>">
                                                            <p><?php echo chr(65 + $ansIndex) . '. ' . htmlspecialchars($answer['choice']); ?>
                                                            </p>
                                                        </div>
                                                    <?php endforeach; ?>
                                                </div>
                                            <?php endforeach; ?>
                                        <?php else: ?>

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
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-add-quiz.php';
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
    ?>