<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
?>
<link rel="stylesheet" href="/SCES/assets/style/admin-subject.css" />
<title>Subjects | SCES Online Learning Platform</title>
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
            <div class="total-container">
                <div class="item">
                    <div class="item-icon">
                        <img src="/SCES/assets/images/subject-students.png" alt="total students icon">
                    </div>
                    <div class="item-text">
                        <span>Total Students</span>
                        <h6>40</h6>
                    </div>
                </div>
                <div class="item">
                    <div class="item-icon">
                        <img src="/SCES/assets/images/subject-lessons.png" alt="total students icon">
                    </div>
                    <div class="item-text">
                        <span>Total Lessons</span>
                        <h6>24</h6>
                    </div>
                </div>
                <div class="item">
                    <div class="item-icon">
                        <img src="/SCES/assets/images/subject-archived.png" alt="total students icon">
                    </div>
                    <div class="item-text">
                        <span>Total Archived</span>
                        <h6>14</h6>
                    </div>
                </div>
            </div>
            <div class="subject-panel">
                <div class="panel-title">
                    <h1>Subjects</h1>
                </div>
                <div class="subject-container">
                    <a href="/SCES/frontend/admin/lessons/grade 1/filipino.php" class="subject-item">
                        <div class="subject-icon fil">
                            <button class="subject-btn ellipsis">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div class="subject-in-title">
                                <h1>Filipino 1</h1>
                                <span>Grade 1 - Banana</span>
                            </div>
                            <img src="/SCES/assets/images/filipino-icon.png" alt="filipino icon">
                            <button class="subject-btn edit">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                        <div class="subject-title">
                            <h1>Filipino 1</h1>
                            <span>Grade 1 - Banana</span>
                        </div>
                    </a>
                    <a href="#" class="subject-item">
                        <div class="subject-icon eng">
                            <button class="subject-btn ellipsis">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div class="subject-in-title">
                                <h1>English 1</h1>
                                <span>Grade 1 - Banana</span>
                            </div>
                            <img src="/SCES/assets/images/english-icon.png" alt="english icon">
                            <button class="subject-btn edit">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                        <div class="subject-title">
                            <h1>English 1</h1>
                            <span>Grade 1 - Banana</span>
                        </div>
                    </a>
                    <a href="#" class="subject-item">
                        <div class="subject-icon math">
                            <button class="subject-btn ellipsis">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div class="subject-in-title">
                                <h1>Mathematics 1</h1>
                                <span>Grade 1 - Banana</span>
                            </div>
                            <img src="/SCES/assets/images/math-icon.png" alt="math icon">
                            <button class="subject-btn edit">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                        <div class="subject-title">
                            <h1>Mathematics 1</h1>
                            <span>Grade 1 - Banana</span>
                        </div>
                    </a>
                    <a href="#" class="subject-item">
                        <div class="subject-icon sci">
                            <button class="subject-btn ellipsis">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div class="subject-in-title">
                                <h1>Science 1</h1>
                                <span>Grade 1 - Banana</span>
                            </div>
                            <img src="/SCES/assets/images/science-icon.png" alt="science icon">
                            <button class="subject-btn edit">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                        <div class="subject-title">
                            <h1>Science 1</h1>
                            <span>Grade 1 - Banana</span>
                        </div>
                    </a>
                    <a href="#" class="subject-item">
                        <div class="subject-icon ap">
                            <button class="subject-btn ellipsis">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div class="subject-in-title">
                                <h1>AP 1</h1>
                                <span>Grade 1 - Banana</span>
                            </div>
                            <img src="/SCES/assets/images/ap-icon.png" alt="ap icon">
                            <button class="subject-btn edit">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                        <div class="subject-title">
                            <h1>AP 1</h1>
                            <span>Grade 1 - Banana</span>
                        </div>
                    </a>
                    <a href="#" class="subject-item">
                        <div class="subject-icon esp">
                            <button class="subject-btn ellipsis">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div class="subject-in-title">
                                <h1>ESP 1</h1>
                                <span>Grade 1 - Banana</span>
                            </div>
                            <img src="/SCES/assets/images/esp-icon.png" alt="esp icon">
                            <button class="subject-btn edit">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                        <div class="subject-title">
                            <h1>ESP 1</h1>
                            <span>Grade 1 - Banana</span>
                        </div>
                    </a>
                    <a href="#" class="subject-item">
                        <div class="subject-icon mt">
                            <button class="subject-btn ellipsis">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div class="subject-in-title">
                                <h1>Mother Tongue 1</h1>
                                <span>Grade 1 - Banana</span>
                            </div>
                            <img src="/SCES/assets/images/mother-tongue-icon.png" alt="mother-tongue icon">
                            <button class="subject-btn edit">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                        <div class="subject-title">
                            <h1>Mother Tongue 1</h1>
                            <span>Grade 1 - Banana</span>
                        </div>
                    </a>
                    <a href="#" class="subject-item">
                        <div class="subject-icon mapeh">
                            <button class="subject-btn ellipsis">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div class="subject-in-title">
                                <h1>MAPEH 1</h1>
                                <span>Grade 1 - Banana</span>
                            </div>
                            <img src="/SCES/assets/images/mapeh-icon.png" alt="mapeh icon">
                            <button class="subject-btn edit">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                        <div class="subject-title">
                            <h1>MAPEH 1</h1>
                            <span>Grade 1 - Banana</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <?php
        include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
        ?>