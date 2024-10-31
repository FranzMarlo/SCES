<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/data-tables.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/analytics.css" />
<title>Analytics | SCES Online Learning Platform</title>
</head>

<body>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-popup.php';
    ?>
    <div class="container">
        <?php
        include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-sidebar.php';
        ?>
        <div class="content">
            <?php
            include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-header.php';
            ?>
            <div class="title-box">
                <img src="/SCES/assets/images/profile-analytics.png" alt="profile-analytics.png">
                <h1>Analytics</h1>
            </div>
            <div class="panel-container">
                <div class="filter-container">
                    <div class="title-box">
                        <img src="/SCES/assets/images/quiz-rate.png" alt="quiz-rate.png">
                        <h1>Overview</h1>
                    </div>
                    <div class="filter-part">
                        <select id="yearFilterDropdown" class="filter-dropdown">
                            <option value="All">Overtime</option>
                            <option value="2024">Current SY</option>
                            <option value="2019">2019-2020</option>
                            <option value="2020">2020-2021</option>
                            <option value="2021">2021-2022</option>
                            <option value="2022">2022-2023</option>
                            <option value="2023">2023-2024</option>
                        </select>
                        <select id="gradeFilterDropdown" class="filter-dropdown">
                            <option value="All">All Grades</option>
                            <option value="Grade 1">Grade 1</option>
                            <option value="Grade 2">Grade 2</option>
                            <option value="Grade 3">Grade 3</option>
                            <option value="Grade 4">Grade 4</option>
                            <option value="Grade 5">Grade 5</option>
                            <option value="Grade 6">Grade 6</option>
                        </select>
                    </div>
                </div>
                <div class="stats-container">
                    <div class="stats-box pastel-pink">
                        <img src="/SCES/assets/images/quiz-grade-section.png" alt="quiz-grade-section.png">
                        <div class="stats-col">
                            <span id="totalStudents"></span>
                            <p>Total Students</p>
                        </div>
                    </div>
                    <div class="stats-box pastel-green">
                        <img src="/SCES/assets/images/school-info.png" alt="school-info.png">
                        <div class="stats-col">
                            <span id="totalTeachers"></span>
                            <p>Total Teachers</p>
                        </div>
                    </div>
                    <div class="stats-box pastel-yellow">
                        <img src="/SCES/assets/images/quiz-lesson.png" alt="quiz-lesson.png">
                        <div class="stats-col">
                            <span id="totalLessons"></span>
                            <p>Total Lessons</p>
                        </div>
                    </div>
                    <div class="stats-box pastel-blue">
                        <img src="/SCES/assets/images/quiz-question.png" alt="quiz-question.png">
                        <div class="stats-col">
                            <span id="totalQuizzes"></span>
                            <p>Total Quizzes</p>
                        </div>
                    </div>
                </div>
                <div class="graph-container">
                    <div class="graph">
                        <canvas id="lineChart"></canvas>
                    </div>
                    <div class="graph">
                        <canvas id="barChart"></canvas>
                    </div>
                </div>
                <div class="graph-container">
                    <div class="full-graph">
                        <canvas id="fullBarChart"></canvas>
                    </div>
                </div>
                <div class="title-box">
                    <img src="/SCES/assets/images/quiz-score.png" alt="quiz-score.png">
                    <h1>Top Performing Students</h1>
                </div>
                <div class="table-container">
                    <table id="rankingTable" class="table">
                        <thead>
                            <tr class="pink">                              
                            </tr>
                        </thead>
                        <tbody id="rankingTableBody">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/analytics-modal.php';
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-footer.php';
    ?>
    <script src="/SCES/assets/script/datatables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.4.0/js/dataTables.responsive.min.js"></script>
    <script src="/SCES/assets/script/analytics.js"></script>