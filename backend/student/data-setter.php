<?php

if (isset($_SESSION['student_id'])) {
    $studentId = $_SESSION['student_id'];
    $getStudentData = $db->getStudentData($studentId);
    $lrn = $_SESSION['lrn'];
    $studentFname = $_SESSION['student_fname'];
    $studentMname = $_SESSION['student_mname'];
    $studentLname = $_SESSION['student_lname'];
    $studentSuffix = $_SESSION['student_suffix'];
    $lrn = $_SESSION['lrn'];
    $age = $_SESSION['age'];
    $gender = $_SESSION['gender'];
    $email = $_SESSION['email'];
    $password = $_SESSION['password'];
    $guardianName = $_SESSION['guardian_name'];
    $guardianContact = $_SESSION['guardian_contact'];
    $city = $_SESSION['city'];
    $barangay = $_SESSION['barangay'];
    $street = $_SESSION['street'];
    $image = $_SESSION['profile_image'];
    $passwordChange = $_SESSION['password_change'];
    $emailVerification = $_SESSION['email_verification'];
    $middleInitial = getMiddleInitial($studentMname);
    $suffix = getSuffix($studentSuffix);
    $firstName = getFirstName($studentFname);

    $getGradeLevel = $db->getGradeLevel($getStudentData['level_id']);
    $getSection = $db->getSection($getStudentData['section_id']);
    $sectionId = $getStudentData['section_id'];
    $level_id = $getStudentData['level_id'];
    $gradeLevel = $getGradeLevel;
    $section = $getSection;

    $accountStatus = $db->getStudentAccountStatus($studentId);

} else {
    header('Location: /SCES/frontend/student/login.php');
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

function getFirstName($studentFname)
{
    $firstSpacePos = strpos($studentFname, " ");

    if ($firstSpacePos !== false) {
        $firstName = substr($studentFname, 0, $firstSpacePos);
        return $firstName;
    } else {
        return $studentFname;
    }
}