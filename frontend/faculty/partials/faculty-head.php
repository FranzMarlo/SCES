<?php
session_start();
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/global.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/admin/data-setter.php';

$log = new adminLoggedIn();
$log->needLogin();
$current_page = basename($_SERVER['REQUEST_URI']);
$totalStudents = $db->getTotalStudent();
$totalTeachers = $db->getTotalTeacher();
$totalSubjects = $db->getTotalSubject();
$totalQuizzes = $db->getTotalQuiz();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link rel="stylesheet" href="/SCES/assets/style/admin.css" />
  <link rel="icon" href="/SCES/assets/images/logo.png" type="image/x-icon" />
  <script src="https://kit.fontawesome.com/c835ba47b5.js" crossorigin="anonymous"></script>
  <script src="/SCES/vendor/node_modules/chart.js/dist/chart.umd.js"></script>