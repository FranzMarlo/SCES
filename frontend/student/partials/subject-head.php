<?php
$subjectName = isset($_GET['subject']) ? $_GET['subject'] : 'Default Subject';
$subjectName = htmlspecialchars($subjectName, ENT_QUOTES, 'UTF-8');
$subject = $db->getSubjectDetails($subjectName, $sectionId, $level_id);
$current_page = 'subject.php';