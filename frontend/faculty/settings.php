<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-head.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/settings.css" />
<script src="/SCES/assets/script/faculty-settings.js"></script>
<title>Settings | SCES Online Learning Platform</title>
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
            <div class="title-box">
                <h1>Account Settings</h1>
            </div>
            <div class="settings-container">
                <div class="side-panel">
                    <button class="panel-item" id="profileBtn">My Profile</button>
                    <button class="panel-item" id="securityBtn">Security</button>
                </div>
                <div class="main-panel" id="profileTab">
                    <div class="panel-title">
                        <h1>My Profile</h1>
                    </div>
                    <div class="user-profile">
                        <div class="profile-part">
                            <div class="user-icon">
                                <img src="/SCES/storage/faculty/images/<?php echo $image; ?>" alt="user icon"
                                    id="current-user-avatar">
                                <img src="/SCES/assets/images/change-avatar.png" alt="user icon"
                                    id="change-avatar-icon">
                            </div>
                            <div class="profile-info">
                                <h1><?php echo htmlspecialchars($teacherFname . ' ' . $teacherLname); ?></h1>
                                <span>SCES <?php echo htmlspecialchars($role); ?></span>
                                <span>Teacher ID: <?php echo htmlspecialchars($teacherId); ?></span>
                            </div>
                        </div>
                        <div class="profile-part">
                            <div class="button-container">
                                <button class="edit-btn" id="edit-profile-info">Edit<i
                                        class="fa-solid fa-pencil"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="current-user-info">
                        <div class="current-user-info-header">
                            <div class="current-user-header-title">
                                <h2>Personal Information</h2>
                            </div>
                            <div class="info-button-container">
                                <button class="edit-btn" id="edit-personal-info">Edit<i
                                        class="fa-solid fa-pencil"></i></button>
                            </div>
                        </div>
                        <div class="info-content">
                            <div class="info-part">
                                <div class="info-data">
                                    <span>First Name</span>
                                    <p><?php echo htmlspecialchars($teacherFname); ?></p>
                                </div>
                                <div class="info-data">
                                    <span>Last Name</span>
                                    <p><?php echo htmlspecialchars($teacherLname); ?></p>
                                </div>
                                <div class="info-data">
                                    <span>Middle Name</span>
                                    <p><?php echo htmlspecialchars($teacherMname); ?></p>
                                </div>
                            </div>
                            <div class="info-part">
                                <div class="info-data">
                                    <span>Suffix</span>
                                    <p><?php echo htmlspecialchars($teacherSuffix); ?></p>
                                </div>
                                <div class="info-data">
                                    <span>Age</span>
                                    <p><?php echo ($age == 0) ? 'Not Set' : htmlspecialchars($age); ?></p>
                                </div>
                                <div class="info-data">
                                    <span>Gender</span>
                                    <p><?php echo htmlspecialchars($gender); ?></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="current-user-info">
                        <div class="current-user-info-header">
                            <div class="current-user-header-title">
                                <h2>Background Information</h2>
                            </div>
                            <div class="info-button-container">
                                <button class="edit-btn" id="edit-background-info">Edit<i
                                        class="fa-solid fa-pencil"></i></button>
                            </div>
                        </div>
                        <div class="info-content">
                            <div class="info-part">
                                <div class="info-data">
                                    <span>City/State</span>
                                    <p><?php echo htmlspecialchars($city); ?></p>
                                </div>
                                <div class="info-data">
                                    <span>Barangay</span>
                                    <p><?php echo htmlspecialchars($barangay); ?></p>
                                </div>
                                <div class="info-data">
                                    <span>Street</span>
                                    <p><?php echo htmlspecialchars($street); ?></p>
                                </div>
                            </div>
                            <div class="info-part">
                                <div class="info-data">
                                    <span>Email Address</span>
                                    <p><?php echo htmlspecialchars($email); ?></p>
                                </div>
                                <div class="info-data">
                                    <span>Contact Number</span>
                                    <p><?php echo htmlspecialchars($contactNumber); ?></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-panel" id="securityTab">
                    <div class="panel-title">
                        <h1>Security</h1>
                    </div>
                    <div class="current-user-info">
                        <div class="current-user-info-header">
                            <div class="current-user-header-title padded">
                                <h2>Security Options</h2>
                            </div>
                        </div>
                        <div class="info-content">
                            <div class="security-panel">
                                <div class="security-data" id="changePassword">
                                    <div class="security-part">
                                        <i class="fa-solid fa-lock"></i>
                                        <div class="data-text">
                                            <span>Change Password</span>
                                            <p><?php echo htmlspecialchars($passwordChange == NULL) ? 'Unchanged' : 'Last Changed ' . $passwordChange; ?>
                                            </p>
                                        </div>
                                    </div>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                                <div class="security-data">
                                    <div class="security-part" id="verifyEmail">
                                        <i class="fa-solid fa-envelope-circle-check"></i>
                                        <div class="data-text">
                                            <span>Verify Email</span>
                                            <p><?php echo htmlspecialchars($emailVerification); ?></p>
                                        </div>
                                    </div>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-edit-modal.php';
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-footer.php';
    ?>