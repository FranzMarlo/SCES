<?php
session_start();
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/fetch-db.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $levelId = $_POST['levelId'];
    $subjectId = $_POST['subjectId'];
    $sectionId = $_POST['sectionId'];
    $teacherId = $_SESSION['teacher_id']; 

    $fetchDb = new fetchClass();
    $selectLesson = $fetchDb->facultyGetLessons($levelId, $subjectId, $teacherId, $sectionId);

    if ($selectLesson) {
        foreach ($selectLesson as $facultyLesson) {
            echo '<option value="' . htmlspecialchars($facultyLesson['lesson_id']) . '">';
            echo 'Lesson ' . htmlspecialchars($facultyLesson['lesson_number']) . ' - ' . htmlspecialchars($facultyLesson['lesson_title']);
            echo '</option>';
        }
    } else {
        echo '<option value="">No lessons available</option>';
    }
}

