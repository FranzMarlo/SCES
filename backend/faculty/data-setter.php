<?php

if (isset($_SESSION['teacher_id'])) {
    $teacherId = $_SESSION['teacher_id'];
    $teacherFname = $_SESSION['teacher_fname'];
    $teacherMname = $_SESSION['teacher_mname'];
    $teacherLname = $_SESSION['teacher_lname'];
    $teacherSuffix = $_SESSION['teacher_suffix'];
    $age = $_SESSION['age'];
    $gender = $_SESSION['gender'];
    $email = $_SESSION['email'];
    $password = $_SESSION['password'];
    $trn = $_SESSION['trn'];
    $image = $_SESSION['image_profile'];
    $role = $_SESSION['role'];
    $city = $_SESSION['city'];
    $barangay = $_SESSION['barangay'];
    $street = $_SESSION['street'];
    $contactNumber = $_SESSION['contact_number'];
    $passwordChange = $_SESSION['password_change'];
    $emailVerification = $_SESSION['email_verification'];
    $title = ($gender == 'Female') ? 'Ms.' : 'Mr.';
    $middleInitial = getMiddleInitial($teacherMname);
    $suffix = getSuffix($teacherSuffix);
    $firstName = getFirstName($teacherFname);
    $accountStatus = $db->getFacultyAccountStatus($teacherId);
    if ($role != 'Faculty') {
        header('Location: /SCES/frontend/admin/login.php');
    }
} else {
    header('Location: /SCES/frontend/faculty/login.php');
}

function getMiddleInitial($middleName)
{
    if ($middleName == 'N/a') {
        return '';
    } else {
        return substr($middleName, 0, 1) . '.';
    }
}

function getSuffix($suffix)
{
    if ($suffix == 'N/A') {
        return '';
    } else {
        return $suffix;
    }
}

function getFirstName($teacherFname)
{
    $firstSpacePos = strpos($teacherFname, " ");

    if ($firstSpacePos !== false) {
        $firstName = substr($teacherFname, 0, $firstSpacePos);
        return $firstName;
    } else {
        return $teacherFname;
    }
}