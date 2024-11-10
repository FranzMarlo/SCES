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
                    <a href="/SCES/frontend/student/dashboard.php">
                        <i class="fa-solid fa-house icon"></i>
                        <span class="text">Home</span>
                    </a>
                </li>
                <li class="<?= $current_page == 'profile.php' ? 'active' : '' ?>">
                    <a href="/SCES/frontend/student/profile.php">
                        <i class="fa-solid fa-user icon"></i>
                        <span class="text">My Profile</span>
                    </a>
                </li>
                <li class="<?= $current_page == 'subject.php' ? 'active' : '' ?>">
                    <a href="/SCES/frontend/student/subject.php">
                        <i class="fa-solid fa-briefcase icon"></i>
                        <span class="text">Subjects</span>
                    </a>
                </li>
                <li class="<?= $current_page == 'quizzes.php' ? 'active' : '' ?>">
                    <a href="/SCES/frontend/student/quizzes.php">
                        <i class="fa-solid fa-pen-to-square icon"></i>
                        <span class="text">Quizzes</span>
                    </a>
                </li>
                <li class="<?= $current_page == 'settings.php' ? 'active' : '' ?>">
                    <a href="/SCES/frontend/student/settings.php">
                        <i class="fa-solid fa-gear icon"></i>
                        <span class="text">Settings</span>
                    </a>
                </li>
                <li class="<?= $current_page == 'help.php' ? 'active' : '' ?>">
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
                <a href="javascript:void(0)" onclick="logoutFunc()">
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
                    <li><a href="/SCES/frontend/student/profile.php?active=1"><i class="fa-solid fa-user"></i>My Account</a></li>
                </ul>
            </div>
        </div>
        <div class="user-info">
            <a href="/SCES/frontend/student/profile.php?active=1" class="current-user">
                <img src="/SCES/storage/student/images/<?php echo $image; ?>" alt="user icon">
            </a>
        </div>
    </div>
</div>