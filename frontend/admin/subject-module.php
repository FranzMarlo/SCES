<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/subject-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/data-tables.php';
?>
<link rel="stylesheet" href="/SCES/assets/style/admin-lesson.css" />
<link rel="stylesheet" href="/SCES/assets/style/filter.css" />
<title><?php echo htmlspecialchars($subject['subject']);?> | SCES Online Learning Platform</title>
</head>

<body data-section="<?php echo htmlspecialchars($_GET['section'] ?? '', ENT_QUOTES); ?>"
  data-subject="<?php echo htmlspecialchars($_GET['subject'] ?? '', ENT_QUOTES); ?>"
  data-teacher="<?php echo htmlspecialchars($_GET['teacher'] ?? '', ENT_QUOTES); ?>"
  data-gradeLevel="<?php echo htmlspecialchars($subject['grade_level'] ?? '', ENT_QUOTES); ?>"
  data-level="<?php echo htmlspecialchars($subject['level_id'] ?? '', ENT_QUOTES); ?>"
  data-title="<?php echo htmlspecialchars($subject['subject_title'] ?? '', ENT_QUOTES); ?>"
  data-subject-name="<?php echo htmlspecialchars($subject['subject'] ?? '', ENT_QUOTES); ?>">
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
            <h1><?php echo htmlspecialchars($page); ?></h1>
          </div>
        </div>
        <div class="lesson-container">
          <div class="tab-controller">
            <div class="tab <?php echo strtolower($subject['subject_code']); ?>" id="lessonTab">Lessons</div>
            <div class="tab <?php echo strtolower($subject['subject_code']); ?>" id="studentTab">Students</div>
            <div class="tab <?php echo strtolower($subject['subject_code']); ?>" id="recordsTab">Records</div>
            <div class="tab <?php echo strtolower($subject['subject_code']); ?>" id="analyticsTab">Analytics</div>
          </div>
          <div class="tab-container" id="lessonContainer">
            <div class="lesson-header">
              <div class="header-bg <?php echo strtolower($subject['subject_code']); ?>">
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
                  <div class="module-item lessons" id="moduleLessons">
                    <span>Lessons</span>
                  </div>
                  <div class="module-item students" id="moduleStudents">
                    <span>Students</span>
                  </div>
                  <div class="module-item records" id="moduleRecords">
                    <span>Records</span>
                  </div>
                  <div class="module-item analytics" id="moduleAnalytics">
                    <span>Analytics</span>
                  </div>
                </div>
              </div>
              <div class="lesson-box" id="lessonContainer">
                <div class="add-lesson" id="addLesson">
                  <div class="add-item">
                    <img src="/SCES/assets/images/bag-icon.png" alt="add lesson icon">
                    <span>Add lesson to class subject</span>
                  </div>
                  <div class="add-item">
                    <i class="fa-solid fa-circle-plus"></i>
                  </div>
                </div>
                <?php $lessons = $db->facultyGetLessons($subject['level_id'], $subject['subject_id'], $subject['section_id']); ?>
                <?php if ($lessons): ?>
                  <?php foreach ($lessons as $lesson): ?>
                    <div class="lesson-item <?php echo strtolower($subject['subject_code']); ?>-item">
                      <div class="lesson-title">
                        <h1>Lesson <?php echo htmlspecialchars($lesson['lesson_number']); ?></h1>
                        <span><?php echo htmlspecialchars($lesson['lesson_title']); ?></span>
                      </div>
                      <a href="/SCES/frontend/admin/view-lesson.php?pdf=<?php echo urlencode($lesson['pdf_file']); ?>&lesson_number=<?php echo urlencode($lesson['lesson_number']); ?>&subject_id=<?php echo urlencode($lesson['subject_id']); ?>"
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
          <div class="tab-container" id="studentContainer">
            <div class="container-title">
              <img src="/SCES/assets/images/profile-scores.png" alt="profile-scores.png">
              <h1>Student List</h1>
            </div>
            <div class="table-responsive">
              <table id="studentsTable" class="display data-table">
                <thead>
                  <tr class="<?php echo strtolower($subject['subject_code']); ?>">
                    <th>Student Icon</th>
                    <th>LRN</th>
                    <th>Student ID</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>More</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-container" id="recordsContainer">
            <div class="container-title">
              <img src="/SCES/assets/images/personal-info.png" alt="personal-info.png">
              <h1>Student Records</h1>
            </div>
            <div class="table-responsive">
              <table id="recordsTable" class="display data-table">
                <thead>
                  <tr class="<?php echo strtolower($subject['subject_code']); ?>">
                    <th>Full Name</th>
                    <th>Quiz Number</th>
                    <th>Score</th>
                    <th>Remarks</th>
                    <th>Submission Time</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-container" id="analyticsContainer">
            <div class="container-title">
              <img src="/SCES/assets/images/profile-analytics.png" alt="profile-analytics.png">
              <h1>Analytics</h1>
            </div>
            <div class="stats-panel">
              <div class="panel-box completed">
                <img src="/SCES/assets/images/quiz-passed.png" alt="quiz-passed.png">
                <div class="panel-col">
                  <p>Quiz Completed</p>
                  <span id="subjectTotalCompletion"></span>
                </div>
              </div>
              <div class="panel-box pending">
                <img src="/SCES/assets/images/hourglass.png" alt="hourglass.png">
                <div class="panel-col">
                  <p>Pending Quiz</p>
                  <span id="subjectTotalQuizzes"></span>
                </div>
              </div>
              <div class="panel-box quiz-score">
                <img src="/SCES/assets/images/gpa.png" alt="gpa.png">
                <div class="panel-col">
                  <p>Average Score</p>
                  <span id="subjectAverageScore"></span>
                </div>
              </div>
              <div class="panel-box average">
                <img src="/SCES/assets/images/subject-highest.png" alt="subject-highest.png">
                <div class="panel-col">
                  <p>Highest Average</p>
                  <span id="subjectHighestAverage"></span>
                </div>
              </div>
            </div>
            <div class="graph-container">
              <div class="pie-chart">
                <canvas id="subjectPieChart"></canvas>
              </div>
              <div class="line-chart">
                <canvas id="subjectLineChart"></canvas>
              </div>
            </div>
            <div class="container-title">
              <img src="/SCES/assets/images/quiz-score.png" alt="quiz-score.png">
              <h1>Students Ranking</h1>
            </div>
            <div class="table-responsive">
              <table id="rankingTable" class="display data-table">
                <thead>
                  <tr class="<?php echo strtolower($subject['subject_code']); ?>">
                    <th>Rank</th>
                    <th>LRN</th>
                    <th>Student ID</th>
                    <th>Full Name</th>
                    <th>Average Score</th>
                    <th>More</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-add-lesson.php';
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/view-students-modal.php';
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
  ?>
  <script src="/SCES/assets/script/datatables.min.js"></script>
  <script src="https://cdn.datatables.net/responsive/2.4.0/js/dataTables.responsive.min.js"></script>
  <script src="/SCES/assets/script/admin-lesson.js"></script>