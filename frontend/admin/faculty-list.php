<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/data-tables.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/faculty-list.css" />
<title>Faculty List | SCES Online Learning Platform</title>
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
                    <img src="/SCES/assets/images/school-info.png" alt="school-info.png">
                    <h1>Faculty List</h1>
                </div>
                <button class="add-btn" id=addTeacherBtn><i class="fa-solid fa-user-plus"></i>Add Teacher</button>
            </div>
            <div class="panel">
                <div class="panel-tab" id="allFacultyPanel">
                    <div class="table-responsive">
                        <table id="facultyTable" class="display data-table">
                            <thead>
                                <tr class="tr-blue">
                                    <th>Faculty Icon</th>
                                    <th>Control Number</th>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Role</th>
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
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/view-faculty-modal.php';
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
    ?>
    <script src="/SCES/assets/script/datatables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.4.0/js/dataTables.responsive.min.js"></script>
    <script src="/SCES/assets/script/faculty-list.js"></script>