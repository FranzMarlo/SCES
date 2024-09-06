<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/admin-quizzes.css" />
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
                            <button class="math">
                                Mathematics Quiz 1
                            </button>
                            <button class="math">
                                Add quiz here
                            </button>
                        </div>
                    </div>
                </div>
                <div class="quiz-container">
                    <div class="pending-container">
                        <div class="pending-title">
                            <img src="/SCES/assets/images/pending-quiz.png" alt="pending-quiz.png">
                            <h1>Pending Quiz</h1>
                        </div>
                        <div class="pending-item math">
                            <span>Mathematics Quiz 1</span>
                        </div>
                        <div class="pending-item">
                            <span>Add quiz here</span>
                        </div>
                    </div>
                    <div class="header-container">
                        <div class="quiz-header">
                            <div class="header-bg fil">
                                <div class="icon-container">
                                    <img src="/SCES/assets/images/filipino-icon.png" alt="filipino-icon">
                                </div>
                            </div>
                            <div class="header-text">
                                <img src="/SCES/assets/images/quiz-1.png" alt="quiz-1.png">
                                <h1>Add quiz title...</h1>
                            </div>
                        </div>
                        <div class="quiz-item">
                            <div class="question-box">
                                <span>1. Add question here...</span>
                            </div>
                            <div class="quiz-ans">
                                <p>A. Add choice</p>
                            </div>
                            <div class="quiz-ans">
                                <p>B. Add choice</p>
                            </div>
                            <div class="quiz-ans">
                                <p>C. Add choice</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
    ?>