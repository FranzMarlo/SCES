<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/head.php';
?>
<title>Sign up | SCES Online Learning Platform</title>
</head>

<body>
  <div class="flex-container sign-up">
    <div class="column left">
      <div class="opening">
        <h1>Hi There, Teacher!</h1>
        <h1>Let's Sign Up</h1>
      </div>
      <div class="wrapper">
        <img src="/SCES/assets/images/admin-signup.png" alt="sign up icon" />
      </div>
    </div>
    <div class="column right">
      <div class="form-wrapper">
        <form class="form-40px" id="facultySignUp" novalidate>
          <h1>Sign Up</h1>
          <div class="input-icons">
            <label for="firstName">
              <i class="fa-solid fa-user icon"></i>
            </label>
            <input type="text" name="firstName" id="firstName" placeholder="First Name" />
          </div>
          <div class="input-icons">
            <label for="middleName">
              <i class="fa-solid fa-user icon"></i>
            </label>
            <input type="text" name="middleName" id="middleName" placeholder="Middle Name" />
          </div>
          <div class="input-icons">
            <label for="lastName">
              <i class="fa-solid fa-user icon"></i>
            </label>
            <input type="text" name="lastName" id="lastName" placeholder="Last Name" />
          </div>
          <div class="input-icons">
            <label for="gender">
              <i class="fa-solid fa-person-half-dress icon"></i>
            </label>
            <select name="gender" id="gender">
              <option value="" disabled selected>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
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
          </div>
          <div class="input-icons">
            <label for="confirmPassword">
              <i class="fa-sharp fa-solid fa-shield icon"></i>
            </label>
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
          </div>
          <button type="submit" id="facultySignUpBtn">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/footer.php';
  ?>