<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/helper.php';
?>
<link rel="stylesheet" href="/SCES/assets/style/datatables.min.css" />
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.4.0/css/responsive.dataTables.min.css">
<link rel="stylesheet" href="/SCES/assets/style/student-profile.css" />
<script src="/SCES/vendor/node_modules/chart.js/dist/chart.umd.js"></script>
<title>Profile | SCES Online Learning Platform</title>
</head>

<body>
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
            <div class="profile-panel">
                <div class="title-box">
                    <img src="/SCES/assets/images/<?php echo htmlspecialchars(getProfileImage($gender)); ?>"
                        alt="student-icon.png">
                    <h1>My Profile</h1>
                </div>
                <div class="profile-container">
                    <div class="profile-bg">
                        <div class="id-box <?php echo htmlspecialchars(getIdBg($gender)); ?>">
                            <div class="id-image">
                                <img src="/SCES/storage/student/images/<?php echo $image; ?>" alt="user icon">
                                <span><?php echo htmlspecialchars($studentId); ?></span>
                            </div>
                            <div class="id-section">
                                <div class="id-logo">
                                    <div class="logo">
                                        <img src="/SCES/assets/images/logo.png" alt="SCES Logo" />
                                        <span class="<?php echo htmlspecialchars(getLogoStyle($gender)); ?>">SCES</span>
                                    </div>
                                    <div class="motto <?php echo htmlspecialchars(getMottoStyle($gender)); ?>">
                                        <p>Serving with Compassion and Excellence towards Success</p>
                                    </div>
                                </div>
                                <hr class="dashed-line">
                                <div class="id-info">
                                    <div class="id-row">
                                        <div class="id-col">
                                            <p>NAME</p>
                                            <span><?php echo htmlspecialchars(strtoupper($firstName)); ?></span>
                                        </div>
                                        <div class="id-col">
                                            <p>SCHOOL YEAR</p>
                                            <span><?php echo htmlspecialchars(getCurrentSchoolYear()); ?></span>
                                        </div>
                                    </div>
                                    <div class="id-row">
                                        <div class="id-col">
                                            <p>GRADE LEVEL</p>
                                            <span><?php echo htmlspecialchars(strtoupper($gradeLevel)); ?></span>
                                        </div>
                                        <div class="id-col">
                                            <p>SECTION</p>
                                            <span><?php echo htmlspecialchars(strtoupper($section)); ?></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="side-controller">
                        <div class="tab-item" id="profileTab">My Profile</div>
                        <div class="tab-item" id="recordsTab">My Records</div>
                        <div class="tab-item" id="statsTab">My Stats</div>
                    </div>
                    <div class="profile-tab" id="profileContainer">
                        <div class="info-panel">
                            <div class="title-box">
                                <img src="/SCES/assets/images/personal-info.png" alt="personal-info.png">
                                <h1>Personal Information</h1>
                            </div>
                            <div class="info-row">
                                <div class="info-col">
                                    <p>Last Name</p>
                                    <span><?php echo htmlspecialchars($studentLname); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>First Name</p>
                                    <span><?php echo htmlspecialchars($studentFname); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>Middle Name</p>
                                    <span><?php echo htmlspecialchars($studentMname); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>Suffix</p>
                                    <span><?php echo htmlspecialchars($studentSuffix); ?></span>
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-col">
                                    <p>Gender</p>
                                    <span><?php echo htmlspecialchars($gender); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>Age</p>
                                    <span><?php echo htmlspecialchars($age); ?></span>
                                </div>
                            </div>
                        </div>
                        <div class="info-panel">
                            <div class="title-box">
                                <img src="/SCES/assets/images/school-info.png" alt="school-info.png">
                                <h1>School Information</h1>
                            </div>
                            <div class="info-row">
                                <div class="info-col">
                                    <p>Student No.</p>
                                    <span><?php echo htmlspecialchars($studentId); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>LRN</p>
                                    <span><?php echo htmlspecialchars($lrn); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>Grade Level</p>
                                    <span><?php echo htmlspecialchars($gradeLevel); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>Section</p>
                                    <span><?php echo htmlspecialchars($section); ?></span>
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-col">
                                    <p>Email</p>
                                    <span><?php echo htmlspecialchars($email); ?></span>
                                </div>
                            </div>
                        </div>
                        <div class="info-panel">
                            <div class="title-box">
                                <img src="/SCES/assets/images/background-info.png" alt="background-info.png">
                                <h1>Background Information</h1>
                            </div>
                            <div class="info-row">
                                <div class="info-col">
                                    <p>City/State</p>
                                    <span><?php echo htmlspecialchars($city); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>Barangay</p>
                                    <span><?php echo htmlspecialchars($barangay); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>Street</p>
                                    <span><?php echo htmlspecialchars($street); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>Guardian Name</p>
                                    <span><?php echo htmlspecialchars($guardianName); ?></span>
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-col">
                                    <p>Guardian Contact</p>
                                    <span><?php echo htmlspecialchars($guardianContact); ?></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="profile-tab" id="recordsContainer">
                        <div class="title-box">
                            <img src="/SCES/assets/images/profile-scores.png" alt="profile-scores.png">
                            <h1>Quiz Scores</h1>
                        </div>
                        <div class="table-responsive">
                            <table id="quizScoresTable" class="display data-table">
                                <thead>
                                    <tr class="<?php echo htmlspecialchars(getMottoStyle($gender)); ?>">
                                        <th>Quiz No.</th>
                                        <th>Subject</th>
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

                        <div class="title-box">
                            <img src="/SCES/assets/images/profile-grades.png" alt="profile-grades.png">
                            <h1>Grades</h1>
                        </div>
                        <div class="table-responsive">
                            <table id="gradesTable" class="display data-table">
                                <thead>
                                    <tr class="<?php echo htmlspecialchars(getMottoStyle($gender)); ?>">
                                        <th>Subject</th>
                                        <th>Grade</th>
                                        <th>Remarks</th>
                                        <th>Quarter</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="profile-tab" id="statsContainer">
                        <div class="title-box">
                            <img src="/SCES/assets/images/profile-analytics.png" alt="profile-analytics.png">
                            <h1>My Stats</h1>
                        </div>
                        <div class="stats-panel">
                            <div class="panel-box completed">
                                <?php $totalCompletedQuizzes = $db->studentGetTotalQuizzesCount($studentId); ?>
                                <img src="/SCES/assets/images/quiz-passed.png" alt="quiz-passed.png">
                                <div class="panel-col">
                                    <p>Quizzes Completed</p>
                                    <span><?php echo htmlspecialchars($totalCompletedQuizzes); ?></span>
                                </div>
                            </div>
                            <div class="panel-box pending">
                                <?php $totalPendingQuizzes = $db->studentGetPendingQuizzesCount($sectionId, $studentId); ?>
                                <img src="/SCES/assets/images/hourglass.png" alt="hourglass.png">
                                <div class="panel-col">
                                    <p>Pending Quizzes</p>
                                    <span><?php echo htmlspecialchars($totalPendingQuizzes); ?></span>
                                </div>
                            </div>
                            <div class="panel-box quiz-score">
                                <?php $averageScore = $db->studentGetAverageScore($studentId); ?>
                                <img src="/SCES/assets/images/gpa.png" alt="gpa.png">
                                <div class="panel-col">
                                    <p>Average Score</p>
                                    <span><?php echo htmlspecialchars($averageScore); ?></span>
                                </div>
                            </div>
                            <div class="panel-box average">
                                <?php $generalAverage = $db->computeStudentGWAByLRN($lrn); ?>
                                <img src="/SCES/assets/images/profile-gwa.png" alt="profile-gwa.png">
                                <div class="panel-col">
                                    <p>General Average</p>
                                    <span><?php echo htmlspecialchars($generalAverage); ?></span>
                                </div>
                            </div>
                        </div>
                        <div class="graph-container">
                            <div class="graph">
                                <canvas id="lineChart"></canvas>
                            </div>
                            <div class="graph">
                                <canvas id="barChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
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
                <span><strong>Note: &nbsp;</strong>The green marked option is the correct answer while the answers that
                    are
                    marked red are wrong. The theme color represents your selected answer.</span>
            </div>

            <div class="modal-quiz-content" id="viewQuestionsContainer"></div>

            <div class="modal-footer">
                <button id="close-quiz" class="save-btn">Close Window</button>
            </div>
        </div>
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-footer.php';
    ?>
    <script src="/SCES/assets/script/datatables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.4.0/js/dataTables.responsive.min.js"></script>
    <script src="/SCES/assets/script/student-profile.js"></script>