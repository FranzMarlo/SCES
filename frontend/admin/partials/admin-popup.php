<div class="pop-up">
    <div class="pop-menu">
        <div class="menu-btn" id="menu-btn">
            <i class="fa-solid fa-bars"></i>
        </div>
        <div class="logo-panel">
            <img src="/SCES/assets/images/logo.png" alt="SCES Logo">
            <h1>SCES</h1>
        </div>
    </div>
    <div class="nav">
        <div class="menu">
            <ul>
                <li>
                    <a href="/SCES/frontend/student/dashboard.php">
                        <i class="fa-solid fa-house icon"></i>
                        <span class="text">Home</span>
                    </a>
                </li>
                <li>
                    <a href="/SCES/frontend/student/subject.php">
                        <i class="fa-solid fa-briefcase icon"></i>
                        <span class="text">Subjects</span>
                    </a>
                </li>
                <li>
                    <a href="/SCES/frontend/admin/quizzes.php">
                        <i class="fa-solid fa-user icon"></i>
                        <span class="text">Students</span>
                    </a>
                </li>
                <li>
                    <a href="/SCES/frontend/admin/settings.php">
                        <i class="fa-solid fa-chart-simple icon"></i>
                        <span class="text">Analytics</span>
                    </a>
                </li>
                <li>
                    <a href="/SCES/frontend/admin/settings.php">
                        <i class="fa-solid fa-print icon"></i>
                        <span class="text">Reports</span>
                    </a>
                </li>
                <li>
                    <a href="/SCES/frontend/student/settings.php">
                        <i class="fa-solid fa-gear icon"></i>
                        <span class="text">Settings</span>
                    </a>
                </li>
                <li>
                    <a href="/SCES/frontend/student/help.php">
                        <i class="fa-solid fa-circle-info icon"></i>
                        <span class="text">Help</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="menu">
        <ul>
            <li>
                <a href="javascript:void(0)" onclick="adminLogoutFunc()">
                    <i class="fa-solid fa-right-from-bracket icon"></i>
                    <span class="text">Logout</span>
                </a>
            </li>
        </ul>
    </div>
</div>
<div class="menu-panel">
    <div class="menu-part">
        <div class="menu-btn">
            <i class="fa-solid fa-bars"></i>
        </div>
        <div class="logo-panel">
            <img src="/SCES/assets/images/logo.png" alt="SCES Logo">
            <h1>SCES</h1>
        </div>
    </div>
    <div class="menu-part">
        <div class="dropdown">
            <div class="pop-btn">
                <i class="fa-solid fa-ellipsis-vertical icon"></i>
            </div>
            <div class="dropdown-content">
                <ul>
                    <li><a href="#"><i class="fa-solid fa-bell"></i>Notifications</a></li>
                    <li><a href="#"><i class="fa-solid fa-envelope"></i>Messages</a></li>
                    <li><a href="#"><i class="fa-solid fa-user"></i>My Account</a></li>
                </ul>
            </div>
        </div>
        <div class="user-info">
            <a href="#">
                <div class="message-btn">
                    <i class="fa-solid fa-envelope icon"></i>
                </div>
            </a>
            <a href="#">
                <div class="notif-btn">
                    <i class="fa-solid fa-bell icon"></i>
                </div>
            </a>
            <div class="current-user">
                <img src="/SCES/student-storage/images/<?php echo $image; ?>" alt="user icon">
                <h1><?php echo htmlspecialchars($studentFname . ' ' . $studentLname); ?></h1>
            </div>
        </div>
    </div>
</div>