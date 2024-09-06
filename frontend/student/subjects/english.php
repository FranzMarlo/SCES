<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-head.php';
$subject = $db->getSubjectDetails('English 1', $sectionId, $level_id);
$current_page = 'subject.php';
?>
<link rel="stylesheet" href="/SCES/assets/style/lessons.css" />
<title>English | SCES Online Learning Platform</title>
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
              <h1>Learning Materials</h1>
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
            <div class="header-bg eng">
              <div class="icon-container">
                <img src="/SCES/assets/images/<?php echo htmlspecialchars($subject['icon']); ?>" alt="english-icon">
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
                <h1>Learning Materials</h1>
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
              <div class="lesson-item eng-item">
                <div class="lesson-title">
                  <h1>Lesson 1</h1>
                  <span>Alphabetong Filipino</span>
                </div>
                <div class="view-lesson">
                  <span>View Lesson <i class="fa-solid fa-circle-chevron-right"></i></span>
                </div>
              </div>
              <div class="lesson-item eng-item">
                <div class="lesson-title">
                  <h1>Lesson 2</h1>
                  <span>Patinig At Katinig</span>
                </div>
                <div class="view-lesson">
                  <span>View Lesson <i class="fa-solid fa-circle-chevron-right"></i></span>
                </div>
              </div>
              <div class="lesson-item eng-item">
                <div class="lesson-title">
                  <h1>Lesson 3</h1>
                  <span>Pagtukoy Sa Huni At Tunog</span>
                </div>
                <div class="view-lesson">
                  <span>View Lesson <i class="fa-solid fa-circle-chevron-right"></i></span>
                </div>
              </div>
              <div class="lesson-item eng-item">
                <div class="lesson-title">
                  <h1>Lesson 4</h1>
                  <span>Wastong Paggamit Ng Baybay At Bantas</span>
                </div>
                <div class="view-lesson">
                  <span>View Lesson <i class="fa-solid fa-circle-chevron-right"></i></span>
                </div>
              </div>
              <div class="lesson-item eng-item">
                <div class="lesson-title">
                  <h1>Lesson 5</h1>
                  <span>Salitang Pamalit Sa Ngalan Ng Tao</span>
                </div>
                <div class="view-lesson">
                  <span>View Lesson <i class="fa-solid fa-circle-chevron-right"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-footer.php';
  ?>