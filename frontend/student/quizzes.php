<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-head.php';
?>
<link rel="stylesheet" href="/SCES/assets/style/quizzes.css" />
<title>Filipino | SCES Online Learning Platform</title>
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
      <div class="quiz-panel">
        <?php $activeQuizzes = $db->studentGetQuizzes($sectionId, 'Active'); ?>
        <div class="title-box">
          <div class="text-box">
            <img src="/SCES/assets/images/graduation-cap.png" alt="graduation-cap.png">
            <h1>Academic Quizzes</h1>
          </div>
          <div class="quiz-dropdown" id="activeDropdown">
            <div class="quiz-btn">
              <i class="fa-solid fa-ellipsis-vertical icon"></i>
            </div>
            <div class="quiz-dropdown-content">
              <div class="quiz-dropdown-title">
                <img src="/SCES/assets/images/pending-quiz.png" alt="pending-quiz.png">
                <h1>Pending Quizzes</h1>
              </div>
              <?php if ($activeQuizzes): ?>
                <?php foreach ($activeQuizzes as $index => $quiz): ?>
                  <div class="pending <?php echo strtolower($quiz['subject_code']); ?>"
                    data-quiz-index="<?php echo $index; ?>" data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                    <span><?php echo htmlspecialchars($quiz['subject']) ?> - Quiz
                      <?php echo htmlspecialchars($quiz['quiz_number']) ?></span>
                  </div>
                <?php endforeach; ?>
              <?php else: ?>
                <div class="no-data-item">
                  <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                  <h1>No Quiz Added.</h1>
                  <h1>Add A Quiz By Clicking The Button Above.</h1>
                </div>
              <?php endif; ?>
            </div>
          </div>
        </div>
        <div class="quiz-container" id="activeQuizContainer">
          <div class="pending-container">
            <div class="pending-title">
              <img src="/SCES/assets/images/pending-quiz.png" alt="pending-quiz.png">
              <h1>Pending Quizzes</h1>
            </div>
            <?php if ($activeQuizzes): ?>
              <?php foreach ($activeQuizzes as $index => $quiz): ?>
                <div class="pending-item <?php echo strtolower($quiz['subject_code']); ?>"
                  data-quiz-index="<?php echo $index; ?>" data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                  <span><?php echo htmlspecialchars($quiz['subject']) ?> - Quiz
                    <?php echo htmlspecialchars($quiz['quiz_number']) ?></span>
                </div>
              <?php endforeach; ?>
            <?php else: ?>
              <div class="no-data-item">
                <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                <h1>No Pending Quiz Found</h1>
                <h1>Your Teacher Hasn't Published Your Quiz Yet</h1>
              </div>
            <?php endif; ?>
          </div>
          <div class="header-container">
            <?php if ($activeQuizzes): ?>
              <?php foreach ($activeQuizzes as $index => $quiz): ?>
                <div class="quiz-header" data-quiz-index="<?php echo $index; ?>"
                  data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                  <div class="header-bg <?php echo strtolower($quiz['subject_code']); ?>">
                    <div class="icon-container">
                      <img src="/SCES/assets/images/<?php echo htmlspecialchars($quiz['icon']); ?>"
                        alt="<?php echo htmlspecialchars($quiz['icon']); ?>">
                    </div>
                  </div>
                  <div class="header-text">
                    <img src="/SCES/assets/images/quiz-1.png" alt="quiz-1.png">
                    <h1>Quiz
                      <?php echo htmlspecialchars($quiz['quiz_number']) . ' - ' . htmlspecialchars($quiz['title']); ?>
                    </h1>
                  </div>
                </div>
                
              <?php endforeach; ?>
            <?php else: ?>
              <div class="no-quiz-header">
                <img src="/SCES/assets/images/info-icon.png" alt="info-icon.png">
                <h1>Please Add A Quiz First</h1>
              </div>
            <?php endif; ?>

          </div>
        </div>
      </div>
    </div>
  </div>

  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-footer.php';
  ?>