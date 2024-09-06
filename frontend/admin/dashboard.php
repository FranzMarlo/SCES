<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
$page = 'Home';
?>
<title>Home | SCES Online Learning Platform</title>
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
      <div class="welcome-box">
        <div class="welcome-text">
          <div class="current-time">
            <i class="fa-solid fa-calendar"></i>
            <span id="current-date"><?php echo date('F d, Y'); ?></span>
            <span id="current-time"><?php echo date('g:i a'); ?></span>
          </div>
          <div class="text-content">
            <h1>Good Day, <?php echo htmlspecialchars($title) . ' ' . htmlspecialchars($teacherLname); ?>!</h1>
            <span>Have a nice learning day!</span>
          </div>
        </div>
        <div class="welcome-img">
          <img src="/SCES/assets/images/admin-dashboard-icon.png" alt="admin dashboard icon" class="normal">
          <img src="/SCES/assets/images/admin-dashboard-icon-cropped.png" alt="admin dashboard icon" class="cropped">
        </div>
      </div>
      <div class="box-container">
        <div class="box students">
          <div class="box-icon">
            <img src="/SCES/assets/images/total-students-icon.png" alt="total students icon">
          </div>
          <div class="box-text">
            <h1>Total Students</h1>
            <span><?php echo htmlspecialchars($totalStudents); ?></span>
          </div>
        </div>
        <div class="box teachers">
          <div class="box-icon">
            <img src="/SCES/assets/images/total-teachers-icon.png" alt="total teachers icon">
          </div>
          <div class="box-text">
            <h1>Total Teachers</h1>
            <span><?php echo htmlspecialchars($totalTeachers); ?></span>
          </div>
        </div>
        <div class="box subjects">
          <div class="box-icon">
            <img src="/SCES/assets/images/total-subjects-icon.png" alt="total subjects icon">
          </div>
          <div class="box-text">
            <h1>Total Subjects</h1>
            <span><?php echo htmlspecialchars($totalSubjects); ?></span>
          </div>
        </div>
        <div class="box quizzes">
          <div class="box-icon">
            <img src="/SCES/assets/images/total-quizzes-icon.png" alt="total quizzes icon">
          </div>
          <div class="box-text">
            <h1>Total Quizzes</h1>
            <span><?php echo htmlspecialchars($totalQuizzes); ?></span>
          </div>
        </div>
      </div>
      <div class="chart-container">
        <div class="chart" id="donutChart">
          <canvas id="myDonutChart"></canvas>
        </div>
        <div class="chart" id="barChart">
          <canvas id="myBarChart"></canvas>
        </div>
      </div>
    </div>
  </div>
  <script src="/SCES/assets/script/admin-dashboard.js"></script>
  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
  ?>