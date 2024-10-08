<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/subject-head.php';
?>
<link rel="stylesheet" href="/SCES/assets/style/lessons.css" />
<title>EPP | SCES Online Learning Platform</title>
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
      <div class="lesson-panel">
        <div class="title-box">
          <div class="text-box">
            <img src="/SCES/assets/images/graduation-cap.png" alt="graduation-cap.png">
            <h1>Academic Lessons</h1>
          </div>
          <div class="module-dropdown">
            <div class="module-btn">
              <i class="fa-solid fa-ellipsis-vertical icon"></i>
            </div>
            <div class="module-dropdown-content">
              <h1>Select Quarter:</h1>
              <button class="quarter-1">
                Quarter 1
              </button>
              <button class="quarter-2">
                Quarter 2
              </button>
              <button class="quarter-3">
                Quarter 3
              </button>
              <button class="quarter-4">
                Quarter 4
              </button>
            </div>
          </div>
        </div>
        <div class="lesson-container">
          <div class="lesson-header">
            <div class="header-bg ap">
              <div class="icon-container">
                <img src="/SCES/assets/images/<?php echo htmlspecialchars($subject['icon']); ?>" alt="ap-icon">
              </div>
            </div>
            <div class="header-text">
              <h1><?php echo htmlspecialchars($subject['subject_title']); ?></h1>
              <span><?php echo htmlspecialchars(($subject['gender'] == 'Female' ? 'Ms. ' : 'Mr. ') . $subject['teacher_fname'] . ' ' . $subject['teacher_lname']); ?></span>
            </div>
          </div>
          <div class="lesson-content">
            <div class="module-container">
              <div class="module-box">
                <h1>Select Quarter:</h1>
                <div class="module-item quarter-1">
                  <span>Quarter 1</span>
                </div>
                <div class="module-item quarter-2">
                  <span>Quarter 2</span>
                </div>
                <div class="module-item quarter-3">
                  <span>Quarter 3</span>
                </div>
                <div class="module-item quarter-4">
                  <span>Quarter 4</span>
                </div>
              </div>
            </div>
            <div class="lesson-box">
              <?php $lessons = $db->studentGetLessons($subject['level_id'], $subject['subject_id'], $subject['section_id']); ?>
              <?php if ($lessons): ?>
                <?php foreach ($lessons as $lesson): ?>
                  <div class="lesson-item epp-item">
                    <div class="lesson-title">
                      <h1>Lesson <?php echo htmlspecialchars($lesson['lesson_number']); ?></h1>
                      <span><?php echo htmlspecialchars($lesson['lesson_title']); ?></span>
                    </div>
                    <a href="/SCES/frontend/student/view-lesson.php?pdf=<?php echo urlencode($lesson['pdf_file']); ?>&lesson_number=<?php echo urlencode($lesson['lesson_number']); ?>&subject_id=<?php echo urlencode($lesson['subject_id']); ?>"
                      class="view-lesson" target="_blank">View Lesson <i class="fa-solid fa-circle-chevron-right"></i></a>
                  </div>
                <?php endforeach; ?>
              <?php else: ?>
                <div class="no-data-box">
                  <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                  <h1>No lessons uploaded.</h1>
                  <h1>Upload a lesson by clicking the button above.</h1>
                </div>
              <?php endif; ?>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-footer.php';
  ?>