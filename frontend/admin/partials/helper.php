<?php

function getProfileImage($gender)
{
    if ($gender == 'Female') {
        return 'quiz-female-teacher.png';
    } else {
        return 'quiz-male-teacher.png';
    }
}

function getLogoStyle($gender)
{
    if ($gender == 'Female') {
        return 'pink';
    } else {
        return 'blue';
    }
}

function getMottoStyle($gender)
{
    if ($gender == 'Female') {
        return 'pink-bg';
    } else {
        return 'blue-bg';
    }
}

function getIdBg($gender)
{
    if ($gender == 'Female') {
        return 'female';
    } else {
        return 'male';
    }
}

function getProfileBg($gender)
{
    if ($gender == 'Female') {
        return 'male';
    } else {
        return 'female';
    }
}

function getCurrentSchoolYear()
{
    // Get the current year and month
    $currentYear = date("Y");
    $currentMonth = date("n"); // n = numeric representation of a month (1-12)

    // Check if the month is before or after the start of the school year (June)
    if ($currentMonth >= 6) {
        // School year starts in June and ends in April of the next year
        $startYear = $currentYear;
        $endYear = $currentYear + 1;
    } else {
        // If it's before June, we're still in the previous school year
        $startYear = $currentYear - 1;
        $endYear = $currentYear;
    }

    return $startYear . " - " . $endYear;
}

function getSubjectFontSize($text)
{
    $length = strlen($text);

    if ($length < 6 && $length < 10) {
        return null;
    } else if ($length > 5 && $length < 10) {
        return 'subject-text';
    } else {
        return 'subject-text-large';
    }
}

function getPronoun($gender){
    if ($gender == 'Female') {
        return 'MS.';
    }
    else{
        return 'MR.';
    }
}