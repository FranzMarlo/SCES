<?php

if (isset($_SESSION['student_id'])) {
    $studentId = $_SESSION['student_id'];
    $lrn = $_SESSION['lrn'];
    $studentFname = $_SESSION['student_fname'];
    $studentMname = $_SESSION['student_mname'];
    $studentLname = $_SESSION['student_lname'];
    $age = $_SESSION['age']; 
    $gender = $_SESSION['gender']; 
    $email = $_SESSION['email']; 
    $password= $_SESSION['password']; 
    $guardianName = $_SESSION['guardian_name'];
    $guardianContact = $_SESSION['guardian_contact'];
    $city = $_SESSION['city'];
    $barangay = $_SESSION['barangay'];
    $street= $_SESSION['street'];
    $registration = $_SESSION['registration'];
    $image = $_SESSION['profile_image'];
    $sectionId =  $_SESSION['section_id'];
    $level_id = $_SESSION['level_id'];
    $section = $_SESSION['section'];
    $gradeLevel = $_SESSION['grade_level'];
    $passwordChange = $_SESSION['password_change'];
    $emailVerification = $_SESSION['email_verification'];
    $middleInitial = substr($studentMname, 0, 1) . '.';
}
else{
    header('Location: /SCES/frontend/student/login.php');
}