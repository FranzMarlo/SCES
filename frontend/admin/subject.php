<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
?>
<link rel="stylesheet" href="/SCES/assets/style/admin-subject.css" />
<title>Subjects | SCES Online Learning Platform</title>
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
            <div class="total-container">
                <div class="item">
                    <div class="item-icon">
                        <img src="/SCES/assets/images/subject-students.png" alt="total students icon">
                    </div>
                    <div class="item-text">
                        <span>Total Students</span>
                        <h6>40</h6>
                    </div>
                </div>
                <div class="item">
                    <div class="item-icon">
                        <img src="/SCES/assets/images/subject-lessons.png" alt="total students icon">
                    </div>
                    <div class="item-text">
                        <span>Total Lessons</span>
                        <h6>24</h6>
                    </div>
                </div>
                <div class="item">
                    <div class="item-icon">
                        <img src="/SCES/assets/images/subject-archived.png" alt="total students icon">
                    </div>
                    <div class="item-text">
                        <span>Total Archived</span>
                        <h6>14</h6>
                    </div>
                </div>
            </div>
            <div class="subject-panel">
                <div class="panel-title">
                    <h1>Subjects</h1>
                </div>
                <?php $subjects = $db->getAdminSubjects($teacherId); ?>
                <div class="subject-container <?php echo empty($subjects) ? 'no-data-box-centered' : ''; ?>">
                    <?php if ($subjects): ?>
                        <?php foreach ($subjects as $subject): ?>
                            <a href="<?php echo $subject['link']; ?>" class="subject-item">
                                <div class="subject-icon <?php echo strtolower($subject['subject_code']); ?>">
                                    <button class="subject-btn ellipsis">
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                    </button>
                                    <div class="subject-in-title">
                                        <h1><?php echo htmlspecialchars($subject['subject']); ?></h1>
                                        <span><?php echo htmlspecialchars($subject['grade_level'] . ' - ' . $subject['section']); ?></span>
                                    </div>
                                    <img src="/SCES/assets/images/<?php echo htmlspecialchars($subject['icon']); ?>"
                                        alt="<?php echo htmlspecialchars($subject['icon']); ?>">
                                    <button class="subject-btn edit">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <div class="subject-title">
                                    <h1><?php echo htmlspecialchars($subject['subject']); ?></h1>
                                    <span><?php echo htmlspecialchars($subject['grade_level'] . ' - ' . $subject['section']); ?></span>
                                </div>
                            </a>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <div class="no-data-box">
                            <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                            <h1>No subject found.</h1>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <?php
        include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
        ?>