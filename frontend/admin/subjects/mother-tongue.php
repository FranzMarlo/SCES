<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
$section = isset($_GET['section']) ? htmlspecialchars($_GET['section']) : '';
$currentSubject = isset($_GET['subject']) ? htmlspecialchars($_GET['subject']) : '';
$gradeLevel = isset($_GET['gradelevel']) ? htmlspecialchars($_GET['gradelevel']) : '';
$subject = $db->getTeacherSubjectDetails($teacherId, $section, $currentSubject, $gradeLevel);
$current_page = 'subject.php';
$page = 'Lessons';
?>
<link rel="stylesheet" href="/SCES/assets/style/admin-lesson.css" />
<title>Mother Tongue | SCES Online Learning Platform</title>
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
            <div class="header-bg mt">
              <div class="icon-container">
                <img src="/SCES/assets/images/<?php echo htmlspecialchars($subject['icon']); ?>" alt="mt-icon">
              </div>
            </div>
            <div class="header-text">
              <h1><?php echo htmlspecialchars($subject['subject_title']); ?></h1>
              <span><?php echo htmlspecialchars($subject['grade_level'] . ' - ' . $subject['section']); ?></span>
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
              <div class="add-lesson">
                <div class="add-item">
                  <img src="/SCES/assets/images/bag-icon.png" alt="add lesson icon">
                  <span>Add lesson to class subject</span>
                </div>
                <div class="add-item">
                  <i class="fa-solid fa-circle-plus"></i>
                </div>
              </div>
              <div class="lesson-item mt-item">
                <div class="lesson-title">
                  <h1>Lesson 1</h1>
                  <span>Alphabetong Filipino</span>
                </div>
                <div class="view-lesson">
                  <span>View Lesson <i class="fa-solid fa-circle-chevron-right"></i></span>
                </div>
              </div>
              <div class="lesson-item mt-item">
                <div class="lesson-title">
                  <h1>Lesson 2</h1>
                  <span>Patinig At Katinig</span>
                </div>
                <div class="view-lesson">
                  <span>View Lesson <i class="fa-solid fa-circle-chevron-right"></i></span>
                </div>
              </div>
              <div class="lesson-item mt-item">
                <div class="lesson-title">
                  <h1>Lesson 3</h1>
                  <span>Pagtukoy Sa Huni At Tunog</span>
                </div>
                <div class="view-lesson">
                  <span>View Lesson <i class="fa-solid fa-circle-chevron-right"></i></span>
                </div>
              </div>
              <div class="lesson-item mt-item">
                <div class="lesson-title">
                  <h1>Lesson 4</h1>
                  <span>Wastong Paggamit Ng Baybay At Bantas</span>
                </div>
                <div class="view-lesson">
                  <span>View Lesson <i class="fa-solid fa-circle-chevron-right"></i></span>
                </div>
              </div>
              <div class="lesson-item mt-item">
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
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
  ?>