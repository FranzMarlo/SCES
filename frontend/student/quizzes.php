<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/helper.php';
?>
<link rel="stylesheet" href="/SCES/assets/style/quizzes.css" />
<script src="/SCES/assets/script/student-quiz.js"></script>
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
        <?php $activeQuizzes = $db->studentGetQuizzes($sectionId, $studentId, 'Active'); ?>
        <?php $pastQuizzes = $db->studentGetQuizzes($sectionId, $studentId, 'Completed'); ?>
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
          <div class="quiz-dropdown" id="pastDropdown">
            <div class="quiz-btn">
              <i class="fa-solid fa-ellipsis-vertical icon"></i>
            </div>
            <div class="quiz-dropdown-content">
              <div class="quiz-dropdown-title">
                <img src="/SCES/assets/images/quiz-past.png" alt="quiz-past.png">
                <h1>Past Quizzes</h1>
              </div>
              <?php if ($pastQuizzes): ?>
                <?php foreach ($pastQuizzes as $index => $quiz): ?>
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
        <div class="quiz-container">
          <div class="tab-controller">
            <div class="tab" id="pending-tab">Pending Quizzes</div>
            <div class="tab" id="past-tab">Past Quizzes</div>
          </div>
          <div class="sub-container" id="activeQuizContainer">
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
                  <h1>No pending quiz found</h1>
                  <h1>Quiz hasn't been published yet</h1>
                </div>
              <?php endif; ?>
            </div>
            <div class="header-container">
              <?php if ($activeQuizzes): ?>
                <?php foreach ($activeQuizzes as $index => $quiz): ?>
                  <div class="quiz-header" id="header-quiz-<?php echo htmlspecialchars($quiz['quiz_id']); ?>"
                    data-quiz-index="<?php echo $index; ?>" data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']); ?>"
                    style="display: <?php echo ($index === 0) ? 'block' : 'none'; ?>;">
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
                  <div class="notice-box" id="notice-quiz-<?php echo htmlspecialchars($quiz['quiz_id']); ?>"
                    style="display: <?php echo ($index === 0) ? 'flex' : 'none'; ?>;">
                    <img src="/SCES/assets/images/quiz-notice.png" alt="quiz-notice.png">
                    <span><?php echo htmlspecialchars(getQuizAttemptNotice($quiz['attempts'])); ?></span>
                  </div>

                  <div class="info-container quiz-info-container"
                    id="quiz-<?php echo htmlspecialchars($quiz['quiz_id']); ?>"
                    style="display: <?php echo ($index === 0) ? 'flex' : 'none'; ?>;">
                    <div class="info-part">
                      <div class="info-data">
                        <img src="/SCES/assets/images/quiz-subject.png" alt="quiz-subject.png">
                        <div class="quiz-info">
                          <h1>Subject</h1>
                          <span><?php echo htmlspecialchars($quiz['subject_title']); ?></span>
                        </div>
                      </div>
                      <div class="info-data">
                        <img src="/SCES/assets/images/quiz-lesson.png" alt="quiz-lesson.png">
                        <div class="quiz-info">
                          <h1>Lesson</h1>
                          <span><?php echo htmlspecialchars($quiz['lesson_title']); ?></span>
                        </div>
                      </div>
                      <div class="info-data">
                        <img src="/SCES/assets/images/quiz-grade-section.png" alt="quiz-grade-section.png">
                        <div class="quiz-info">
                          <h1>Grade & Section</h1>
                          <span><?php echo htmlspecialchars($quiz['grade_level']) . ' - ' . htmlspecialchars($quiz['section']); ?></span>
                        </div>
                      </div>
                      <div class="info-data">
                        <img
                          src="/SCES/assets/images/<?php echo ($quiz['gender'] == 'Female') ? 'quiz-female-teacher.png' : 'quiz-male-teacher.png'; ?>"
                          alt="quiz-teacher.png">
                        <div class="quiz-info">
                          <h1>Teacher</h1>
                          <span><?php echo ($quiz['gender'] == 'Female' ? 'Ms. ' : 'Mr. ') . htmlspecialchars($quiz['teacher_fname']) . ' ' . htmlspecialchars($quiz['teacher_lname']); ?></span>
                        </div>
                      </div>
                    </div>
                    <div class="info-part">
                      <div class="info-data">
                        <img src="/SCES/assets/images/quiz-question.png" alt="quiz-question.png">
                        <div class="quiz-info">
                          <h1>Number of Items</h1>
                          <span><?php echo htmlspecialchars($quiz['item_number']); ?></span>
                        </div>
                      </div>
                      <?php
                      $formattedDate = formatDueDate($quiz['due_date']); ?>
                      <div class="info-data">
                        <img src="/SCES/assets/images/quiz-due-date.png" alt="quiz-due-date.png">
                        <div class="quiz-info">
                          <h1>Due Date</h1>
                          <span><?php echo htmlspecialchars($formattedDate); ?></span>
                        </div>
                      </div>
                      <div class="info-data">
                        <img src="/SCES/assets/images/quiz-score.png" alt="quiz-score.png">
                        <div class="quiz-info">
                          <h1>Score</h1>
                          <span><?php echo formatQuizScore($quiz['score'], $quiz['item_number']); ?></span>
                        </div>
                      </div>
                      <?php $remarks = formatQuizRemarks($quiz['remarks']); ?>
                      <div class="info-data">
                        <img src="<?php echo htmlspecialchars($remarks['image']); ?>" alt="quiz-remarks.png">
                        <div class="quiz-info">
                          <h1>Remarks</h1>
                          <span><?php echo htmlspecialchars($remarks['text']); ?></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="button-container" id="button-quiz-<?php echo htmlspecialchars($quiz['quiz_id']); ?>"
                    style="display: <?php echo ($index === 0) ? 'flex' : 'none'; ?>;">
                    <button class="take-quiz" id="take-quiz-<?php echo htmlspecialchars($quiz['quiz_id']); ?>"
                      data-attempts="<?php echo htmlspecialchars($quiz['attempts']); ?>">Take
                      Quiz</button>
                  </div>
                <?php endforeach; ?>
              <?php else: ?>
                <div class="no-quiz-header">
                  <img src="/SCES/assets/images/info-icon.png" alt="info-icon.png">
                  <h1>Uploaded quiz info will be displayed here</h1>
                </div>
              <?php endif; ?>

            </div>
          </div>
          <div class="sub-container" id="pastQuizContainer">
            <div class="pending-container">
              <div class="pending-title">
                <img src="/SCES/assets/images/quiz-past.png" alt="quiz-past.png">
                <h1>Past Quizzes</h1>
              </div>
              <?php if ($pastQuizzes): ?>
                <?php foreach ($pastQuizzes as $index => $quiz): ?>
                  <div class="pending-item <?php echo strtolower($quiz['subject_code']); ?>"
                    data-quiz-index="<?php echo $index; ?>" data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']) ?>">
                    <span><?php echo htmlspecialchars($quiz['subject']) ?> - Quiz
                      <?php echo htmlspecialchars($quiz['quiz_number']) ?></span>
                  </div>
                <?php endforeach; ?>
              <?php else: ?>
                <div class="no-data-item">
                  <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                  <h1>No Quizzes found in history</h1>
                </div>
              <?php endif; ?>
            </div>
            <div class="header-container">
              <?php if ($pastQuizzes): ?>
                <?php foreach ($pastQuizzes as $index => $quiz): ?>
                  <div class="quiz-header" id="header-quiz-<?php echo htmlspecialchars($quiz['quiz_id']); ?>"
                    data-quiz-index="<?php echo $index; ?>" data-quiz-id="<?php echo htmlspecialchars($quiz['quiz_id']); ?>"
                    style="display: <?php echo ($index === 0) ? 'block' : 'none'; ?>;">
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
                  <div class="notice-box" id="notice-quiz-<?php echo htmlspecialchars($quiz['quiz_id']); ?>"
                    style="display: <?php echo ($index === 0) ? 'flex' : 'none'; ?>;">
                    <img src="/SCES/assets/images/quiz-notice.png" alt="quiz-notice.png">
                    <span><?php echo htmlspecialchars(getQuizAttemptCount($quiz['attempts'])); ?></span>
                  </div>

                  <div class="info-container quiz-info-container"
                    id="quiz-<?php echo htmlspecialchars($quiz['quiz_id']); ?>"
                    style="display: <?php echo ($index === 0) ? 'flex' : 'none'; ?>;">
                    <div class="info-part">
                      <div class="info-data">
                        <img src="/SCES/assets/images/quiz-subject.png" alt="quiz-subject.png">
                        <div class="quiz-info">
                          <h1>Subject</h1>
                          <span><?php echo htmlspecialchars($quiz['subject_title']); ?></span>
                        </div>
                      </div>
                      <div class="info-data">
                        <img src="/SCES/assets/images/quiz-lesson.png" alt="quiz-lesson.png">
                        <div class="quiz-info">
                          <h1>Lesson</h1>
                          <span><?php echo htmlspecialchars($quiz['lesson_title']); ?></span>
                        </div>
                      </div>
                      <div class="info-data">
                        <img src="/SCES/assets/images/quiz-grade-section.png" alt="quiz-grade-section.png">
                        <div class="quiz-info">
                          <h1>Grade & Section</h1>
                          <span><?php echo htmlspecialchars($quiz['grade_level']) . ' - ' . htmlspecialchars($quiz['section']); ?></span>
                        </div>
                      </div>
                      <div class="info-data">
                        <img
                          src="/SCES/assets/images/<?php echo ($quiz['gender'] == 'Female') ? 'quiz-female-teacher.png' : 'quiz-male-teacher.png'; ?>"
                          alt="quiz-teacher.png">
                        <div class="quiz-info">
                          <h1>Teacher</h1>
                          <span><?php echo ($quiz['gender'] == 'Female' ? 'Ms. ' : 'Mr. ') . htmlspecialchars($quiz['teacher_fname']) . ' ' . htmlspecialchars($quiz['teacher_lname']); ?></span>
                        </div>
                      </div>
                    </div>
                    <div class="info-part">
                      <div class="info-data">
                        <img src="/SCES/assets/images/quiz-question.png" alt="quiz-question.png">
                        <div class="quiz-info">
                          <h1>Number of Items</h1>
                          <span><?php echo htmlspecialchars($quiz['item_number']); ?></span>
                        </div>
                      </div>
                      <?php
                      $formattedDate = formatCompletionDate($quiz['due_date']); ?>
                      <div class="info-data">
                        <img src="/SCES/assets/images/quiz-due-date.png" alt="quiz-due-date.png">
                        <div class="quiz-info">
                          <h1>Completed</h1>
                          <span><?php echo htmlspecialchars($formattedDate); ?></span>
                        </div>
                      </div>
                      <div class="info-data">
                        <img src="/SCES/assets/images/quiz-score.png" alt="quiz-score.png">
                        <div class="quiz-info">
                          <h1>Score</h1>
                          <span><?php echo formatQuizScore($quiz['score'], $quiz['item_number']); ?></span>
                        </div>
                      </div>
                      <?php $remarks = formatQuizRemarks($quiz['remarks']); ?>
                      <div class="info-data">
                        <img src="<?php echo htmlspecialchars($remarks['image']); ?>" alt="quiz-remarks.png">
                        <div class="quiz-info">
                          <h1>Remarks</h1>
                          <span><?php echo htmlspecialchars($remarks['text']); ?></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="button-container" id="button-quiz-<?php echo htmlspecialchars($quiz['quiz_id']); ?>"
                    style="display: <?php echo ($index === 0) ? 'flex' : 'none'; ?>;">
                    <button class="view-quiz" id="view-quiz-<?php echo htmlspecialchars($quiz['quiz_id']); ?>">View
                      Quiz</button>
                  </div>
                <?php endforeach; ?>
              <?php else: ?>
                <div class="no-quiz-header">
                  <img src="/SCES/assets/images/info-icon.png" alt="info-icon.png">
                  <h1>Past quiz info will be displayed here</h1>
                </div>
              <?php endif; ?>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/take-quiz.php';
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/student-footer.php';
  ?>