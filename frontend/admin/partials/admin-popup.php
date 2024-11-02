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
                <li class="<?= $current_page == 'dashboard.php' ? 'active' : '' ?>">
                    <a href="/SCES/frontend/admin/dashboard.php">
                        <i class="fa-solid fa-house icon"></i>
                        <span class="text">Home</span>
                    </a>
                </li>
                <li class="<?= $current_page == 'profile.php' ? 'active' : '' ?>">
                    <a href="/SCES/frontend/admin/profile.php">
                        <i class="fa-solid fa-user icon"></i>
                        <span class="text">My Profile</span>
                    </a>
                </li>
                <li class="<?= in_array($current_page, ['subject.php', 'quizzes.php']) ? 'active' : '' ?>">
                    <a href="javascript:void(0)">
                        <i class="fa-solid fa-briefcase icon"></i>
                        <span class="text">Academics</span>
                        <i class="fa-solid fa-chevron-down arrow"></i>
                    </a>
                    <ul class="sub-menu">
                        <li class="<?= $current_page == 'subject.php' ? 'active' : '' ?>">
                            <a href="/SCES/frontend/admin/subject.php">
                                <i class="fa-solid fa-square-poll-horizontal icon"></i>
                                <span class="text">Subjects</span>
                            </a>
                        </li>
                        <li class="<?= $current_page == 'quizzes.php' ? 'active' : '' ?>">
                            <a href="/SCES/frontend/admin/quizzes.php">
                                <i class="fa-solid fa-pen-to-square icon"></i>
                                <span class="text">Quizzes</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="<?= in_array($current_page, ['section.php', 'student-list.php']) ? 'active' : '' ?>">
                    <a href="javascript:void(0)">
                        <i class="fa-solid fa-user-graduate icon"></i>
                        <span class="text">Students</span>
                        <i class="fa-solid fa-chevron-down arrow"></i>
                    </a>
                    <ul class="sub-menu">
                        <li
                            class="<?= in_array($current_page, ['section.php', 'student-section.php']) ? 'active' : '' ?>">
                            <a href="/SCES/frontend/admin/section.php">
                                <i class="fa-solid fa-users-rectangle icon"></i>
                                <span class="text">Sections</span>
                            </a>
                        </li>
                        <li class="<?= $current_page == 'student-list.php' ? 'active' : '' ?>">
                            <a href="/SCES/frontend/admin/student-list.php">
                                <i class="fa-solid fa-list icon"></i>
                                <span class="text">Student List</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="<?= $current_page == 'faculty-list.php' ? 'active' : '' ?>">
                    <a href="/SCES/frontend/admin/faculty-list.php">
                        <i class="fa-solid fa-chalkboard-user icon"></i>
                        <span class="text">Faculty List</span>
                    </a>
                </li>
                <li class="<?= $current_page == 'analytics.php' ? 'active' : '' ?>">
                    <a href="/SCES/frontend/admin/analytics.php">
                        <i class="fa-solid fa-chart-simple icon"></i>
                        <span class="text">Analytics</span>
                    </a>
                </li>
                <li class="<?= $current_page == 'settings.php' ? 'active' : '' ?>">
                    <a href="/SCES/frontend/admin/settings.php">
                        <i class="fa-solid fa-gear icon"></i>
                        <span class="text">Settings</span>
                    </a>
                </li>
                <li class="<?= $current_page == 'help.php' ? 'active' : '' ?>">
                    <a href="/SCES/frontend/admin/help.php">
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
        <a href="#">
            <i class="fa-solid fa-bell"></i>
        </a>
        <img src="/SCES/storage/admin/images/<?php echo $image; ?>" alt="admin icon" class="user-icon">
    </div>
</div>