<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/fetch-db.php';
$fetchDb = new fetchClass();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['submitType']) && $_POST['submitType'] === 'getQuiz') {
        if (isset($_POST['quiz_id'])) {
            $quizId = $_POST['quiz_id'];

            $quizData = $fetchDb->fetchQuizDetails($quizId);


            echo json_encode($quizData);
        } else {
            echo json_encode(['error' => 'Quiz ID not provided']);
        }
    }
    else if (isset($_POST['submitType']) && $_POST['submitType'] === 'viewQuiz') {
        if (isset($_POST['quiz_id'])) {
            $quizId = $_POST['quiz_id'];

            $quizData = $fetchDb->fetchFullQuizDetails($quizId);

            echo json_encode($quizData);
        } else {
            echo json_encode(['error' => 'Quiz ID not provided']);
        }
    } else {
        // Handle invalid submit type
        echo json_encode(['error' => 'Invalid submit type']);
    }
} else {
    // Handle non-POST requests
    echo json_encode(['error' => 'Invalid request method']);
}
?>