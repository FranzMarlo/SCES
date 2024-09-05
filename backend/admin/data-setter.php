<?php

if (isset($_SESSION['teacher_id'])) {
    $teacherId = $_SESSION['teacher_id'];
    $teacherFname = $_SESSION['teacher_fname'];
    $teacherMname = $_SESSION['teacher_mname'];
    $teacherLname = $_SESSION['teacher_lname'];
    $age = $_SESSION['age']; 
    $gender = $_SESSION['gender']; 
    $email = $_SESSION['email']; 
    $password= $_SESSION['password']; 
    $registration = $_SESSION['registration'];
    $image = $_SESSION['image_profile'];
    $title = ($gender == 'Female') ? 'Ma\'am' : 'Sir';
}
else{
    header('Location: /SCES/frontend/student/login.php');
}