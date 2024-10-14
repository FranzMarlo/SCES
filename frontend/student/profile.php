<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/helper.php';
?>
<link rel="stylesheet" href="/SCES/assets/style/student-profile.css" />
<link rel="stylesheet" href="/SCES/assets/style/datatables.min.css" />
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
                                            <span><?php echo htmlspecialchars(strtoupper($studentFname)); ?></span>
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
                        <div class="tab-item">Profile</div>
                        <div class="tab-item">Records</div>
                        <div class="tab-item">Performance</div>
                    </div>
                    <div class="profile-tab">
                        <div class="info-panel">
                            <div class="title-box">
                                <img src="/SCES/assets/images/personal-info.png">
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
                                    <span>N/A</span>
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
                                <div class="info-col">
                                    <p>Birthday</p>
                                    <span>August 14, 2002</span>
                                </div>
                            </div>
                        </div>
                        <div class="info-panel">
                            <div class="title-box">
                                <img src="/SCES/assets/images/school-info.png">
                                <h1>School Information</h1>
                            </div>
                            <div class="info-row">
                                <div class="info-col">
                                    <p>Student No.</p>
                                    <span>Doe</span>
                                </div>
                                <div class="info-col">
                                    <p>LRN</p>
                                    <span>John</span>
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
                                <img src="/SCES/assets/images/background-info.png">
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
                    <div class="profile-tab">
                        <h2>Quiz Scores</h2>
                        <table id="quizScoresTable" class="display data-table" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Quiz Number</th>
                                    <th>Subject</th>
                                    <th>Title</th>
                                    <th>Score</th>
                                    <th>Total Question</th>
                                    <th>Submit Time</th>
                                </tr>
                            </thead>
                        </table>

                        <h2>Grades</h2>
                        <table id="gradesTable" class="display data-table" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Subject</th>
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
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-footer.php';
    ?>
    <script src="/SCES/assets/script/datatables.min.js"></script>
    <script src="/SCES/assets/script/student-profile.js"></script>