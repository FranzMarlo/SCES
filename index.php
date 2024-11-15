<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/partials/head.php';
?>
<link rel="stylesheet" href="assets/style/landing.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<title>SCES Online Learning Platform</title>
</head>

<body>
  <div class="nav-bar">
    <div class="logo">
      <img src="assets/images/logo.png" alt="SCES logo" class="img-logo" />
      <a href="index.php" class="logo-text">SCES</a>
    </div>
    <div class="hamburger" id="hamburger">
      <i class="fas fa-bars"></i>
    </div>
    <div class="nav-menu" id="nav-menu">
      <li class="menu"><a href="#home">Home</a></li>
      <li class="menu"><a href="#services">Services</a></li>
      <li class="menu"><a href="#about">About Us</a></li>
      <li class="menu"><a href="#contact">Contact Us</a></li>
      <button class="menu-btn" onclick="openModal()">Get Started</button>
    </div>
  </div>
  <div class="main-container">
    <div class="hero-container" id="home">
      <div class="hero-content pink">
        <div class="content-part">
          <div class="motto">
            <h1>Bring Future</h1>
            <h1>Right Here</h1>
          </div>
          <div class="motto">
            <h2>Sta. Clara Elementary School</h2>
            <h2>Online Learning Platform</h2>
            <p class="text">Serving with Compassion and Excellence Towards
              Success
            </p>
          </div>
          <div class="motto">
            <div class="more-btn" id="more-btn">Learn More</div>
          </div>
        </div>
        <div class="content-part">
          <img src="assets/images/landingbg.png" alt="landing icon" class="landing-bg">
        </div>
      </div>
    </div>
    <div class="hero-container" id="services">
      <div class="full-col blue">
        <div class="centered-title">
          <h1>Our Services</h1>
        </div>
        <div class="full-row">
          <div class="row-item">
            <img src="assets/images/landing-lesson.png" alt="lesson icon">
            <h2>Online Lessons</h2>
            <div class="row-col">
              <p>Academic Lessons are uploaded in the platform by
                the SCES teachers referenced to the DepEd K-12
                Curriculum.</p>
            </div>
          </div>
          <div class="row-item">
            <img src="assets/images/landing-quiz.png" alt="quiz icon">
            <h2>Online Quizzes</h2>
            <div class="row-col">
              <p>The quizzes uploaded by the SCES teachers are
                accessed by the SCES students enabling a more
                efficient blending learning.</p>
            </div>
          </div>
          <div class="row-item">
            <img src="assets/images/landing-analytics.png" alt="analytics icon">
            <h2>Educational Analytics</h2>
            <div class="row-col">
              <p>Students' grades and quiz scores
                are gradually recorded in the platform provding a more
                deep learning insights for the SCES teachers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-container" id="about">
      <div class="full-col green">
        <div class="centered-title">
          <h1>About Us</h1>
        </div>
        <div class="full-row">
          <div class="row-part">
            <img src="assets/images/sta-clara.png" alt="sta-clara icon" class="row-img">
          </div>
          <div class="row-part">
            <div class="part-col">
              <img src="assets/images/logo.png" alt="logo icon">
              <h2>Sta. Clara Elementary School</h2>
            </div>
            <div class="part-text">
              <p>Sta. Clara Elementary School is a DepEd public school committed to produce
                globally competitive students through quality education. It is located
                in Sta. Clara, Batangas City, Batangas, Philippines.</p>
              </p>
            </div>
          </div>
        </div>
        <div class="full-row-reversed">
          <div class="row-part">
            <img src="assets/images/vision.png" alt="vision icon" class="row-img">
          </div>
          <div class="row-part">
            <div class="part-col">
              <img src="assets/images/vision-icon.png" alt="vision-icon icon">
              <h2>DepEd Vision</h2>
            </div>
            <div class="part-text">
              <p>"We dream of Filipinos who passionately love their country and whose values
                and competencies enable them to realize their full potential and contribute
                meaningfully to building the nation."
              </p>
              <p>"As a learner-centered public institution, the Department of Education
                continuosly improves itself to better serve its stakeholders."
              </p>
            </div>
          </div>
        </div>
        <div class="full-row">
          <div class="row-part">
            <img src="assets/images/mission.png" alt="mission icon" class="row-img">
          </div>
          <div class="row-part">
            <div class="part-col">
              <img src="assets/images/mission-icon.png" alt="mission-icon icon">
              <h2>DepEd Mission</h2>
            </div>
            <div class="part-text">
              <p>To protect and promote the right of every Filipino to quality,
                equitable, and culture-based, and complete basic education where:
              </p>
              <p>Students learn in a child-friendly, gender-sensitive, safe, and
                motivating environment.
              </p>
              <p>Teachers facilitate learning and constantly nurture every learner.</p>
              <p>Administrators and staff, as stewards of the institution, ensure an
                enabling and supportive environment for effective learning to happen.
              </p>
              <p>Family, community, and other stakeholders are actively engaged and share
                responsibility for developing life-long learners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-container" id="contact">
      <div class="full-col yellow">
        <div class="full-row">
          <div class="half-row">
            <div class="centered-title">
              <h2>Contact Us</h2>
            </div>
            <div class="half-col">
              <div class="info-box">
                <img src="assets/images/location.png" alt="location icon">
                <span class="info">Sta. Clara, Batangas City, Philippines, 4200</span>
              </div>
              <div class="info-box">
                <img src="assets/images/facebook.png" alt="facebook icon">
                <a href="https://www.facebook.com/staclaraelemschoolbatscity">Deped Tayo Sta. Clara ES- Batangas City
                </a>
              </div>
              <div class="info-box">
                <img src="assets/images/telephone.png" alt="telephone icon">
                <span class="info">0945-089-5437</span>
              </div>
              <div class="info-box">
                <img src="assets/images/gmail.png" alt="gmail icon">
                <span class="info">rea.garcia001@deped.gov.ph</span>
              </div>
              <div class="info-box">
                <img src="assets/images/gmail.png" alt="gmail icon">
                <span class="info">scesonlinelearningplatform@gmail.com</span>
              </div>
            </div>
          </div>
          <div class="half-row">
            <div class="centered-title">
              <h2>Our Location</h2>
            </div>
            <div class="half-col">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.4267278586094!2d121.04470604999999!3d13.7531207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd050d816cb125%3A0x38397fc3f16c95a!2sSta.%20Clara%20Elementary%20School%2C%20Rizal%20Ave%2C%20Batangas!5e0!3m2!1sen!2sph!4v1731655399373!5m2!1sen!2sph"
                loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-container">
      <span class="copyright">©Copyright 2024 - All Rights Reserved</span>
    </div>
  </div>
  <div id="infoModal" class="modal">
    <div class="modal-content">
      <div class="modal-row blue left">
        <div class="modal-welcome">
          <h2>Welcome to SCES Online Learning Platform! <img src="assets/images/wave.png" alt="wave icon"></h2>
        </div>
        <p>Let's get started by knowing your identity in school.</p>
        <img src="assets/images/class.png" alt="class icon" class="modal-img">
      </div>
      <div class="modal-row white right">
        <span class="close-btn" id="closeModal">&times;</span>
        <div class="modal-welcome">
          <p>Are you a student, teacher, or educational worker?</p>
        </div>
        <div class="item-container">
          <a href="/SCES/frontend/student/login.php" class="modal-item">
            <div class="item-group">
              <img src="assets/images/student.png" alt="student icon">
              <span>Student</span>
            </div>
            <i class="fa-solid fa-chevron-right"></i>
          </a>
          <a href="/SCES/frontend/faculty/login.php" class="modal-item">
            <div class="item-group">
              <img src="assets/images/school.png" alt="school icon">
              <span>Teacher</span>
            </div>
            <i class="fa-solid fa-chevron-right"></i>
          </a>
          <a href="/SCES/frontend/admin/login.php" class="modal-item">
            <div class="item-group">
              <img src="assets/images/admin.png" alt="admin icon">
              <span>Educational Worker</span>
            </div>
            <i class="fa-solid fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
  <script src="/SCES/assets/script/landing.js"></script>
  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/partials/footer.php';
  ?>