<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-head.php';
$teacherStudent = $db->getTotalTeacherStudent($teacherId);
$teacherLesson = $db->getTotalTeacherLesson($teacherId);
$teacherArchived = $db->getTotalTeacherArchived($teacherId);
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/admin-subject.css" />
<title>Subjects | SCES Online Learning Platform</title>
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
            <div class="total-container">
                <div class="item">
                    <div class="item-icon">
                        <img src="/SCES/assets/images/subject-students.png" alt="total students icon">
                    </div>
                    <div class="item-text">
                        <span>Total Students</span>
                        <h6><?php echo htmlspecialchars($teacherStudent); ?></h6>
                    </div>
                </div>
                <div class="item">
                    <div class="item-icon">
                        <img src="/SCES/assets/images/subject-lessons.png" alt="total lessons icon">
                    </div>
                    <div class="item-text">
                        <span>Total Lessons</span>
                        <h6><?php echo htmlspecialchars($teacherLesson); ?></h6>
                    </div>
                </div>
                <div class="item">
                    <div class="item-icon">
                        <img src="/SCES/assets/images/subject-archived.png" alt="total archived icon">
                    </div>
                    <div class="item-text">
                        <span>Total Archived</span>
                        <h6><?php echo htmlspecialchars($teacherArchived); ?></h6>
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
                            <div class="subject-item">
                                <a href="/SCES/frontend/admin/subjects/<?php echo htmlspecialchars($subject['link']); ?>?section=<?php echo urlencode($subject['section_id']); ?>&subject=<?php echo urlencode($subject['subject']); ?>&gradelevel=<?php echo urlencode($subject['level_id']); ?>"
                                    class="hidden-link"></a>
                                <div class="subject-icon <?php echo strtolower($subject['subject_code']); ?>" onclick="hiddenLink(this)">
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
            </div>
            <?php
            include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-footer.php';
            ?>