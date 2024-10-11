<?php

if (isset($_SESSION['teacher_id'])) {
    $teacherId = $_SESSION['teacher_id'];
    $teacherFname = $_SESSION['teacher_fname'];
    $teacherMname = $_SESSION['teacher_mname'];
    $teacherLname = $_SESSION['teacher_lname'];
    $age = $_SESSION['age'];
    $gender = $_SESSION['gender'];
    $email = $_SESSION['email'];
    $password = $_SESSION['password'];
    $registration = $_SESSION['registration'];
    $image = $_SESSION['image_profile'];
    $role = $_SESSION['role'];
    $city = $_SESSION['city'];
    $barangay = $_SESSION['barangay'];
    $street = $_SESSION['street'];
    $contactNumber = $_SESSION['contact_number'];
    $passwordChange = $_SESSION['password_change'];
    $emailVerification = $_SESSION['email_verification'];
    $title = ($gender == 'Female') ? 'Ma\'am' : 'Sir';
    $middleInitial = substr($teacherMname, 0, 1) . '.';
    if ($role != 'Admin') {
        header('Location: /SCES/frontend/faculty/login.php');
    }
} else {
    header('Location: /SCES/frontend/admin/login.php');
}