<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/fetch-db.php';
$fetchDb = new fetchClass();

header('Content-Type: application/json');

ob_clean(); 

try {
    if (isset($_POST['fetchType'])) {
        if ($_POST['fetchType'] === 'adminGetStudents') {
            $students = $fetchDb->adminGetStudentsData();
            echo json_encode($students);
        } elseif ($_POST['fetchType'] === 'getStudentDetails') {
            $studentId = $_POST['student_id'];
            $student = $fetchDb->getStudentDetails($studentId);

            if ($student) {
                echo json_encode($student);
            } else {
                echo json_encode(['error' => 'No student found']);
            }
        }
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

exit();

