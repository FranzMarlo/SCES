<?php
function formatDueDate($dueDateString)
{
    $dueDate = new DateTime($dueDateString);
    $currentDate = new DateTime();

    $dayOfWeek = $dueDate->format('l');
    $timeOfDay = $dueDate->format('g:iA');

    $interval = $currentDate->diff($dueDate);
    $daysDifference = $interval->days;

    if ($currentDate->format('Y-m-d') === $dueDate->format('Y-m-d')) {
        return 'Today at ' . $timeOfDay;
    } elseif ($daysDifference <= 7 && $dueDate > $currentDate && $dueDate->format('W') === $currentDate->format('W')) {
        return $dayOfWeek . ' at ' . $timeOfDay;
    } else {
        return $dueDate->format('F j, Y \a\t g:iA');
    }
}

function formatQuizScore($score, $itemNumber)
{
    if (is_null($score)) {
        return 'Quiz hasn\'t been taken';
    } else {
        return htmlspecialchars($score) . '/' . htmlspecialchars($itemNumber);
    }
}

function formatQuizRemarks($remarks)
{
    if (is_null($remarks)) {
        return [
            'image' => '/SCES/assets/images/quiz-pending.png',
            'text' => 'Pending'
        ];
    } elseif ($remarks === 'Passed') {
        return [
            'image' => '/SCES/assets/images/quiz-passed.png',
            'text' => 'Passed'
        ];
    } elseif ($remarks === 'Failed') {
        return [
            'image' => '/SCES/assets/images/quiz-failed.png',
            'text' => 'Failed'
        ];
    }
}

function getQuizAttemptNotice($attempts)
{
    if (is_null($attempts) || $attempts == 0) {
        return "You still have 3 attempts on submitting the quiz.";
    } elseif ($attempts == 1) {
        return "You still have 2 attempts on taking the quiz.";
    } elseif ($attempts == 2) {
        return "You still have 1 attempt on taking the quiz.";
    } elseif ($attempts == 3) {
        return "No attempts left on taking the quiz.";
    } else {
        return "Invalid number of attempts.";
    }
}

function formatCompletionDate($dueDateString)
{
    $dueDate = new DateTime($dueDateString);
    $currentDate = new DateTime();

    $dayOfWeek = $dueDate->format('l');
    $timeOfDay = $dueDate->format('g:iA');

    $interval = $currentDate->diff($dueDate);
    $daysDifference = $interval->days;

    // Check if the due date is today
    if ($currentDate->format('Y-m-d') === $dueDate->format('Y-m-d')) {
        return 'Today at ' . $timeOfDay;
    }
    // Check if the due date is in the current week and in the future
    elseif ($daysDifference <= 7 && $dueDate > $currentDate && $dueDate->format('W') === $currentDate->format('W')) {
        return $dayOfWeek . ' at ' . $timeOfDay;
    }
    // Handle past dates
    elseif ($dueDate < $currentDate) {
        // Check if the due date was exactly yesterday
        if ($dueDate->format('Y-m-d') === $currentDate->modify('-1 day')->format('Y-m-d')) {
            return 'Yesterday at ' . $timeOfDay;
        } else {
            return $dueDate->format('F j, Y \a\t g:iA');
        }
    }
    // Handle future dates beyond the current week
    else {
        return $dueDate->format('F j, Y \a\t g:iA');
    }
}


function getQuizAttemptCount($attempts)
{
    if (is_null($attempts) || $attempts == 0) {
        return "You haven't attempted on taking the quiz.";
    } elseif ($attempts == 1) {
        return "You only used 1 attempt on taking the quiz.";
    } elseif ($attempts == 2) {
        return "You used 2 attempts on taking the quiz.";
    } elseif ($attempts == 3) {
        return "You used all 3 attempts on taking the quiz.";
    } else {
        return "Invalid number of attempts.";
    }
}

function getProfileImage($gender)
{
    if ($gender == 'Female') {
        return 'student-female.png';
    } else {
        return 'student-male.png';
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
