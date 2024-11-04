<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/fetch-db.php';
$fetchDb = new fetchClass();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $submitType = $_POST['submitType'];

    if ($submitType === 'getLessons') {
        $levelId = $_POST['levelId'];
        $subjectId = $_POST['subjectId'];
        $sectionId = $_POST['sectionId'];
        $lessonId = $_POST['lessonId'];

        $selectLesson = $fetchDb->facultyGetLessons($levelId, $subjectId, $sectionId);

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

            $quizDetails = $fetchDb->fetchQuizInfo($quizId);

            $questions = $fetchDb->fetchQuestions($quizId);

            $studentAnswers = $fetchDb->fetchStudentAnswers($studentId, $quizId);

            if (empty($studentAnswers)) {
                echo json_encode(['error' => 'You have not answered this quiz yet.']);
                exit;
            }

            foreach ($questions as &$question) {
                $choices = $fetchDb->fetchChoices($question['question_id']);

                foreach ($choices as &$choice) {
                    $choice['isSelected'] = false;

                    if ($choice['value'] == 1) {
                        $choice['is_correct'] = 1;
                    } else {
                        $choice['is_correct'] = 0;
                    }

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
                'status' => $quizDetails['status'],
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
    } else if ($submitType === 'fetchLineChartData') {
        session_start();
        $studentId = $_SESSION['student_id'];

        $data = $fetchDb->studentFetchScoresPerMonth($studentId);

        echo json_encode([
            'labels' => $data['months'],  // X-axis: months
            'lineData' => $data['scores'] // Y-axis: average scores
        ]);
    } else if ($submitType === 'fetchBarChartData') {
        session_start();
        $lrn = $_SESSION['lrn'];

        $data = $fetchDb->fetchGWAByAcademicYear($lrn);

        if ($data) {

            echo json_encode([
                'labels' => $data['labels'],
                'barData' => $data['gwaValues']
            ]);
        } else {

            echo json_encode([
                'labels' => [],
                'barData' => []
            ]);
        }
    } else if ($submitType === 'studentBarChartGWA') {
        $lrn = $_POST['lrn'];

        $data = $fetchDb->fetchGWAByAcademicYear($lrn);

        if ($data) {

            echo json_encode([
                'labels' => $data['labels'],
                'barData' => $data['gwaValues']
            ]);
        } else {

            echo json_encode([
                'labels' => [],
                'barData' => []
            ]);
        }
    } else if ($submitType === 'studentFullBarChart') {
        $studentId = $_POST['student_id'];
        $sectionId = $_POST['section_id'];

        // Call the studentAverageScoreBySubject method
        $data = $fetchDb->studentAverageScoreBySubject($studentId, $sectionId);

        if ($data) {
            // Return subjects as labels, scores as barData, and subject codes for colors
            echo json_encode([
                'labels' => $data['subjects'],
                'barData' => $data['scores'],
                'subjectCodes' => $data['subjectCodes']
            ]);
        } else {
            // If no data is returned, return empty arrays
            echo json_encode([
                'labels' => [],
                'barData' => [],
                'subjectCodes' => []
            ]);
        }
    } else if ($submitType === 'sectionFullBarChart') {
        $sectionId = $_POST['section_id'];
        $students = $fetchDb->getStudentsBySection($sectionId);

        // Initialize arrays for subjects and total scores
        $subjects = [];
        $subjectTotals = [];
        $subjectCounts = [];
        $subjectCodes = [];

        // Loop through each student to accumulate scores by subject
        foreach ($students as $student) {
            $studentId = $student['student_id'];
            $studentData = $fetchDb->studentAverageScoreBySubject($studentId, $sectionId);

            // Loop through each subject for the current student
            foreach ($studentData['subjects'] as $index => $subject) {
                $score = $studentData['scores'][$index];
                $subjectCode = strtolower($studentData['subjectCodes'][$index]);

                // Check if this subject is already in the totals array
                if (!isset($subjectTotals[$subject])) {
                    $subjectTotals[$subject] = 0;
                    $subjectCounts[$subject] = 0;
                    $subjectCodes[$subject] = $subjectCode;  // Store subject code
                    $subjects[] = $subject;  // Add to subjects list once
                }

                // Accumulate scores and counts for each subject
                $subjectTotals[$subject] += $score;
                $subjectCounts[$subject] += 1;
            }
        }

        // Calculate the average score for each subject across the section
        $averageScores = [];
        foreach ($subjects as $subject) {
            $averageScores[] = $subjectCounts[$subject] > 0
                ? $subjectTotals[$subject] / $subjectCounts[$subject]
                : 0;
        }

        // Prepare data for chart
        echo json_encode([
            'labels' => $subjects,
            'barData' => $averageScores,
            'subjectCodes' => array_values($subjectCodes)
        ]);
    } else if ($submitType === 'analyticsFullBarChart') {

        $data = $fetchDb->fetchAverageGWA();

        if ($data) {

            echo json_encode([
                'labels' => $data['labels'],
                'barData' => $data['averageGwaValues']
            ]);
        } else {

            echo json_encode([
                'labels' => [],
                'barData' => []
            ]);
        }
    } else if ($submitType === 'analyticsFullBarChartWithFilter') {
        $year = $_POST['year'];
        $gradeLevel = $_POST['gradeLevel'];

        $data = $fetchDb->fetchAverageGWAWithFilter($year, $gradeLevel);

        if ($data) {

            echo json_encode([
                'labels' => $data['labels'],
                'barData' => $data['averageGwaValues']
            ]);
        } else {

            echo json_encode([
                'labels' => [],
                'barData' => []
            ]);
        }
    } else if ($submitType === 'fetchStudentsDataTable') {
        $sectionId = $_POST['section_id'];

        $students = $fetchDb->getStudentsBySection($sectionId);

        echo json_encode($students);
    } elseif ($submitType === 'fetchStudentDetails') {
        $studentId = $_POST['student_id'];
        $student = $fetchDb->getStudentDetails($studentId);
        if ($student) {
            echo json_encode($student);
        } else {
            echo json_encode(['error' => 'No student found']);
        }
    } else if ($submitType === 'facultyGetQuizRecords') {
        $studentId = $_POST['student_id'];

        $studentRecords = $fetchDb->facultyFetchScores($studentId);
        echo json_encode($studentRecords);
    } else if ($submitType === 'facultyGetQuizRecordsBySection') {
        $studentId = $_POST['student_id'];
        $sectionId = $_POST['section_id'];

        $studentRecords = $fetchDb->facultyFetchScoresBySection($studentId, $sectionId);
        echo json_encode($studentRecords);
    } else if ($submitType === 'facultyGetQuizRecordsBySubject') {
        $subjectId = $_POST['subject_id'];
        $studentId = $_POST['student_id'];

        $studentRecords = $fetchDb->facultyFetchScoresBySubject($studentId, $subjectId);
        echo json_encode($studentRecords);
    } else if ($submitType === 'facultyGetGrades') {
        $studentId = $_POST['student_id'];

        $studentGrades = $fetchDb->studentFetchGrades($studentId);
        echo json_encode($studentGrades);
    } else if ($submitType === 'facultyGetGradesBySection') {
        $studentId = $_POST['student_id'];
        $sectionId = $_POST['section_id'];

        $studentGrades = $fetchDb->studentFetchGradesBySection($studentId, $sectionId);
        echo json_encode($studentGrades);
    } else if ($submitType === 'facultyGetGradesBySubject') {
        $subjectId = $_POST['subject_id'];
        $studentId = $_POST['student_id'];

        $studentGrades = $fetchDb->studentFetchGradesBySubject($studentId, $subjectId);
        echo json_encode($studentGrades);
    } else if ($submitType === 'facultyGetPanelData') {
        $studentId = $_POST['student_id'];

        $lrn = $fetchDb->getStudentLRN($studentId);
        $totalCompleted = $fetchDb->facultyGetTotalQuizzesCount($studentId);
        $totalPending = $fetchDb->facultyGetPendingQuizzesCount($studentId);
        $averageScore = $fetchDb->facultyGetAverageScore($studentId);
        $generalAverage = $fetchDb->computeStudentGWAByLRN($lrn);

        $panelData['totalCompleted'] = $totalCompleted;
        $panelData['totalPending'] = $totalPending;
        $panelData['averageScore'] = $averageScore;
        $panelData['generalAverage'] = $generalAverage;
        echo json_encode($panelData);
    } else if ($submitType === 'facultyGetPanelDataBySection') {
        $sectionId = $_POST['section_id'];
        $studentId = $_POST['student_id'];

        $lrn = $fetchDb->getStudentLRN($studentId);
        $totalCompleted = $fetchDb->facultyGetTotalQuizzesCountBySection($studentId, $sectionId);
        $totalPending = $fetchDb->facultyGetPendingQuizzesCountBySection($sectionId, $studentId);
        $averageScore = $fetchDb->facultyGetAverageScoreBySection($studentId, $sectionId);
        $generalAverage = $fetchDb->computeStudentGWAByLRN($lrn);

        $panelData['totalCompleted'] = $totalCompleted;
        $panelData['totalPending'] = $totalPending;
        $panelData['averageScore'] = $averageScore;
        $panelData['generalAverage'] = $generalAverage;
        echo json_encode($panelData);
    } else if ($submitType === 'facultyGetPanelDataBySubject') {
        $studentId = $_POST['student_id'];
        $subjectId = $_POST['subject_id'];

        $lrn = $fetchDb->getStudentLRN($studentId);
        $totalCompleted = $fetchDb->facultyGetTotalQuizzesCountBySubject($studentId, $subjectId);
        $totalPending = $fetchDb->facultyGetPendingQuizzesCountBySubject($studentId, $subjectId);
        $averageScore = $fetchDb->facultyGetAverageScoreBySubject($studentId, $subjectId);
        $generalAverage = $fetchDb->computeStudentGWAByLRN($lrn);

        $panelData['totalCompleted'] = $totalCompleted;
        $panelData['totalPending'] = $totalPending;
        $panelData['averageScore'] = $averageScore;
        $panelData['generalAverage'] = $generalAverage;
        echo json_encode($panelData);

    } else if ($submitType === 'facultyGetSectionPanelData') {
        $sectionId = $_POST['section_id'];

        // Fetch total quizzes completed and pending for the section
        $totalCompleted = $fetchDb->sectionGetTotalQuizzesCount($sectionId);
        $totalPending = $fetchDb->sectionGetPendingQuizzesCount($sectionId);

        // Get all students in the section
        $students = $fetchDb->getStudentsBySection($sectionId);

        // Initialize counters and totals
        $totalAverageScore = 0;
        $totalGeneralAverageGWA = 0;
        $studentCount = count($students);

        // Loop through each student to calculate total scores and GWA
        foreach ($students as $student) {
            $studentId = $student['student_id'];
            $lrn = $student['lrn'];

            // Fetch the individual average score and GWA for the student
            $averageScore = $fetchDb->facultyGetAverageScoreBySection($studentId, $sectionId);
            $generalAverageGWA = $fetchDb->computeStudentGWAByLRN($lrn);

            // Add to running totals
            $totalAverageScore += $averageScore;
            $totalGeneralAverageGWA += $generalAverageGWA;
        }


        $averageScore = $studentCount > 0 ? round($totalAverageScore / $studentCount, 2) : 0;
        $generalAverageGWA = $studentCount > 0 ? round($totalGeneralAverageGWA / $studentCount, 2) : 0;

        $panelData = [
            'totalCompleted' => $totalCompleted,
            'totalPending' => $totalPending,
            'averageScore' => $averageScore,
            'generalAverage' => $generalAverageGWA
        ];

        echo json_encode($panelData);
    } else if ($submitType === 'studentCompletionBySubject') {
        $studentId = $_POST['student_id'];
        $subjectId = $_POST['subject_id'];

        $panelData = $fetchDb->studentGetQuizCompletionBySubject($studentId, $subjectId);

        echo json_encode($panelData);
    } else if ($submitType === 'studentAverageScoreBySubject') {
        $studentId = $_POST['student_id'];
        $subjectId = $_POST['subject_id'];

        $data = $fetchDb->studentFetchScoresBySubject($studentId, $subjectId);

        if ($data === null) {
            echo json_encode([
                'labels' => [],
                'lineData' => []
            ]);
        } else {
            echo json_encode([
                'labels' => $data['months'],
                'lineData' => $data['scores']
            ]);
        }
    } else if ($submitType === 'studentAverageScoreByMonth') {
        $studentId = $_POST['student_id'];

        $data = $fetchDb->studentFetchScoresByMonth($studentId);

        if ($data === null) {
            echo json_encode([
                'labels' => [],
                'lineData' => []
            ]);
        } else {
            echo json_encode([
                'labels' => $data['months'],
                'lineData' => $data['scores']
            ]);
        }
    } else if ($submitType === 'sectionAverageScoreByMonth') {
        $sectionId = $_POST['section_id'];

        $students = $fetchDb->getStudentsBySection($sectionId);

        $months = [];
        $scores = [];

        if (!empty($students)) {
            foreach ($students as $student) {
                $studentId = $student['student_id'];
                $studentData = $fetchDb->studentFetchScoresByMonth($studentId);

                if (empty($months)) {
                    $months = $studentData['months'];
                    $scores = array_fill(0, count($months), 0); // Initialize scores with zeroes
                }

                foreach ($studentData['scores'] as $index => $avgScore) {
                    $scores[$index] += $avgScore;
                }
            }

            $studentCount = count($students);
            $sectionMonthlyAverages = array_map(function ($totalScore) use ($studentCount) {
                return $studentCount > 0 ? $totalScore / $studentCount : 0;
            }, $scores);

            echo json_encode([
                'labels' => $months,
                'lineData' => $sectionMonthlyAverages
            ]);
        } else {
            // If no students in section, return empty arrays
            echo json_encode([
                'labels' => [],
                'lineData' => []
            ]);
        }
    } else if ($submitType === 'analyticsAverageScoreByMonth') {

        $students = $fetchDb->getAllStudents();

        $months = [];
        $scores = [];

        if (!empty($students)) {
            foreach ($students as $student) {
                $studentId = $student['student_id'];
                $studentData = $fetchDb->studentFetchScoresByMonth($studentId);

                if (empty($months)) {
                    $months = $studentData['months'];
                    $scores = array_fill(0, count($months), 0); // Initialize scores with zeroes
                }

                foreach ($studentData['scores'] as $index => $avgScore) {
                    $scores[$index] += $avgScore;
                }
            }

            $studentCount = count($students);
            $sectionMonthlyAverages = array_map(function ($totalScore) use ($studentCount) {
                return $studentCount > 0 ? $totalScore / $studentCount : 0;
            }, $scores);

            echo json_encode([
                'labels' => $months,
                'lineData' => $sectionMonthlyAverages
            ]);
        } else {
            // If no students in section, return empty arrays
            echo json_encode([
                'labels' => [],
                'lineData' => []
            ]);
        }
    } else if ($submitType === 'analyticsAverageScoreByMonthWithFilter') {
        $year = $_POST['year'];
        $gradeLevel = $_POST['gradeLevel'];

        $students = $fetchDb->getAllStudentsWithFilter($year, $gradeLevel);

        $months = [];
        $scores = [];

        if (!empty($students)) {
            foreach ($students as $student) {
                $studentId = $student['student_id'];
                $studentData = $fetchDb->studentFetchScoresByMonthWithFilter($studentId, $year, $gradeLevel);

                if (empty($months)) {
                    $months = $studentData['months'];
                    $scores = array_fill(0, count($months), 0);
                }

                foreach ($studentData['scores'] as $index => $avgScore) {
                    $scores[$index] += $avgScore;
                }
            }

            $studentCount = count($students);
            $sectionMonthlyAverages = array_map(function ($totalScore) use ($studentCount) {
                return $studentCount > 0 ? $totalScore / $studentCount : 0;
            }, $scores);

            echo json_encode([
                'labels' => $months,
                'lineData' => $sectionMonthlyAverages
            ]);
        } else {
            echo json_encode([
                'labels' => [],
                'lineData' => []
            ]);
        }
    } else if ($submitType === 'analyticsAverageScoreByGradeLevel') {

        $students = $fetchDb->getAllStudents();

        $grades = [];
        $scores = [];

        if (!empty($students)) {
            foreach ($students as $student) {
                $studentId = $student['student_id'];
                $studentData = $fetchDb->studentFetchScoresByGradeLevel($studentId);

                if (empty($grades)) {
                    $grades = $studentData['grades'];
                    $scores = array_fill(0, count($grades), 0); // Initialize scores with zeroes
                }

                foreach ($studentData['scores'] as $index => $avgScore) {
                    $scores[$index] += $avgScore;
                }
            }

            $studentCount = count($students);
            $averageScoresByGradeLevel = array_map(function ($totalScore) use ($studentCount) {
                return $studentCount > 0 ? $totalScore / $studentCount : 0;
            }, $scores);

            echo json_encode([
                'labels' => $grades,
                'barData' => $averageScoresByGradeLevel
            ]);
        } else {
            // If no students in section, return empty arrays
            echo json_encode([
                'labels' => [],
                'barData' => []
            ]);
        }
    } else if ($submitType === 'analyticsAverageScoreByGradeLevelWithFilter') {
        $year = $_POST['year'];
        $gradeLevel = $_POST['gradeLevel'];

        $students = $fetchDb->getAllStudentsWithFilter($year, $gradeLevel);

        $grades = [];
        $scores = [];

        if (!empty($students)) {
            foreach ($students as $student) {
                $studentId = $student['student_id'];
                $studentData = $fetchDb->studentFetchScoresByGradeLevelWithFilter($studentId, $year, $gradeLevel);

                if (empty($grades)) {
                    $grades = $studentData['grades'];
                    $scores = array_fill(0, count($grades), 0); // Initialize scores with zeroes
                }

                foreach ($studentData['scores'] as $index => $avgScore) {
                    $scores[$index] += $avgScore;
                }
            }

            $studentCount = count($students);
            $averageScoresByGradeLevel = array_map(function ($totalScore) use ($studentCount) {
                return $studentCount > 0 ? $totalScore / $studentCount : 0;
            }, $scores);

            echo json_encode([
                'labels' => $grades,
                'barData' => $averageScoresByGradeLevel
            ]);
        } else {
            echo json_encode([
                'labels' => [],
                'barData' => []
            ]);
        }
    } else if ($submitType === 'facultyGetGWA') {
        $studentId = $_POST['student_id'];
        $lrn = $fetchDb->getStudentLRN($studentId);

        $gwaRecords = $fetchDb->getStudentGWA($lrn);

        $gwaData = [];

        if (!empty($gwaRecords)) {
            foreach ($gwaRecords as $record) {
                $gwaData[] = [
                    'gwa' => $record['gwa'],
                    'grade_section' => $record['grade_section'],
                    'remarks' => $record['remarks']
                ];
            }
        } else {
            $gwaData[] = [
                'gwa' => 'N/A',
                'grade_section' => 'N/A',
                'remarks' => 'N/A'
            ];
        }

        echo json_encode($gwaData);
    } else if ($submitType === 'fetchStudentsRecordTable') {
        $subjectId = $_POST['subject_id'];

        $studentQuizRecords = $fetchDb->getStudentQuizRecords($subjectId);
        echo json_encode($studentQuizRecords);
    } else if ($submitType === 'fetchStudentQuizHistory') {
        $quizId = $_POST['quiz_id'];
        $studentId = $_POST['student_id'];

        $quizDetails = $fetchDb->fetchQuizInfo($quizId);

        $questions = $fetchDb->fetchQuestions($quizId);

        $studentAnswers = $fetchDb->fetchStudentAnswers($studentId, $quizId);

        if (empty($studentAnswers)) {
            echo json_encode(['error' => 'Student has not answered the quiz yet.']);
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
    } else if ($submitType === 'fetchSectionRecordTable') {
        $sectionId = $_POST['section_id'];

        $studentQuizRecords = $fetchDb->getSectionQuizRecords($sectionId);
        echo json_encode($studentQuizRecords);
    } else if ($submitType === 'facultyGetSubjectPanelData') {
        $subjectId = $_POST['subject_id'];
        $sectionId = $_POST['section_id'];

        $totalCompleted = $fetchDb->facultyGetTotalSubjectQuizzesCount($subjectId);
        $totalPending = $fetchDb->facultyGetPendingSubjectQuizzesCount($subjectId);
        $averageScore = $fetchDb->facultyGetSubjectAverageScore($subjectId);
        $highestAverage = $fetchDb->facultyGetHighestStudentAverageScore($subjectId);

        $panelData['totalCompleted'] = $totalCompleted;
        $panelData['totalPending'] = $totalPending;
        $panelData['averageScore'] = $averageScore;
        $panelData['highestAverage'] = $highestAverage;
        echo json_encode($panelData);
    } else if ($submitType === 'subjectAverageScore') {
        $subjectId = $_POST['subject_id'];

        $data = $fetchDb->subjectFetchScores($subjectId);

        if ($data === null) {
            echo json_encode([
                'labels' => [],
                'lineData' => []
            ]);
        } else {
            echo json_encode([
                'labels' => $data['months'],
                'lineData' => $data['scores']
            ]);
        }
    } else if ($submitType === 'subjectCompletion') {
        $subjectId = $_POST['subject_id'];

        $panelData = $fetchDb->subjectQuizCompletion($subjectId);

        echo json_encode($panelData);
    } else if ($submitType === 'rankingStudentsBySubject') {
        $subjectId = $_POST['subject_id'];
        $sectionId = $_POST['section_id'];

        $panelData = $fetchDb->rankingStudentsBySubject($sectionId, $subjectId);

        echo json_encode($panelData);
    } else if ($submitType === 'rankingStudentsBySection') {
        $sectionId = $_POST['section_id'];

        $panelData = $fetchDb->rankingStudentsBySection($sectionId);

        echo json_encode($panelData);
    } else if ($submitType === 'rankingStudentsByYear') {
        $panelData = $fetchDb->rankingStudentsByYear();

        echo json_encode($panelData);
    } else if ($submitType === 'rankingStudentsByYearWithFilter') {
        $year = $_POST['year'];
        $gradeLevel = $_POST['gradeLevel'];

        $panelData = $fetchDb->rankingStudentsByYearWithFilter($year, $gradeLevel);

        echo json_encode($panelData);
    } else if ($submitType === 'gwaRankingStudentsByYearWithFilter') {
        $year = $_POST['year'];
        $gradeLevel = $_POST['gradeLevel'];

        $panelData = $fetchDb->gwaRankingStudentsByYearWithFilter($year, $gradeLevel);

        echo json_encode($panelData);
    } else if ($submitType === 'analyticsPanelData') {
        $year = $_POST['year'];
        $gradeLevel = $_POST['gradeLevel'];

        $totalStudents = $fetchDb->fetchTotalStudentsWithFilter($year, $gradeLevel);
        $totalTeachers = $fetchDb->fetchTotalTeachersWithFilter($year, $gradeLevel);
        $totalLessons = $fetchDb->fetchTotalLessonsWithFilter($year, $gradeLevel);
        $totalQuizzes = $fetchDb->fetchTotalQuizzesWithFilter($year, $gradeLevel);

        $panelData['totalStudents'] = $totalStudents;
        $panelData['totalTeachers'] = $totalTeachers;
        $panelData['totalLessons'] = $totalLessons;
        $panelData['totalQuizzes'] = $totalQuizzes;
        echo json_encode($panelData);

    } elseif ($submitType === 'fetchGradeDetails') {
        $gradeId = $_POST['grade_id'];
        $grade = $fetchDb->getGradeDetails($gradeId);
        if ($grade) {
            echo json_encode($grade);
        } else {
            echo json_encode(['error' => 'No student found']);
        }
    } else if ($submitType === 'fetchAllStudentsDataTable') {

        $students = $fetchDb->getStudentMasterlist();

        echo json_encode($students);
    } else if ($submitType === 'masterlistPanelData') {
        $sectionId = $_POST['section_id'];
        $studentId = $_POST['student_id'];

        $lrn = $fetchDb->getStudentLRN($studentId);
        $totalCompleted = $fetchDb->facultyGetTotalQuizzesCount($studentId, $sectionId);
        $totalPending = $fetchDb->facultyGetPendingQuizzesCount($sectionId, $studentId);
        $averageScore = $fetchDb->facultyGetAverageScore($studentId);
        $generalAverage = $fetchDb->computeStudentGWAByLRN($lrn);

        $panelData['totalCompleted'] = $totalCompleted;
        $panelData['totalPending'] = $totalPending;
        $panelData['averageScore'] = $averageScore;
        $panelData['generalAverage'] = $generalAverage;
        echo json_encode($panelData);
    } else if ($submitType === 'facultyFetchLineChartData') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];

        $data = $fetchDb->facultyLessonsPerMonth($teacherId);

        echo json_encode([
            'labels' => $data['months'],
            'lineData' => $data['lesson_count']
        ]);
    } else if ($submitType === 'facultyFetchBarChart') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];

        $data = $fetchDb->facultyLessonBySubject($teacherId);

        if ($data) {
            echo json_encode([
                'labels' => $data['subjects'],
                'barData' => $data['count'],
                'subjectCodes' => $data['subjectCodes']
            ]);
        } else {
            echo json_encode([
                'labels' => [],
                'barData' => [],
                'subjectCodes' => []
            ]);
        }
    } else if ($submitType === 'facultyQuizCompletion') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];

        $panelData = $fetchDb->facultyQuizCompletion($teacherId);

        echo json_encode($panelData);
    } else if ($submitType === 'mainDashboardDonutChartData') {

        $panelData = $fetchDb->mainQuizCompletion();

        echo json_encode($panelData);
    } else if ($submitType === 'mainDashboardBarChartData') {
        $panelData = $fetchDb->getStudentsByYear(); // or any function that fetches the required data

        // Assuming $panelData is an array of student counts grouped by grade level
        $labels = [];
        $counts = [];

        // Prepare labels and counts for the bar chart
        foreach ($panelData as $data) {
            $labels[] = $data['grade_level']; // Adjust this key based on your actual array structure
            $counts[] = $data['student_count']; // Adjust this key based on your actual array structure
        }

        echo json_encode(['labels' => $labels, 'counts' => $counts]);
    } else if ($submitType === 'fetchAllFacultyDataTable') {

        $faculty = $fetchDb->getFacultyMasterlist();

        echo json_encode($faculty);
    } elseif ($submitType === 'fetchFacultyDetails') {
        $teacherId = $_POST['teacher_id'];
        $teacher = $fetchDb->getFacultyDetails($teacherId);
        if ($teacher) {
            echo json_encode($teacher);
        } else {
            echo json_encode(['error' => 'No data found']);
        }
    } elseif ($submitType === 'fetchAdminDetails') {
        $teacherId = $_POST['teacher_id'];
        $teacher = $fetchDb->getAdminDetails($teacherId);
        if ($teacher) {
            echo json_encode($teacher);
        } else {
            echo json_encode(['error' => 'No data found']);
        }
    } else if ($submitType === 'adminFetchPanelData') {
        $teacherId = $_POST['teacher_id'];

        $totalLessons = $fetchDb->getTotalTeacherLesson($teacherId);
        $totalStudents = $fetchDb->getTotalTeacherStudent($teacherId);
        $totalCompleted = $fetchDb->teacherGetQuizzesCount($teacherId);
        $totalPending = $fetchDb->teacherGetPendingQuizzesCount($teacherId);

        $panelData['totalLessons'] = $totalLessons;
        $panelData['totalStudents'] = $totalStudents;
        $panelData['totalCompleted'] = $totalCompleted;
        $panelData['totalPending'] = $totalPending;
        echo json_encode($panelData);
    } else if ($submitType === 'adminFetchLineChartData') {
        $teacherId = $_POST['teacher_id'];

        $data = $fetchDb->facultyLessonsPerMonth($teacherId);

        echo json_encode([
            'labels' => $data['months'],
            'lineData' => $data['lesson_count']
        ]);
    } else if ($submitType === 'adminFetchBarChart') {
        $teacherId = $_POST['teacher_id'];

        $data = $fetchDb->facultyLessonBySubject($teacherId);

        if ($data) {
            echo json_encode([
                'labels' => $data['subjects'],
                'barData' => $data['count'],
                'subjectCodes' => $data['subjectCodes']
            ]);
        } else {
            echo json_encode([
                'labels' => [],
                'barData' => [],
                'subjectCodes' => []
            ]);
        }
    } else if ($submitType === 'adminQuizCompletion') {
        $teacherId = $_POST['teacher_id'];

        $panelData = $fetchDb->facultyQuizCompletion($teacherId);

        echo json_encode($panelData);
    } else if ($submitType === 'getSubjects') {
        $levelId = $_POST['levelId'];
        $subjects = $fetchDb->getSubjectMasterlist($levelId);
        foreach ($subjects as $subject) {
            echo "<option value='{$subject['subject']}'>{$subject['subject']}</option>";
        }
    } else if ($submitType === 'getSections') {
        $levelId = $_POST['levelId'];
        $sections = $fetchDb->getSectionByLevel($levelId);
        foreach ($sections as $section) {
            echo "<option value='{$section['section_id']}'>{$section['section']}</option>";
        }
    } else if ($submitType === 'fetchSubjectDetails') {
        $subjectId = $_POST['subject_id'];
        $subjectData = $fetchDb->getSubjectDetails($subjectId);
        echo json_encode($subjectData);
    } else if ($submitType === 'fetchSectionDetails') {
        $sectionId = $_POST['section_id'];
        $sectionData = $fetchDb->getSectionDetails($sectionId);
        echo json_encode($sectionData);
    } elseif ($submitType === 'fetchStudentLevelDetails') {
        $studentId = $_POST['student_id'];
        $student = $fetchDb->getStudentDetails($studentId);
        if ($student) {
            echo json_encode($student);
        } else {
            echo json_encode(['error' => 'No student found']);
        }
    } elseif ($submitType === 'checkStudentGrades') {
        $studentId = $_POST['student_id'];
        $sectionId = $_POST['section_id'];

        $checkStudentGrade = $fetchDb->checkStudentGrades($studentId, $sectionId);

        $response = ["hasCompleteGrades" => $checkStudentGrade];

        if ($checkStudentGrade == true) {
            $studentGWA = $fetchDb->getStudentGeneralAverage($studentId, $sectionId);
            $response["generalAverage"] = $studentGWA;
        }

        echo json_encode($response);

    } else {
        echo json_encode(['error' => 'Invalid submit type']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

