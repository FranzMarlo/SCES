<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/data-tables.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/section.css" />
<title>Student List | SCES Online Learning Platform</title>
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
            <div class="section-panel">
                <div class="panel-title">
                    <img src="/SCES/assets/images/quiz-grade-section.png" alt="section icon">
                    <h1>Sections</h1>
                </div>
                <?php $sections = $db->facultyGetSection($teacherId); ?>
                <div class="section-container <?php echo empty($sections) ? 'no-data-box-centered' : ''; ?>">
                    <?php if ($sections): ?>
                        <?php foreach ($sections as $section): ?>
                            <a href="/SCES/frontend/faculty/student-section.php?section=<?php echo $section['section_id']; ?>" class="section-item">
                                <div class="icon-box <?php echo $section['short']; ?>">
                                    <div class="icon-text-in">
                                        <span><?php echo htmlspecialchars($section['grade_level'] . ' - ' . $section['section']); ?></span>
                                    </div>
                                    <img src="/SCES/assets/images/<?php echo $section['short']; ?>.png"
                                        alt="<?php echo $section['short']; ?> icon">
                                </div>
                                <div class="icon-text">
                                    <span><?php echo htmlspecialchars($section['grade_level'] . ' - ' . $section['section']); ?></span>
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
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-footer.php';
    ?>