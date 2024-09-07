<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
$page = '';
?>
<link rel="stylesheet" href="/SCES/assets/style/admin-quizzes.css" />
<title>Student Grade | SCES Online Learning Platform</title>
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
            
        </div>
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
    ?>