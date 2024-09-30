<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/fetch-db.php';
$fetchDb = new fetchClass();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST['submitType'] === 'getQuestion') {
        $questionId = $_POST['questionId'];

        $question = $fetchDb->fetchQuestion($questionId);
        $choices = $fetchDb->fetchChoices($questionId);

        print_r($question);
        print_r($choices);

        echo json_encode([
            'question' => [
                'question_id' => $question['question_id'],
                'question' => $question['question']
            ],
            'choices' => $choices
        ]);
    }
}