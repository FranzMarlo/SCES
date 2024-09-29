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
        <div class="title-box">
          <div class="text-box">
            <img src="/SCES/assets/images/graduation-cap.png" alt="graduation-cap.png">
            <h1>Academic Quizzes</h1>
          </div>
          <div class="quiz-dropdown">
            <div class="quiz-btn">
              <i class="fa-solid fa-ellipsis-vertical icon"></i>
            </div>
            <div class="quiz-dropdown-content">
              <div class="quiz-dropdown-title">
                <img src="/SCES/assets/images/pending-quiz.png" alt="pending-quiz.png">
                <h1>Pending Quiz</h1>
              </div>
              <button class="math">
                Mathematics Quiz 1
              </button>
              <button class="mt">
                Mother Tongue Quiz 2
              </button>
              <button class="fil">
                Filipino Quiz 3
              </button>
              <button class="fil">
                Filipino Quiz 4
              </button>
            </div>
          </div>
        </div>
        <div class="quiz-container">
          <div class="pending-container">
            <div class="pending-title">
              <img src="/SCES/assets/images/pending-quiz.png" alt="pending-quiz.png">
              <h1>Pending Quiz</h1>
            </div>
            <div class="pending-item">
              <span>Mathematics Quiz 1</span>
            </div>
            <div class="pending-item">
              <span>Mother Tongue Quiz 2</span>
            </div>
            <div class="pending-item">
              <span>Filipino Quiz 3</span>
            </div>
            <div class="pending-item">
              <span>Filipino Quiz 4</span>
            </div>
          </div>
          <div class="header-container">
            <div class="quiz-header">
              <div class="header-bg fil">
                <div class="icon-container">
                  <img src="/SCES/assets/images/filipino-icon.png" alt="filipino-icon">
                </div>
              </div>
              <div class="header-text">
                <img src="/SCES/assets/images/quiz-1.png" alt="quiz-1.png">
                <h1>Quiz 1 - Alphabetong Filipino</h1>
              </div>
            </div>
            <div class="quiz-item">
              <div class="question-box">
                <span>1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae officia iusto iste vitae.
                  Praesentium voluptates porro, at magnam eaque ratione deserunt voluptas dolore voluptatum, in eum
                  nihil doloribus tenetur magni?</span>
              </div>
              <div class="quiz-ans">
                <p>A. Lorem ipsum dolor</p>
              </div>
              <div class="quiz-ans">
                <p>B. Lorem ipsum dolor</p>
              </div>
              <div class="quiz-ans wrong">
                <p>C. Lorem ipsum dolor</p>
              </div>
            </div>
            <div class="quiz-item">
              <div class="question-box">
                <span>2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae officia iusto iste vitae.
                  Praesentium voluptates porro, at magnam eaque ratione deserunt voluptas dolore voluptatum, in eum
                  nihil doloribus tenetur magni?</span>
              </div>
              <div class="quiz-ans">
                <p>A. Lorem ipsum dolor</p>
              </div>
              <div class="quiz-ans">
                <p>B. Lorem ipsum dolor</p>
              </div>
              <div class="quiz-ans correct">
                <p>C. Lorem ipsum dolor</p>
              </div>
            </div>
            <div class="quiz-item">
              <div class="question-box">
                <span>3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae officia iusto iste vitae.
                  Praesentium voluptates porro, at magnam eaque ratione deserunt voluptas dolore voluptatum, in eum
                  nihil doloribus tenetur magni?</span>
              </div>
              <div class="quiz-ans">
                <p>A. Lorem ipsum dolor</p>
              </div>
              <div class="quiz-ans">
                <p>B. Lorem ipsum dolor</p>
              </div>
              <div class="quiz-ans">
                <p>C. Lorem ipsum dolor</p>
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