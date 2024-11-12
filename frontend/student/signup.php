<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/head.php';
?>
<script src="/SCES/assets/script/signup.js"></script>
<title>Sign up | SCES Online Learning Platform</title>
</head>

<body>
  <div class="max-content">
    <div class="flex-container sign-up">
      <div class="column left">
        <div class="opening">
          <h1>Hi there!</h1>
          <h1>Let's Get Started</h1>
        </div>
        <div class="wrapper">
          <img src="/SCES/assets/images/signup.png" alt="sign up icon" />
        </div>
      </div>
      <div class="column right">
        <div class="form-wrapper">
          <form class="form-40px" id="studSignUp" novalidate>
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
              <label for="studSuffix">
                <i class="fa-solid fa-user icon"></i>
              </label>
              <select name="studSuffix" id="studSuffix">
                <option value="" disabled selected>Select Suffix</option>
                <option value="N/A">None</option>
                <option value="Sr.">Sr.</option>
                <option value="Jr.">Jr.</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
                <option value="VI">VI</option>
                <option value="VII">VII</option>
                <option value="VIII">VIII</option>
                <option value="IX">IX</option>
                <option value="X">X</option>
              </select>
            </div>
            <div class="input-icons">
              <label for="studentLRN">
                <i class="fa-solid fa-school-lock icon"></i>
              </label>
              <input type="number" name="studentLRN" id="studentLRN" placeholder="LRN" />
            </div>
            <div class="input-icons">
              <label for="gradeLevel">
                <i class="fa-solid fa-graduation-cap icon"></i>
              </label>
              <select name="gradeLevel" id="gradeLevel">
                <option value="" disabled selected>Select Grade Level</option>
                <option value="G0001">Grade 1</option>
                <option value="G0002">Grade 2</option>
                <option value="G0003">Grade 3</option>
                <option value="G0004">Grade 4</option>
                <option value="G0005">Grade 5</option>
                <option value="G0006">Grade 6</option>
              </select>
            </div>
            <div class="input-icons">
              <label for="section">
                <i class="fa-solid fa-school icon"></i>
              </label>
              <select name="section" id="section">
                <option value="" disabled selected>Select Section</option>
                <option value="" disabled>Please Select Grade Level First</option>
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
            <button type="submit" id="studSignUpBtn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <?php
  include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/student/partials/footer.php';
  ?>