<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-head.php';
$page = 'About and Inquiries';
?>
<link rel="stylesheet" href="/SCES/assets/style/help.css" />
<link rel="stylesheet" href="/SCES/assets/style/modal.css" />
<title>Help | SCES Online Learning Platform</title>
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
            <div class="help-panel">
                <div class="panel-title">
                    <h1>Help Topics</h1>
                </div>
                <div class="panel-box">
                    <div class="panel-part">
                        <div class="panel-item" id="gettingStartedButton">
                            <div class="item-icon">
                                <img src="/SCES/assets/images/start-help.png" alt="rocket png">
                            </div>
                            <div class="item-text">
                                <h2>Getting Started</h2>
                                <span>Questions about SCES Online Learning Platform Services</span>
                            </div>
                        </div>
                        <div class="panel-item" id="myAccountButton">
                            <div class="item-icon">
                                <img src="/SCES/assets/images/account-help.png" alt="rocket png">
                            </div>
                            <div class="item-text">
                                <h2>My Account</h2>
                                <span>Questions about managing your account and it's features</span>
                            </div>
                        </div>
                        <div class="panel-item" id="learningMaterialButton">
                            <div class="item-icon">
                                <img src="/SCES/assets/images/lm-help.png" alt="rocket png">
                            </div>
                            <div class="item-text">
                                <h2>Learning Materials References</h2>
                                <span>Questions about direct references of your learning materials</span>
                            </div>
                        </div>
                    </div>
                    <div class="panel-part">
                        <div class="panel-item" id="usageGuidesButton">
                            <div class="item-icon">
                                <img src="/SCES/assets/images/usage-help.png" alt="rocket png">
                            </div>
                            <div class="item-text">
                                <h2>Usage Guides</h2>
                                <span>Instructions about the usage of SCES Online Learning Platform</span>
                            </div>
                        </div>
                        <div class="panel-item" id="learningInquiriesButton">
                            <div class="item-icon">
                                <img src="/SCES/assets/images/inquiries-help.png" alt="rocket png">
                            </div>
                            <div class="item-text">
                                <h2>Learning Inquiries</h2>
                                <span>Information you need to know about learning at SCES</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-container">
                    <div class="box faq" id="faqBox">
                        <img src="/SCES/assets/images/faq-icon.png" alt="faq-icon">
                        <h1>FAQ</h1>
                    </div>
                    <div class="box guides" id="usageGuidesBox">
                        <img src="/SCES/assets/images/guide-icon.png" alt="guide-icon">
                        <h1>GUIDES</h1>
                    </div>
                    <div class="box updates" id="updatesBox">
                        <img src="/SCES/assets/images/update-icon.png" alt="update-icon">
                        <h1>UPDATES</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/help-modal.php';
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/admin-footer.php';
    ?>
    <script src="/SCES/assets/script/admin-help.js"></script>