<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-head.php';
?>
<link rel="stylesheet" href="/SCES/assets/style/subjects.css" />
<title>Subjects | SCES Online Learning Platform</title>
</head>

<body>
  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-popup.php';
  ?>
  <div class="container">
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-sidebar.php';
    ?>
    <div class="content">
      <?php
      include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-header.php';
      ?>
      <div class="subject-panel">
        <div class="title-box">
          <img src="/SCES/assets/images/graduation-cap.png" alt="graduation-cap.png">
          <h1>Academic Subjects</h1>
        </div>
        <?php $subjects = $db->getSubjects($sectionId, $level_id); ?>
        <div class="subject-box <?php echo empty($subjects) ? 'no-data-box-centered' : ''; ?>">
          <?php if ($subjects): ?>
            <?php foreach ($subjects as $subject): ?>
              <a href="/SCES/frontend/student/subject-module.php?subject=<?php echo urlencode($subject['subject']); ?>">
                <div class="box">
                  <div class="box-icon <?php echo strtolower($subject['subject_code']); ?>">
                    <div class="box-title">
                      <h1><?php echo htmlspecialchars($subject['subject']); ?></h1>
                      <span><?php echo htmlspecialchars(($subject['gender'] == 'Female' ? 'Ms. ' : 'Mr. ') . $subject['teacher_fname'] . ' ' . $subject['teacher_lname']); ?></span>
                    </div>
                    <img src="/SCES/assets/images/<?php echo htmlspecialchars($subject['icon']); ?>"
                      alt="<?php echo htmlspecialchars($subject['icon']); ?>">
                  </div>
                  <div class="box-title">
                    <h1><?php echo htmlspecialchars($subject['subject']); ?></h1>
                    <span><?php echo htmlspecialchars(($subject['gender'] == 'Female' ? 'Ms. ' : 'Mr. ') . $subject['teacher_fname'] . ' ' . $subject['teacher_lname']); ?></span>
                  </div>
                </div>
              </a>
            <?php endforeach; ?>
          <?php else: ?>
            <div class="no-data-box">
              <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
              <h1>No subject found. Are you enrolled?</h1>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </div>
  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-footer.php';
  ?>