<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/datatables.min.css" />
<link rel="stylesheet" href="/SCES/assets/style/student-list.css" />
<title>Student List | SCES Online Learning Platform</title>
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
            <div class="panel-title">
                <h1>Students</h1>
                <div class="number-icon">
                    <span><?php echo htmlspecialchars($totalStudents); ?></span>
                </div>
            </div>
            <div class="table-container">
                <table id="studentTable" class="display">
                    <thead>
                        <tr>

                            <th>Student ID</th>
                            <th>Full Name</th>
                            <th>Grade</th>
                            <th>Section</th>
                            <th>More</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/view-student-modal.php';
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
    ?>
    <script src="/SCES/assets/script/datatables.min.js"></script>
    <script src="/SCES/assets/script/student-list.js"></script>