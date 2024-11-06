<?php

if (isset($_SESSION['student_id'])) {
    $studentId = $_SESSION['student_id'];
    $lrn = $_SESSION['lrn'];
    $studentFname = $_SESSION['student_fname'];
    $studentMname = $_SESSION['student_mname'];
    $studentLname = $_SESSION['student_lname'];
    $studentSuffix = $_SESSION['student_suffix'];
    $lrn = $_SESSION['lrn']; 
    $age = $_SESSION['age']; 
    $gender = $_SESSION['gender']; 
    $email = $_SESSION['email']; 
    $password= $_SESSION['password']; 
    $guardianName = $_SESSION['guardian_name'];
    $guardianContact = $_SESSION['guardian_contact'];
    $city = $_SESSION['city'];
    $barangay = $_SESSION['barangay'];
    $street= $_SESSION['street'];
    $image = $_SESSION['profile_image'];
    $sectionId =  $_SESSION['section_id'];
    $level_id = $_SESSION['level_id'];
    $section = $_SESSION['section'];
    $gradeLevel = $_SESSION['grade_level'];
    $passwordChange = $_SESSION['password_change'];
    $emailVerification = $_SESSION['email_verification'];
    $middleInitial = getMiddleInitial($studentMname);
    $suffix = getSuffix($studentSuffix);
}
else{
    header('Location: /SCES/frontend/student/login.php');
}

function getMiddleInitial($middleName){
    if ($middleName == 'N/a'){
        return '';
    }
    else{
        return substr($middleName, 0, 1) . '.';
    }
}

function getSuffix($suffix){
    if ($suffix == 'N/A'){
        return '';
    }
    else{
        return $suffix;
    }
}