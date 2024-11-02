<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
$teacherStudent = $db->adminGetTotalTeacherStudent();
$teacherLesson = $db->adminGetTotalTeacherLesson();
$teacherArchived = $db->adminGetTotalTeacherArchived();
$page = '';
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
                    <button class="add-btn" id="addSubjectBtn"><i class="fa-solid fa-plus"></i>Add Subject</button>
                </div>
                <?php $subjects = $db->getAdminSubjects(); ?>
                <div class="subject-container <?php echo empty($subjects) ? 'no-data-box-centered' : ''; ?>">
                    <?php if ($subjects): ?>
                        <?php foreach ($subjects as $subject): ?>
                            <div class="subject-item">
                                <a href="/SCES/frontend/admin/subjects/subject-module.php?section=<?php echo urlencode($subject['section_id']); ?>&subject=<?php echo urlencode($subject['subject_id']); ?>&gradelevel=<?php echo urlencode($subject['level_id']); ?>&teacher=<?php echo urlencode($subject['teacher_id']); ?>"
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
                                        <li><a href="javascript:void(0)" class="edit-btn" data-subject-id="<?php echo htmlspecialchars($subject['subject_id']); ?>">Edit</a></li>
                                        <li><a href="javascript:void(0)" data-subject-id="<?php echo htmlspecialchars($subject['subject_id']); ?>">Archive</a></li>
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
            include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/subject-modal.php';
            include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
            ?>
            <script src="/SCES/assets/script/admin-subject.js"></script>