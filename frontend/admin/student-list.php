<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/data-tables.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/admin-student-list.css" />
<link rel="stylesheet" href="/SCES/assets/style/filter.css" />
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
            <div class="title-box justified">
                <div class="title-part">
                    <img src="/SCES/assets/images/profile-scores.png" alt="profile-scores.png">
                    <h1>Student Masterlist</h1>
                </div>
                <button class="add-btn" id=addStudentBtn><i class="fa-solid fa-user-plus"></i>Add Student</button>
            </div>
            <div class="panel">
                <div class="panel-tab" id="allStudentsPanel">
                    <div class="table-responsive">
                        <table id="studentsTable" class="display data-table">
                            <thead>
                                <tr class="tr-blue">
                                    <th>Student Icon</th>
                                    <th>LRN</th>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Middle Name</th>
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
            </div>
        </div>
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/student-list-modal.php';
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
    ?>
    <script src="/SCES/assets/script/datatables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.4.0/js/dataTables.responsive.min.js"></script>
    <script src="/SCES/assets/script/admin-student-list.js"></script>