<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/helper.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/admin-profile.css" />
<title>My Profile | SCES Online Learning Platform</title>
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
            <div class="profile-panel">
                <div class="title-box">
                    <img src="/SCES/assets/images/<?php echo htmlspecialchars(getProfileImage($gender)); ?>"
                        alt="student-icon.png">
                    <h1>My Profile</h1>
                </div>
                <div class="profile-container">
                    <div class="profile-bg <?php echo htmlspecialchars(getProfileBg($gender)); ?>">
                        <div class="id-box <?php echo htmlspecialchars(getIdBg($gender)); ?>">
                            <div class="id-image">
                                <img src="/SCES/storage/faculty/images/<?php echo $image; ?>" alt="user icon">
                                <span><?php echo htmlspecialchars($teacherId); ?></span>
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
                                        <div class="id-col-full">
                                            <p>NAME</p>
                                            <span><?php echo htmlspecialchars(getPronoun($gender) . ' ' . strtoupper($teacherFname) . ' ' . strtoupper($teacherLname)); ?></span>
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
                </div>
            </div>
            <?php
            include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-footer.php';
            ?>