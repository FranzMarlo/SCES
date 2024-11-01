<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/data-tables.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/helper.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/section.css" />
<title>Sections | SCES Online Learning Platform</title>
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
            <div class="section-panel">
                <div class="panel-title">
                    <img src="/SCES/assets/images/quiz-grade-section.png" alt="section icon">
                    <h1>Sections</h1>
                </div>
                <?php $sections = $db->facultyGetSection(); ?>
                <div class="section-container <?php echo empty($sections) ? 'no-data-box-centered' : ''; ?>">
                    <?php if ($sections): ?>
                        <?php foreach ($sections as $section): ?>
                            <a href="/SCES/frontend/admin/student-section.php?section=<?php echo $section['section_id']; ?>" class="section-item">
                                <div class="icon-box <?php echo $section['short']; ?>">
                                    <div class="icon-text-in">
                                        <span><?php echo htmlspecialchars($section['grade_level'] . ' - ' . $section['section']); ?></span>
                                        <p><?php echo htmlspecialchars(getAdviser($section['gender'], $section['teacher_lname'], $section['teacher_fname'])); ?></p>
                                    </div>
                                    <img src="/SCES/assets/images/<?php echo $section['short']; ?>.png"
                                        alt="<?php echo $section['short']; ?> icon">
                                </div>
                                <div class="icon-text">
                                    <span><?php echo htmlspecialchars($section['grade_level'] . ' - ' . $section['section']); ?></span>
                                    <p><?php echo htmlspecialchars(getAdviser($section['gender'], $section['teacher_lname'], $section['teacher_fname'])); ?></p>
                                </div>
                            </a>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <div class="no-data-box">
                            <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                            <h1>No section found. Are you registered?</h1>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
    ?>