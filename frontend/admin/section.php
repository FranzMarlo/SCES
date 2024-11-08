<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/data-tables.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/helper.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/admin-section.css" />
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
                    <div class="title-part">
                        <img src="/SCES/assets/images/quiz-grade-section.png" alt="section icon">
                        <h1>Sections</h1>
                    </div>
                    <button class="add-btn" id=addSectionBtn><i class="fa-solid fa-graduation-cap"></i></i>Add
                        Section</button>
                </div>
                <div class="item-container">
                    <div class="tab-controller">
                        <div class="tab-container">
                            <div class="tab-item" id=sectionTab>Sections</div>
                            <div class="tab-item" id="archivedTab">Archived</div>
                        </div>
                        <div class="search-container">
                            <input type="text" id="sectionSearch" placeholder="Search Section"
                                onkeyup="filterSections()">
                            <i class="fa fa-search search-icon"></i>
                        </div>
                    </div>
                    <?php $sections = $db->adminGetSection(); ?>
                    <?php $archived = $db->adminGetArchivedSection(); ?>
                    <div class="section-container <?php echo empty($sections) ? 'no-data-box-centered' : ''; ?>"
                        id="sectionContainer">
                        <?php if ($sections): ?>
                            <?php foreach ($sections as $section): ?>
                                <div class="section-item"
                                    data-section-adviser="<?php echo htmlspecialchars($section['teacher_fname'] . ' ' . $section['teacher_lname']); ?>"
                                    data-section-year="<?php echo htmlspecialchars($section['year']); ?>"
                                    data-section-section="<?php echo htmlspecialchars($section['section']); ?>"
                                    data-section-level="<?php echo htmlspecialchars($section['grade_level']); ?>">
                                    <a href="/SCES/frontend/admin/student-section.php?section=<?php echo $section['section_id']; ?>"
                                        class="hidden-link"></a>
                                    <div class="icon-box <?php echo $section['short']; ?>" onclick="sectionLink(this)">
                                        <button class="section-btn" onclick="sectionBtn(event, this)">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <div class="icon-text-in" onclick="sectionLink(this)">
                                            <span><?php echo htmlspecialchars($section['grade_level'] . ' - ' . $section['section']); ?></span>
                                            <p><?php echo htmlspecialchars(getAdviser($section['gender'], $section['teacher_lname'], $section['teacher_fname'])); ?>
                                            </p>
                                        </div>
                                        <img src="/SCES/assets/images/<?php echo $section['short']; ?>.png"
                                            alt="<?php echo $section['short']; ?> icon">
                                    </div>
                                    <div class="icon-text" onclick="sectionLink(this)">
                                        <span><?php echo htmlspecialchars($section['grade_level'] . ' - ' . $section['section']); ?></span>
                                        <p><?php echo htmlspecialchars(getAdviser($section['gender'], $section['teacher_lname'], $section['teacher_fname'])); ?>
                                        </p>
                                    </div>
                                    <div class="popup-menu">
                                        <ul>
                                            <li><a href="javascript:void(0)" class="edit-btn"
                                                    data-section-id="<?php echo htmlspecialchars($section['section_id']); ?>">Edit</a>
                                            </li>
                                            <li><a href="javascript:void(0)" class="archive-btn"
                                                    data-section-id="<?php echo htmlspecialchars($section['section_id']); ?>">Archive</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <div class="no-data-box">
                                <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                                <h1>No section found.</h1>
                            </div>
                        <?php endif; ?>
                    </div>
                    <div class="section-container <?php echo empty($archived) ? 'no-data-box-centered' : ''; ?>"
                        id="archivedContainer">
                        <?php if ($archived): ?>
                            <?php foreach ($archived as $archive): ?>
                                <div class="section-item"
                                    data-section-adviser="<?php echo htmlspecialchars($archive['teacher_fname'] . ' ' . $archive['teacher_lname']); ?>"
                                    data-section-year="<?php echo htmlspecialchars($archive['year']); ?>"
                                    data-section-section="<?php echo htmlspecialchars($archive['section']); ?>"
                                    data-section-level="<?php echo htmlspecialchars($archive['grade_level']); ?>">
                                    <a href="/SCES/frontend/admin/student-section.php?section=<?php echo $archive['section_id']; ?>"
                                        class="hidden-link"></a>
                                    <div class="icon-box <?php echo $archive['short']; ?>" onclick="sectionLink(this)">
                                        <button class="section-btn" onclick="sectionBtn(event, this)">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <div class="icon-text-in" onclick="sectionLink(this)">
                                            <span><?php echo htmlspecialchars($archive['grade_level'] . ' - ' . $archive['section']); ?></span>
                                            <p><?php echo htmlspecialchars(getAdviser($archive['gender'], $archive['teacher_lname'], $archive['teacher_fname'])); ?>
                                            </p>
                                        </div>
                                        <img src="/SCES/assets/images/<?php echo $archive['short']; ?>.png"
                                            alt="<?php echo $archive['short']; ?> icon">
                                    </div>
                                    <div class="icon-text" onclick="sectionLink(this)">
                                        <span><?php echo htmlspecialchars($archive['grade_level'] . ' - ' . $archive['section']); ?></span>
                                        <p><?php echo htmlspecialchars(getAdviser($archive['gender'], $archive['teacher_lname'], $archive['teacher_fname'])); ?>
                                        </p>
                                    </div>
                                    <div class="popup-menu">
                                        <ul>
                                            <li><a href="javascript:void(0)" class="edit-btn"
                                                    data-section-id="<?php echo htmlspecialchars($archive['section_id']); ?>">Edit</a>
                                            </li>
                                            <li><a href="javascript:void(0)" class="not-archive-btn"
                                                    data-section-id="<?php echo htmlspecialchars($archive['section_id']); ?>">Enable</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <div class="no-data-box">
                                <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                                <h1>No archived section found.</h1>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        <script src="/SCES/assets/script/search-filter.js"></script>
        <?php
        include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/section-modal.php';
        include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
        ?>
        <script src="/SCES/assets/script/admin-section.js"></script>