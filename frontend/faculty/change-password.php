<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/password-head.php';
?>
<title>Change Password | SCES Online Learning Platform</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>
    <?php if ($showForm): ?>
        <div class="max-content">
            <div class="flex-container">
                <div class="column left">
                    <div class="opening">
                        <h1>Change Password</h1>
                    </div>
                    <div class="wrapper">
                        <img src="/SCES/assets/images/admin-signup.png" alt="sign up icon" />
                    </div>
                </div>
                <div class="column right">
                    <div class="form-wrapper">
                        <form id="facultyChangePass">
                            <img src="/SCES/assets/images/logo.png" alt="sces logo" class="logo-img" />
                            <h1>Set Up New Password</h1>
                            <div class="input-icons-recover">
                                <span>Enter and confirm your new password. Your new password must be at least 6
                                    characters.</span>
                            </div>
                            <input type="hidden" name="email" id="email" value="<?php echo htmlspecialchars($email); ?>">
                            <div class="input-icons">
                                <label for="password">
                                    <i class="fa-solid fa-lock icon"></i>
                                </label>
                                <input type="password" name="password" id="password" placeholder="Password" />
                                <span class="toggle-password" onclick="togglePassword()">
                                    <i class="fa-solid fa-eye-slash icon" id="toggleIcon"></i>
                                </span>
                            </div>
                            <div class="input-icons">
                                <label for="confirmPassword">
                                    <i class="fa-sharp fa-solid fa-shield icon"></i>
                                </label>
                                <input type="password" name="confirmPassword" id="confirmPassword"
                                    placeholder="Confirm Password" />
                                <span class="toggle-password" onclick="toggleConfirmPassword()">
                                    <i class="fa-solid fa-eye-slash icon" id="toggleConfirmIcon"></i>
                                </span>
                            </div>
                            <button type="submit" id="facultyChangePassBtn">Change Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    <?php else: ?>
        <?php include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/page-error.php'; ?>
    <?php endif; ?>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/footer.php';
    ?>