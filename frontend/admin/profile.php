<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/helper.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/admin-profile.css" />
<title>My Profile | SCES Online Learning Platform</title>
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
            <div class="profile-panel">
                <div class="title-box">
                    <img src="/SCES/assets/images/<?php echo htmlspecialchars(getProfileImage($gender)); ?>"
                        alt="student-icon.png">
                    <h1>My Profile</h1>
                </div>
                <div class="profile-container">
                    <div class="profile-bg female">
                        <div class="id-box male">
                            <div class="id-image">
                                <img src="/SCES/storage/admin/images/<?php echo $image; ?>" alt="user icon">
                                <span><?php echo htmlspecialchars($teacherId); ?></span>
                            </div>
                            <div class="id-section">
                                <div class="id-logo">
                                    <div class="logo">
                                        <img src="/SCES/assets/images/logo.png" alt="SCES Logo" />
                                        <span class="blue">SCES</span>
                                    </div>
                                    <div class="motto blue-bg">
                                        <p>Serving with Compassion and Excellence towards Success</p>
                                    </div>
                                </div>
                                <hr class="dashed-line">
                                <div class="id-info">
                                    <div class="id-row">
                                        <div class="id-col-full">
                                            <p>NAME</p>
                                            <span><?php echo htmlspecialchars(getPronoun($gender) . ' ' .  strtoupper($teacherLname) .' '. strtoupper($teacherLname)); ?></span>
                                        </div>
                                    </div>
                                    <div class="id-row">
                                        <div class="id-col">
                                            <p>SCES</p>
                                            <span><?php echo htmlspecialchars(strtoupper($role)); ?></span>
                                        </div>
                                        <div class="id-col">
                                            <p>SCHOOL YEAR</p>
                                            <span><?php echo htmlspecialchars(getCurrentSchoolYear()); ?></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="side-controller">
                        <div class="tab-item" id="profileTab">My Profile</div>
                        <div class="tab-item" id="subjectsTab">Subjects</div>
                        <div class="tab-item" id="analyticsTab">Analytics</div>
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
                                    <span><?php echo htmlspecialchars($teacherLname); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>First Name</p>
                                    <span><?php echo htmlspecialchars($teacherFname); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>Middle Name</p>
                                    <span><?php echo htmlspecialchars($teacherMname); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>Suffix</p>
                                    <span><?php echo htmlspecialchars($teacherSuffix); ?></span>
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
                                    <p>Teacher ID</p>
                                    <span><?php echo htmlspecialchars($teacherId); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>Role</p>
                                    <span><?php echo htmlspecialchars($role); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>Email</p>
                                    <span><?php echo htmlspecialchars($email); ?></span>
                                </div>
                                <div class="info-col">
                                    <p>Contact Number</p>
                                    <span><?php echo htmlspecialchars($contactNumber); ?></span>
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
                            </div>
                        </div>
                    </div>
                    <div class="profile-tab" id="subjectsContainer">
                        <div class="title-box">
                            <img src="/SCES/assets/images/quiz-subject.png" alt="quiz-subject.png">
                            <h1>Subjects</h1>
                        </div>
                        <?php $subjects = $db->getFacultySubjects($teacherId); ?>
                        <div class="subject-container <?php echo empty($subjects) ? 'no-data-box-centered' : ''; ?>">
                            <?php if ($subjects): ?>
                                <?php foreach ($subjects as $subject): ?>
                                    <div class="subject-item">
                                        <a href="/SCES/frontend/faculty/subjects/subject-module.php?section=<?php echo urlencode($subject['section_id']); ?>&subject=<?php echo urlencode($subject['subject_id']); ?>&gradelevel=<?php echo urlencode($subject['level_id']); ?>"
                                            class="hidden-link"></a>
                                        <div class="subject-icon <?php echo strtolower($subject['subject_code']); ?>"
                                            onclick="hiddenLink(this)">
                                            <button class="subject-btn" onclick="subjectBtn(event, this)">
                                                <i class="fa-solid fa-ellipsis-vertical"></i>
                                            </button>
                                            <div class="subject-in-title" onclick="hiddenLink(this)">
                                                <h1><?php echo htmlspecialchars($subject['subject']); ?></h1>
                                                <span><?php echo htmlspecialchars($subject['grade_level'] . ' - ' . $subject['section']); ?></span>
                                            </div>
                                            <img src="/SCES/assets/images/<?php echo htmlspecialchars($subject['icon']); ?>"
                                                alt="<?php echo htmlspecialchars($subject['icon']); ?>">
                                        </div>
                                        <div class="subject-title" onclick="hiddenLink(this)">
                                            <h1><?php echo htmlspecialchars($subject['subject']); ?></h1>
                                            <span><?php echo htmlspecialchars($subject['grade_level'] . ' - ' . $subject['section']); ?></span>
                                        </div>
                                        <div class="popup-menu">
                                            <ul>
                                                <li><a href="#">Edit</a></li>
                                                <li><a href="#">Archive</a></li>
                                                <li><a href="#">View Details</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <div class="no-data-box">
                                    <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                                    <h1>No subject found.</h1>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                    <div class="profile-tab" id="analyticsContainer">
                        <div class="title-box">
                            <img src="/SCES/assets/images/profile-analytics.png" alt="profile-analytics.png">
                            <h1>Analytics</h1>
                        </div>
                        <div class="stats-panel">
                            <div class="panel-box pending">
                                <?php $totalTeacherLesson = $db->getTotalTeacherLesson($teacherId); ?>
                                <img src="/SCES/assets/images/quiz-lesson.png" alt="quiz-lesson.png">
                                <div class="panel-col">
                                    <p>Uploaded Lessons</p>
                                    <span><?php echo htmlspecialchars($totalTeacherLesson); ?></span>
                                </div>
                            </div>
                            <div class="panel-box quiz-score">
                                <?php $totalTeacherStudent = $db->getTotalTeacherStudent($teacherId); ?>
                                <img src="/SCES/assets/images/quiz-grade-section.png" alt="quiz-grade-section.png">
                                <div class="panel-col">
                                    <p>Handled Students</p>
                                    <span><?php echo htmlspecialchars($totalTeacherStudent); ?></span>
                                </div>
                            </div>
                            <div class="panel-box completed">
                                <?php $totalQuizzes = $db->teacherGetQuizzesCount($teacherId); ?>
                                <img src="/SCES/assets/images/quiz-passed.png" alt="quiz-passed.png">
                                <div class="panel-col">
                                    <p>Completed Quizzes</p>
                                    <span><?php echo htmlspecialchars($totalQuizzes); ?></span>
                                </div>
                            </div>
                            <div class="panel-box average">
                                <?php $totalPending = $db->teacherGetPendingQuizzesCount($teacherId); ?>
                                <img src="/SCES/assets/images/quiz-pending.png" alt="quiz-pending.png">
                                <div class="panel-col">
                                    <p>Pending Quizzes</p>
                                    <span><?php echo htmlspecialchars($totalPending); ?></span>
                                </div>
                            </div>
                        </div>
                        <div class="graph-container">
                            <div class="graph">
                                <canvas id="pieChart"></canvas>
                            </div>
                            <div class="graph">
                                <canvas id="barChart"></canvas>
                            </div>
                        </div>
                        <div class="graph-container">
                            <div class="full-graph">
                                <canvas id="lineChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
            ?>
            <script src="/SCES/assets/script/admin-profile.js"></script>