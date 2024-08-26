<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/partials/student-head.php';
?>
<title>Home | SCES Online Learning Platform</title>
</head>

<body>
  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/partials/student-popup.php';
  ?>
  <div class="container">
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/partials/student-sidebar.php';
    ?>
    <div class="content">
      <?php
      include $_SERVER['DOCUMENT_ROOT'] . '/SCES/partials/student-header.php';
      ?>
      <div class="about-panel">
        <div class="about-text">
          <h1>Hi, <?php echo htmlspecialchars($studentFname); ?></h1>
          <p>This online learning platform serves as a welcoming home for learners.</p>
          <button>Learn More</button>
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
              <h1>75%</h1>
              <p>Completion</p>
            </div>
          </div>
          <div class="box pending">
            <div class="img-container">
              <img src="/SCES/assets/images/pending-icon.png" alt="pending icon">
            </div>
            <div class="data-container">
              <h1>82%</h1>
              <p>Pending Task</p>
            </div>
          </div>
          <div class="box excel">
            <div class="img-container">
              <img src="/SCES/assets/images/excel-icon.png" alt="excel icon">
            </div>
            <div class="data-container">
              <h1>Filipino</h1>
              <p>Excels In</p>
            </div>
          </div>
          <div class="box regress">
            <div class="img-container">
              <img src="/SCES/assets/images/regress-icon.png" alt="regress icon">
            </div>
            <div class="data-container">
              <h1>Math</h1>
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
        <div class="to-do-item">
          <div class="info-box">
            <h1>Science</h1>
            <p>Lesson 1 - Quiz 3</p>
          </div>
          <div class="date-box">
            <p>Monday 11:59 PM</p>
            <span>Posted 4 May 2024</span>
          </div>
        </div>
        <div class="to-do-item">
          <div class="info-box">
            <h1>Mathematics</h1>
            <p>Lesson 3 - Quiz 2</p>
          </div>
          <div class="date-box">
            <p>Friday 11:59 PM</p>
            <span>Posted 2 May 2024</span>
          </div>
        </div>
        <div class="to-do-item">
          <div class="info-box">
            <h1>English</h1>
            <p>Lesson 1 - Quiz 1</p>
          </div>
          <div class="date-box">
            <p>Thursday 11:59 PM</p>
            <span>Posted 4 Aug 2024</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/partials/student-footer.php';
  ?>