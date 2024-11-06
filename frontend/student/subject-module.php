<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/subject-head.php';
?>
<link rel="stylesheet" href="/SCES/assets/style/datatables.min.css" />
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.4.0/css/responsive.dataTables.min.css">
<link rel="stylesheet" href="/SCES/assets/style/lessons.css" />
<title>Araling Panlipunan | SCES Online Learning Platform</title>
</head>

<body data-section="<?php echo htmlspecialchars($subjectSection ?? '', ENT_QUOTES); ?>"
    data-subject="<?php echo htmlspecialchars($currentSubject ?? '', ENT_QUOTES); ?>"
    data-student="<?php echo htmlspecialchars($studentId ?? '', ENT_QUOTES); ?>">
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-popup.php';
    ?>
    <div class="container">
        <?php
        include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-sidebar.php';
        ?>
        <div class="content">
            <?php
            include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-header.php';
            ?>
            <div class="lesson-panel">
                <div class="title-box">
                    <div class="text-box">
                        <img src="/SCES/assets/images/graduation-cap.png" alt="graduation-cap.png">
                        <h1>Academic Lessons</h1>
                    </div>
                </div>
                <div class="lesson-container">
                    <div class="tab-controller">
                        <div class="tab <?php echo htmlspecialchars($short); ?>" id="lessonTab">Lessons
                        </div>
                        <div class="tab <?php echo htmlspecialchars($short); ?>" id="recordsTab">Records
                        </div>
                    </div>
                    <div class="tab-container" id="lessonContainer">
                        <div class="lesson-header">
                            <div class="header-bg <?php echo htmlspecialchars($short); ?>">
                                <div class="icon-container">
                                    <img src="/SCES/assets/images/<?php echo htmlspecialchars($subject['icon']); ?>"
                                        alt="<?php echo htmlspecialchars($short); ?>-icon">
                                </div>
                            </div>
                            <div class="header-text">
                                <h1><?php echo htmlspecialchars($subject['subject_title']); ?></h1>
                                <span><?php echo htmlspecialchars(($subject['gender'] == 'Female' ? 'Ms. ' : 'Mr. ') . $subject['teacher_fname'] . ' ' . $subject['teacher_lname']); ?></span>
                            </div>
                        </div>
                        <div class="lesson-content">
                            <div class="module-container">
                                <div class="module-box">
                                    <div class="module-item pastel-pink" id="moduleLessons">
                                        <span>Lessons</span>
                                    </div>
                                    <div class="module-item pastel-blue" id="moduleRecords">
                                        <span>Records</span>
                                    </div>
                                </div>
                            </div>
                            <div class="lesson-box">
                                <?php $lessons = $db->studentGetLessons($subject['level_id'], $subject['subject_id'], $subject['section_id']); ?>
                                <?php if ($lessons): ?>
                                    <?php foreach ($lessons as $lesson): ?>
                                        <div class="lesson-item <?php echo htmlspecialchars($short); ?>-item">
                                            <div class="lesson-title">
                                                <h1>Lesson <?php echo htmlspecialchars($lesson['lesson_number']); ?></h1>
                                                <span><?php echo htmlspecialchars($lesson['lesson_title']); ?></span>
                                            </div>
                                            <a href="/SCES/frontend/student/view-lesson.php?pdf=<?php echo urlencode($lesson['pdf_file']); ?>&lesson_number=<?php echo urlencode($lesson['lesson_number']); ?>&subject_id=<?php echo urlencode($lesson['subject_id']); ?>"
                                                class="view-lesson" target="_blank">View Lesson <i
                                                    class="fa-solid fa-circle-chevron-right"></i></a>
                                        </div>
                                    <?php endforeach; ?>
                                <?php else: ?>
                                    <div class="no-data-box">
                                        <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                                        <h1>No lessons uploaded.</h1>
                                        <h1>Uploaded lessons will be displayed here.</h1>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                    <div class="tab-container" id="recordsContainer">
                        <div class="container-title">
                            <img src="/SCES/assets/images/profile-scores.png" alt="profile-scores.png">
                            <h1>My Quiz Scores</h1>
                        </div>
                        <div class="table-responsive">
                            <table id="quizScoresTable" class="display data-table">
                                <thead>
                                    <tr class="<?php echo htmlspecialchars($short); ?>">
                                        <th>Quiz No.</th>
                                        <th>Title</th>
                                        <th>Score</th>
                                        <th>Total Question</th>
                                        <th>Remarks</th>
                                        <th>Date Taken</th>
                                        <th>View Quiz</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="container-title">
                            <img src="/SCES/assets/images/profile-grades.png" alt="profile-grades.png">
                            <h1>My Grades</h1>
                        </div>
                        <div class="table-responsive">
                            <table id="gradesTable" class="display data-table">
                                <thead>
                                    <tr class="<?php echo htmlspecialchars($short); ?>">
                                        <th>Quarter</th>
                                        <th>Grade</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-lesson-modal.php';
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-footer.php';
    ?>
    <script src="/SCES/assets/script/datatables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.4.0/js/dataTables.responsive.min.js"></script>
    <script src="/SCES/assets/script/student-lesson.js"></script>