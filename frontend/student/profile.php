<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/helper.php';
?>
<link rel="stylesheet" href="/SCES/assets/style/student-profile.css" />
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
                                            <span>2024-2025</span>
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

                </div>
            </div>
        </div>
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-footer.php';
    ?>