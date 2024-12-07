<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/head.php';
?>
<title>Admin Log In | SCES Online Learning Platform</title>
</head>

<body>
    <div class="max-content">
        <div class="flex-container">
            <div class="column left">
                <div class="opening">
                    <h1>Welcome, Admin!</h1>
                    <h1>Please Log In</h1>
                </div>
                <div class="wrapper">
                    <img src="/SCES/assets/images/login-admin.png" alt="sign up icon" class="img-500px" />
                </div>
            </div>
            <div class="column right">
                <div class="form-wrapper">
                    <form id="adminLogin">
                        <img src="/SCES/assets/images/logo.png" alt="sces logo" class="logo-img" />
                        <h1>Log In</h1>
                        <div class="input-icons">
                            <label for="email">
                                <i class="fa-solid fa-envelope icon"></i>
                            </label>
                            <input type="email" name="email" id="email" placeholder="Email" />
                        </div>
                        <div class="input-icons">
                            <label for="password">
                                <i class="fa-solid fa-lock icon"></i>
                            </label>
                            <input type="password" name="password" id="password" placeholder="Password" />
                            <span class="toggle-password" onclick="togglePassword()">
                                <i class="fa-solid fa-eye-slash icon" id="toggleIcon"></i>
                            </span>
                        </div>
                        <div class="input-icons-span"><a href="forgot-password.php" class="link-text">Forgot
                                Password?</a></div>
                        <button type="submit" id="adminLoginBtn">Login</button>
                    </form>
                </div>
                <br>
                <div class="separator">Or</div>
                <br>
                <a href="register.php" class="button-container">
                    <div class="btn-wrapper">
                        <h1>Register Account</h1>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/admin/partials/footer.php';
    ?>