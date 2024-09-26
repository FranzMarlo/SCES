<?php
$section = isset($_GET['section']) ? htmlspecialchars($_GET['section']) : '';
$currentSubject = isset($_GET['subject']) ? htmlspecialchars($_GET['subject']) : '';
$gradeLevel = isset($_GET['gradelevel']) ? htmlspecialchars($_GET['gradelevel']) : '';
$subject = $db->getTeacherSubjectDetails($teacherId, $section, $currentSubject, $gradeLevel);

$_SESSION['section_id'] = $subject['section_id'];
$_SESSION['level_id'] = $subject['level_id'];
$_SESSION['grade_level'] = $subject['grade_level'];
$_SESSION['subject_id'] = $subject['subject_id'];
$_SESSION['subject_title'] = $subject['subject_title'];
$current_page = 'subject.php';
$page = 'Lessons';