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
                <?php
                $subjects = $db->getAdminSubjects();
                $archived = $db->getAdminArchivedSubjects();
                ?>
                <div class="subject-container">
                    <div class="tab-controller">
                        <div class="tab-container">
                            <div class="tab-item" id=subjectTab>Subjects</div>
                            <div class="tab-item" id="archivedTab">Archived</div>
                        </div>
                        <div class="search-container">
                            <select id="yearFilterDropdown" class="filter-dropdown">
                                <option value="all">All Years</option>
                                <option value="<?php echo date("Y"); ?>">Current SY</option>
                                <?php
                                $currentYear = date("Y") - 1;
                                for ($year = $currentYear; $year >= 2019; $year--) {
                                    echo "<option value='$year'>$year-" . ($year + 1) . "</option>";
                                }
                                ?>
                            </select>
                            <input type="text" id="subjectSearch" placeholder="Search Subject"
                                onkeyup="filterSubjects()">
                            <i class="fa fa-search search-icon"></i>
                        </div>
                    </div>
                    <div class="item-container <?php echo empty($subjects) ? 'no-data-box-centered' : ''; ?>"
                        id="subjectContainer">
                        <?php if ($subjects): ?>
                            <?php foreach ($subjects as $subject): ?>
                                <div class="subject-item"
                                    data-subject-name="<?php echo htmlspecialchars($subject['subject']); ?>"
                                    data-subject-year="<?php echo htmlspecialchars($subject['year']); ?>"
                                    data-subject-section="<?php echo htmlspecialchars($subject['section']); ?>"
                                    data-subject-level="<?php echo htmlspecialchars($subject['grade_level']); ?>">
                                    <a href="/SCES/frontend/admin/subject-module.php?section=<?php echo urlencode($subject['section_id']); ?>&subject=<?php echo urlencode($subject['subject_id']); ?>&gradelevel=<?php echo urlencode($subject['level_id']); ?>&teacher=<?php echo urlencode($subject['teacher_id']); ?>"
                                        class="hidden-link"></a>
                                    <div class="subject-icon <?php echo strtolower($subject['subject_code']); ?>"
                                        onclick="hiddenLink(this)">
                                        <button class="subject-btn" onclick="subjectBtn(event, this)">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <div class="subject-in-title" onclick="hiddenLink(this)">
                                            <h1><?php echo htmlspecialchars($subject['subject']); ?></h1>
                                            <div class="in-part">
                                                <span><?php echo htmlspecialchars($subject['grade_level'] . ' - ' . $subject['section']); ?></span>
                                                <span><?php echo htmlspecialchars('SY: ' . ($subject['year'] - 1) . ' - ' . $subject['year']); ?></span>
                                            </div>
                                        </div>
                                        <img src="/SCES/assets/images/<?php echo htmlspecialchars($subject['icon']); ?>"
                                            alt="<?php echo htmlspecialchars($subject['icon']); ?>">
                                    </div>
                                    <div class="subject-title" onclick="hiddenLink(this)">
                                        <h1><?php echo htmlspecialchars($subject['subject']); ?></h1>
                                        <span><?php echo htmlspecialchars($subject['grade_level'] . ' - ' . $subject['section']); ?></span>
                                        <span><?php echo htmlspecialchars('SY: ' . ($subject['year'] - 1) . ' - ' . $subject['year']); ?></span>
                                    </div>
                                    <div class="popup-menu">
                                        <ul>
                                            <li><a href="javascript:void(0)" class="edit-btn"
                                                    data-subject-id="<?php echo htmlspecialchars($subject['subject_id']); ?>">Edit</a>
                                            </li>
                                            <li><a href="javascript:void(0)" class="archive-btn"
                                                    data-subject-id="<?php echo htmlspecialchars($subject['subject_id']); ?>">Archive</a>
                                            </li>
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
                    <div class="item-container <?php echo empty($archived) ? 'no-data-box-centered' : ''; ?>"
                        id="archivedContainer">
                        <?php if ($archived): ?>
                            <?php foreach ($archived as $archive): ?>
                                <div class="subject-item"
                                    data-subject-name="<?php echo htmlspecialchars($archive['subject']); ?>"
                                    data-subject-year="<?php echo htmlspecialchars($archive['year']); ?>"
                                    data-subject-section="<?php echo htmlspecialchars($archive['section']); ?>"
                                    data-subject-level="<?php echo htmlspecialchars($archive['grade_level']); ?>">
                                    <a href="/SCES/frontend/admin/subject-module.php?section=<?php echo urlencode($archive['section_id']); ?>&subject=<?php echo urlencode($archive['subject_id']); ?>&gradelevel=<?php echo urlencode($archive['level_id']); ?>&teacher=<?php echo urlencode($archive['teacher_id']); ?>"
                                        class="hidden-link"></a>
                                    <div class="subject-icon <?php echo strtolower($archive['subject_code']); ?>"
                                        onclick="hiddenLink(this)">
                                        <button class="subject-btn" onclick="subjectBtn(event, this)">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <div class="subject-in-title" onclick="hiddenLink(this)">
                                            <h1><?php echo htmlspecialchars($archive['subject']); ?></h1>
                                            <div class="in-part">
                                                <span><?php echo htmlspecialchars($archive['grade_level'] . ' - ' . $archive['section']); ?></span>
                                                <span><?php echo htmlspecialchars('SY: ' . ($archive['year'] - 1) . ' - ' . $archive['year']); ?></span>
                                            </div>
                                        </div>
                                        <img src="/SCES/assets/images/<?php echo htmlspecialchars($archive['icon']); ?>"
                                            alt="<?php echo htmlspecialchars($archive['icon']); ?>">
                                    </div>
                                    <div class="subject-title" onclick="hiddenLink(this)">
                                        <h1><?php echo htmlspecialchars($archive['subject']); ?></h1>
                                        <span><?php echo htmlspecialchars($archive['grade_level'] . ' - ' . $archive['section']); ?></span>
                                        <span><?php echo htmlspecialchars('SY: ' . ($archive['year'] - 1) . ' - ' . $archive['year']); ?></span>
                                    </div>
                                    <div class="popup-menu">
                                        <ul>
                                            <li><a href="javascript:void(0)" class="not-archive-btn"
                                                    data-subject-id="<?php echo htmlspecialchars($archive['subject_id']); ?>">Enable</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <div class="no-data-box">
                                <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                                <h1>No archived subject found.</h1>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        <script src="/SCES/assets/script/search-filter.js"></script>
        <?php
        include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/subject-modal.php';
        include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
        ?>
        <script src="/SCES/assets/script/admin-subject.js"></script>