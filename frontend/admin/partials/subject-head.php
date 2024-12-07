<?php
$section = isset($_GET['section']) ? htmlspecialchars($_GET['section']) : '';
$currentSubject = isset($_GET['subject']) ? htmlspecialchars($_GET['subject']) : '';
$gradeLevel = isset($_GET['gradelevel']) ? htmlspecialchars($_GET['gradelevel']) : '';
$subject = $db->getTeacherSubjectDetails($_GET['teacher'], $section, $currentSubject, $gradeLevel);

$current_page = 'subject.php';
$page = $subject['subject'] . ' - ' . $subject['section'];
$studentCount = $db->getTotalStudentBySection($_GET['section']);
$sectionData = $db->facultyGetSectionData($_GET['section']);