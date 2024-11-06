<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/helper.php';
?>
<title>Home | SCES Online Learning Platform</title>
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
      <div class="about-panel">
        <div class="about-text">
          <h1>Hi, <?php echo htmlspecialchars($firstName); ?></h1>
          <p>This online learning platform serves as a welcoming home for learners.</p>
          <a href="/SCES/frontend/student/help.php" class="link-btn">Learn More</a>
        </div>
        <div class="about-img">
          <img src="/SCES/assets/images/dashboard-overview.png" alt="dashboard overview icon">
        </div>
      </div>
      <div class="overview-panel">
        <div class="overview-title">
          <h1>Overview</h1>
        </div>
        <div class="overview-container">
          <div class="box completion">
            <div class="img-container">
              <img src="/SCES/assets/images/completion-icon.png" alt="completion icon">
            </div>
            <div class="data-container">
              <?php $completionRate = $db->studentGetQuizCompletion($studentId); ?>
              <h1><?php echo htmlspecialchars($completionRate); ?></h1>
              <p>Completion</p>
            </div>
          </div>
          <div class="box pending">
            <div class="img-container">
              <img src="/SCES/assets/images/pending-icon.png" alt="pending icon">
            </div>
            <div class="data-container">
              <?php $totalPendingQuizzes = $db->studentGetPendingQuizzesCount($sectionId, $studentId); ?>
              <h1><?php echo htmlspecialchars($totalPendingQuizzes); ?></h1>
              <p>Pending Quiz</p>
            </div>
          </div>
          <?php $subjectData = $db->studentGetAverageScoreBySubject($studentId, $sectionId); ?>
          <div class="box excel">
            <div class="img-container">
              <img src="/SCES/assets/images/excel-icon.png" alt="excel icon">
            </div>
            <div class="data-container">
              <h1 class="<?php echo htmlspecialchars(getSubjectFontSize($subjectData['largest'])); ?>">
                <?php echo htmlspecialchars($subjectData['largest']); ?>
              </h1>
              <p>Excels In</p>
            </div>
          </div>
          <div class="box regress">
            <div class="img-container">
              <img src="/SCES/assets/images/regress-icon.png" alt="regress icon">
            </div>
            <div class="data-container">
              <h1 class="<?php echo htmlspecialchars(getSubjectFontSize($subjectData['smallest'])); ?>">
                <?php echo htmlspecialchars($subjectData['smallest']); ?>
              </h1>
              <p>Regress In</p>
            </div>
          </div>
        </div>
      </div>
      <div class="to-do-panel">
        <div class="to-do-header">
          <i class="fa-solid fa-calendar"></i>
          <h1>To-do</h1>
        </div>
        <?php $pendingQuizzes = $db->studentGetPendingQuizzes($sectionId, $studentId); ?>
        <?php if ($pendingQuizzes): ?>
          <?php foreach ($pendingQuizzes as $quiz): ?>
            <?php $dueDate = formatDueDate($quiz['due_date']); ?>
            <a href="/SCES/frontend/student/quizzes.php?quiz_id=<?php echo $quiz['quiz_id']; ?>&active=true"
              class="to-do-item">
              <h1 class="to-do-subject"><?php echo htmlspecialchars($quiz['subject']); ?></h1>
              <p class="to-do-lesson">
                <?php echo htmlspecialchars('Lesson ' . $quiz['lesson_number'] . ' - Quiz ' . $quiz['quiz_number']); ?>
              </p>
              <p class="to-do-date"><?php echo htmlspecialchars($dueDate); ?></p>
            </a>
          <?php endforeach; ?>
        <?php else: ?>
          <div class="no-data-item">
            <h1>No pending quiz found!</h1>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </div>
  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-footer.php';
  ?>