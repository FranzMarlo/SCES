<div class="header">
    <div class="welcome-box">
        <div class="welcome-text">
            <h1>Welcome back, <?php echo htmlspecialchars($studentFname); ?>!</h1>
            <a href="/SCES/frontend/student/quizzes.php"><span>View pending quizzes <i class="fa-solid fa-arrow-right"></i></span></a>
        </div>
        <div class="lamp-container">
            <img src="/SCES/assets/images/lamp.png" alt="lamp" />
        </div>
    </div>
    <div class="user-info">
        <a href="#">
            <div class="notif-btn">
                <i class="fa-solid fa-bell icon"></i>
            </div>
        </a>
        <a href="/SCES/frontend/student/profile.php?active=1" class="current-user">
            <img src="/SCES/storage/student/images/<?php echo $image;?>" alt="user icon">
        </a>
    </div>
</div>
<div class="max-content">