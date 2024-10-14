<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/fetch-db.php';
$fetchDb = new fetchClass();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $submitType = $_POST['submitType'];

    if ($submitType === 'getLessons') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];
        $levelId = $_POST['levelId'];
        $subjectId = $_POST['subjectId'];
        $sectionId = $_POST['sectionId'];
        $lessonId = $_POST['lessonId'];

        $selectLesson = $fetchDb->facultyGetLessons($levelId, $subjectId, $teacherId, $sectionId);

        if ($selectLesson) {
            foreach ($selectLesson as $facultyLesson) {
                echo '<option value="' . htmlspecialchars($facultyLesson['lesson_id']) . '" '
                    . ($facultyLesson['lesson_id'] == $lessonId ? 'selected' : '') . '>';
                echo 'Lesson ' . htmlspecialchars($facultyLesson['lesson_number']) . ' - ' . htmlspecialchars($facultyLesson['lesson_title']);
                echo '</option>';
            }
        } else {
            echo '<option value="">No lessons available</option>';
        }

    } else if ($submitType === 'getQuiz') {
        if (isset($_POST['quiz_id'])) {
            $quizId = $_POST['quiz_id'];

            $quizData = $fetchDb->fetchQuizDetails($quizId);

            echo json_encode($quizData);
        } else {
            echo json_encode(['error' => 'Quiz ID not provided']);
        }
    } else if ($submitType === 'viewQuiz') {
        if (isset($_POST['quiz_id'])) {
            $quizId = $_POST['quiz_id'];

            $quizData = $fetchDb->fetchFullQuizDetails($quizId);
            $averageData = $fetchDb->fetchMedianScore($quizId);

            $quizData['average_score'] = $averageData['average_score'] ?? 0;

            echo json_encode($quizData);
        } else {
            echo json_encode(['error' => 'Quiz ID not provided']);
        }
    } else if ($submitType === 'getStudentScores') {
        if (isset($_POST['quiz_id'])) {
            $quizId = $_POST['quiz_id'];

            $quizData = $fetchDb->fetchStudentScore($quizId);

            echo json_encode($quizData);
        } else {
            echo json_encode(['error' => 'Quiz ID not provided']);
        }
    } else if ($submitType === 'getPassedStudents') {
        if (isset($_POST['quiz_id'])) {
            $quizId = $_POST['quiz_id'];

            $studentCount = $fetchDb->fetchPassedStudents($quizId);

            echo json_encode(['student_count' => $studentCount]);
        } else {
            echo json_encode(['error' => 'Quiz ID not provided']);
        }
    } else if ($submitType === 'getFailedStudents') {
        if (isset($_POST['quiz_id'])) {
            $quizId = $_POST['quiz_id'];

            $studentCount = $fetchDb->fetchFailedStudents($quizId);

            echo json_encode(['student_count' => $studentCount]);
        } else {
            echo json_encode(['error' => 'Quiz ID not provided']);
        }
    } else if ($submitType === 'getTotalStudents') {
        if (isset($_POST['quiz_id'])) {
            $quizId = $_POST['quiz_id'];

            $studentCount = $fetchDb->fetchTotalStudents($quizId);

            echo json_encode(['student_count' => $studentCount]);
        } else {
            echo json_encode(['error' => 'Quiz ID not provided']);
        }
    } else if ($submitType === 'checkQuestionCount') {
        if (isset($_POST['quiz_id'])) {
            $quizId = $_POST['quiz_id'];

            $itemCount = $fetchDb->fetchItemCount($quizId);

            echo $itemCount;
        } else {
            echo json_encode(['error' => 'Quiz ID not provided']);
        }
    } else if ($submitType === 'getQuizContent') {
        if (isset($_POST['quiz_id'])) {
            $quizId = $_POST['quiz_id'];

            $quizDetails = $fetchDb->fetchQuizInfo($quizId);

            $questions = $fetchDb->fetchQuestions($quizId);

            foreach ($questions as &$question) {
                $question['choices'] = $fetchDb->fetchChoices($question['question_id']);
            }
            $quizData = [
                'quiz_number' => $quizDetails['quiz_number'],
                'title' => $quizDetails['title'],
                'icon' => $quizDetails['icon'],
                'subject_code' => $quizDetails['subject_code'],
                'questions' => $questions,
            ];

            echo json_encode($quizData);
        } else {
            echo json_encode(['error' => 'Quiz ID not provided']);
        }
    } else if ($submitType === 'viewQuizHistory') {
        if (isset($_POST['quiz_id'])) {
            session_start();
            $quizId = $_POST['quiz_id'];
            $studentId = $_SESSION['student_id'];

            // Fetch quiz details
            $quizDetails = $fetchDb->fetchQuizInfo($quizId);

            // Fetch quiz questions
            $questions = $fetchDb->fetchQuestions($quizId);

            // Fetch the student's selected answers
            $studentAnswers = $fetchDb->fetchStudentAnswers($studentId, $quizId);

            if (empty($studentAnswers)) {
                echo json_encode(['error' => 'You have not answered this quiz yet.']);
                exit;
            }

            foreach ($questions as &$question) {
                // Fetch choices for the current question
                $choices = $fetchDb->fetchChoices($question['question_id']);

                foreach ($choices as &$choice) {
                    // Add a flag to indicate if this choice was selected by the student
                    $choice['isSelected'] = false;

                    // Add a flag to indicate if the choice is correct (value 0 is correct)
                    if ($choice['value'] == 1) {
                        $choice['is_correct'] = 1; // Correct answer
                    } else {
                        $choice['is_correct'] = 0; // Wrong answer
                    }

                    // Check if the student selected this choice
                    foreach ($studentAnswers as $answer) {
                        if (
                            $answer['question_id'] == $question['question_id'] &&
                            $answer['choice_id'] == $choice['choice_id']
                        ) {
                            $choice['isSelected'] = true;
                        }
                    }
                }

                // Attach choices to each question
                $question['choices'] = $choices;
            }

            // Prepare the quiz data for the response
            $quizData = [
                'quiz_number' => $quizDetails['quiz_number'],
                'title' => $quizDetails['title'],
                'icon' => $quizDetails['icon'],
                'subject_code' => $quizDetails['subject_code'],
                'questions' => $questions,
            ];

            // Return the data as JSON
            echo json_encode($quizData);
        } else {
            echo json_encode(['error' => 'Quiz ID not provided']);
        }
    } else if ($submitType === 'questionAnalytics') {
        if (isset($_POST['question_id'])) {
            $questionId = $_POST['question_id'];

            // Fetch data
            $question = $fetchDb->fetchQuestionInfo($questionId);
            $choices = $fetchDb->fetchChoices($questionId);
            $analytics = $fetchDb->fetchCorrectIncorrect($questionId);
            $selections = $fetchDb->fetchChoiceSelections($questionId);

            // Check if all necessary data is present
            if ($question && $choices && $analytics && $selections) {
                // Mapping selections into the choices array
                $response = [
                    'question' => $question['question'],
                    'choices' => array_map(function ($choice) use ($selections) {
                        // Find the selection count for this choice
                        $choice['selections'] = 0;  // Default to 0 if not found
                        foreach ($selections as $selection) {
                            if ($selection['choice_id'] == $choice['choice_id']) {
                                $choice['selections'] = $selection['selections'];
                                break;
                            }
                        }
                        return [
                            'choice_id' => $choice['choice_id'],
                            'text' => $choice['choice'],
                            'order' => $choice['choice_order'],
                            'value' => $choice['value'],
                            'selections' => $choice['selections'], // Include selections count
                        ];
                    }, $choices),
                    'analytics' => [
                        'correct' => $analytics['correct'],
                        'incorrect' => $analytics['incorrect']
                    ]
                ];

                echo json_encode($response);
            } else {
                // If any data is missing, return a proper error response
                echo json_encode(['error' => 'Data not found or incomplete']);
            }
        } else {
            echo json_encode(['error' => 'Question ID not provided']);
        }
    } else if ($submitType === 'getQuizRecords') {
        session_start();
        $studentId = $_SESSION['student_id'];

        $studentRecords = $fetchDb->studentFetchScores($studentId);
        echo json_encode($studentRecords);
    } else if ($submitType === 'getGrades') {
        session_start();
        $studentId = $_SESSION['student_id'];

        $studentGrades = $fetchDb->studentFetchGrades($studentId);
        echo json_encode($studentGrades);
    } else {
        echo json_encode(['error' => 'Invalid submit type']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

