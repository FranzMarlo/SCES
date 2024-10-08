<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/partials/head.php';
?>
<link rel="stylesheet" href="assets/style/landing.css" />
<title>SCES Learning Platform</title>
</head>

<body>
  <nav>
    <input type="checkbox" id="check" />
    <label for="check" class="checkbtn">
      <i class="fa-solid fa-bars"></i>
    </label>
    <img src="assets/images/logo.png" alt="SCES logo" class="logo" />
    <label class="logo">SCES</label>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact Us</a></li>
      <li>
        <a href="#"><i class="fa-solid fa-magnifying-glass"></i></a>
      </li>
      <li>
        <a href="frontend/student/login.php"><button>Get Started</button></a>
      </li>
    </ul>
  </nav>
  <div class="hero-flex-container">
    <div class="hero-column text">
      <div class="hero-opening">
        <h1>Bring Future</h1>
        <h1>Right Here</h1>
      </div>
      <div class="hero-content">
        <h5>Online Learning Platform</h5>
        <p>SCES Online Learning Platform provides innovative learning<br>experience for students.</p>
      </div>
      <div class="hero-button-container">
        <button>Learn More</button>
      </div>
    </div>
    <div class="hero-column image">
      <img src="assets/images/landingbg.png" alt="landing page bg" />
    </div>
  </div>
  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/partials/footer.php';
  ?>