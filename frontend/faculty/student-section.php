<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/data-tables.php';
$page = '';
$studentCount = $db->getTotalStudentBySection($_GET['section']);
$sectionData = $db->facultyGetSectionData($_GET['section']);
?>
<link rel="stylesheet" href="/SCES/assets/style/student-section.css" />
<title><?php echo htmlspecialchars($sectionData['grade_level'] . ' - ' . $sectionData['section']); ?> | SCES Online
    Learning Platform</title>
</head>

<body data-section="<?php echo htmlspecialchars($_GET['section'] ?? '', ENT_QUOTES); ?>">
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
            <div class="panel-title">
                <h1><?php echo htmlspecialchars($sectionData['grade_level'] . ' - ' . $sectionData['section']); ?></h1>
                <div class="number-icon <?php echo htmlspecialchars($sectionData['short']); ?>">
                    <span><?php echo htmlspecialchars($studentCount); ?></span>
                </div>
            </div>
            <div class="panel">
                <div class="main-tab-controller">
                    <div class="tab-item <?php echo htmlspecialchars($sectionData['short']); ?> active"
                        id="sectionStudentsTab">
                        Students</div>
                    <div class="tab-item <?php echo htmlspecialchars($sectionData['short']); ?>" id="sectionRecordsTab">
                        Records</div>
                    <div class="tab-item <?php echo htmlspecialchars($sectionData['short']); ?>"
                        id="sectionAnalyticsTab">Analytics</div>
                </div>
                <div class="panel-tab" id="sectionStudentsPanel">
                    <div class="title-box">
                        <img src="/SCES/assets/images/profile-scores.png" alt="profile-scores.png">
                        <h1>Student List</h1>
                    </div>
                    <div class="table-responsive">
                        <table id="studentsTable" class="display data-table">
                            <thead>
                                <tr class="<?php echo htmlspecialchars($sectionData['short']); ?>">
                                    <th>Student Icon</th>
                                    <th>LRN</th>
                                    <th>Student ID</th>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>More</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="panel-tab" id="sectionRecordsPanel">
                    <div class="title-box">
                        <img src="/SCES/assets/images/personal-info.png" alt="personal-info.png">
                        <h1>Student Records</h1>
                    </div>
                    <div class="table-responsive">
                        <table id="recordsTable" class="display data-table">
                            <thead>
                                <tr class="<?php echo htmlspecialchars($sectionData['short']); ?>">
                                    <th>Student Name</th>
                                    <th>Subject</th>
                                    <th>Quiz Number</th>
                                    <th>Score</th>
                                    <th>Remarks</th>
                                    <th>Submission Time</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="panel-tab" id="sectionAnalyticsPanel">
                    <div class="title-box">
                        <img src="/SCES/assets/images/profile-analytics.png" alt="profile-analytics.png">
                        <h1>Analytics</h1>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/student-section-modal.php';
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-footer.php';
    ?>
    <script src="/SCES/assets/script/datatables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.4.0/js/dataTables.responsive.min.js"></script>
    <script src="/SCES/assets/script/student-section.js"></script>